import { Link } from 'react-router-dom';
import { MODULES } from '../../data/lessons';
import { useProgressStore } from '../../store/useProgressStore';

export default function EducationHome() {
  const isModuleUnlocked = useProgressStore((s) => s.isModuleUnlocked);
  const isLessonComplete = useProgressStore((s) => s.isLessonComplete);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="eyebrow">Aprender</p>
        <h1 className="text-3xl font-bold">Módulo Educacional</h1>
        <p className="mt-1 text-chalk/60">
          Do básico aos sistemas táticos de verdade. Complete um módulo para desbloquear o próximo.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {MODULES.map((module, index) => {
          const unlocked = isModuleUnlocked(index);
          return (
            <section key={module.id} className={`panel ${!unlocked && 'opacity-60'}`}>
              <h2 className="mb-3 font-display text-lg font-semibold">
                {index + 1}. {module.title} {!unlocked && '🔒'}
              </h2>
              <ul className="flex flex-col gap-2">
                {module.lessons.map((lesson) => {
                  const complete = isLessonComplete(lesson.id);
                  return (
                    <li key={lesson.id}>
                      {unlocked ? (
                        <Link
                          to={`/aprender/${module.id}/${lesson.id}`}
                          className="flex items-center justify-between rounded-md bg-arena-800 px-4 py-2 text-sm hover:bg-arena-700"
                        >
                          <span>{lesson.title}</span>
                          {complete && <span className="text-court">✓ concluída</span>}
                        </Link>
                      ) : (
                        <span className="block rounded-md bg-arena-800/40 px-4 py-2 text-sm text-chalk/40">
                          {lesson.title}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
