"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Terminal, Command, Keyboard, Code, Zap, Monitor, FileCode, Coffee, File } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export default function CategoriesPage() {
  const { t } = useLanguage()

  const categories = [
    {
      title: t("category.vim"),
      icon: <Terminal className="h-8 w-8" />,
      description: t("category.vim.desc"),
      href: "/categories/vim",
      featured: true,
    },
    {
      title: t("category.vscode"),
      icon: <Command className="h-8 w-8" />,
      description: t("category.vscode.desc"),
      href: "/categories/vscode",
    },
    {
      title: t("category.terminal"),
      icon: <Keyboard className="h-8 w-8" />,
      description: t("category.terminal.desc"),
      href: "/categories/terminal",
    },
    {
      title: t("category.git"),
      icon: <Code className="h-8 w-8" />,
      description: t("category.git.desc"),
      href: "/categories/git",
    },
    {
      title: t("category.bash"),
      icon: <Zap className="h-8 w-8" />,
      description: t("category.bash.desc"),
      href: "/categories/bash",
    },
    {
      title: t("category.windowManagers"),
      icon: <Monitor className="h-8 w-8" />,
      description: t("category.windowManagers.desc"),
      href: "/categories/window-managers",
    },
    {
      title: t("category.c"),
      icon: <FileCode className="h-8 w-8" />,
      description: t("category.c.desc"),
      href: "/categories/c",
      featured: true,
    },
    {
      title: t("category.cpp"),
      icon: <Code className="h-8 w-8" />,
      description: t("category.cpp.desc"),
      href: "/categories/cpp",
      featured: true,
    },
    {
      title: t("category.java"),
      icon: <Coffee className="h-8 w-8" />,
      description: t("category.java.desc"),
      href: "/categories/java",
      featured: true,
    },
    {
      title: t("category.python"),
      icon: <Code className="h-8 w-8" />,
      description: t("category.python.desc"),
      href: "/categories/python",
      featured: true,
    },
    {
      title: t("category.makefiles"),
      icon: <File className="h-8 w-8" />,
      description: t("category.makefiles.desc"),
      href: "/categories/makefiles",
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("categories.title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("categories.subtitle")}</p>
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
                    {t("home.explore")}
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

