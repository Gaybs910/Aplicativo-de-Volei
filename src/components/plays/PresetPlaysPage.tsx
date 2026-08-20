import PresetGallery from './PresetGallery';

export default function PresetPlaysPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="eyebrow">Jogadas</p>
        <h1 className="text-3xl font-bold">Jogadas Prontas</h1>
        <p className="mt-1 text-chalk/60">
          Formações padrão animadas, prontas para explicar pro time ou carregar direto na prancheta tática.
        </p>
      </div>
      <PresetGallery />
    </div>
  );
}
