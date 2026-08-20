import { useNavigate } from 'react-router-dom';
import PlayAnimator from '../court/PlayAnimator';
import { PRESET_PLAYS } from '../../data/presetPlays';
import { useTacticalStore } from '../../store/useTacticalStore';

export default function PresetGallery() {
  const navigate = useNavigate();
  const loadPreset = useTacticalStore((s) => s.loadPreset);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PRESET_PLAYS.map((preset) => (
        <div key={preset.id} className="panel flex flex-col items-center gap-2">
          <PlayAnimator steps={preset.steps} />
          <p className="text-center text-sm font-medium text-chalk">{preset.name}</p>
          <p className="text-center text-xs text-chalk/60">{preset.description}</p>
          <button
            onClick={() => {
              loadPreset(preset);
              navigate('/tactical');
            }}
            className="btn-primary mt-1 px-3 py-1.5 text-xs"
          >
            Abrir na prancheta tática
          </button>
        </div>
      ))}
    </div>
  );
}
