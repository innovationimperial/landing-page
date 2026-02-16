import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navigation = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/#services" },
    { name: "Why Us", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4 rounded-[2rem] bg-gradient-glass backdrop-blur-xl border border-glass-border/[0.06] shadow-glass">
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
                className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="default" className="hidden sm:flex rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all">
              Let's Talk →
            </Button>

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
                        className="text-2xl font-display font-bold text-foreground hover:text-accent-warm transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                    <Button variant="default" className="rounded-full px-8 py-6 text-lg bg-foreground text-background hover:bg-foreground/90 transition-all mt-4">
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