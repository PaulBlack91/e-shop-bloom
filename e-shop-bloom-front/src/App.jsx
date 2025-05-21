import Header from "./components/Header";
import Hero from "./components/Hero";
import CourseContent from "./components/CourseContent";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import CourseTip from "./components/CourseTip";
import CourseContent2 from "./components/CourseContent2";
import Checkout from "./components/Checkout";
import WhatsAppButton from "./components/WhatsAppButton";
import About from "./components/About";
import Learnbonus from "./components/Learnbonus";

function App() {
  return (
    <div className="font-sans">
      {" "}
      <Header />{" "}
      <main>
        {" "}
        <Hero /> <CourseContent2/> <CourseTip />  <CourseContent /> <Testimonials />  <FAQ /> <About />  <Learnbonus/> <Checkout/>  <WhatsAppButton />{" "}
      </main>{" "}
      <Footer />{" "}
    </div>
  );
}

export default App;
