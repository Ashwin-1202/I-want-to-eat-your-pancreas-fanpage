// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Story from "./components/Story";
// import MemoryTimeline from "./components/MemoryTimeline";
// import Diary from "./components/Diary";
// import Places from "./components/Places";
// import MemoryBox from "./components/MemoryBox";
// import Letters from "./components/Letters";
// import Themes from "./components/Themes";
// import LiveSection from "./components/LiveSection";
// import FinalMemory from "./components/FinalMemory";
// import Footer from "./components/Footer";
// import AudioPlayer from "./components/AudioPlayer";

// export default function App() {
//   return (
//     <div className="relative min-h-screen bg-bg font-sans text-warm-white">
//       <div className="grain-overlay" aria-hidden="true" />
//       <Navbar />
//       <main>
//         <Hero />
//         <Story />
//         <MemoryTimeline />
//         <Diary />
//         <Places />
//         <MemoryBox />
//         <Letters />
//         <Themes />
//         <LiveSection />
//         <FinalMemory />
//       </main>

//       <Footer />
//       <AudioPlayer />
//     </div>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Characters from "./pages/Characters";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </BrowserRouter>
  );
}