import Header from "./components/Header";
import Hero from "./components/Hero";
import CourseContent from "./components/CourseContent";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import CourseTip from "./components/CourseTip";
import CourseContent2 from "./components/CourseContent2";
import Checkout from "./components/Checkout";
import WhatsAppButton from "./components/WhatsAppButton";
import About from "./components/About";
import Learnbonus from "./components/Learnbonus";
import BonusResumen from "./components/BonusSummary";
import Learn from "./components/Learn";
import Video from "./components/Video";
import Testimonials from "./components/Testimonals/Testimonials";

function App() {
  return (
    <div className="font-sans">
      {" "}
      <Header />{" "}
      <main>
        {" "}
        <Hero /> <CourseContent2 /> <CourseTip /> <Learn /> <CourseContent />{" "}
        <Video /> <Testimonials /> <About /> <Learnbonus /> <BonusResumen />{" "}
        <FAQ /> <Checkout /> <WhatsAppButton />{" "}
      </main>{" "}
      <Footer />{" "}
    </div>
  );
}

export default App;
