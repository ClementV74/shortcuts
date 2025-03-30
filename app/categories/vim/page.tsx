"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal, Search, ChevronDown } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

// Define the command type
type VimCommand = {
  command: string
  description: string
  mode: "normal" | "insert" | "visual" | "command" | "multiple"
  category: string
}

export default function VimCommandsPage() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  
  // Vim commands organized by category
  const vimCommands: VimCommand[] = [
    // Movement commands
    { command: "h", description: language === "fr" ? "Déplacer le curseur vers la gauche" : "Move cursor left", mode: "normal", category: "movement" },
    { command: "j", description: language === "fr" ? "Déplacer le curseur vers le bas" : "Move cursor down", mode: "normal", category: "movement" },
    { command: "k", description: language === "fr" ? "Déplacer le curseur vers le haut" : "Move cursor up", mode: "normal", category: "movement" },
    { command: "l", description: language === "fr" ? "Déplacer le curseur vers la droite" : "Move cursor right", mode: "normal", category: "movement" },
    { command: "w", description: language === "fr" ? "Aller au début du mot suivant" : "Jump to start of next word", mode: "normal", category: "movement" },
    { command: "b", description: language === "fr" ? "Aller au début du mot précédent" : "Jump to start of previous word", mode: "normal", category: "movement" },
    { command: "e", description: language === "fr" ? "Aller à la fin du mot" : "Jump to end of word", mode: "normal", category: "movement" },
    { command: "0", description: language === "fr" ? "Aller au début de la ligne" : "Jump to start of line", mode: "normal", category: "movement" },
    { command: "$", description: language === "fr" ? "Aller à la fin de la ligne" : "Jump to end of line", mode: "normal", category: "movement" },
    { command: "gg", description: language === "fr" ? "Aller à la première ligne du document" : "Go to first line of document", mode: "normal", category: "movement" },
    { command: "G", description: language === "fr" ? "Aller à la dernière ligne du document" : "Go to last line of document", mode: "normal", category: "movement" },
    { command: "{number}G", description: language === "fr" ? "Aller à la ligne {number}" : "Go to line {number}", mode: "normal", category: "movement" },

    // Editing commands
    { command: "i", description: language === "fr" ? "Mode insertion au curseur" : "Insert mode at cursor", mode: "normal", category: "editing" },
    { command: "I", description: language === "fr" ? "Insérer au début de la ligne" : "Insert at beginning of line", mode: "normal", category: "editing" },
    { command: "a", description: language === "fr" ? "Ajouter après le curseur" : "Append after cursor", mode: "normal", category: "editing" },
    { command: "A", description: language === "fr" ? "Ajouter à la fin de la ligne" : "Append at end of line", mode: "normal", category: "editing" },
    { command: "o", description: language === "fr" ? "Ouvrir une nouvelle ligne en dessous du curseur" : "Open new line below cursor", mode: "normal", category: "editing" },
    { command: "O", description: language === "fr" ? "Ouvrir une nouvelle ligne au-dessus du curseur" : "Open new line above cursor", mode: "normal", category: "editing" },
    { command: "x", description: language === "fr" ? "Supprimer le caractère sous le curseur" : "Delete character under cursor", mode: "normal", category: "editing" },
    { command: "dd", description: language === "fr" ? "Supprimer la ligne actuelle" : "Delete current line", mode: "normal", category: "editing" },
    { command: "dw", description: language === "fr" ? "Supprimer du curseur à la fin du mot" : "Delete from cursor to end of word", mode: "normal", category: "editing" },
    { command: "d$", description: language === "fr" ? "Supprimer du curseur à la fin de la ligne" : "Delete from cursor to end of line", mode: "normal", category: "editing" },
    { command: "yy", description: language === "fr" ? "Copier la ligne actuelle" : "Yank (copy) current line", mode: "normal", category: "editing" },
    { command: "p", description: language === "fr" ? "Coller après le curseur" : "Paste after cursor", mode: "normal", category: "editing" },
    { command: "P", description: language === "fr" ? "Coller avant le curseur" : "Paste before cursor", mode: "normal", category: "editing" },
    { command: "r", description: language === "fr" ? "Remplacer un seul caractère" : "Replace single character", mode: "normal", category: "editing" },
    { command: "cc", description: language === "fr" ? "Changer (remplacer) toute la ligne" : "Change (replace) entire line", mode: "normal", category: "editing" },
    { command: "cw", description: language === "fr" ? "Changer (remplacer) jusqu'à la fin du mot" : "Change (replace) to end of word", mode: "normal", category: "editing" },
    { command: "c$", description: language === "fr" ? "Changer (remplacer) jusqu'à la fin de la ligne" : "Change (replace) to end of line", mode: "normal", category: "editing" },
    { command: "u", description: language === "fr" ? "Annuler" : "Undo", mode: "normal", category: "editing" },
    { command: "Ctrl+r", description: language === "fr" ? "Refaire" : "Redo", mode: "normal", category: "editing" },

    // Visual mode commands
    { command: "v", description: language === "fr" ? "Démarrer le mode visuel (par caractère)" : "Start visual mode (character-wise)", mode: "normal", category: "visual" },
    { command: "V", description: language === "fr" ? "Démarrer le mode visuel (par ligne)" : "Start visual mode (line-wise)", mode: "normal", category: "visual" },
    { command: "Ctrl+v", description: language === "fr" ? "Démarrer le mode visuel par bloc" : "Start visual block mode", mode: "normal", category: "visual" },
    { command: "y", description: language === "fr" ? "Copier le texte sélectionné" : "Yank (copy) selected text", mode: "visual", category: "visual" },
    { command: "d", description: language === "fr" ? "Supprimer le texte sélectionné" : "Delete selected text", mode: "visual", category: "visual" },
    { command: "c", description: language === "fr" ? "Changer (remplacer) le texte sélectionné" : "Change (replace) selected text", mode: "visual", category: "visual" },
    { command: ">", description: language === "fr" ? "Indenter le texte sélectionné" : "Indent selected text", mode: "visual", category: "visual" },
    { command: "<", description: language === "fr" ? "Désindenter le texte sélectionné" : "Outdent selected text", mode: "visual", category: "visual" },

    // Search and replace
    { command: "/pattern", description: language === "fr" ? "Rechercher en avant pour un motif" : "Search forward for pattern", mode: "normal", category: "search" },
    { command: "?pattern", description: language === "fr" ? "Rechercher en arrière pour un motif" : "Search backward for pattern", mode: "normal", category: "search" },
    { command: "n", description: language === "fr" ? "Répéter la recherche dans la même direction" : "Repeat search in same direction", mode: "normal", category: "search" },
    { command: "N", description: language === "fr" ? "Répéter la recherche dans la direction opposée" : "Repeat search in opposite direction", mode: "normal", category: "search" },
    { command: ":%s/old/new/g", description: language === "fr" ? "Remplacer tous les 'old' par 'new' dans tout le fichier" : "Replace all old with new throughout file", mode: "command", category: "search" },
    { command: ":s/old/new/g", description: language === "fr" ? "Remplacer tous les 'old' par 'new' sur la ligne actuelle" : "Replace all old with new on current line", mode: "command", category: "search" },

    // File operations
    { command: ":w", description: language === "fr" ? "Enregistrer le fichier" : "Save file", mode: "command", category: "file" },
    { command: ":w filename", description: language === "fr" ? "Enregistrer sous filename" : "Save as filename", mode: "command", category: "file" },
    { command: ":q", description: language === "fr" ? "Quitter (échoue s'il y a des modifications non enregistrées)" : "Quit (fails if unsaved changes)", mode: "command", category: "file" },
    { command: ":q!", description: language === "fr" ? "Quitter et ignorer les modifications non enregistrées" : "Quit and discard unsaved changes", mode: "command", category: "file" },
    { command: ":wq", description: language === "fr" ? "Enregistrer et quitter" : "Save and quit", mode: "command", category: "file" },
    { command: ":e filename", description: language === "fr" ? "Éditer un fichier" : "Edit a file", mode: "command", category: "file" },

    // Multiple windows
    { command: ":split", description: language === "fr" ? "Diviser la fenêtre horizontalement" : "Split window horizontally", mode: "command", category: "windows" },
    { command: ":vsplit", description: language === "fr" ? "Diviser la fenêtre verticalement" : "Split window vertically", mode: "command", category: "windows" },
    { command: "Ctrl+w h", description: language === "fr" ? "Aller à la fenêtre de gauche" : "Move to window on the left", mode: "normal", category: "windows" },
    { command: "Ctrl+w j", description: language === "fr" ? "Aller à la fenêtre du dessous" : "Move to window below", mode: "normal", category: "windows" },
    { command: "Ctrl+w k", description: language === "fr" ? "Aller à la fenêtre du dessus" : "Move to window above", mode: "normal", category: "windows" },
    { command: "Ctrl+w l", description: language === "fr" ? "Aller à la fenêtre de droite" : "Move to window on the right", mode: "normal", category: "windows" },
    { command: "Ctrl+w c", description: language === "fr" ? "Fermer la fenêtre actuelle" : "Close current window", mode: "normal", category: "windows" },
    { command: "Ctrl+w o", description: language === "fr" ? "Fermer toutes les fenêtres sauf la fenêtre actuelle" : "Close all windows except current one", mode: "normal", category: "windows" },
  ]

  // Group commands by category
  const categories = [
    { id: "movement", name: language === "fr" ? t("cmd.movement") : "Movement", icon: "↔️" },
    { id: "editing", name: language === "fr" ? t("cmd.editing") : "Editing", icon: "✏️" },
    { id: "visual", name: language === "fr" ? t("cmd.visual") : "Visual Mode", icon: "👁️" },
    { id: "search", name: language === "fr" ? t("cmd.search") : "Search & Replace", icon: "🔍" },
    { id: "file", name: language === "fr" ? t("cmd.file") : "File Operations", icon: "📁" },
    { id: "windows", name: language === "fr" ? t("cmd.windows") : "Multiple Windows", icon: "🪟" },
  ]
  
  // Filter commands based on search query
  const filteredCommands = vimCommands.filter(cmd => 
    cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Get mode badge color
  const getModeColor = (mode: string) => {
    switch (mode) {
      case "normal": return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
      case "insert": return "bg-green-500/20 text-green-500 hover:bg-green-500/30"
      case "visual": return "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30"
      case "command": return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
      default: return "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"
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
          <h1 className="text-4xl font-bold tracking-tight">{t("vim.title")}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {t("vim.subtitle")}
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
            placeholder={t("vim.search")}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Accordion type="single" collapsible className="w-full" defaultValue="movement">
          {categories.map((category, index) => {
            const categoryCommands = filteredCommands.filter(cmd => cmd.category === category.id)
            
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
                                <CardTitle className="text-lg font-mono">
                                  {cmd.command}
                                </CardTitle>
                                <Badge className={`${getModeColor(cmd.mode)}`}>
                                  {cmd.mode}
                                </Badge>
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

