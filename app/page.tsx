"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Shield,
  Code,
  Server,
  Database,
  Lock,
  Cpu,
  Github,
  Linkedin,
  Mail,
  ChevronUp,
  Globe,
  Zap,
  Terminal,
  Network,
  FileCode,
  Braces,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SectionReveal from "@/components/section-reveal"
import ParticleBackground from "@/components/particle-background"
import TypingEffect from "@/components/typing-effect"
import ParallaxSection from "@/components/parallax-section"
import GlitchText from "@/components/glitch-text"
import ThreeDCard from "@/components/3d-card"
import ScrollProgress from "@/components/scroll-progress"
import MagneticButton from "@/components/magnetic-button"
import SkillProgressGrid from "@/components/skill-progress-grid"

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorHidden, setCursorHidden] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

  // Parallax references
  const { scrollYProgress } = useScroll()
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  // Skill data with percentages
  const skillCategories = [
    {
      category: "Technical",
      skills: [
        { name: "Penetration Testing", percentage: 85, icon: <Shield className="h-6 w-6" /> },
        { name: "Network Security", percentage: 90, icon: <Network className="h-6 w-6" /> },
        { name: "Cryptography", percentage: 75, icon: <Lock className="h-6 w-6" /> },
        { name: "Digital Forensics", percentage: 80, icon: <Database className="h-6 w-6" /> },
      ],
    },
    {
      category: "Programming",
      skills: [
        { name: "Python", percentage: 92, icon: <FileCode className="h-6 w-6" /> },
        { name: "Bash Scripting", percentage: 85, icon: <Terminal className="h-6 w-6" /> },
        { name: "C/C++", percentage: 70, icon: <Code className="h-6 w-6" /> },
        { name: "JavaScript", percentage: 65, icon: <Braces className="h-6 w-6" /> },
      ],
    },
    {
      category: "Tools",
      skills: [
        { name: "Kali Linux", percentage: 95, icon: <Terminal className="h-6 w-6" /> },
        { name: "Wireshark", percentage: 88, icon: <Zap className="h-6 w-6" /> },
        { name: "Metasploit", percentage: 82, icon: <Server className="h-6 w-6" /> },
        { name: "Burp Suite", percentage: 78, icon: <Globe className="h-6 w-6" /> },
      ],
    },
  ]

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = ["home", "about", "skills", "contact"]
      const scrollPosition = window.scrollY + 300

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Custom cursor
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      setCursorHidden(false)
    }

    const handleMouseLeave = () => {
      setCursorHidden(true)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const skillsData = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Design & Analysis of Algorithms",
      skills: ["Dynamic Programming", "Divide & Conquer", "Hashing", "Graph Traversal"],
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "DBMS",
      skills: ["MySQL", "Normalization", "Recovery Mechanism", "Concurrency Control"],
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Information Security",
      skills: ["Firewall Configuration", "IDS/IPS Systems", "VPN Setup", "Network Monitoring"],
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Digital Forensics",
      skills: ["Incident Response", "Evidence Collection", "Malware Analysis", "Log Analysis"],
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Cryptography",
      skills: ["Encryption Algorithms", "Key Management", "Secure Communications", "Blockchain Security"],
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Tools & Technologies",
      skills: ["Kali Linux, Metasploit", "Wireshark, Ubuntu", "Nmap, OWASP ZAP", "Python, Bash Scripting"],
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Custom cursor */}
      <AnimatePresence>
        {!cursorHidden && (
          <motion.div
            className="fixed w-8 h-8 rounded-full border-2 border-emerald-500 pointer-events-none z-50 mix-blend-difference"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: "-50%",
              y: "-50%",
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Background */}
      <ParticleBackground />
      <ScrollProgress />

      {/* Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-zinc-950/90 backdrop-blur-md py-4 shadow-md" : "bg-transparent py-6"
        }`}
        style={{ y: headerY }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <motion.div
              className="text-xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlitchText
                text="Mayukh Mondal"
                className="text-emerald-500"
                glitchIntensity={2}
                glitchProbability={0.01}
              />
            </motion.div>

            <div className="hidden md:flex space-x-6">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Contact", href: "#contact" },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`hover:text-emerald-400 transition-colors relative group ${
                      activeSection === item.name.toLowerCase() ? "text-emerald-500" : ""
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all duration-300 ${
                        activeSection === item.name.toLowerCase() ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <MagneticButton strength={40}>
                <a
                  href="https://drive.google.com/file/d/10chiKIYSVNv3uirqhaFUq2Fw78LPkKaS/view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-zinc-950 transition-all duration-300"
                  >
                    Resume
                  </Button>
                </a>
              </MagneticButton>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          ref={heroRef}
          className="relative container mx-auto px-4 pt-32 pb-20 flex flex-col md:flex-row items-center min-h-screen"
        >
          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="w-full">
            <div className="md:w-1/2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none">
                  <motion.span
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(16, 185, 129, 0)",
                        "0 0 20px rgba(16, 185, 129, 0.5)",
                        "0 0 0px rgba(16, 185, 129, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Cybersecurity Specialist
                  </motion.span>
                </Badge>
              </motion.div>

              <div className="text-4xl md:text-6xl font-bold">
                <TypingEffect text="Securing the" typingSpeed={70} delayStart={500} className="block" />
                <div className="h-2"></div>
                <TypingEffect
                  text="Digital Future"
                  typingSpeed={70}
                  delayStart={1500}
                  className="text-emerald-500 block"
                />
              </div>

              <motion.p
                className="text-zinc-400 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              >
                B.Tech Cybersecurity Student at SRMIST passionate about ethical hacking, network security, and building
                secure digital infrastructures.
              </motion.p>

              <motion.div
                className="flex space-x-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.8 }}
              >
                <MagneticButton strength={50}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 relative overflow-hidden group">
                    <span className="relative z-10">
                      <Link href="#skills">View Skills</Link>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </MagneticButton>

                <MagneticButton strength={50}>
                  <Button
                    variant="outline"
                    className="border-zinc-700 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      <Link href="#contact">Contact Me</Link>
                    </span>
                    <span className="absolute inset-0 bg-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </MagneticButton>
              </motion.div>
            </div>

            <div className="md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2 mt-16 md:mt-0 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative w-64 h-64 md:w-80 md:h-80"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(16, 185, 129, 0.3)",
                      "0 0 40px rgba(16, 185, 129, 0.5)",
                      "0 0 20px rgba(16, 185, 129, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute inset-1 bg-zinc-950 rounded-full flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="w-full h-full"
                  >
                    <Image
                      src="https://i.ibb.co/RRKkgsF/IMG-1985.jpg"
                      alt="Mayukh Mondal"
                      width={300}
                      height={300}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </motion.div>
                </motion.div>

                {/* Orbiting elements */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"
                    animate={{
                      x: [0, Math.cos((i * (Math.PI * 2)) / 3) * 150, 0],
                      y: [0, Math.sin((i * (Math.PI * 2)) / 3) * 150, 0],
                      opacity: [0.2, 1, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 10,
                      delay: i * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      {i === 0 && <Shield className="h-4 w-4 text-emerald-500" />}
                      {i === 1 && <Lock className="h-4 w-4 text-emerald-500" />}
                      {i === 2 && <Code className="h-4 w-4 text-emerald-500" />}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-500 mb-2">Scroll Down</span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19M12 19L6 13M12 19L18 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-500"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-zinc-900/80 backdrop-blur-sm py-20 relative">
          <ParallaxSection className="container mx-auto px-4" baseVelocity={0.1}>
            <SectionReveal>
              <h2 className="text-3xl font-bold mb-12 text-center">
                About <span className="text-emerald-500">Me</span>
              </h2>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-10">
              <SectionReveal delay={0.2}>
                <h3 className="text-2xl font-semibold">My Background</h3>
                <motion.div
                  className="mt-6 space-y-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <p className="text-zinc-400">
                    I'm Mayukh Mondal, a dedicated B.Tech Cybersecurity student at SRM Institute of Science and
                    Technology (SRMIST). My journey in cybersecurity began with a fascination for how systems work and
                    how they can be protected from malicious actors.
                  </p>
                  <p className="text-zinc-400">
                    Throughout my academic career, I've focused on developing practical skills in penetration testing,
                    vulnerability assessment, and secure coding practices. I believe in a proactive approach to security
                    and am passionate about staying ahead of emerging threats.
                  </p>
                </motion.div>
              </SectionReveal>

              <div className="space-y-6">
                <SectionReveal delay={0.4}>
                  <h3 className="text-2xl font-semibold">Education</h3>
                </SectionReveal>

                <SectionReveal delay={0.5}>
                  <ThreeDCard className="bg-zinc-800 border-zinc-700 rounded-lg overflow-hidden">
                    <Card className="bg-transparent border-0">
                      <CardHeader>
                        <CardTitle>B.Tech in Cybersecurity</CardTitle>
                        <CardDescription>SRM Institute of Science and Technology (SRMIST)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-zinc-400">
                          Specialized coursework in network security, cryptography, ethical hacking, digital forensics,
                          and secure software development.
                        </p>
                      </CardContent>
                      <CardFooter className="text-zinc-500">2023 - 2027 (Expected)</CardFooter>
                    </Card>
                  </ThreeDCard>
                </SectionReveal>

                <SectionReveal delay={0.6}>
                  <ThreeDCard className="bg-zinc-800 border-zinc-700 rounded-lg overflow-hidden">
                    <Card className="bg-transparent border-0">
                      <CardHeader>
                        <CardTitle>Certifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Badge variant="outline" className="mr-2">
                            Google Analytics Certification
                          </Badge>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          <Badge variant="outline">Cisco Certified Cybersecurity Associate (In Progress)</Badge>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </ThreeDCard>
                </SectionReveal>
              </div>
            </div>
          </ParallaxSection>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="container mx-auto px-4">
            <SectionReveal>
              <h2 className="text-3xl font-bold mb-12 text-center">
                Technical <span className="text-emerald-500">Skills</span>
              </h2>
            </SectionReveal>

            {/* Circular Progress Indicators */}
            <SectionReveal delay={0.2}>
              <SkillProgressGrid skillCategories={skillCategories} />
            </SectionReveal>

            {/* Original Skills Cards */}
            <SectionReveal delay={0.4}>
              <h3 className="text-2xl font-semibold mt-16 mb-8 text-center md:text-left">
                <span className="text-emerald-500">Specialized</span> Knowledge Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillsData.map((skill, index) => (
                  <ThreeDCard
                    key={index}
                    className="bg-zinc-900 border-zinc-800 rounded-lg h-full"
                    glareIntensity={0.3}
                  >
                    <Card className="bg-transparent border-0 h-full">
                      <CardHeader className="flex flex-row items-center space-x-4">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                          viewport={{ once: true }}
                          className="text-emerald-500"
                          whileHover={{ rotate: 360 }}
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(16, 185, 129, 0)",
                              "0 0 10px rgba(16, 185, 129, 0.5)",
                              "0 0 0px rgba(16, 185, 129, 0)",
                            ],
                          }}
                          transition={{
                            boxShadow: {
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                            },
                            rotate: { duration: 0.6 },
                          }}
                        >
                          {skill.icon}
                        </motion.div>
                        <div>
                          <CardTitle>{skill.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-zinc-400">
                          {skill.skills.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                              viewport={{ once: true }}
                              whileHover={{ x: 5 }}
                            >
                              • {item}
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </ThreeDCard>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <ParallaxSection className="container mx-auto px-4" baseVelocity={0.1} direction="down">
            <SectionReveal>
              <h2 className="text-3xl font-bold mb-12 text-center">
                Get In <span className="text-emerald-500">Touch</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <ThreeDCard
                className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-lg border border-zinc-800"
                glareIntensity={0.2}
                tiltDegree={5}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Contact Information</h3>
                    <div className="space-y-4">
                      {[
                        { icon: <Mail className="h-5 w-5 text-emerald-500" />, text: "mayukhmondal564@gmail.com" },
                        {
                          icon: <Linkedin className="h-5 w-5 text-emerald-500" />,
                          text: "www.linkedin.com/in/mayukh-mondal-cyber",
                        },
                        { icon: <Github className="h-5 w-5 text-emerald-500" />, text: "github.com/mayukhatcyber" },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5, color: "#10b981" }}
                        >
                          {item.icon}
                          <span className="text-zinc-300">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      className="pt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-zinc-400">
                        I'm currently looking for internship opportunities in cybersecurity. Feel free to reach out if
                        you have any questions or would like to collaborate!
                      </p>
                    </motion.div>
                  </div>
                  <div>
                    <form className="space-y-4">
                      {[
                        { id: "name", label: "Name", type: "text" },
                        { id: "email", label: "Email", type: "email" },
                      ].map((field, index) => (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <label htmlFor={field.id} className="block text-sm font-medium text-zinc-400 mb-1">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            id={field.id}
                            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                          />
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                        ></textarea>
                      </motion.div>

                      <MagneticButton strength={50} className="w-full">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 relative overflow-hidden group">
                          <span className="relative z-10">Send Message</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Button>
                      </MagneticButton>
                    </form>
                  </div>
                </div>
              </ThreeDCard>
            </SectionReveal>
          </ParallaxSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 py-8 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="flex justify-center space-x-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { icon: <Github className="h-5 w-5" />, url: "https://github.com/mayukhatcyber" },
              { icon: <Linkedin className="h-5 w-5" />, url: "https://www.linkedin.com/in/mayukh-mondal-cyber" },
              { icon: <Mail className="h-5 w-5" />, url: "mailto:mayukhmondal564@gmail.com" },
            ].map((item, index) => (
              <MagneticButton
                key={index}
                strength={70}
                as="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  {item.icon}
                </Button>
              </MagneticButton>
            ))}
          </motion.div>
          <motion.p
            className="text-zinc-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Mayukh Mondal. All rights reserved.
          </motion.p>
        </div>
      </footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center z-40 shadow-lg"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
