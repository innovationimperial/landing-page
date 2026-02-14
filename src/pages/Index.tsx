import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO />
      <Navigation />
      <Hero />
      <Projects />
      <Services />
      <ProcessSection />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Index;
