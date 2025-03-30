"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Define the command type
type VimCommand = {
  command: string
  description: string
  mode: "normal" | "insert" | "visual" | "command" | "multiple"
  category: string
}

export default function VimCommandsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Vim commands organized by category
  const vimCommands: VimCommand[] = [
    // Movement commands
    { command: "h", description: "Déplacer le curseur vers la gauche", mode: "normal", category: "movement" },
    { command: "j", description: "Déplacer le curseur vers le bas", mode: "normal", category: "movement" },
    { command: "k", description: "Déplacer le curseur vers le haut", mode: "normal", category: "movement" },
    { command: "l", description: "Déplacer le curseur vers la droite", mode: "normal", category: "movement" },
    { command: "w", description: "Aller au début du mot suivant", mode: "normal", category: "movement" },
    { command: "b", description: "Aller au début du mot précédent", mode: "normal", category: "movement" },
    { command: "e", description: "Aller à la fin du mot", mode: "normal", category: "movement" },
    { command: "0", description: "Aller au début de la ligne", mode: "normal", category: "movement" },
    { command: "$", description: "Aller à la fin de la ligne", mode: "normal", category: "movement" },
    { command: "gg", description: "Aller à la première ligne du document", mode: "normal", category: "movement" },
    { command: "G", description: "Aller à la dernière ligne du document", mode: "normal", category: "movement" },
    { command: "{number}G", description: "Aller à la ligne {number}", mode: "normal", category: "movement" },

    // Editing commands
    { command: "i", description: "Mode insertion au curseur", mode: "normal", category: "editing" },
    { command: "I", description: "Insérer au début de la ligne", mode: "normal", category: "editing" },
    { command: "a", description: "Ajouter après le curseur", mode: "normal", category: "editing" },
    { command: "A", description: "Ajouter à la fin de la ligne", mode: "normal", category: "editing" },
    {
      command: "o",
      description: "Ouvrir une nouvelle ligne en dessous du curseur",
      mode: "normal",
      category: "editing",
    },
    {
      command: "O",
      description: "Ouvrir une nouvelle ligne au-dessus du curseur",
      mode: "normal",
      category: "editing",
    },
    { command: "x", description: "Supprimer le caractère sous le curseur", mode: "normal", category: "editing" },
    { command: "dd", description: "Supprimer la ligne actuelle", mode: "normal", category: "editing" },
    { command: "dw", description: "Supprimer du curseur à la fin du mot", mode: "normal", category: "editing" },
    { command: "d$", description: "Supprimer du curseur à la fin de la ligne", mode: "normal", category: "editing" },
    { command: "yy", description: "Copier la ligne actuelle", mode: "normal", category: "editing" },
    { command: "p", description: "Coller après le curseur", mode: "normal", category: "editing" },
    { command: "P", description: "Coller avant le curseur", mode: "normal", category: "editing" },
    { command: "r", description: "Remplacer un seul caractère", mode: "normal", category: "editing" },
    { command: "cc", description: "Changer (remplacer) toute la ligne", mode: "normal", category: "editing" },
    { command: "cw", description: "Changer (remplacer) jusqu'à la fin du mot", mode: "normal", category: "editing" },
    {
      command: "c$",
      description: "Changer (remplacer) jusqu'à la fin de la ligne",
      mode: "normal",
      category: "editing",
    },
    { command: "u", description: "Annuler", mode: "normal", category: "editing" },
    { command: "Ctrl+r", description: "Refaire", mode: "normal", category: "editing" },

    // Visual mode commands
    { command: "v", description: "Démarrer le mode visuel (par caractère)", mode: "normal", category: "visual" },
    { command: "V", description: "Démarrer le mode visuel (par ligne)", mode: "normal", category: "visual" },
    { command: "Ctrl+v", description: "Démarrer le mode visuel par bloc", mode: "normal", category: "visual" },
    { command: "y", description: "Copier le texte sélectionné", mode: "visual", category: "visual" },
    { command: "d", description: "Supprimer le texte sélectionné", mode: "visual", category: "visual" },
    { command: "c", description: "Changer (remplacer) le texte sélectionné", mode: "visual", category: "visual" },
    { command: ">", description: "Indenter le texte sélectionné", mode: "visual", category: "visual" },
    { command: "<", description: "Désindenter le texte sélectionné", mode: "visual", category: "visual" },

    // Search and replace
    { command: "/pattern", description: "Rechercher en avant pour un motif", mode: "normal", category: "search" },
    { command: "?pattern", description: "Rechercher en arrière pour un motif", mode: "normal", category: "search" },
    { command: "n", description: "Répéter la recherche dans la même direction", mode: "normal", category: "search" },
    { command: "N", description: "Répéter la recherche dans la direction opposée", mode: "normal", category: "search" },
    {
      command: ":%s/old/new/g",
      description: "Remplacer tous les 'old' par 'new' dans tout le fichier",
      mode: "command",
      category: "search",
    },
    {
      command: ":s/old/new/g",
      description: "Remplacer tous les 'old' par 'new' sur la ligne actuelle",
      mode: "command",
      category: "search",
    },

    // File operations
    { command: ":w", description: "Enregistrer le fichier", mode: "command", category: "file" },
    { command: ":w filename", description: "Enregistrer sous filename", mode: "command", category: "file" },
    {
      command: ":q",
      description: "Quitter (échoue s'il y a des modifications non enregistrées)",
      mode: "command",
      category: "file",
    },
    {
      command: ":q!",
      description: "Quitter et ignorer les modifications non enregistrées",
      mode: "command",
      category: "file",
    },
    { command: ":wq", description: "Enregistrer et quitter", mode: "command", category: "file" },
    { command: ":e filename", description: "Éditer un fichier", mode: "command", category: "file" },

    // Multiple windows
    { command: ":split", description: "Diviser la fenêtre horizontalement", mode: "command", category: "windows" },
    { command: ":vsplit", description: "Diviser la fenêtre verticalement", mode: "command", category: "windows" },
    { command: "Ctrl+w h", description: "Aller à la fenêtre de gauche", mode: "normal", category: "windows" },
    { command: "Ctrl+w j", description: "Aller à la fenêtre du dessous", mode: "normal", category: "windows" },
    { command: "Ctrl+w k", description: "Aller à la fenêtre du dessus", mode: "normal", category: "windows" },
    { command: "Ctrl+w l", description: "Aller à la fenêtre de droite", mode: "normal", category: "windows" },
    { command: "Ctrl+w c", description: "Fermer la fenêtre actuelle", mode: "normal", category: "windows" },
    {
      command: "Ctrl+w o",
      description: "Fermer toutes les fenêtres sauf la fenêtre actuelle",
      mode: "normal",
      category: "windows",
    },
  ]

  // Group commands by category
  const categories = [
    { id: "movement", name: "Déplacement", icon: "↔️" },
    { id: "editing", name: "Édition", icon: "✏️" },
    { id: "visual", name: "Mode Visuel", icon: "👁️" },
    { id: "search", name: "Recherche & Remplacement", icon: "🔍" },
    { id: "file", name: "Opérations sur les Fichiers", icon: "📁" },
    { id: "windows", name: "Fenêtres Multiples", icon: "🪟" },
  ]

  // Filter commands based on search query
  const filteredCommands = vimCommands.filter(
    (cmd) =>
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get mode badge color
  const getModeColor = (mode: string) => {
    switch (mode) {
      case "normal":
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
      case "insert":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30"
      case "visual":
        return "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30"
      case "command":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"
    }
  }

  return (
    <div className="container px-4 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Commandes Vim</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Une référence complète des commandes et raccourcis Vim
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher des commandes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        <Accordion type="single" collapsible className="w-full" defaultValue="movement">
          {categories.map((category, index) => {
            const categoryCommands = filteredCommands.filter((cmd) => cmd.category === category.id)

            if (categoryCommands.length === 0) return null

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <AccordionItem value={category.id} className="border-b">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium">{category.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {categoryCommands.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {categoryCommands.map((cmd, cmdIndex) => (
                        <motion.div
                          key={`${category.id}-${cmdIndex}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + cmdIndex * 0.05, duration: 0.3 }}
                        >
                          <Card className="h-full border-muted/40 hover:border-primary/40 transition-colors">
                            <CardHeader className="p-4 pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-mono">{cmd.command}</CardTitle>
                                <Badge className={`${getModeColor(cmd.mode)}`}>{cmd.mode}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <CardDescription className="text-sm text-foreground/80">
                                {cmd.description}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            )
          })}
        </Accordion>
      </motion.div>
    </div>
  )
}

