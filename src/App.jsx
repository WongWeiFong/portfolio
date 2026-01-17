import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Cloud, Briefcase, User, ChevronDown, ChevronUp, PenTool, GraduationCap, Sparkles, ArrowRight, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import project images - Update these paths to your actual project images
import fypImage1 from "./assets/img/Picture1.png";
import fypImage2 from "./assets/img/Picture2.png";
import fypImage3 from "./assets/img/Picture3.png";
import fypImage4 from "./assets/img/Picture4.png";
import fypImage5 from "./assets/img/Picture5.png";
import fypImage6 from "./assets/img/Picture6.png";
import fypImage7 from "./assets/img/Picture7.png";
import fypImage8 from "./assets/img/Picture8.png";
import fypImage9 from "./assets/img/Picture9.png";
import fypImage10 from "./assets/img/Picture10.png";
import fypImage11 from "./assets/img/Picture11.png";
import fypImage12 from "./assets/img/Picture11.png";
import canva1 from "./assets/img/canva1.jpg";
import canva2 from "./assets/img/canva2.jpg";
import canva3 from "./assets/img/canva3.jpg";
import imaginehack1 from "./assets/img/imaginehack1.png";
import imaginehack2 from "./assets/img/imaginehack2.jpeg";
import pythongpt1 from "./assets/img/pythongpt1.jpg";
import pythongpt2 from "./assets/img/pythongpt2.jpg";
import pythongpt3 from "./assets/img/pythongpt3.jpg";
import me from "./assets/img/me.png";
import pfp from "./assets/img/full_body.png";
import resume from "./assets/WONG WEI FONG resume.pdf";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Custom hook for image carousel
const useImageCarousel = (images, interval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return currentIndex;
};

// Image Carousel Component
const ImageCarousel = ({ images, alt, className, overlay = true }) => {
  const currentIndex = useImageCarousel(images, 3000);

  if (!images || images.length === 0) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-sm">
          No images available
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      {overlay && (
        <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors pointer-events-none"></div>
      )}
    </div>
  );
};

const ExperienceCard = ({ experience }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={`bg-slate-900/50 border-white/10 transition-all duration-300 overflow-hidden ${isExpanded ? 'border-blue-500/30 shadow-lg shadow-blue-500/10' : 'hover:border-white/20'}`}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer p-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-white max-w-[800px]">{experience.role}</h3>
              {experience.current && (
                <Badge variant="outline" className="border-green-500/20 text-green-400 bg-green-500/10 h-6">
                  Current Role
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm">
              <span className="text-blue-400 font-medium">@{experience.company}</span>
              <Badge variant="secondary" className="bg-slate-800 text-white hover:bg-slate-800 border-none font-normal h-5">
                {experience.type}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-white/10 text-slate-400 bg-white/5 h-8 px-3 whitespace-nowrap">
              {experience.period}
            </Badge>
            <div className={`text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-slate-400 leading-relaxed mb-4">
          {experience.shortDescription}
        </p>

        {!isExpanded && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
            <span>+{experience.achievements?.length || 0} more achievements</span>
          </div>
        )}

        {/* Preview Tags (Collapsed only) */}
        {!isExpanded && experience.previewTags && (
          <div className="flex flex-wrap gap-2 mt-2">
            {experience.previewTags.map((tag, i) => (
              <div key={i} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-white/5">
                {tag}
              </div>
            ))}
            {experience.previewTags.length < (Object.values(experience.techStack || {}).flat().length) && (
              <div className="px-3 py-1 bg-slate-800/50 rounded-full text-xs text-slate-500 border border-white/5">
                +more
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-white/10 w-full my-6"></div>

              {/* Key Achievements */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Key Achievements</h4>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-3 text-slate-300 leading-relaxed text-sm">
                      <span className="text-blue-400 mt-1.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              {experience.techStack && (
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Technology Stack</h4>
                  <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
                    {Object.entries(experience.techStack).map(([category, skills]) => (
                      <div key={category}>
                        <h5 className="text-xs font-bold text-purple-400 mb-3 uppercase">{category}</h5>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, i) => (
                            <span key={i} className="px-2.5 py-1 bg-slate-800 border border-white/5 rounded-md text-xs text-slate-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default function App() {
  // Handle smooth scrolling with offset for sticky header
  useEffect(() => {
    const handleNavClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerHeight = 80; // scroll-mt-50 = 80px for better spacing
          const targetPosition = targetElement.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  // Handle resume download and open
  const handleResumeDownload = (e) => {
    e.preventDefault();
    
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'WONG WEI FONG RESUME.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Open the resume in a new tab
    window.open(resume, '_blank');
  };

  const experiences = [
    {
      role: "Frontend Developer (Core Engineer)",
      company: "Techbase Solution Sdn. Bhd.",
      type: "Internship",
      period: "Sep 2024 - January 2025",
      current: false,
      shortDescription: "Delivered multiple React-based projects with enhanced UX, payment integrations, and data visualization capabilities—enabling seamless online transactions and improved user experiences across multilingual platforms.",
      achievements: [
        "Developed and maintained multiple production projects using React as the primary frontend framework, ensuring consistent code quality and performance.",
        "Implemented HTML-based printing layouts and multilingual support, improving user experience across diverse user bases.",
        "Integrated BoldPay payment gateway API into checkout flows, enabling secure online transactions and expanding business capabilities.",
        "Built data visualization charts and dashboards to display key statistics, providing actionable insights for stakeholders.",
        "Implemented data fetching and migration pipelines to ensure data integrity, correctly storing and validating missing or inconsistent data in SQL databases."
      ],
      techStack: {
        "Frontend": ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
        "Backend": ["Node.js", "SQL", "REST APIs"],
        "Integration": ["Boldpay Payment Gateway API"],
        // "DevOps": ["Docker", "Kubernetes", "GitLab CI/CD", "Blue-Green Deployments"],
        // "Architecture": ["Clean Architecture", "BFF Pattern", "Microservices"],
        "Tools": ["Git", "Postman", "VS Code", "Mirosoft VS"]
      },
      previewTags: ["React.js", "Node.js", "CSS3", "MySQL", "Payment Gateway API"]
    },
    {
      role: "Software Developer",
      company: "Texchem Resources Sdn. Bhd.",
      type: "Internship",
      period: "July 2023 - Sep 2023",
      current: false,
      shortDescription: "Built and maintained web applications for Sushi King subsidiary, including an internal ordering system—strengthening full-stack development skills through real-world project implementation.",
      achievements: [,
        "Developed and maintained web pages for Sushi King Sdn. Bhd., ensuring consistent branding and functionality across subsidiary company sites",
        "Built an internal ordering system application from scratch using HTML, CSS, PHP, MySQL, and C#, streamlining business operations.",
        "Strengthened practical web development skills through hands-on implementation of real-world projects, delivering production-ready solutions."
      ],
      techStack: {
        "Frontend": ["HTML5", "CSS3"],
        "Backend": ["PHP", "MySQL", "C#"],
        "Tools": ["VS Code", "Mirosoft VS", "AnyDesk"]
      },
      previewTags: ["HTML5", "CSS3", "PHP", "MySQL", "C#"]
    }
  ];

  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code2 className="w-6 h-6 mb-2 text-blue-400" />,
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "TypeScript"]
    },
    {
      title: "Backend",
      icon: <Terminal className="w-6 h-6 mb-2 text-green-400" />,
      skills: ["Node.js", "Express", "Python", "REST APIs"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6 mb-2 text-purple-400" />,
      skills: ["Git", "AWS", "Linux"]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Smart Parking Management System",
      category: "WEB APPLICATION",
      description: "A smart parking management system that allows users to view and manage parking spaces in real-time. It also allows users to view parking spaces in real-time.",
      technologies: ["REACT", "CSS5", "RASPBERRY PI", "IOT", "AWS DYNAMODB", "AWS LAMBDA", "API"],
      livePreview: false,
      images: [fypImage1, fypImage2, fypImage3, fypImage4, fypImage5, fypImage6, fypImage7, fypImage8, fypImage9, fypImage10, fypImage11, fypImage12],
      launchUrl: "",
      githubUrl: "https://github.com/WongWeiFong/smart-carpark-system"
    },
    {
      id: 2,
      title: "Gamer Token Hub (Web3 NFT Marketplace)",
      category: "WEB APPLICATION",
      description: "SpotWave allows you to search for and listen to Spotify songs with a preview and lyrics. You can also view the top tracks and artists in global rank and come with their all details such as bio, followers, and more.",
      technologies: ["SPOTIFY", "NEXTJS", "TAILWIND CSS", "FRAMER MOTION"],
      livePreview: true,
      images: [],
      launchUrl: "https://gamertokenhub.vercel.app/",
      githubUrl: "https://github.com/Aiyern30/blockchain-fe"
    },
    {
      id: 3,
      title: "ImagineHack 2025 (WARISAN DECODE)",
      category: "HACKATHON",
      description: "Warisan Decode is a gamified web experience designed to help users explore and understand Malaysia's rich heritage and cultural landmarks through interactive storytelling and puzzles.",
      technologies: ["HTML5", "CSS3", "JAVASCRIPT", "PHP", "MYSQL", "GIT"],
      livePreview: false,
      images: [imaginehack1, imaginehack2],
      launchUrl: "",
      githubUrl: "https://github.com/YongXin315/warisan_decode"
    },
    {
      id: 4,
      title: "Canva Hackathon (Poll Generator)",
      category: "HACKATHON",
      description: "Poll Generator is a Canva-integrated platform that simplifies poll and survey creation while providing real-time data visualization. Users can design visually appealing surveys, distribute them via QR codes or a dedicated website, and instantly see response trends. Multiple polls can be included in a single survey for comprehensive data collection.",
      technologies: ["REACT", "NEXT.JS", "CANVA APP SDK", "QUICKCHART API", "QRCODE API", "POLL API", "AMAZON AWS", "VERCEL", "TAIWIND CSS", "TYPESCRIPT", "MAGIC UI", "SHADCN UI", "MATERIAL UI"],
      livePreview: false,
      images: [canva1, canva2, canva3],
      launchUrl: "https://devpost.com/software/canva-dx620n",
      githubUrl: "https://github.com/Aiyern30/Canva-Hackathon"
    },
    {
      id: 5,
      title: "Google Cloud Vertex AI Agent Builder Hackathon (PythonGPT)",
      category: "HACKATHON",
      description: "PythonGPT is a dynamic website designed to teach beginners how to code in Python. It offers Python documentation, Python code implementation examples, Python exercises, AI Chatbot Assistance",
      technologies: ["HTML", "CSS", "JAVASCRIPT", "PYTHON", "FLASK", "EC2", "GOOGLE CLOUD SDK", "GOOGLE CLOUD IAM SERVICE ACCOUNT", "VERTEX AI API", "GEMINI-1.0-PRO-VERSION-001 MODEL", "BOOTSTRAP", "TAILWIND CSS"],
      livePreview: false,
      images: [pythongpt1, pythongpt2, pythongpt3],
      launchUrl: "https://devpost.com/software/pythongpt",
      githubUrl: "https://github.com/AcruxN/vertex_PythonGPT/"
    }
  ];

  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeTab, setActiveTab] = useState("developer");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-900/30 to-slate-950"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-1/3 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        {/* Meteor Streaks */}
        <div className="absolute top-0 left-1/3 w-px h-96 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent transform rotate-12"></div>
        <div className="absolute top-20 right-1/4 w-px h-64 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent transform -rotate-12"></div>
      </div>

      {/* Navigation / Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-lg border-b border-white/10 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">WWF</span>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400 items-center">
            <a href="" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#connect" className="hover:text-white transition-colors">Connect</a>
            <button 
              onClick={handleResumeDownload}
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-slate-900 font-bold text-sm hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 flow-root">

        {/* Hero Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="mb-32 pt-10 min-h-[80vh] flex items-center"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column - Profile */}
            <div className="flex flex-col items-center md:items-start">
              {/* Profile Picture */}
              {/* <div className="relative mb-6">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-500/20 to-orange-500/20 p-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-2 border-purple-500/30">
                    <User className="w-16 h-16 md:w-20 md:h-20 text-purple-400" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-orange-500/30 blur-xl -z-10 animate-pulse"></div>
              </div> */}

              {/* Available Badge */}
              <div className="inline-block p-1 px-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                Available for Hire
              </div>

              {/* Greeting */}
              <p className="text-white text-lg mb-2">Hello, I'm</p>

              {/* Name */}
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="text-white">Wong</span>{" "}
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Wei Fong</span>
              </h1>

              {/* Tagline 1*/}
              <h2 className="text-slate-100 text-gray-400 max-w-md leading-relaxed">
                Computer Science Student.
              </h2>

              {/* Tagline 2*/}
              <p className="text-slate-300 text-lg mb-8 max-w-md leading-relaxed">
                Crafting exceptional digital experiences where design meets flawless implementation.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3 mb-8">
                <a 
                  href="https://www.linkedin.com/in/weifongwong" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-white hover:bg-purple-500/30 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/WongWeiFong" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-white hover:bg-purple-500/30 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:weifong041623@gmail.com" 
                  className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-white hover:bg-purple-500/30 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              {/* Scroll Indicator */}
              <div className="flex flex-col items-center gap-2 text-slate-500 text-sm">
                <span>SCROLL</span>
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </div>
            </div>

            {/* Right Column - About Card */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/30 shadow-2xl shadow-purple-500/10 hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-8">
                  {/* Tabs */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setActiveTab("developer")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                        activeTab === "developer"
                          ? "bg-purple-500/30 text-white border border-purple-500/50"
                          : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800"
                      }`}
                    >
                      <Code2 className="w-4 h-4" />
                      Developer
                    </button>
                    {/* <button
                      onClick={() => setActiveTab("designer")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                        activeTab === "designer"
                          ? "bg-purple-500/30 text-white border border-purple-500/50"
                          : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800"
                      }`}
                    >
                      <PenTool className="w-4 h-4" />
                      Designer
                    </button> */}
                    <button
                      onClick={() => setActiveTab("student")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                        activeTab === "student"
                          ? "bg-purple-500/30 text-white border border-purple-500/50"
                          : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800"
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      Student
                    </button>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      {activeTab === "developer" && "Frontend Developer"}
                      {/* {activeTab === "designer" && "UI/UX Designer"} */}
                      {activeTab === "student" && "Computer Science Student"}
                    </h2>

                    {activeTab === "developer" && (
                      <div className="space-y-4 text-slate-300 leading-relaxed">
                        <p>
                          With <strong className="text-white">1+ years</strong> of software development experience, I've honed my skills in various technologies. I believe in the importance of both functionality and design.
                        </p>
                        <p>
                          I strive to create solutions that are as visually appealing as they are effective, focusing on user experience and performance.
                        </p>
                      </div>
                    )}

                    {/* {activeTab === "designer" && (
                      <div className="space-y-4 text-slate-300 leading-relaxed">
                        <p>
                          I have a passion for creating beautiful and intuitive user interfaces. Design is not just about aesthetics—it's about solving problems and creating meaningful experiences.
                        </p>
                        <p>
                          I combine modern design principles with user-centered thinking to deliver interfaces that users love to interact with.
                        </p>
                      </div>
                    )} */}

                    {activeTab === "student" && (
                      <div className="space-y-4 text-slate-300 leading-relaxed">
                        <p>
                          Currently pursuing my studies in Computer Science, I'm constantly learning and exploring new technologies and methodologies.
                        </p>
                        <p>
                          My academic journey has provided me with a strong foundation in software engineering principles and problem-solving skills.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Learn More Link */}
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    Learn more about my journey
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-32 scroll-mt-50"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">About Me</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Description */}
            <div className="space-y-8">
              {/* About Me Text */}
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  I'm a passionate Frontend Developer with expertise in building scalable web applications and user-friendly interfaces. With a strong foundation in modern technologies and a keen eye for user experience, I create digital experiences that make a difference.
                </p>
                <p>
                  Currently pursuing my degree in Computer Science at Asia Pacific University of Technology and Innovation, I combine academic knowledge with practical experience to deliver innovative solutions. I'm always eager to learn new technologies and tackle challenging problems.
                </p>
              </div>

              {/* Education Section */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Education</h3>
                <div className="space-y-4">
                  {/* Education Card 1 */}
                  <Card className="bg-slate-900/50 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-white mb-1">Asia Pacific University of Technology and Innovation</h4>
                          <p className="text-slate-400">Bachelor's Degree in Computer Science</p>
                        </div>
                        <span className="text-slate-500 text-sm whitespace-nowrap ml-4">2023-2025</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Education Card 2 */}
                  <Card className="bg-slate-900/50 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-white mb-1">Asia Pacific University of Technology and Innovation</h4>
                          <p className="text-slate-400">Diploma in Software Engineering</p>
                        </div>
                        <span className="text-slate-500 text-sm whitespace-nowrap ml-4">2021-2023</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="relative flex justify-center">
              {/* Decorative Gradient Frame */}
              <div className="relative">
                {/* Outer gradient frame (organic shape) */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-sm opacity-60"></div>
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-2xl"></div>
                
                {/* White rounded rectangle for image */}
                <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                  {/* Profile Picture Placeholder - Replace with your image */}
                  <div className="w-full h-auto rounded-xl bg-slate-200 overflow-hidden aspect-[3/4] max-w-sm">
                    {/* <img src={me} alt="Profile" className="w-full h-full object-cover rounded-xl" /> */}
                    <img src={pfp} alt="Profile" className="w-full h-full object-cover rounded-xl" />
                  {/* Replace the div above with: <img src={yourImage} alt="Profile" className="w-full h-full object-cover rounded-xl" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 scroll-mt-50"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Work Experience</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} />
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 scroll-mt-50"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Technical Skills</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card key={index} className="bg-slate-900/50 border-white/10">
                <CardContent className="p-6">
                  {category.icon}
                  <h3 className="text-lg font-semibold text-white mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 hover:bg-white/10 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 scroll-mt-50"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          {/* Featured Project (First Project) */}
          {projects.length > 0 && (
            <Card className="group bg-slate-900/50 border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300 mb-8">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="h-[429px] w-full relative overflow-hidden border-r border-white/5">
                  {projects[0].images && projects[0].images.length > 0 ? (
                    <ImageCarousel 
                      images={projects[0].images} 
                      alt={projects[0].title}
                      className="h-full w-full"
                    />
                  ) : projects[0].launchUrl ? (
                    <div className="w-full h-full overflow-hidden relative">
                      <iframe
                        src={projects[0].launchUrl}
                        title={`${projects[0].title} preview`}
                        className="border-0 pointer-events-none"
                        style={{
                          width: '1920px',
                          height: '1080px',
                          transform: 'scale(0.333)',
                          transformOrigin: 'top left',
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-600 text-sm">
                      No preview available
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      FEATURED PROJECT
                    </Badge>
                  </div>
                  {projects[0].livePreview && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        LIVE PREVIEW
                      </Badge>
                    </div>
                  )}
                </div>
                {/* Content Section */}
                <CardContent className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {projects[0].title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {projects[0].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[0].technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-slate-800 border border-white/5 rounded-md text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {projects[0].launchUrl && (
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white hover:bg-white/10"
                        onClick={() => window.open(projects[0].launchUrl, '_blank')}
                      >
                        Launch Page <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {projects[0].githubUrl && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto text-slate-300 hover:text-white hover:bg-white/10"
                        onClick={() => window.open(projects[0].githubUrl, '_blank')}
                        title="View on GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Regular Projects Grid (Next 2 Projects) */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {projects.slice(1, 3).map((project) => (
              <Card key={project.id} className="group bg-slate-900/50 border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <div className="h-48 w-full relative overflow-hidden border-b border-white/5">
                  {project.images && project.images.length > 0 ? (
                    <ImageCarousel 
                      images={project.images} 
                      alt={project.title}
                      className="h-full w-full"
                    />
                  ) : project.launchUrl ? (
                    <div className="w-full h-full overflow-hidden relative">
                      <iframe
                        src={project.launchUrl}
                        title={`${project.title} preview`}
                        className="border-0 pointer-events-none"
                        style={{
                          width: '1920px',
                          height: '1080px',
                          transform: 'scale(0.333)',
                          transformOrigin: 'top left',
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-600 text-sm">
                      No preview available
                    </div>
                  )}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge variant="outline" className="border-white/10 text-slate-400 bg-white/5 text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  {project.livePreview && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        LIVE PREVIEW
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-800 border border-white/5 rounded text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 bg-slate-800/50 border border-white/5 rounded text-xs text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.launchUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-300 hover:text-white hover:bg-white/10"
                        onClick={() => window.open(project.launchUrl, '_blank')}
                      >
                        Launch Page <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="ml-auto text-slate-300 hover:text-white hover:bg-white/10"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        title="View on GitHub"
                      >
                        <Github className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Projects (Shown when "Show more" is clicked) */}
          <AnimatePresence>
            {showAllProjects && projects.length > 3 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {projects.slice(3).map((project) => (
                    <Card key={project.id} className="group bg-slate-900/50 border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                      <div className="h-48 w-full relative overflow-hidden border-b border-white/5">
                        {project.images && project.images.length > 0 ? (
                          <ImageCarousel 
                            images={project.images} 
                            alt={project.title}
                            className="h-full w-full"
                          />
                        ) : project.launchUrl ? (
                          <div className="w-full h-full overflow-hidden relative">
                            <iframe
                              src={project.launchUrl}
                              title={`${project.title} preview`}
                              className="border-0 pointer-events-none"
                              style={{
                                width: '1920px',
                                height: '1080px',
                                transform: 'scale(0.333)',
                                transformOrigin: 'top left',
                                position: 'absolute',
                                top: 0,
                                left: 0
                              }}
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-600 text-sm">
                            No preview available
                          </div>
                        )}
                        <div className="absolute top-3 left-3 z-10">
                          <Badge variant="outline" className="border-white/10 text-slate-400 bg-white/5 text-xs">
                            {project.category}
                          </Badge>
                        </div>
                        {project.livePreview && (
                          <div className="absolute top-3 right-3 z-10">
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              LIVE PREVIEW
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-slate-800 border border-white/5 rounded text-xs text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-0.5 bg-slate-800/50 border border-white/5 rounded text-xs text-slate-500">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {project.launchUrl && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-slate-300 hover:text-white hover:bg-white/10"
                              onClick={() => window.open(project.launchUrl, '_blank')}
                            >
                              Launch Page <ExternalLink className="ml-2 h-3 w-3" />
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="ml-auto text-slate-300 hover:text-white hover:bg-white/10"
                              onClick={() => window.open(project.githubUrl, '_blank')}
                              title="View on GitHub"
                            >
                              <Github className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More/Less Button */}
          {projects.length > 3 && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/10 hover:text-white text-slate-400"
                onClick={() => setShowAllProjects(!showAllProjects)}
              >
                {showAllProjects ? "Show Less Projects" : "Show More Projects"}
                {showAllProjects ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </motion.section>

        {/* Connect Section */}
        <motion.section
          id="connect"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 scroll-mt-50"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Let's Connect</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="text-center">
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                className="rounded-full px-8 bg-white text-slate-900 hover:bg-slate-200"
                onClick={() => window.location.href = 'mailto:weifong041623@gmail.com'}
              >
                <Mail className="mr-2 h-4 w-4" /> Contact Me
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-white/10 hover:bg-white/10 hover:text-white text-slate-400"
                  onClick={() => window.open('https://github.com/WongWeiFong', '_blank', 'noopener,noreferrer')}
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-white/10 hover:bg-white/10 hover:text-white text-slate-400"
                  onClick={() => window.open('https://www.linkedin.com/in/weifongwong', '_blank', 'noopener,noreferrer')}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 bg-slate-950">
        <p>© {new Date().getFullYear()} Wong Wei Fong. Crafted with React & Tailwind.</p>
      </footer>
    </div>
  );
}

