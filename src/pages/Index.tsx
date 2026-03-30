import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import ProcessSection from "@/components/ProcessSection";
import BlueprintShowcase from "@/components/BlueprintShowcase";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO />
      <Navigation />
      <Hero />
{/* <Projects /> */}
      <Services />
      <ProcessSection />
      <BlueprintShowcase />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
