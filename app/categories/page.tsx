"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Terminal, Command, Keyboard, Code, Zap, Monitor, FileCode, Coffee, File, Hash } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CategoriesPage() {
  const categories = [
    {
      title: "Vim",
      icon: <Terminal className="h-8 w-8" />,
      description: "Commandes et raccourcis de l'éditeur de texte",
      href: "/categories/vim",
      featured: true,
    },
    {
      title: "VS Code",
      icon: <Command className="h-8 w-8" />,
      description: "Raccourcis Visual Studio Code",
      href: "/categories/vscode",
    },
    {
      title: "Terminal",
      icon: <Keyboard className="h-8 w-8" />,
      description: "Commandes et utilisation du terminal Linux",
      href: "/categories/terminal",
    },
    {
      title: "Git",
      icon: <Code className="h-8 w-8" />,
      description: "Commandes de contrôle de version",
      href: "/categories/git",
    },
    {
      title: "Bash",
      icon: <Zap className="h-8 w-8" />,
      description: "Scripts et commandes Bash",
      href: "/categories/bash",
    },
    {
      title: "Gestionnaires de Fenêtres",
      icon: <Monitor className="h-8 w-8" />,
      description: "Raccourcis des gestionnaires de fenêtres Linux",
      href: "/categories/window-managers",
    },
    {
      title: "Langage C",
      icon: <FileCode className="h-8 w-8" />,
      description: "Syntaxe, méthodes et bonnes pratiques du C",
      href: "/categories/c",
      featured: true,
    },
    {
      title: "C++",
      icon: <Code className="h-8 w-8" />,
      description: "Syntaxe, méthodes et bonnes pratiques du C++",
      href: "/categories/cpp",
      featured: true,
    },
    {
      title: "Java",
      icon: <Coffee className="h-8 w-8" />,
      description: "Syntaxe, méthodes et bonnes pratiques de Java",
      href: "/categories/java",
      featured: true,
    },
    {
      title: "Python",
      icon: <Code className="h-8 w-8" />,
      description: "Syntaxe, méthodes et bonnes pratiques de Python",
      href: "/categories/python",
      featured: true,
    },
    {
      title: "Makefiles",
      icon: <File className="h-8 w-8" />,
      description: "Syntaxe, templates et bonnes pratiques pour automatiser les builds",
      href: "/categories/makefiles",
      featured: true,
    },
    {
      title: "Assembleur",
      icon: <Code className="h-8 w-8" />,
      description: "Instructions et registres essentiels en assembleur x86/x64",
      href: "/categories/assembly",
      featured: true,
    },
    {
      title: "C#",
      icon: <Hash className="h-8 w-8" />,
      description: "Syntaxe, méthodes et bonnes pratiques du langage C#",
      href: "/categories/csharp",
      featured: true,
    },
  ]

  return (
    <div className="container px-4 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 md:mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Toutes les Catégories</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Parcourez notre collection complète de raccourcis clavier et commandes
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
          >
            <Link href={category.href} className="h-full">
              <Card
                className={`h-full transition-all hover:shadow-lg ${
                  category.featured
                    ? "border-primary/50 dark:border-primary/50"
                    : "hover:border-primary/30 dark:hover:border-primary/30"
                }`}
              >
                <CardHeader>
                  <div className={`mb-2 ${category.featured ? "text-primary" : "text-muted-foreground"}`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center text-sm">
                    Explorer
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
