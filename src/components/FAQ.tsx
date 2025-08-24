import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Hexagon, Shield, Eye, Code, Lock, Users, AlertTriangle, HelpCircle, Sparkles } from 'lucide-react';

export const FAQ = () => {
  const faqs = [
    {
      question: "What is an Ethical Honeypot?",
      answer: "An ethical honeypot is a cybersecurity tool designed to attract and monitor malicious activities while maintaining full transparency. Unlike traditional honeypots, this system openly displays all collected data to educate users about digital privacy and demonstrate potential security vulnerabilities in a responsible manner."
    },
    {
      question: "What data is being collected?",
      answer: "We collect standard browser information including your IP address, user agent, screen resolution, browser fingerprint, geolocation (if permitted), device specifications, and network information. All data collection is performed transparently and displayed in real-time on this page."
    },
    {
      question: "Is this safe to use?",
      answer: "Yes, this is completely safe. This is an educational cybersecurity demonstration with full transparency. No malicious activities are performed, no data is stored permanently, and everything is done openly to teach about digital footprints and privacy awareness."
    },
    {
      question: "Why create this honeypot?",
      answer: "This project demonstrates advanced cybersecurity concepts, ethical hacking practices, and full-stack development skills. It serves as an educational tool to raise awareness about digital privacy while showcasing technical expertise in security research and web development."
    },
    {
      question: "How does browser fingerprinting work?",
      answer: "Browser fingerprinting collects various browser and device characteristics like screen resolution, installed plugins, timezone, language settings, and hardware specifications. These data points create a unique 'fingerprint' that can identify users across sessions, even without cookies."
    },
    {
      question: "What cybersecurity skills does this demonstrate?",
      answer: "This project showcases penetration testing concepts, ethical hacking methodologies, data collection techniques, privacy research, security awareness training, full-stack development, and responsible disclosure practices in cybersecurity."
    },
    {
      question: "Can I protect myself from data collection?",
      answer: "Yes! Use VPNs to mask your IP, privacy-focused browsers like Tor, disable JavaScript and geolocation, use browser extensions that block fingerprinting, regularly clear cookies and cache, and consider using virtual machines for browsing."
    },
    {
      question: "Is this data shared with third parties?",
      answer: "No. This is purely an educational demonstration. No data is permanently stored, shared, or used for any commercial purposes. The information is displayed temporarily for educational purposes only and is not transmitted to external servers."
    }
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-honey-primary/20 to-honey-secondary/20 rounded-full flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-honey-primary" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-honey-accent animate-pulse" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-honey-primary via-honey-secondary to-honey-accent bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
          Learn more about this ethical cybersecurity demonstration and what it means for your digital privacy.
        </p>
        
        {/* Feature Badges */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Badge variant="outline" className="border-honey-primary/30 bg-honey-primary/10 text-honey-primary px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-honey-primary/20 transition-all duration-300">
            <Shield className="h-4 w-4 mr-2" />
            Ethical Research
          </Badge>
          <Badge variant="outline" className="border-honey-secondary/30 bg-honey-secondary/10 text-honey-secondary px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-honey-secondary/20 transition-all duration-300">
            <Code className="h-4 w-4 mr-2" />
            Technical Skills
          </Badge>
          <Badge variant="outline" className="border-honey-accent/30 bg-honey-accent/10 text-honey-accent px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-honey-accent/20 transition-all duration-300">
            <Eye className="h-4 w-4 mr-2" />
            Full Transparency
          </Badge>
        </div>
      </div>

      {/* FAQ Accordion */}
      <Card className="card-modern border-honey-primary/20 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="flex items-center justify-center gap-3 text-honey-primary text-2xl">
            <div className="p-2 bg-honey-primary/20 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
            </div>
            Educational Purpose
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This honeypot demonstrates cybersecurity concepts for educational and skill demonstration purposes.
            All activities are ethical, transparent, and designed to improve security awareness.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/20 bg-muted/20 rounded-xl px-6 py-2 hover:bg-muted/30 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left hover:text-honey-primary transition-colors font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Skills Demonstration */}
      <Card className="card-modern border-honey-secondary/20 bg-gradient-to-br from-honey-secondary/10 via-honey-secondary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-honey-secondary text-xl">
            <div className="p-2 bg-honey-secondary/20 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
            Cybersecurity Skills Demonstrated
          </CardTitle>
          <CardDescription>
            This project showcases various technical and security skills through ethical implementation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-honey-primary text-lg flex items-center gap-2">
                <Code className="h-4 w-4" />
                Technical Skills
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-honey-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Browser Fingerprinting Techniques</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-honey-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Network Information Gathering</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-honey-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Client-side Data Collection</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-honey-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Real-time Data Visualization</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-honey-secondary text-lg flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Concepts
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-honey-secondary rounded-full"></div>
                  <span className="text-sm text-foreground">Ethical Hacking Principles</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-honey-secondary rounded-full"></div>
                  <span className="text-sm text-foreground">Privacy Impact Assessment</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-honey-secondary rounded-full"></div>
                  <span className="text-sm text-foreground">Responsible Disclosure</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-honey-secondary rounded-full"></div>
                  <span className="text-sm text-foreground">Security Awareness Training</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};