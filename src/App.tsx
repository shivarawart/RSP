import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/Page"));
import Courses from "./pages/courses/page";
import Founder from "./pages/founder/page";
import Contact from "./pages/Contect/page";
import JapanStudy from "./pages/Study/JapanStudy";


function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/founder" element={<Founder />} />

        <Route path="/JapanStudy" element={<JapanStudy />} />

        <Route path="/contact" element={<Contact />} />


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
