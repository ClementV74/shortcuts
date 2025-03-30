"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Terminal, Coffee, FileCode, FileText, Cpu, Braces } from "lucide-react"

export default function Home() {
  const categories = [
    {
      title: "Vim",
      description: "Commandes et raccourcis essentiels pour l'éditeur Vim",
      icon: <Code className="h-12 w-12 text-primary" />,
      href: "/categories/vim",
      color: "from-purple-500 to-indigo-500",
      delay: 0.1,
    },
    {
      title: "Terminal",
      description: "Commandes Linux essentielles pour le terminal",
      icon: <Terminal className="h-12 w-12 text-primary" />,
      href: "/categories/terminal",
      color: "from-blue-500 to-cyan-500",
      delay: 0.2,
    },
    {
      title: "C",
      description: "Syntaxe et fonctions essentielles du langage C",
      icon: <FileCode className="h-12 w-12 text-primary" />,
      href: "/categories/c",
      color: "from-indigo-500 to-purple-500",
      delay: 0.3,
    },
    {
      title: "C++",
      description: "Syntaxe et méthodes essentielles du C++",
      icon: <Cpu className="h-12 w-12 text-primary" />,
      href: "/categories/cpp",
      color: "from-blue-600 to-indigo-600",
      delay: 0.4,
    },
    {
      title: "Java",
      description: "Syntaxe et méthodes essentielles de Java",
      icon: <Coffee className="h-12 w-12 text-primary" />,
      href: "/categories/java",
      color: "from-red-500 to-orange-500",
      delay: 0.5,
    },
    {
      title: "Python",
      description: "Syntaxe et méthodes essentielles de Python",
      icon: <Braces className="h-12 w-12 text-primary" />,
      href: "/categories/python",
      color: "from-blue-500 to-green-500",
      delay: 0.6,
    },
    {
      title: "Makefiles",
      description: "Syntaxe et templates essentiels pour les Makefiles",
      icon: <FileText className="h-12 w-12 text-primary" />,
      href: "/categories/makefiles",
      color: "from-gray-600 to-gray-800",
      delay: 0.7,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block mb-4"
        >
          <div className="p-3 rounded-full bg-primary/10 animate-pulse-slow">
            <Code className="h-16 w-16 text-primary" />
          </div>
        </motion.div>
        <motion.h1
          className="text-5xl md:text-6xl font-bold tracking-tight mb-6 gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Raccourcis
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Votre référence essentielle pour la programmation et les commandes
        </motion.p>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            className="h-full"
          >
            <Link href={category.href} className="h-full block">
              <Card className="h-full overflow-hidden border-2 border-muted hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
                ></div>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 animate-pulse-slow">{category.icon}</div>
                    <CardTitle className="text-2xl">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-primary hover:underline">Explorer →</div>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

