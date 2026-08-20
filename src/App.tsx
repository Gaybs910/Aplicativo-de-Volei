import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import TacticalBoard from './components/tactical/TacticalBoard';
import EducationHome from './components/education/EducationHome';
import LessonView from './components/education/LessonView';
import PresetPlaysPage from './components/plays/PresetPlaysPage';

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        <Routes>
          <Route path="/" element={<Navigate to="/tactical" replace />} />
          <Route path="/tactical" element={<TacticalBoard />} />
          <Route path="/jogadas" element={<PresetPlaysPage />} />
          <Route path="/aprender" element={<EducationHome />} />
          <Route path="/aprender/:moduleId/:lessonId" element={<LessonView />} />
        </Routes>
      </main>
    </div>
  );
}
