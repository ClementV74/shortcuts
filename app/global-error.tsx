"use client"

import { Button } from "@/components/ui/button"
import { Command, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
…