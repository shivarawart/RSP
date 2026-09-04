
// import { lazy, Suspense } from "react";
// import {
//   Navigate,
//   Route,
//   Routes,
// } from "react-router-dom";

// const Home = lazy(() => import("../pages/Home/Home"));
// const About = lazy(() => import("../pages/About/Page"));
// // const Courses = lazy(() => import("../pages/courses/page"));
// // const Founder = lazy(() => import("../pages/founder/page"));
// // const Contact = lazy(() => import("../pages/Contect/page"));
// // const StudyJP = lazy(
// //   () => import("../pages/STD/JapanStudy")
// // );

// export default function AppRoutes() {
//   return (
//     <Suspense
//       fallback={
//         <div className="flex min-h-screen items-center justify-center bg-white">
//           <div className="h-8 w-8 animate-spin border-2 border-[#E60012] border-t-transparent" />
//         </div>
//       }
//     >
//       <Routes>
//         <Route path="/" element={<Home />} />

//         <Route path="/about" element={<About />} />

//         {/* <Route path="/courses" element={<Courses />} />

//         <Route path="/founder" element={<Founder />} />

//         <Route
//           path="/success-stories"
//           element={<StudyJP />} />
        

//         <Route path="/contact" element={<Contact />} />

//         Unknown route */}
//         <Route
//           path="*"
//           element={<Navigate to="/" replace />}
//         />
//       </Routes>
//     </Suspense>
//   );
// }

