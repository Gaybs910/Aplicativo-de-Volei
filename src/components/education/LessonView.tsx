import { Link, useNavigate, useParams } from 'react-router-dom';
import Court from '../court/Court';
import QuizDragDrop from './QuizDragDrop';
import AttackCoverageDiagram from './AttackCoverageDiagram';
import RotationExplorer from './RotationExplorer';
import PresetGallery from '../plays/PresetGallery';
import { MODULES, findLesson } from '../../data/lessons';
import { buildDefaultLineup } from '../../lib/court';
import { useProgressStore } from '../../store/useProgressStore';

const FLAT_LESSONS = MODULES.flatMap((module) => module.lessons.map((lesson) => ({ moduleId: module.id, lesson })));

export default function LessonView() {
  const { moduleId = '', lessonId = '' } = useParams();
  const navigate = useNavigate();
  const { module, lesson } = findLesson(moduleId, lessonId);
  const isLessonComplete = useProgressStore((s) => s.isLessonComplete);
  const markLessonComplete = useProgressStore((s) => s.markLessonComplete);

  if (!module || !lesson) {
    return (
      <div>
        <p>Lição não encontrada.</p>
        <Link to="/aprender" className="text-ball-blue">
          Voltar
        </Link>
      </div>
    );
  }

  const complete = isLessonComplete(lesson.id);
  const currentIndex = FLAT_LESSONS.findIndex((item) => item.lesson.id === lesson.id);
  const previous = FLAT_LESSONS[currentIndex - 1];
  const next = FLAT_LESSONS[currentIndex + 1];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link to="/aprender" className="btn-ghost inline-flex items-center gap-1">
          ← Voltar para o módulo
        </Link>
        <p className="eyebrow mt-4">{module.title}</p>
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3 text-chalk/80">
          {lesson.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {lesson.visual === 'default-court' && (
          <div className="flex justify-center">
            <Court players={buildDefaultLineup()} />
          </div>
        )}
      </div>

      {lesson.visual === 'attack-coverage' && <AttackCoverageDiagram />}
      {lesson.visual === 'rotation-explorer' && <RotationExplorer />}
      {lesson.visual === 'preset-gallery' && <PresetGallery />}

      {lesson.quiz && (
        <QuizDragDrop quiz={lesson.quiz} onSuccess={() => markLessonComplete(lesson.id)} />
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-arena-700 pt-6">
        {previous ? (
          <button
            onClick={() => navigate(`/aprender/${previous.moduleId}/${previous.lesson.id}`)}
            className="btn-ghost"
          >
            ← Lição anterior
          </button>
        ) : (
          <Link to="/aprender" className="btn-ghost">
            ← Voltar para o módulo
          </Link>
        )}

        {!lesson.quiz && !complete && (
          <button onClick={() => markLessonComplete(lesson.id)} className="btn-primary">
            Marcar como concluída
          </button>
        )}
        {complete && <span className="text-sm text-court">✓ Lição concluída</span>}

        {next && (
          <button
            onClick={() => navigate(`/aprender/${next.moduleId}/${next.lesson.id}`)}
            className="btn-ghost"
          >
            Próxima lição →
          </button>
        )}
      </div>
    </div>
  );
}
