import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id);
    if (element && (location.pathname === "/" || location.pathname === "/portfolio")) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/innovation.imperial/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/people/Innovation-imperial-Technology-hub/61585235175645/", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/innov_imperial", label: "X (Twitter)" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/#services" },
    { name: "Process", href: "/#process" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="relative pt-20 pb-10 border-t border-glass-border/[0.06] bg-background overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-warm/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-2xl font-display font-bold bg-gradient-text bg-clip-text text-transparent">
              Innovation Imperial
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Crafting premium digital experiences through innovative engineering and sophisticated design.
            </p>
            <div className="text-sm text-foreground/60">
              <span className="font-semibold text-accent-warm">Est. 2023</span>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gradient-glass border border-glass-border/[0.1] flex items-center justify-center text-muted-foreground hover:text-accent-warm hover:border-accent-warm/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent-warm transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-accent-warm mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-foreground">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-accent-warm/70" />
                <a href="mailto:office@innovationimperial.net" className="hover:text-foreground transition-colors">
                  office@innovationimperial.net
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-accent-warm/70" />
                <span>27 69 790 6374</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-accent-warm/70" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div className="space-y-6 p-6 rounded-2xl bg-gradient-glass border border-glass-border/[0.06] backdrop-blur-sm">
            <h4 className="text-lg font-display font-semibold text-foreground">Start a Project</h4>
            <p className="text-sm text-muted-foreground">
              Ready to take your digital presence to the next level?
            </p>
            <a
              href="/#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-accent-warm text-background-900 font-bold hover:bg-accent-warm/90 transition-all duration-300"
            >
              Book a Call
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-glass-border/[0.06] text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-sm text-muted-foreground leading-loose"
          >
            Developed by Innovation Imperial. All rights reserved by Innovation Imperial 2023.
            <br className="md:hidden" />
            <span className="hidden md:inline mx-2">•</span>
            © {currentYear} Innovation Imperial
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
