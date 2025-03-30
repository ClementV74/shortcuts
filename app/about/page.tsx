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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">À propos de Raccourcis</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Votre référence complète pour les raccourcis clavier et les commandes
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
                Notre Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Raccourcis a été créé pour fournir une référence complète et conviviale des raccourcis clavier et des
                commandes pour diverses applications et plateformes. Notre objectif est d'aider les utilisateurs à
                devenir plus efficaces et productifs en maîtrisant les raccourcis clavier de leurs outils préférés.
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
                Ressources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Nos références de commandes sont compilées à partir de la documentation officielle, des guides
                d'utilisation et des ressources communautaires. Nous nous efforçons de maintenir nos informations
                précises et à jour.
              </p>
              <p className="text-muted-foreground">
                Pour Vim spécifiquement, nous recommandons les ressources suivantes pour approfondir vos connaissances:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>La documentation officielle de Vim (:help dans Vim)</li>
                <li>Vim Adventures - Apprendre Vim en jouant à un jeu</li>
                <li>Practical Vim par Drew Neil</li>
                <li>Vimcasts.org - Screencasts gratuits sur Vim</li>
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
                Contribuer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Raccourcis est un projet open-source. Si vous souhaitez contribuer en ajoutant de nouvelles commandes,
                en corrigeant des erreurs, ou en améliorant le site web, veuillez visiter notre dépôt GitHub. Nous
                accueillons les contributions de la communauté!
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
            Fait avec <Heart className="h-4 w-4 text-red-500" /> pour la communauté des développeurs
          </p>
        </motion.div>
      </div>
    </div>
  )
}

