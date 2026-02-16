import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") || href.startsWith("/#")) {
      const id = href.replace(/^\/?#/, "");
      if (location.pathname === "/") {
        e.preventDefault();
        scrollToSection(id);
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/#services" },
    { name: "Why Us", href: "/#process" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300 rounded-[2rem] bg-gradient-glass backdrop-blur-xl border border-glass-border/[0.06] shadow-glass",
            isScrolled ? "p-3 px-6" : "p-4"
          )}
        >
          {/* Logo */}
          <div className="text-xl md:text-2xl font-display font-bold bg-gradient-text bg-clip-text text-transparent truncate mr-4">
            Innovation Imperial
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <InteractiveHoverButton
              text="Let's Talk"
              onClick={() => scrollToSection("contact")}
              className="hidden sm:flex w-32 min-h-[44px]"
            />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-glass-border/[0.1]">
                  <div className="flex flex-col gap-8 mt-12">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-2xl font-display font-bold text-foreground hover:text-accent-warm transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                    <Button
                      variant="default"
                      className="rounded-full px-8 py-6 text-lg bg-foreground text-background hover:bg-foreground/90 transition-all mt-4"
                      onClick={() => scrollToSection("contact")}
                    >
                      Let's Talk →
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;