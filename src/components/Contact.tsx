import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal } from "./ScrollReveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@innovationimperial.co.za",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+27 11 123 4567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Johannesburg, South Africa",
  },
];

const howHeardOptions = ["Instagram", "Facebook", "Tiktok", "Referral", "Other"];
const productOptions = [
  "Website",
  "Online Store",
  "Custom System",
  "AI Automation",
  "Internal Business App (CRM, HRMS, e.t.c)",
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    businessName: "",
    projectBudget: "",
    howHeard: "",
    otherHowHeard: "",
    email: "",
    phone: "",
    industry: "",
    productsInterested: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      howHeard: formData.howHeard === "Other"
        ? `Other (${formData.otherHowHeard})`
        : formData.howHeard,
    };

    console.log("Submitting form data:", submissionData);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({
      name: "",
      role: "",
      businessName: "",
      projectBudget: "",
      howHeard: "",
      otherHowHeard: "",
      email: "",
      phone: "",
      industry: "",
      productsInterested: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="relative py-32" id="contact">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-800/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-2 bg-gradient-glass backdrop-blur-md border border-glass-border/[0.06] text-muted-foreground mb-6"
          >
            Get In Touch
          </Badge>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-foreground">Let's start a</span>{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">
              project together
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear about it. Send us a
            message and we'll get back to you.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, idx) => (
              <ScrollReveal
                key={info.label}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <div
                  className="group flex items-center gap-4 p-6 rounded-2xl bg-gradient-glass backdrop-blur-2xl border border-glass-border/[0.06] hover:shadow-card-hover transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-glass border border-glass-border/[0.1] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <info.icon className="w-6 h-6 text-accent-warm" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {info.label}
                    </p>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact Form */}
          <ScrollReveal
            className="lg:col-span-3"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-gradient-glass backdrop-blur-2xl border border-glass-border/[0.06] shadow-glass space-y-8"
            >
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-glass-border/[0.06] pb-2">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-12"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      Role
                    </label>
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="CEO / Founder"
                      required
                      className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-12"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    Business Name
                  </label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your Company Name"
                    required
                    className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-12"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-glass-border/[0.06] pb-2">
                  Contact Info
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-12"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27..."
                      required
                      className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Business Context */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-glass-border/[0.06] pb-2">
                  Business Context
                </h3>
                <div>
                  <label
                    htmlFor="industry"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    Industry
                  </label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="e.g. Technology, Healthcare, Retail"
                    required
                    className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-12"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label
                      htmlFor="projectBudget"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      Project Budget
                    </label>
                    <Input
                      id="projectBudget"
                      name="projectBudget"
                      value={formData.projectBudget}
                      onChange={handleChange}
                      placeholder="e.g. $5,000 - $10,000"
                      required
                      className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-12"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="howHeard"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      How you heard about Us
                    </label>
                    <Select
                      onValueChange={(v) => handleSelectChange("howHeard", v)}
                      value={formData.howHeard}
                    >
                      <SelectTrigger className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-12">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {howHeardOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {formData.howHeard === "Other" && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label
                      htmlFor="otherHowHeard"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      Please specify
                    </label>
                    <Input
                      id="otherHowHeard"
                      name="otherHowHeard"
                      value={formData.otherHowHeard}
                      onChange={handleChange}
                      placeholder="Tell us how you heard about us"
                      required
                      className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-12"
                    />
                  </div>
                )}
              </div>

              {/* Products Interested In */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-glass-border/[0.06] pb-2">
                  Products interested in
                </h3>
                <Select
                  onValueChange={(v) => handleSelectChange("productsInterested", v)}
                  value={formData.productsInterested}
                >
                  <SelectTrigger className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-12">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {productOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-muted-foreground mb-2"
                >
                  Your Message (Optional)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="bg-muted/20 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl bg-accent-warm text-background-900 font-semibold hover:bg-accent-warm/90 transition-all duration-300 group"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
