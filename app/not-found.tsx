"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Command, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function NotFound() {
  const { language } = useLanguage()
…        </Link>
      </motion.div>
    </div>
  )
}