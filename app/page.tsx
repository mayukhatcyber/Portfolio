"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Shield, Code, Server, Database, Lock, Cpu, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedText from "@/components/animated-text"
import SectionReveal from "@/components/section-reveal"
import SkillCard from "@/components/skill-card"
import AnimatedGradientBackground from "@/components/animated-gradient-background"
import FloatingIcons from "@/components/floating-icons"

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
      <AnimatedGradientBackground />
      <FloatingIcons />

      {/* Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-zinc-950/90 backdrop-blur-md py-4 shadow-md" : "bg-transparent py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <motion.div
              className="text-xl font-bold text-emerald-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Mayukh Mondal
            </motion.div>
            <div className="hidden md:flex space-x-6">
              {["About", "Skills", "Contact"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-emerald-400 transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <a
                href="https://drive.google.com/file/d/10chiKIYSVNv3uirqhaFUq2Fw78LPkKaS/view"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-zinc-950 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resume
                </Button>
              </a>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20 flex flex-col md:flex-row items-center min-h-screen">
          <div className="md:w-1/2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none">
                Cybersecurity Specialist
              </Badge>
            </motion.div>

            <AnimatedText text="Securing the Digital Future" className="text-4xl md:text-6xl font-bold" />

            <motion.p
              className="text-zinc-400 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              B.Tech Cybersecurity Student at SRMIST passionate about ethical hacking, network security, and building
              secure digital infrastructures.
            </motion.p>

            <motion.div
              className="flex space-x-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300">
                  <Link href="#skills">View Skills</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-zinc-700 transition-all duration-300">
                  <Link href="#contact">Contact Me</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
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
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 10,
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
                <Image
                  src="https://i.ibb.co/RRKkgsF/IMG-1985.jpg"
                  alt="Mayukh Mondal"
                  width={300}
                  height={300}
                  className="rounded-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-zinc-900/80 backdrop-blur-sm py-20 relative">
          <div className="container mx-auto px-4">
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
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-zinc-800 border-zinc-700">
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
                  </motion.div>
                </SectionReveal>

                <SectionReveal delay={0.6}>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-zinc-800 border-zinc-700">
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
                  </motion.div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="container mx-auto px-4">
            <SectionReveal>
              <h2 className="text-3xl font-bold mb-12 text-center">
                Technical <span className="text-emerald-500">Skills</span>
              </h2>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillsData.map((skill, index) => (
                <SkillCard key={index} icon={skill.icon} title={skill.title} skills={skill.skills} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <SectionReveal>
              <h2 className="text-3xl font-bold mb-12 text-center">
                Get In <span className="text-emerald-500">Touch</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <motion.div
                className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-lg border border-zinc-800"
                whileHover={{ boxShadow: "0 0 30px rgba(16, 185, 129, 0.1)" }}
                transition={{ duration: 0.3 }}
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
                          whileHover={{ x: 5 }}
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

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-300">
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </SectionReveal>
          </div>
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
              <motion.a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  {item.icon}
                </Button>
              </motion.a>
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
    </div>
  )
}
