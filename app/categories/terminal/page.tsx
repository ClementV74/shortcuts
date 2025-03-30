"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Define the command type
type TerminalCommand = {
  command: string
  description: string
  example?: string
  category: string
}

export default function TerminalCommandsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Terminal commands organized by category
  const terminalCommands: TerminalCommand[] = [
    // File operations
    {
      command: "ls",
      description: "Lister le contenu d'un répertoire",
      example: "ls -la",
      category: "file",
    },
    {
      command: "cd",
      description: "Changer de répertoire",
      example: "cd /home/user/documents",
      category: "file",
    },
    {
      command: "pwd",
      description: "Afficher le répertoire de travail actuel",
      example: "pwd",
      category: "file",
    },
    {
      command: "mkdir",
      description: "Créer un répertoire",
      example: "mkdir new_folder",
      category: "file",
    },
    {
      command: "rmdir",
      description: "Supprimer un répertoire vide",
      example: "rmdir empty_folder",
      category: "file",
    },
    {
      command: "rm",
      description: "Supprimer des fichiers ou répertoires",
      example: "rm file.txt or rm -rf directory",
      category: "file",
    },
    {
      command: "cp",
      description: "Copier des fichiers ou répertoires",
      example: "cp file.txt /backup/ or cp -r dir1 dir2",
      category: "file",
    },
    {
      command: "mv",
      description: "Déplacer ou renommer des fichiers ou répertoires",
      example: "mv file.txt new_name.txt or mv file.txt /new/location/",
      category: "file",
    },
    {
      command: "touch",
      description: "Créer un fichier vide ou mettre à jour l'horodatage",
      example: "touch newfile.txt",
      category: "file",
    },
    {
      command: "find",
      description: "Rechercher des fichiers dans une hiérarchie de répertoires",
      example: "find /home -name '*.txt'",
      category: "file",
    },

    // File content
    {
      command: "cat",
      description: "Afficher le contenu d'un fichier",
      example: "cat file.txt",
      category: "content",
    },
    {
      command: "less",
      description: "Afficher le contenu d'un fichier page par page",
      example: "less large_file.txt",
      category: "content",
    },
    {
      command: "head",
      description: "Afficher les premières lignes d'un fichier",
      example: "head -n 10 file.txt",
      category: "content",
    },
    {
      command: "tail",
      description: "Afficher les dernières lignes d'un fichier",
      example: "tail -n 10 file.txt or tail -f log.txt",
      category: "content",
    },
    {
      command: "grep",
      description: "Rechercher du texte dans des fichiers",
      example: "grep 'pattern' file.txt or grep -r 'pattern' directory/",
      category: "content",
    },
    {
      command: "wc",
      description: "Compter les lignes, mots et caractères",
      example: "wc -l file.txt",
      category: "content",
    },
    {
      command: "sort",
      description: "Trier les lignes d'un fichier",
      example: "sort file.txt",
      category: "content",
    },
    {
      command: "uniq",
      description: "Rapporter ou omettre les lignes répétées",
      example: "sort file.txt | uniq",
      category: "content",
    },
    {
      command: "diff",
      description: "Comparer des fichiers ligne par ligne",
      example: "diff file1.txt file2.txt",
      category: "content",
    },

    // System information
    {
      command: "uname",
      description: "Afficher les informations du système",
      example: "uname -a",
      category: "system",
    },
    {
      command: "df",
      description: "Afficher l'utilisation de l'espace disque",
      example: "df -h",
      category: "system",
    },
    {
      command: "du",
      description: "Estimer l'utilisation de l'espace fichier",
      example: "du -sh directory/",
      category: "system",
    },
    {
      command: "free",
      description: "Afficher la quantité de mémoire libre et utilisée",
      example: "free -h",
      category: "system",
    },
    {
      command: "top",
      description: "Afficher les processus en cours d'exécution",
      example: "top",
      category: "system",
    },
    {
      command: "htop",
      description: "Afficher les processus en cours d'exécution (version interactive)",
      example: "htop",
      category: "system",
    },
    {
      command: "ps",
      description: "Afficher les processus en cours",
      example: "ps aux",
      category: "system",
    },
    {
      command: "kill",
      description: "Terminer un processus",
      example: "kill -9 1234",
      category: "system",
    },
    {
      command: "killall",
      description: "Terminer des processus par nom",
      example: "killall firefox",
      category: "system",
    },

    // Network
    {
      command: "ping",
      description: "Tester la connectivité réseau",
      example: "ping google.com",
      category: "network",
    },
    {
      command: "ifconfig",
      description: "Configurer une interface réseau",
      example: "ifconfig",
      category: "network",
    },
    {
      command: "ip",
      description: "Afficher/manipuler le routage, les périphériques, les tunnels",
      example: "ip addr show",
      category: "network",
    },
    {
      command: "netstat",
      description: "Afficher les connexions réseau, tables de routage, etc.",
      example: "netstat -tuln",
      category: "network",
    },
    {
      command: "ss",
      description: "Utilitaire d'investigation de socket",
      example: "ss -tuln",
      category: "network",
    },
    {
      command: "wget",
      description: "Télécharger des fichiers depuis le web",
      example: "wget https://example.com/file.zip",
      category: "network",
    },
    {
      command: "curl",
      description: "Transférer des données depuis ou vers un serveur",
      example: "curl -O https://example.com/file.zip",
      category: "network",
    },
    {
      command: "ssh",
      description: "Client Secure Shell",
      example: "ssh user@hostname",
      category: "network",
    },
    {
      command: "scp",
      description: "Copie sécurisée (basée sur SSH)",
      example: "scp file.txt user@hostname:/path/",
      category: "network",
    },

    // Package management
    {
      command: "apt",
      description: "Gestionnaire de paquets pour Debian/Ubuntu",
      example: "apt update && apt upgrade",
      category: "package",
    },
    {
      command: "apt-get",
      description: "Gestionnaire de paquets pour Debian/Ubuntu (ancienne version)",
      example: "apt-get install package",
      category: "package",
    },
    {
      command: "yum",
      description: "Gestionnaire de paquets pour RHEL/CentOS/Fedora",
      example: "yum install package",
      category: "package",
    },
    {
      command: "dnf",
      description: "Gestionnaire de paquets pour Fedora (nouvelle génération)",
      example: "dnf install package",
      category: "package",
    },
    {
      command: "pacman",
      description: "Gestionnaire de paquets pour Arch Linux",
      example: "pacman -S package",
      category: "package",
    },
    {
      command: "zypper",
      description: "Gestionnaire de paquets pour openSUSE",
      example: "zypper install package",
      category: "package",
    },

    // User management
    {
      command: "sudo",
      description: "Exécuter une commande en tant que superutilisateur",
      example: "sudo apt update",
      category: "user",
    },
    {
      command: "su",
      description: "Changer d'utilisateur",
      example: "su - username",
      category: "user",
    },
    {
      command: "useradd",
      description: "Créer un nouvel utilisateur",
      example: "sudo useradd -m username",
      category: "user",
    },
    {
      command: "userdel",
      description: "Supprimer un utilisateur",
      example: "sudo userdel username",
      category: "user",
    },
    {
      command: "passwd",
      description: "Changer le mot de passe d'un utilisateur",
      example: "passwd or sudo passwd username",
      category: "user",
    },
    {
      command: "chown",
      description: "Changer le propriétaire d'un fichier",
      example: "sudo chown user:group file.txt",
      category: "user",
    },
    {
      command: "chmod",
      description: "Changer les permissions d'un fichier",
      example: "chmod 755 file.txt or chmod +x script.sh",
      category: "user",
    },

    // Compression
    {
      command: "tar",
      description: "Archiver des fichiers",
      example: "tar -czvf archive.tar.gz directory/",
      category: "compression",
    },
    {
      command: "gzip",
      description: "Compresser des fichiers",
      example: "gzip file.txt",
      category: "compression",
    },
    {
      command: "gunzip",
      description: "Décompresser des fichiers gzip",
      example: "gunzip file.txt.gz",
      category: "compression",
    },
    {
      command: "zip",
      description: "Créer des archives zip",
      example: "zip -r archive.zip directory/",
      category: "compression",
    },
    {
      command: "unzip",
      description: "Extraire des archives zip",
      example: "unzip archive.zip",
      category: "compression",
    },
  ]

  // Group commands by category
  const categories = [
    { id: "file", name: "Opérations sur les fichiers", icon: "📁" },
    { id: "content", name: "Contenu des fichiers", icon: "📄" },
    { id: "system", name: "Informations système", icon: "💻" },
    { id: "network", name: "Réseau", icon: "🌐" },
    { id: "package", name: "Gestion des paquets", icon: "📦" },
    { id: "user", name: "Gestion des utilisateurs", icon: "👤" },
    { id: "compression", name: "Compression", icon: "🗜️" },
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
          <h1 className="text-4xl font-bold tracking-tight">Commandes Terminal Linux</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Une référence complète des commandes terminal Linux pour une utilisation efficace du système
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
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Exemple:</p>
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

