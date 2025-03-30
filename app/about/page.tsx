"use client"

import { motion } from "framer-motion"
import { Terminal, Book, Github, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 md:mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About Raccourcis</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive reference for keyboard shortcuts and commands
        </p>
      </motion.div>

      <div className="grid gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Raccourcis was created to provide a comprehensive, user-friendly reference for keyboard shortcuts and
                commands across various applications and platforms. Our goal is to help users become more efficient and
                productive by mastering the keyboard shortcuts for their favorite tools.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our command references are compiled from official documentation, user guides, and community resources.
                We strive to keep our information accurate and up-to-date.
              </p>
              <p className="text-muted-foreground">
                For Vim specifically, we recommend the following resources for further learning:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>The official Vim documentation (:help in Vim)</li>
                <li>Vim Adventures - Learn Vim while playing a game</li>
                <li>Practical Vim by Drew Neil</li>
                <li>Vimcasts.org - Free screencasts about Vim</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5 text-primary" />
                Contribute
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Raccourcis is an open-source project. If you'd like to contribute by adding new commands, fixing errors,
                or improving the website, please visit our GitHub repository. We welcome contributions from the
                community!
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <p className="flex items-center justify-center gap-2 text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-red-500" /> for the developer community
          </p>
        </motion.div>
      </div>
    </div>
  )
}

