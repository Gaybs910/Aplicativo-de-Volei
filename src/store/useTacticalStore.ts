import { create } from 'zustand';
import type { Arrow, Player, TacticalSystem } from '../types/volleyball';
import { BACK_ROW_POSITIONS, buildDefaultLineup, clampToOwnCourt } from '../lib/court';
import { rotateTeam } from '../lib/rotation';
import { loadJSON, saveJSON } from '../lib/storage';
import { computeFormation, type FormationName } from '../lib/formations';
import type { PresetPlay } from '../data/presetPlays';

const SAVED_SYSTEMS_KEY = 'saved-systems';

interface TacticalState {
  players: Player[];
  benchedForLibero: Player | null;
  arrows: Arrow[];
  drawMode: boolean;
  savedSystems: TacticalSystem[];
  currentSystemName: string;
  activeFormation: FormationName | null;
  /** Falso enquanto a formação de Ataque estiver em uso — o levantador sobe pra rede de propósito,
   * o que quebra a ordem de rodízio por natureza, então a checagem de overlap fica desligada até
   * o usuário voltar pra Base/Defesa/Resetar (não é afetado por arrastar, rotacionar ou aplicar setas). */
  overlapEnabled: boolean;

  movePlayer: (id: string, x: number, y: number) => void;
  rotate: () => void;
  toggleLibero: () => void;
  setDrawMode: (on: boolean) => void;
  addArrow: (arrow: Omit<Arrow, 'id'>) => void;
  clearArrows: () => void;
  applyArrows: () => void;
  setFormation: (name: FormationName) => void;
  resetToDefault: () => void;
  saveCurrent: (name: string) => void;
  loadSystem: (id: string) => void;
  deleteSystem: (id: string) => void;
  loadPreset: (preset: PresetPlay) => void;
}

export const useTacticalStore = create<TacticalState>((set, get) => ({
  players: buildDefaultLineup(),
  benchedForLibero: null,
  arrows: [],
  drawMode: false,
  savedSystems: loadJSON<TacticalSystem[]>(SAVED_SYSTEMS_KEY, []),
  currentSystemName: 'Sistema sem título',
  activeFormation: 'base',
  overlapEnabled: true,

  movePlayer: (id, x, y) => {
    const clamped = clampToOwnCourt(x, y);
    set((state) => ({
      players: state.players.map((p) => (p.id === id ? { ...p, ...clamped } : p)),
      activeFormation: null,
    }));
  },

  rotate: () => {
    set((state) => ({ players: rotateTeam(state.players), activeFormation: null }));
  },

  toggleLibero: () => {
    const { players, benchedForLibero } = get();

    if (benchedForLibero) {
      // Desativar líbero: devolve o central, mas na posição atual do líbero (pode ter rotacionado).
      set({
        players: players.map((p) =>
          p.role === 'libero' ? { ...benchedForLibero, position: p.position, x: p.x, y: p.y } : p,
        ),
        benchedForLibero: null,
      });
      return;
    }

    // Líbero substitui o central que estiver na linha de fundo no momento.
    const centralNoFundo = players.find(
      (p) => (p.role === 'central1' || p.role === 'central2') && BACK_ROW_POSITIONS.includes(p.position),
    );
    if (!centralNoFundo) return;

    set({
      benchedForLibero: centralNoFundo,
      players: players.map((p) =>
        p.id === centralNoFundo.id ? { ...p, id: 'player-libero', role: 'libero' } : p,
      ),
    });
  },

  setDrawMode: (on) => set({ drawMode: on }),

  addArrow: (arrow) =>
    set((state) => ({
      arrows: [...state.arrows, { ...arrow, id: `arrow-${Date.now()}-${state.arrows.length}` }],
    })),

  clearArrows: () => set({ arrows: [] }),

  applyArrows: () => {
    const { players, arrows } = get();
    if (arrows.length === 0) return;

    // Para cada seta, o "dono" é o jogador mais próximo do ponto inicial (posições originais,
    // não as já movidas por outra seta nesta mesma aplicação) — evita que a ordem das setas importe.
    const moves = new Map<string, { x: number; y: number }>();
    arrows.forEach((arrow) => {
      const nearest = players.reduce<{ player: Player; dist: number } | null>((closest, p) => {
        const dist = (p.x - arrow.start.x) ** 2 + (p.y - arrow.start.y) ** 2;
        return !closest || dist < closest.dist ? { player: p, dist } : closest;
      }, null);
      if (nearest) {
        moves.set(nearest.player.id, clampToOwnCourt(arrow.end.x, arrow.end.y));
      }
    });

    set({
      players: players.map((p) => {
        const move = moves.get(p.id);
        return move ? { ...p, ...move } : p;
      }),
      arrows: [],
      activeFormation: null,
    });
  },

  setFormation: (name) => {
    set((state) => ({
      players: computeFormation(state.players, name),
      activeFormation: name,
      overlapEnabled: name !== 'ataque',
    }));
  },

  resetToDefault: () =>
    set({
      players: buildDefaultLineup(),
      benchedForLibero: null,
      arrows: [],
      currentSystemName: 'Sistema sem título',
      activeFormation: 'base',
      overlapEnabled: true,
    }),

  saveCurrent: (name) => {
    const { players, arrows, benchedForLibero, savedSystems } = get();
    const system: TacticalSystem = {
      id: `system-${Date.now()}`,
      name,
      players,
      arrows,
      liberoActive: Boolean(benchedForLibero),
      createdAt: new Date().toISOString(),
    };
    const updated = [...savedSystems, system];
    saveJSON(SAVED_SYSTEMS_KEY, updated);
    set({ savedSystems: updated, currentSystemName: name });
  },

  loadSystem: (id) => {
    const system = get().savedSystems.find((s) => s.id === id);
    if (!system) return;
    const benched = system.liberoActive
      ? system.players.find((p) => p.role === 'libero') ?? null
      : null;
    set({
      players: system.players,
      arrows: system.arrows,
      benchedForLibero: benched,
      currentSystemName: system.name,
      activeFormation: null,
      overlapEnabled: true,
    });
  },

  deleteSystem: (id) => {
    const updated = get().savedSystems.filter((s) => s.id !== id);
    saveJSON(SAVED_SYSTEMS_KEY, updated);
    set({ savedSystems: updated });
  },

  loadPreset: (preset) => {
    set({
      players: preset.steps[0].players,
      arrows: preset.arrows,
      benchedForLibero: null,
      currentSystemName: preset.name,
      activeFormation: null,
      overlapEnabled: true,
    });
  },
}));
