"use client"

import React from "react"
import Prism from "prismjs"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-java"
import "prismjs/components/prism-python"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-makefile"

interface CodeBlockProps {
  code: string
  language: string
  className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, className }) => {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    Prism.highlightAll()
  }, [code, language])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Map language to Prism language class
  const languageMap: Record<string, string> = {
    c: "language-c",
    cpp: "language-cpp",
    java: "language-java",
    python: "language-python",
    bash: "language-bash",
    sh: "language-bash",
    makefile: "language-makefile",
  }

  const prismLanguage = languageMap[language] || "language-markup"

  // Language display names
  const languageDisplayNames: Record<string, string> = {
    c: "C",
    cpp: "C++",
    java: "Java",
    python: "Python",
    bash: "Bash",
    sh: "Shell",
    makefile: "Makefile",
  }

  return (
    <div className={`relative rounded-md ${className} group animate-fade-in`}>
      <div className="absolute top-0 right-0 bg-muted px-2 py-1 rounded-bl rounded-tr text-xs text-muted-foreground">
        {languageDisplayNames[language] || language}
      </div>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-12 bg-primary/10 hover:bg-primary/20 text-primary p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </button>
      <pre className="bg-muted p-4 pt-8 rounded-md overflow-x-auto text-sm md:text-base">
        <code className={`${prismLanguage} font-mono`}>{code}</code>
      </pre>
    </div>
  )
}

export default CodeBlock

