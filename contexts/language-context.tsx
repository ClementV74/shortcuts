"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr"

type Translations = {
  [key: string]: {
    en: string
    fr: string
  }
}

// Translations for UI elements
const translations: Translations = {
  // Navigation
  "nav.home": {
    en: "Home",
    fr: "Accueil",
  },
  "nav.categories": {
    en: "Categories",
    fr: "Catégories",
  },
  "nav.vim": {
    en: "Vim",
    fr: "Vim",
  },
  "nav.about": {
    en: "About",
    fr: "À propos",
  },
  "nav.language": {
    en: "Language",
    fr: "Langue",
  },

  // Home page
  "home.title": {
    en: "Keyboard Shortcuts Reference",
    fr: "Référence des Raccourcis Clavier",
  },
  "home.subtitle": {
    en: "A comprehensive collection of keyboard shortcuts, commands, and syntax for developers",
    fr: "Une collection complète de raccourcis clavier, commandes et syntaxe pour les développeurs",
  },
  "home.explore": {
    en: "Explore",
    fr: "Explorer",
  },
  "home.viewAll": {
    en: "View All Categories",
    fr: "Voir Toutes les Catégories",
  },

  // Categories page
  "categories.title": {
    en: "All Categories",
    fr: "Toutes les Catégories",
  },
  "categories.subtitle": {
    en: "Browse our complete collection of keyboard shortcuts and commands",
    fr: "Parcourez notre collection complète de raccourcis clavier et commandes",
  },

  // Category names
  "category.vim": {
    en: "Vim",
    fr: "Vim",
  },
  "category.vim.desc": {
    en: "Text editor commands and shortcuts",
    fr: "Commandes et raccourcis de l'éditeur de texte",
  },
  "category.terminal": {
    en: "Terminal",
    fr: "Terminal",
  },
  "category.terminal.desc": {
    en: "Linux terminal commands and usage",
    fr: "Commandes et utilisation du terminal Linux",
  },
  "category.vscode": {
    en: "VS Code",
    fr: "VS Code",
  },
  "category.vscode.desc": {
    en: "Visual Studio Code shortcuts",
    fr: "Raccourcis Visual Studio Code",
  },
  "category.git": {
    en: "Git",
    fr: "Git",
  },
  "category.git.desc": {
    en: "Version control commands",
    fr: "Commandes de contrôle de version",
  },
  "category.bash": {
    en: "Bash",
    fr: "Bash",
  },
  "category.bash.desc": {
    en: "Bash scripting and commands",
    fr: "Scripts et commandes Bash",
  },
  "category.windowManagers": {
    en: "Window Managers",
    fr: "Gestionnaires de Fenêtres",
  },
  "category.windowManagers.desc": {
    en: "Linux window manager shortcuts",
    fr: "Raccourcis des gestionnaires de fenêtres Linux",
  },
  "category.c": {
    en: "C Language",
    fr: "Langage C",
  },
  "category.c.desc": {
    en: "C syntax, methods and best practices",
    fr: "Syntaxe, méthodes et bonnes pratiques du C",
  },
  "category.cpp": {
    en: "C++",
    fr: "C++",
  },
  "category.cpp.desc": {
    en: "C++ syntax, methods and best practices",
    fr: "Syntaxe, méthodes et bonnes pratiques du C++",
  },
  "category.java": {
    en: "Java",
    fr: "Java",
  },
  "category.java.desc": {
    en: "Java syntax, methods and best practices",
    fr: "Syntaxe, méthodes et bonnes pratiques de Java",
  },
  "category.python": {
    en: "Python",
    fr: "Python",
  },
  "category.python.desc": {
    en: "Python syntax, methods and bonnes pratiques de Python",
    fr: "Syntaxe, méthodes et bonnes pratiques de Python",
  },
  "category.makefiles": {
    en: "Makefiles",
    fr: "Makefiles",
  },
  "category.makefiles.desc": {
    en: "Syntax, templates and best practices for automating builds",
    fr: "Syntaxe, templates et bonnes pratiques pour automatiser les builds",
  },

  // Vim page
  "vim.title": {
    en: "Vim Commands",
    fr: "Commandes Vim",
  },
  "vim.subtitle": {
    en: "A comprehensive reference of Vim commands and shortcuts",
    fr: "Une référence complète des commandes et raccourcis Vim",
  },
  "vim.search": {
    en: "Search commands...",
    fr: "Rechercher des commandes...",
  },

  // Command categories
  "cmd.movement": {
    en: "Movement",
    fr: "Déplacement",
  },
  "cmd.editing": {
    en: "Editing",
    fr: "Édition",
  },
  "cmd.visual": {
    en: "Visual Mode",
    fr: "Mode Visuel",
  },
  "cmd.search": {
    en: "Search & Replace",
    fr: "Recherche & Remplacement",
  },
  "cmd.file": {
    en: "File Operations",
    fr: "Opérations sur les Fichiers",
  },
  "cmd.windows": {
    en: "Multiple Windows",
    fr: "Fenêtres Multiples",
  },

  // Footer
  "footer.rights": {
    en: "All rights reserved.",
    fr: "Tous droits réservés.",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to English, but will detect browser language on client
  const [language, setLanguage] = useState<Language>("en")

  // Detect browser language on client side
  useEffect(() => {
    const browserLang = navigator.language.split("-")[0]
    if (browserLang === "fr") {
      setLanguage("fr")
    }
  }, [])

  // Translation function
  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

