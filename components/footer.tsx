import Link from "next/link"
import { Command, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between py-8 gap-4">
        <div className="flex items-center gap-2">
          <Command className="h-5 w-5" />
          <span className="font-semibold">Raccourcis</span>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Raccourcis. Tous droits réservés.
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

