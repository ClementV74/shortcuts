"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

// Define the command type
type TerminalCommand = {
  command: string
  description: string
  example?: string
  category: string
}

export default function TerminalCommandsPage() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  // Terminal commands organized by category
  const terminalCommands: TerminalCommand[] = [
    // File operations
    {
      command: "ls",
      description: language === "fr" ? "Lister le contenu d'un répertoire" : "List directory contents",
      example: "ls -la",
      category: "file",
    },
    {
      command: "cd",
      description: language === "fr" ? "Changer de répertoire" : "Change directory",
      example: "cd /home/user/documents",
      category: "file",
    },
    {
      command: "pwd",
      description: language === "fr" ? "Afficher le répertoire de travail actuel" : "Print working directory",
      example: "pwd",
      category: "file",
    },
    {
      command: "mkdir",
      description: language === "fr" ? "Créer un répertoire" : "Make directory",
      example: "mkdir new_folder",
      category: "file",
    },
    {
      command: "rmdir",
      description: language === "fr" ? "Supprimer un répertoire vide" : "Remove empty directory",
      example: "rmdir empty_folder",
      category: "file",
    },
    {
      command: "rm",
      description: language === "fr" ? "Supprimer des fichiers ou répertoires" : "Remove files or directories",
      example: "rm file.txt or rm -rf directory",
      category: "file",
    },
    {
      command: "cp",
      description: language === "fr" ? "Copier des fichiers ou répertoires" : "Copy files or directories",
      example: "cp file.txt /backup/ or cp -r dir1 dir2",
      category: "file",
    },
    {
      command: "mv",
      description:
        language === "fr" ? "Déplacer ou renommer des fichiers ou répertoires" : "Move or rename files or directories",
      example: "mv file.txt new_name.txt or mv file.txt /new/location/",
      category: "file",
    },
    {
      command: "touch",
      description:
        language === "fr"
          ? "Créer un fichier vide ou mettre à jour l'horodatage"
          : "Create empty file or update timestamp",
      example: "touch newfile.txt",
      category: "file",
    },
    {
      command: "find",
      description:
        language === "fr"
          ? "Rechercher des fichiers dans une hiérarchie de répertoires"
          : "Search for files in a directory hierarchy",
      example: "find /home -name '*.txt'",
      category: "file",
    },

    // File content
    {
      command: "cat",
      description: language === "fr" ? "Afficher le contenu d'un fichier" : "Display file content",
      example: "cat file.txt",
      category: "content",
    },
    {
      command: "less",
      description:
        language === "fr" ? "Afficher le contenu d'un fichier page par page" : "View file content one page at a time",
      example: "less large_file.txt",
      category: "content",
    },
    {
      command: "head",
      description: language === "fr" ? "Afficher les premières lignes d'un fichier" : "Display the beginning of a file",
      example: "head -n 10 file.txt",
      category: "content",
    },
    {
      command: "tail",
      description: language === "fr" ? "Afficher les dernières lignes d'un fichier" : "Display the end of a file",
      example: "tail -n 10 file.txt or tail -f log.txt",
      category: "content",
    },
    {
      command: "grep",
      description: language === "fr" ? "Rechercher du texte dans des fichiers" : "Search text in files",
      example: "grep 'pattern' file.txt or grep -r 'pattern' directory/",
      category: "content",
    },
    {
      command: "wc",
      description: language === "fr" ? "Compter les lignes, mots et caractères" : "Count lines, words, and characters",
      example: "wc -l file.txt",
      category: "content",
    },
    {
      command: "sort",
      description: language === "fr" ? "Trier les lignes d'un fichier" : "Sort lines of text files",
      example: "sort file.txt",
      category: "content",
    },
    {
      command: "uniq",
      description: language === "fr" ? "Rapporter ou omettre les lignes répétées" : "Report or omit repeated lines",
      example: "sort file.txt | uniq",
      category: "content",
    },
    {
      command: "diff",
      description: language === "fr" ? "Comparer des fichiers ligne par ligne" : "Compare files line by line",
      example: "diff file1.txt file2.txt",
      category: "content",
    },

    // System information
    {
      command: "uname",
      description: language === "fr" ? "Afficher les informations du système" : "Print system information",
      example: "uname -a",
      category: "system",
    },
    {
      command: "df",
      description: language === "fr" ? "Afficher l'utilisation de l'espace disque" : "Display disk space usage",
      example: "df -h",
      category: "system",
    },
    {
      command: "du",
      description: language === "fr" ? "Estimer l'utilisation de l'espace fichier" : "Estimate file space usage",
      example: "du -sh directory/",
      category: "system",
    },
    {
      command: "free",
      description:
        language === "fr"
          ? "Afficher la quantité de mémoire libre et utilisée"
          : "Display amount of free and used memory",
      example: "free -h",
      category: "system",
    },
    {
      command: "top",
      description: language === "fr" ? "Afficher les processus en cours d'exécution" : "Display running processes",
      example: "top",
      category: "system",
    },
    {
      command: "htop",
      description:
        language === "fr"
          ? "Afficher les processus en cours d'exécution (version interactive)"
          : "Display running processes (interactive version)",
      example: "htop",
      category: "system",
    },
    {
      command: "ps",
      description: language === "fr" ? "Afficher les processus en cours" : "Report process status",
      example: "ps aux",
      category: "system",
    },
    {
      command: "kill",
      description: language === "fr" ? "Terminer un processus" : "Terminate a process",
      example: "kill -9 1234",
      category: "system",
    },
    {
      command: "killall",
      description: language === "fr" ? "Terminer des processus par nom" : "Kill processes by name",
      example: "killall firefox",
      category: "system",
    },

    // Network
    {
      command: "ping",
      description: language === "fr" ? "Tester la connectivité réseau" : "Test network connectivity",
      example: "ping google.com",
      category: "network",
    },
    {
      command: "ifconfig",
      description: language === "fr" ? "Configurer une interface réseau" : "Configure network interface",
      example: "ifconfig",
      category: "network",
    },
    {
      command: "ip",
      description:
        language === "fr"
          ? "Afficher/manipuler le routage, les périphériques, les tunnels"
          : "Show/manipulate routing, devices, tunnels",
      example: "ip addr show",
      category: "network",
    },
    {
      command: "netstat",
      description:
        language === "fr"
          ? "Afficher les connexions réseau, tables de routage, etc."
          : "Display network connections, routing tables, etc.",
      example: "netstat -tuln",
      category: "network",
    },
    {
      command: "ss",
      description: language === "fr" ? "Utilitaire d'investigation de socket" : "Socket statistics",
      example: "ss -tuln",
      category: "network",
    },
    {
      command: "wget",
      description: language === "fr" ? "Télécharger des fichiers depuis le web" : "Download files from the web",
      example: "wget https://example.com/file.zip",
      category: "network",
    },
    {
      command: "curl",
      description:
        language === "fr" ? "Transférer des données depuis ou vers un serveur" : "Transfer data from or to a server",
      example: "curl -O https://example.com/file.zip",
      category: "network",
    },
    {
      command: "ssh",
      description: language === "fr" ? "Client Secure Shell" : "Secure Shell client",
      example: "ssh user@hostname",
      category: "network",
    },
    {
      command: "scp",
      description: language === "fr" ? "Copie sécurisée (basée sur SSH)" : "Secure copy (based on SSH)",
      example: "scp file.txt user@hostname:/path/",
      category: "network",
    },

    // Package management
    {
      command: "apt",
      description:
        language === "fr" ? "Gestionnaire de paquets pour Debian/Ubuntu" : "Package manager for Debian/Ubuntu",
      example: "apt update && apt upgrade",
      category: "package",
    },
    {
      command: "apt-get",
      description:
        language === "fr"
          ? "Gestionnaire de paquets pour Debian/Ubuntu (ancienne version)"
          : "Package manager for Debian/Ubuntu (older version)",
      example: "apt-get install package",
      category: "package",
    },
    {
      command: "yum",
      description:
        language === "fr"
          ? "Gestionnaire de paquets pour RHEL/CentOS/Fedora"
          : "Package manager for RHEL/CentOS/Fedora",
      example: "yum install package",
      category: "package",
    },
    {
      command: "dnf",
      description:
        language === "fr"
          ? "Gestionnaire de paquets pour Fedora (nouvelle génération)"
          : "Package manager for Fedora (next-gen)",
      example: "dnf install package",
      category: "package",
    },
    {
      command: "pacman",
      description: language === "fr" ? "Gestionnaire de paquets pour Arch Linux" : "Package manager for Arch Linux",
      example: "pacman -S package",
      category: "package",
    },
    {
      command: "zypper",
      description: language === "fr" ? "Gestionnaire de paquets pour openSUSE" : "Package manager for openSUSE",
      example: "zypper install package",
      category: "package",
    },

    // User management
    {
      command: "sudo",
      description:
        language === "fr" ? "Exécuter une commande en tant que superutilisateur" : "Execute a command as superuser",
      example: "sudo apt update",
      category: "user",
    },
    {
      command: "su",
      description: language === "fr" ? "Changer d'utilisateur" : "Switch user",
      example: "su - username",
      category: "user",
    },
    {
      command: "useradd",
      description: language === "fr" ? "Créer un nouvel utilisateur" : "Create a new user",
      example: "sudo useradd -m username",
      category: "user",
    },
    {
      command: "userdel",
      description: language === "fr" ? "Supprimer un utilisateur" : "Delete a user",
      example: "sudo userdel username",
      category: "user",
    },
    {
      command: "passwd",
      description: language === "fr" ? "Changer le mot de passe d'un utilisateur" : "Change user password",
      example: "passwd or sudo passwd username",
      category: "user",
    },
    {
      command: "chown",
      description: language === "fr" ? "Changer le propriétaire d'un fichier" : "Change file owner",
      example: "sudo chown user:group file.txt",
      category: "user",
    },
    {
      command: "chmod",
      description: language === "fr" ? "Changer les permissions d'un fichier" : "Change file permissions",
      example: "chmod 755 file.txt or chmod +x script.sh",
      category: "user",
    },

    // Compression
    {
      command: "tar",
      description: language === "fr" ? "Archiver des fichiers" : "Archive files",
      example: "tar -czvf archive.tar.gz directory/",
      category: "compression",
    },
    {
      command: "gzip",
      description: language === "fr" ? "Compresser des fichiers" : "Compress files",
      example: "gzip file.txt",
      category: "compression",
    },
    {
      command: "gunzip",
      description: language === "fr" ? "Décompresser des fichiers gzip" : "Decompress gzip files",
      example: "gunzip file.txt.gz",
      category: "compression",
    },
    {
      command: "zip",
      description: language === "fr" ? "Créer des archives zip" : "Package and compress files",
      example: "zip -r archive.zip directory/",
      category: "compression",
    },
    {
      command: "unzip",
      description: language === "fr" ? "Extraire des archives zip" : "Extract zip archives",
      example: "unzip archive.zip",
      category: "compression",
    },
  ]

  // Group commands by category
  const categories = [
    { id: "file", name: language === "fr" ? "Opérations sur les fichiers" : "File Operations", icon: "📁" },
    { id: "content", name: language === "fr" ? "Contenu des fichiers" : "File Content", icon: "📄" },
    { id: "system", name: language === "fr" ? "Informations système" : "System Information", icon: "💻" },
    { id: "network", name: language === "fr" ? "Réseau" : "Network", icon: "🌐" },
    { id: "package", name: language === "fr" ? "Gestion des paquets" : "Package Management", icon: "📦" },
    { id: "user", name: language === "fr" ? "Gestion des utilisateurs" : "User Management", icon: "👤" },
    { id: "compression", name: language === "fr" ? "Compression" : "Compression", icon: "🗜️" },
  ]

  // Filter commands based on search query
  const filteredCommands = terminalCommands.filter(
    (cmd) =>
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cmd.example && cmd.example.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
          <h1 className="text-4xl font-bold tracking-tight">
            {language === "fr" ? "Commandes Terminal Linux" : "Linux Terminal Commands"}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {language === "fr"
            ? "Une référence complète des commandes terminal Linux pour une utilisation efficace du système"
            : "A comprehensive reference of Linux terminal commands for efficient system usage"}
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
            placeholder={language === "fr" ? "Rechercher des commandes..." : "Search commands..."}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        <Accordion type="single" collapsible className="w-full" defaultValue="file">
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
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <CardDescription className="text-sm text-foreground/80 mb-2">
                                {cmd.description}
                              </CardDescription>
                              {cmd.example && (
                                <div className="mt-2 pt-2 border-t border-border/50">
                                  <p className="text-xs font-medium text-muted-foreground mb-1">
                                    {language === "fr" ? "Exemple:" : "Example:"}
                                  </p>
                                  <code className="text-xs bg-muted p-1 rounded font-mono block">{cmd.example}</code>
                                </div>
                              )}
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

