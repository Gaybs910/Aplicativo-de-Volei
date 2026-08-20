import { useState } from 'react';
import { useTacticalStore } from '../../store/useTacticalStore';

export default function SaveLoadPanel() {
  const savedSystems = useTacticalStore((s) => s.savedSystems);
  const saveCurrent = useTacticalStore((s) => s.saveCurrent);
  const loadSystem = useTacticalStore((s) => s.loadSystem);
  const deleteSystem = useTacticalStore((s) => s.deleteSystem);
  const [name, setName] = useState('');

  return (
    <div className="panel flex flex-col gap-3">
      <h3 className="panel-title">Salvar jogada</h3>
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da jogada"
          className="flex-1 rounded-md border border-arena-600 bg-arena-950 px-3 py-1.5 text-sm text-chalk outline-none focus:border-ball-blue"
        />
        <button
          onClick={() => {
            if (!name.trim()) return;
            saveCurrent(name.trim());
            setName('');
          }}
          className="btn-primary py-1.5"
        >
          Salvar
        </button>
      </div>

      {savedSystems.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {savedSystems.map((system) => (
            <li
              key={system.id}
              className="flex items-center justify-between rounded-md bg-arena-800 px-3 py-1.5 text-sm"
            >
              <span className="truncate">{system.name}</span>
              <div className="flex gap-2">
                <button onClick={() => loadSystem(system.id)} className="text-ball-blue hover:brightness-125">
                  Carregar
                </button>
                <button onClick={() => deleteSystem(system.id)} className="text-danger hover:brightness-125">
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
