import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

const Booking = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Extract pre-fill data from query params
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "";
    const email = params.get("email") || "";

    // Dynamically load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Update Calendly data-url with pre-fill parameters
    const baseUrl = "https://calendly.com/innovation-emperial/30min";
    const calendlyParams = new URLSearchParams({
      hide_gdpr_banner: "1",
      background_color: "000000",
      text_color: "e1b137",
      primary_color: "fafafa",
    });
    
    if (name) calendlyParams.append("name", name);
    if (email) calendlyParams.append("email", email);

    const widget = document.querySelector(".calendly-inline-widget");
    if (widget) {
      widget.setAttribute("data-url", `${baseUrl}?${calendlyParams.toString()}`);
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-text bg-clip-text text-transparent">
              Book a Strategy Call
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to elevate your digital presence? Choose a time that works for you and let's discuss how we can help your business grow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-glass backdrop-blur-xl border border-glass-border/[0.08] rounded-[2.5rem] overflow-hidden shadow-glass p-4 min-h-[700px]"
          >
            {/* Calendly inline widget container */}
            <div 
              className="calendly-inline-widget w-full" 
              data-url="https://calendly.com/innovation-emperial/30min?hide_gdpr_banner=1&background_color=000000&text_color=e1b137&primary_color=fafafa" 
              style={{ minWidth: "320px", height: "700px" }}
            ></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Prefer to send a message first? <a href="/#contact" className="text-accent-warm hover:underline font-medium">Head over to our contact form</a>.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
