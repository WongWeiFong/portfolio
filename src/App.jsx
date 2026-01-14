import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Cloud, Briefcase, User, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
              <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-800 border-none font-normal h-5">
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
            <div className="px-6 pb-6 pt-0">
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
  const experiences = [
    {
      role: "Full-Stack Developer (Core Engineer)",
      company: "ByteCronix",
      type: "Full-time",
      period: "Mar 2025 - Present",
      current: true,
      shortDescription: "Brought Co-PR (10+ Docker microservices & Next.js 15) from prototype to GKE staging in four months—powered first live demos and stakeholder feedback loops.",
      achievements: [
        "Owned Auth, Portal-BFF & Core API services; architected Express REST endpoints, ramping test coverage from 55% to 90% and cutting CI feedback cycles by 3x.",
        "Halved staging-to-production rollout times (4 h → 1.5 h) with GitLab CI/CD-driven Docker-to-Kubernetes blue-green deployments.",
        "Engineered NGINX reverse-proxy & load-balancing strategy to sustain 99.9% uptime under 10× peak load scenarios.",
        "Standardised shared controller contracts for Web, iOS & Android clients—reducing cross-platform integration bugs by 45%.",
        "Authored 12+ Confluence runbooks and custom CLI tooling to unblock dev teams, boosting sprint velocity by 20%."
      ],
      techStack: {
        "Frontend": ["Next.js", "TypeScript", "Tailwind CSS"],
        "Backend": ["Node.js", "Express", "MongoDB", "Firebase", "REST APIs"],
        "DevOps": ["Docker", "Kubernetes", "GitLab CI/CD", "Blue-Green Deployments"],
        "Architecture": ["Clean Architecture", "BFF Pattern", "Microservices"],
        "Tools": ["Git", "Swagger", "Postman", "Jira", "Confluence", "Slack"]
      },
      previewTags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"]
    },
    {
      role: "Graduate Full-Stack Developer",
      company: "Expresso Carwash Pty Ltd",
      type: "Part-time",
      period: "Jun 2023 - Oct 2024",
      current: false,
      shortDescription: "Collaborated with stakeholders to translate business needs into 10+ technical epics, each delivered within 1-week sprints.",
      achievements: [
        "Developed and maintained full-stack dashboard features using React and Node.js.",
        "Optimized database queries in PostgreSQL, reducing API response time by 30%.",
        "Implemented secure authentication flows using JWT and OAuth2.",
        "Participated in daily stand-ups and code reviews to ensure code quality and knowledge sharing.",
        "Refactored legacy codebases to improved maintainability and scalability."
      ],
      techStack: {
        "Frontend": ["React", "JavaScript", "Redux Toolkit", "Material UI"],
        "Backend": ["Node.js", "Express", "PostgreSQL", "REST APIs"],
        "Tools": ["Git", "Jira", "Figma", "VS Code"]
      },
      previewTags: ["React", "JavaScript", "Redux Toolkit", "Node.js", "Express", "REST APIs"]
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
      skills: ["Node.js", "Express", "Python", "PostgreSQL", "REST APIs"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6 mb-2 text-purple-400" />,
      skills: ["Git", "Docker", "AWS", "CI/CD", "Linux"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-900/20 to-slate-950"></div>

      {/* Navigation / Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg border-b border-white/10 bg-slate-950/50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">WWF</span>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 flow-root">

        {/* Hero Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center mb-32 pt-10"
        >
          <div className="inline-block p-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            Available for hire
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Building digital <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">experiences that matter.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            I'm Wong Wei Fong, a Frontend Developer specialized in building accessible,
            pixel-perfect, and performance-optimized web applications.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="rounded-full px-8 bg-white text-slate-900 hover:bg-slate-200">
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/10 hover:text-white text-slate-400">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/10 hover:text-white text-slate-400">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-32 grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 blur-3xl opacity-20 -z-10 rounded-full"></div>
            <Card className="bg-slate-900/50 border-white/10 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8">
                <User className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">About Me</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  I am a passionate software engineer with a keen eye for design.
                  Frameworks like React and tools like Tailwind CSS allow me to bring
                  creative ideas to life efficiently. I thrive in collaborative environments
                  and am always eager to tackle new challenges.
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-900/50 border-white/10 p-6">
                <div className="text-3xl font-bold text-white mb-1">2+</div>
                <div className="text-sm text-slate-400">Years of Experience</div>
              </Card>
              <Card className="bg-slate-900/50 border-white/10 p-6">
                <div className="text-3xl font-bold text-white mb-1">10+</div>
                <div className="text-sm text-slate-400">Projects Completed</div>
              </Card>
              <Card className="bg-slate-900/50 border-white/10 p-6 col-span-2">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-slate-400">Commitment to Quality</div>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
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
          className="mb-32"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Technical Skills</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card key={index} className="bg-slate-900/50 border-white/10">
                <CardContent className="p-6 pt-6">
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
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((project) => (
              <Card key={project} className="group bg-slate-900/50 border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"></div>
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-sm border-b border-white/5">
                    project_preview.jpg
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Project Title {project}</h3>
                  <p className="text-slate-400 mb-6 line-clamp-2">
                    A sophisticated web application built to solve real-world problems.
                    Features include real-time data synchronization and advanced analytics.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                      <span className="text-xs text-slate-500">JavaScript</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                      View Source <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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

