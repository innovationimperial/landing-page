import { useRef, useState } from "react";
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
import { Mail, Phone, MapPin, Send, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal } from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

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

const howHeardOptions = ["Instagram", "Facebook", "LinkedIn", "Tiktok", "Referral", "Other"];
const productOptions = [
  "Website",
  "Online Store",
  "Custom System",
  "AI Automation / Automation",
  "Internal Business App (CRM, HRMS, e.t.c)",
  "Branding and Identity Package",
];

const budgetOptions = [
  "<$1k",
  "$1k-$5k",
  "$5k-$15k",
  "$15k-$30k",
  "$30k+",
];

const Contact = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
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
    productsInterested: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      name: formData.name,
      role: formData.role,
      businessName: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      industry: formData.industry,
      budget: formData.projectBudget,
      howHeard: formData.howHeard,
      referrer: formData.otherHowHeard,
      services: formData.productsInterested.join(', '),
      message: formData.message,
      submittedAt: new Date().toISOString()
    };

    try {
      const webhookUrl = 'https://n8n.app.innovationimperial.net/webhook-test/contact-form';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) throw new Error('Failed to submit');

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible. Redirecting to booking...",
      });

      // Clear form
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
        message: "",
        productsInterested: [],
      });
      setCurrentStep(1);

      // Redirect to booking with pre-filled data
      const searchParams = new URLSearchParams({
        name: formData.name,
        email: formData.email,
      });
      
      setTimeout(() => {
        window.location.href = `/book?${searchParams.toString()}`;
      }, 1500);

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

  const toggleProduct = (product: string) => {
    setFormData((prev) => {
      const isSelected = prev.productsInterested.includes(product);
      if (isSelected) {
        return {
          ...prev,
          productsInterested: prev.productsInterested.filter((p) => p !== product),
        };
      } else {
        return {
          ...prev,
          productsInterested: [...prev.productsInterested, product],
        };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-semibold text-foreground">
                Let's start with the basics
              </h3>
              <p className="text-muted-foreground">Tell us who you are and what you do.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-muted/10 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-14 text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm text-muted-foreground mb-2">Role</label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="CEO / Founder"
                    required
                    className="bg-muted/10 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-14 text-lg"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="businessName" className="block text-sm text-muted-foreground mb-2">Business Name</label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                  required
                  className="bg-muted/10 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-14 text-lg"
                />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-semibold text-foreground">
                How can we reach you?
              </h3>
              <p className="text-muted-foreground">We'll use these to get in touch about your project.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-muted/10 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-14 text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm text-muted-foreground mb-2">WhatsApp or Mobile number</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+27..."
                    required
                    className="bg-muted/10 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-14 text-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-semibold text-foreground">
                Project Context
              </h3>
              <p className="text-muted-foreground">Give us some background on your industry and budget.</p>
              <div className="space-y-6">
                <div>
                  <label htmlFor="industry" className="block text-sm text-muted-foreground mb-2">Industry</label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="e.g. Technology, Healthcare, Retail"
                    required
                    className="bg-muted/10 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-14 text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="projectBudget" className="block text-sm text-muted-foreground mb-2">Project Budget</label>
                  <Select
                    onValueChange={(v) => handleSelectChange("projectBudget", v)}
                    value={formData.projectBudget}
                  >
                    <SelectTrigger className="bg-muted/10 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-14 text-lg">
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-semibold text-foreground">
                How did you find us?
              </h3>
              <p className="text-muted-foreground">We're curious to know where you heard about our work.</p>
              <Select
                onValueChange={(v) => handleSelectChange("howHeard", v)}
                value={formData.howHeard}
              >
                <SelectTrigger className="bg-muted/10 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-14 text-lg">
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
              {(formData.howHeard === "Other" || formData.howHeard === "Referral") && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="pt-2"
                >
                  <label htmlFor="otherHowHeard" className="block text-sm text-muted-foreground mb-2">
                    {formData.howHeard === "Referral" ? "Who referred you?" : "Please specify"}
                  </label>
                  <Input
                    id="otherHowHeard"
                    name="otherHowHeard"
                    value={formData.otherHowHeard}
                    onChange={handleChange}
                    placeholder={formData.howHeard === "Referral" ? "Person or company name" : "Tell us how you heard about us"}
                    required
                    className="bg-muted/10 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl h-14 text-lg"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-semibold text-foreground">
                What are you looking for?
              </h3>
              <p className="text-muted-foreground">Select all services you're interested in.</p>
              <div className="grid gap-3">
                {productOptions.map((opt) => {
                  const isSelected = formData.productsInterested.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleProduct(opt)}
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                        isSelected 
                          ? "bg-accent-warm/10 border-accent-warm text-accent-warm" 
                          : "bg-muted/10 border-glass-border/[0.1] text-muted-foreground hover:border-glass-border/[0.3]"
                      }`}
                    >
                      <span className="text-sm md:text-base font-medium">{opt}</span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-accent-warm flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-background-900" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-semibold text-foreground">
                Final Details
              </h3>
              <p className="text-muted-foreground">Anything else you'd like us to know about your project?</p>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project goals, timelines, etc..."
                rows={6}
                className="bg-muted/10 border-glass-border/[0.1] focus:border-accent-warm/50 rounded-xl resize-none text-lg p-4"
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative py-32" id="contact">
      <div className="absolute inset-0 bg-gradient-to-t from-background-800/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
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

        <div className="grid lg:grid-cols-5 gap-12 items-start">
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

          <ScrollReveal
            className="lg:col-span-3"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl bg-gradient-glass backdrop-blur-2xl border border-glass-border/[0.06] shadow-glass min-h-[550px] flex flex-col">
              <div className="mb-8 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Step {currentStep} of {totalSteps}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2 bg-muted/20" />
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex-grow flex flex-col"
              >
                <div className="flex-grow">
                  <AnimatePresence mode="wait">
                    {renderStep()}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-4 mt-12">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                      className="h-14 px-6 rounded-xl border border-glass-border/[0.1] hover:bg-white/5 text-foreground transition-all duration-300"
                    >
                      <ChevronLeft className="mr-2 w-5 h-5" />
                      Back
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-grow h-14 rounded-xl bg-accent-warm text-background-900 font-semibold hover:bg-accent-warm/90 transition-all duration-300 group"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : currentStep === totalSteps ? (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        Continue
                        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
