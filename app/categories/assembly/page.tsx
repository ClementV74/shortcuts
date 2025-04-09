"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"

export default function AssemblyLanguagePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Format specifiers for assembly output
  const formatSpecifiers = [
    {
      specifier: "db",
      description: "Définir des octets (Define Byte)",
      example: "message db 'Hello, World!', 0  ; Chaîne terminée par zéro",
    },
    {
      specifier: "dw",
      description: "Définir des mots (Define Word - 2 octets)",
      example: "value dw 1234h  ; Valeur hexadécimale 0x1234",
    },
    {
      specifier: "dd",
      description: "Définir des doubles mots (Define Doubleword - 4 octets)",
      example: "array dd 1, 2, 3, 4  ; Tableau de 4 entiers",
    },
    {
      specifier: "dq",
      description: "Définir des quadruples mots (Define Quadword - 8 octets)",
      example: "large_val dq 1234567890123456h  ; Valeur 64 bits",
    },
    {
      specifier: "equ",
      description: "Définir une constante",
      example: "BUFFER_SIZE equ 1024  ; Constante symbolique",
    },
    {
      specifier: "%define",
      description: "Définir une macro (syntaxe NASM)",
      example: "%define PI 3.14159  ; Définition de macro",
    },
    {
      specifier: "times",
      description: "Répéter une instruction ou une définition",
      example: "buffer times 1024 db 0  ; Allouer 1024 octets initialisés à zéro",
    },
    {
      specifier: "section",
      description: "Définir une section de code ou de données",
      example: "section .text  ; Section de code\nsection .data  ; Section de données",
    },
    {
      specifier: "global",
      description: "Rendre un symbole accessible globalement",
      example: "global _start  ; Point d'entrée du programme",
    },
    {
      specifier: "extern",
      description: "Déclarer un symbole externe",
      example: "extern printf  ; Fonction de la bibliothèque C",
    },
    {
      specifier: "syscall",
      description: "Appel système (Linux x86-64)",
      example:
        "mov rax, 1      ; syscall number (sys_write)\nmov rdi, 1      ; file descriptor (stdout)\nmov rsi, msg    ; message to write\nmov rdx, msglen ; message length\nsyscall         ; call kernel",
    },
    {
      specifier: "int 0x80",
      description: "Interruption pour appel système (Linux x86)",
      example:
        "mov eax, 4      ; syscall number (sys_write)\nmov ebx, 1      ; file descriptor (stdout)\nmov ecx, msg    ; message to write\nmov edx, msglen ; message length\nint 0x80        ; call kernel",
    },
  ]

  // Data types
  const dataTypes = [
    {
      type: "byte",
      size: "1 octet",
      range: "0 à 255 ou -128 à 127",
      example: "var1 db 42  ; Octet unique\nstr db 'Hello', 0  ; Chaîne de caractères",
    },
    {
      type: "word",
      size: "2 octets",
      range: "0 à 65,535 ou -32,768 à 32,767",
      example: "var2 dw 1234h  ; Mot de 16 bits",
    },
    {
      type: "doubleword",
      size: "4 octets",
      range: "0 à 4,294,967,295 ou -2,147,483,648 à 2,147,483,647",
      example: "var3 dd 12345678h  ; Double mot de 32 bits",
    },
    {
      type: "quadword",
      size: "8 octets",
      range: "0 à 18,446,744,073,709,551,615 ou -9,223,372,036,854,775,808 à 9,223,372,036,854,775,807",
      example: "var4 dq 1234567890ABCDEFh  ; Quadruple mot de 64 bits",
    },
    {
      type: "tbyte",
      size: "10 octets",
      range: "Nombre à virgule flottante de précision étendue",
      example: "var5 dt 3.14159  ; Nombre à virgule flottante de 80 bits",
    },
    {
      type: "registres 8 bits",
      size: "1 octet",
      range: "Registres de 8 bits",
      example: "al, ah, bl, bh, cl, ch, dl, dh, sil, dil, ...",
    },
    {
      type: "registres 16 bits",
      size: "2 octets",
      range: "Registres de 16 bits",
      example: "ax, bx, cx, dx, si, di, bp, sp, ...",
    },
    {
      type: "registres 32 bits",
      size: "4 octets",
      range: "Registres de 32 bits",
      example: "eax, ebx, ecx, edx, esi, edi, ebp, esp, ...",
    },
    {
      type: "registres 64 bits",
      size: "8 octets",
      range: "Registres de 64 bits (x86-64)",
      example: "rax, rbx, rcx, rdx, rsi, rdi, rbp, rsp, r8-r15, ...",
    },
    {
      type: "registres MMX",
      size: "8 octets",
      range: "Registres pour opérations SIMD",
      example: "mm0, mm1, mm2, mm3, mm4, mm5, mm6, mm7",
    },
    {
      type: "registres XMM",
      size: "16 octets",
      range: "Registres pour opérations SSE",
      example: "xmm0, xmm1, xmm2, ..., xmm15",
    },
    {
      type: "registres YMM",
      size: "32 octets",
      range: "Registres pour opérations AVX",
      example: "ymm0, ymm1, ymm2, ..., ymm15",
    },
  ]

  // Control structures
  const controlStructures = [
    {
      name: "jmp (saut inconditionnel)",
      description: "Sauter à une étiquette spécifiée",
      example: `; Saut inconditionnel
      mov eax, 1
      jmp skip_code  ; Sauter à l'étiquette skip_code
      mov eax, 2     ; Ce code est ignoré
skip_code:
      mov ebx, eax   ; ebx = 1`,
    },
    {
      name: "cmp + jcc (comparaison et saut conditionnel)",
      description: "Comparer deux valeurs et sauter si la condition est remplie",
      example: `; Comparaison et saut conditionnel
      mov eax, 5
      mov ebx, 10
      cmp eax, ebx     ; Comparer eax et ebx
      jl eax_is_less   ; Sauter si eax < ebx
      mov ecx, ebx     ; Ce code est ignoré
      jmp end_compare
eax_is_less:
      mov ecx, eax     ; ecx = 5
end_compare:`,
    },
    {
      name: "test + jcc (test de bits et saut conditionnel)",
      description: "Tester des bits et sauter si la condition est remplie",
      example: `; Test de bits et saut conditionnel
      mov eax, 5       ; 0101 en binaire
      test eax, 1      ; Tester le bit le moins significatif
      jnz is_odd       ; Sauter si le bit est à 1 (nombre impair)
      mov ebx, 0       ; Ce code est ignoré
      jmp end_test
is_odd:
      mov ebx, 1       ; ebx = 1 (nombre impair)
end_test:`,
    },
    {
      name: "loop",
      description: "Boucle qui décrémente ecx/rcx et saute si non nul",
      example: `; Boucle avec l'instruction loop
      mov ecx, 5       ; Compteur de boucle
loop_start:
      ; Corps de la boucle
      push ecx         ; Sauvegarder ecx
      ; ... code ...
      pop ecx          ; Restaurer ecx
      loop loop_start  ; Décrémenter ecx et sauter si ecx != 0`,
    },
    {
      name: "call/ret (appel de fonction)",
      description: "Appeler une fonction et retourner",
      example: `; Appel de fonction
      mov eax, 5
      call my_function  ; Appeler la fonction
      ; eax contient maintenant 10
      jmp end

my_function:
      ; Corps de la fonction
      add eax, eax      ; eax = eax * 2
      ret               ; Retourner à l'appelant
end:`,
    },
    {
      name: "Structure if-else",
      description: "Implémentation d'une structure if-else",
      example: `; Structure if-else
      mov eax, 10
      cmp eax, 5
      jle else_branch   ; Sauter si eax <= 5
      
      ; Code "if" (eax > 5)
      mov ebx, 1
      jmp end_if
      
else_branch:
      ; Code "else" (eax <= 5)
      mov ebx, 0
      
end_if:`,
    },
    {
      name: "Structure while",
      description: "Implémentation d'une boucle while",
      example: `; Boucle while (tant que eax < 10)
      mov eax, 0
      
while_start:
      cmp eax, 10
      jge while_end     ; Sortir si eax >= 10
      
      ; Corps de la boucle
      inc eax           ; eax++
      ; ... autre code ...
      
      jmp while_start   ; Retour au début de la boucle
      
while_end:`,
    },
    {
      name: "Structure for",
      description: "Implémentation d'une boucle for",
      example: `; Boucle for (for(eax=0; eax<5; eax++))
      mov eax, 0        ; Initialisation
      
for_start:
      cmp eax, 5        ; Condition
      jge for_end       ; Sortir si eax >= 5
      
      ; Corps de la boucle
      ; ... code ...
      
      inc eax           ; Incrémentation
      jmp for_start     ; Retour au début
      
for_end:`,
    },
    {
      name: "Structure switch-case",
      description: "Implémentation d'une structure switch-case",
      example: `; Structure switch-case pour eax
      mov eax, 2        ; Valeur à tester
      
      cmp eax, 1
      je case_1
      
      cmp eax, 2
      je case_2
      
      cmp eax, 3
      je case_3
      
      jmp default_case  ; Si aucun cas ne correspond
      
case_1:
      ; Code pour eax = 1
      mov ebx, 10
      jmp switch_end
      
case_2:
      ; Code pour eax = 2
      mov ebx, 20
      jmp switch_end
      
case_3:
      ; Code pour eax = 3
      mov ebx, 30
      jmp switch_end
      
default_case:
      ; Code par défaut
      mov ebx, 0
      
switch_end:`,
    },
  ]

  // Common instructions
  const commonFunctions = [
    {
      name: "mov",
      category: "Transfert de données",
      description: "Copier une valeur dans un registre ou une adresse mémoire",
      example:
        "mov eax, 42      ; eax = 42\nmov ebx, eax     ; ebx = eax\nmov [addr], ecx  ; Mémoire à l'adresse addr = ecx",
    },
    {
      name: "push/pop",
      category: "Pile",
      description: "Empiler/dépiler des valeurs sur la pile",
      example:
        "push eax         ; Empiler la valeur de eax\npush 42          ; Empiler la valeur immédiate 42\npop ebx          ; Dépiler dans ebx",
    },
    {
      name: "add/sub",
      category: "Arithmétique",
      description: "Addition/soustraction",
      example: "add eax, 5       ; eax = eax + 5\nsub ebx, ecx     ; ebx = ebx - ecx",
    },
    {
      name: "inc/dec",
      category: "Arithmétique",
      description: "Incrémenter/décrémenter",
      example: "inc eax          ; eax++\ndec ebx          ; ebx--",
    },
    {
      name: "mul/imul",
      category: "Arithmétique",
      description: "Multiplication non signée/signée",
      example:
        "mov eax, 5\nmul ebx          ; eax = eax * ebx (résultat dans edx:eax)\nimul ecx, 10     ; ecx = ecx * 10",
    },
    {
      name: "div/idiv",
      category: "Arithmétique",
      description: "Division non signée/signée",
      example: "mov edx, 0\nmov eax, 100\nmov ecx, 10\ndiv ecx          ; eax = edx:eax / ecx, edx = edx:eax % ecx",
    },
    {
      name: "and/or/xor",
      category: "Logique",
      description: "Opérations logiques bit à bit",
      example:
        "and eax, 0Fh     ; eax = eax & 0F (masque les bits supérieurs)\nor ebx, 1        ; ebx = ebx | 1 (active le bit le moins significatif)\nxor ecx, ecx     ; ecx = 0 (mise à zéro efficace)",
    },
    {
      name: "not/neg",
      category: "Logique",
      description: "Complément/négation",
      example: "not eax          ; eax = ~eax (complément bit à bit)\nneg ebx          ; ebx = -ebx (négation)",
    },
    {
      name: "shl/shr",
      category: "Décalage",
      description: "Décalage à gauche/droite logique",
      example: "shl eax, 2       ; eax = eax << 2 (multiplie par 4)\nshr ebx, 1       ; ebx = ebx >> 1 (divise par 2)",
    },
    {
      name: "sal/sar",
      category: "Décalage",
      description: "Décalage à gauche/droite arithmétique",
      example: "sal eax, 2       ; eax = eax << 2 (comme shl)\nsar ebx, 1       ; ebx = ebx >> 1 (préserve le signe)",
    },
    {
      name: "lea",
      category: "Adressage",
      description: "Charger l'adresse effective",
      example: "lea eax, [ebx+4*ecx+8]  ; eax = ebx + 4*ecx + 8 (calcul d'adresse)",
    },
    {
      name: "rep/repe/repne",
      category: "Chaîne",
      description: "Répéter une instruction de chaîne",
      example:
        "mov ecx, 10      ; Compteur\nmov esi, src     ; Source\nmov edi, dest    ; Destination\nrep movsb        ; Répéter movsb ecx fois",
    },
  ]

  // Memory management examples
  const memoryExamples = [
    {
      title: "Allocation statique",
      description: "Allouer de la mémoire dans la section de données",
      example: `section .data
; Variables initialisées
message db 'Hello, World!', 0   ; Chaîne terminée par zéro
number dd 42                    ; Entier 32 bits
array dd 1, 2, 3, 4, 5          ; Tableau d'entiers

section .bss
; Variables non initialisées
buffer resb 1024                ; Réserver 1024 octets
integers resd 100               ; Réserver 100 entiers 32 bits`,
    },
    {
      title: "Accès à la mémoire",
      description: "Différentes façons d'accéder à la mémoire",
      example: `section .data
array dd 1, 2, 3, 4, 5

section .text
global _start
_start:
    ; Accès direct
    mov eax, [array]            ; eax = premier élément du tableau
    
    ; Accès indexé
    mov ebx, [array + 4]        ; ebx = deuxième élément (décalage de 4 octets)
    mov ecx, [array + 8]        ; ecx = troisième élément
    
    ; Accès avec registre de base
    mov esi, array
    mov edx, [esi]              ; edx = premier élément
    mov edx, [esi + 4]          ; edx = deuxième élément
    
    ; Accès avec registre d'index
    mov edi, 2                  ; Index
    mov edx, [array + edi*4]    ; edx = array[edi] (troisième élément)
    
    ; Accès avec base et index
    mov esi, array
    mov edi, 3
    mov edx, [esi + edi*4]      ; edx = array[edi] (quatrième élément)`,
    },
    {
      title: "Pile (stack)",
      description: "Utilisation de la pile pour stocker des données temporaires",
      example: `section .text
global _start
_start:
    ; Sauvegarder des registres sur la pile
    push eax
    push ebx
    push ecx
    
    ; Allouer de l'espace sur la pile
    sub esp, 16                 ; Réserver 16 octets sur la pile
    
    ; Utiliser l'espace alloué
    mov dword [esp], 42         ; Stocker 42 au sommet de la pile
    mov dword [esp+4], 100      ; Stocker 100 à esp+4
    
    ; Accéder aux variables locales
    mov eax, [esp]              ; eax = 42
    mov ebx, [esp+4]            ; ebx = 100
    
    ; Libérer l'espace
    add esp, 16                 ; Libérer 16 octets
    
    ; Restaurer les registres
    pop ecx
    pop ebx
    pop eax`,
    },
    {
      title: "Allocation dynamique (Linux)",
      description: "Allouer de la mémoire dynamiquement avec l'appel système brk",
      example: `section .text
global _start
_start:
    ; Obtenir l'adresse actuelle de brk
    mov eax, 12                 ; sys_brk
    xor ebx, ebx                ; 0 pour obtenir l'adresse actuelle
    int 0x80                    ; Appel système
    
    ; Sauvegarder l'adresse actuelle
    mov esi, eax
    
    ; Allouer 1024 octets
    mov eax, 12                 ; sys_brk
    lea ebx, [esi + 1024]       ; Nouvelle adresse de brk
    int 0x80                    ; Appel système
    
    ; Vérifier si l'allocation a réussi
    cmp eax, esi
    jbe allocation_failed
    
    ; Utiliser la mémoire allouée
    mov dword [esi], 42         ; Stocker 42 au début de la zone allouée
    
    ; Libérer la mémoire (optionnel)
    mov eax, 12                 ; sys_brk
    mov ebx, esi                ; Restaurer l'adresse originale
    int 0x80                    ; Appel système
    
allocation_failed:`,
    },
    {
      title: "Appel à malloc/free (C)",
      description: "Utiliser les fonctions malloc et free de la bibliothèque C",
      example: `section .data
format_str db 'Allocated: %p, Value: %d', 10, 0

section .text
extern malloc
extern free
extern printf
global main

main:
    ; Prologue
    push ebp
    mov ebp, esp
    
    ; Appeler malloc(4) pour allouer 4 octets
    push 4                      ; Taille à allouer
    call malloc
    add esp, 4                  ; Nettoyer la pile
    
    ; Vérifier si malloc a réussi
    test eax, eax
    jz allocation_failed
    
    ; Utiliser la mémoire allouée
    mov dword [eax], 42         ; Stocker 42 dans la mémoire allouée
    
    ; Afficher l'adresse et la valeur
    push dword [eax]            ; Valeur
    push eax                    ; Adresse
    push format_str             ; Format
    call printf
    add esp, 12                 ; Nettoyer la pile
    
    ; Libérer la mémoire
    push eax
    call free
    add esp, 4                  ; Nettoyer la pile
    
allocation_failed:
    ; Épilogue
    mov esp, ebp
    pop ebp
    ret`,
    },
  ]

  // Filter items based on search query
  const filteredFormatSpecifiers = formatSpecifiers.filter(
    (item) =>
      item.specifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDataTypes = dataTypes.filter(
    (item) =>
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.range.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredControlStructures = controlStructures.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCommonFunctions = commonFunctions.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredMemoryExamples = memoryExamples.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block mb-4"
        >
          <div className="p-3 rounded-full bg-primary/10 animate-pulse-slow">
            <Code className="h-16 w-16 text-primary" />
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Assembleur
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          L'essentiel du langage assembleur x86/x64: instructions, registres et exemples
        </motion.p>
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
            placeholder="Rechercher..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <Tabs defaultValue="format" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger
            value="format"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Format assembleur
          </TabsTrigger>
          <TabsTrigger
            value="types"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Types de données
          </TabsTrigger>
          <TabsTrigger
            value="control"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Structures de contrôle
          </TabsTrigger>
          <TabsTrigger
            value="functions"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Instructions communes
          </TabsTrigger>
          <TabsTrigger
            value="memory"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Gestion mémoire
          </TabsTrigger>
        </TabsList>

        <TabsContent value="format" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredFormatSpecifiers.map((item, index) => (
              <motion.div key={item.specifier} variants={itemVariants} className="h-full">
                <Card className="h-full border-muted hover:border-primary/50 transition-all duration-300 animate-glow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-mono">{item.specifier}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-4">{item.description}</CardDescription>
                    <CodeBlock code={item.example} language="asm" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="types" className="mt-0">
          <Card className="animate-glow">
            <CardHeader>
              <CardTitle>Types de données en assembleur</CardTitle>
              <CardDescription>
                Les types de données fondamentaux en assembleur avec leur taille et plage de valeurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-4 font-medium">Type</th>
                      <th className="text-left py-2 px-4 font-medium">Taille</th>
                      <th className="text-left py-2 px-4 font-medium">Plage</th>
                      <th className="text-left py-2 px-4 font-medium">Exemple</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDataTypes.map((type, index) => (
                      <motion.tr
                        key={type.type}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={index % 2 === 0 ? "bg-muted/30" : ""}
                      >
                        <td className="py-2 px-4 font-mono">{type.type}</td>
                        <td className="py-2 px-4">{type.size}</td>
                        <td className="py-2 px-4">{type.range}</td>
                        <td className="py-2 px-4">
                          <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{type.example}</code>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2"
          >
            {filteredControlStructures.map((item, index) => (
              <motion.div key={item.name} variants={itemVariants} className="h-full">
                <Card className="h-full border-muted hover:border-primary/50 transition-all duration-300 animate-glow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-mono">{item.name}</CardTitle>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={item.example} language="asm" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="functions" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCommonFunctions.map((item, index) => (
              <motion.div key={item.name} variants={itemVariants} className="h-full">
                <Card className="h-full border-muted hover:border-primary/50 transition-all duration-300 animate-glow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-mono">{item.name}</CardTitle>
                      <Badge variant="outline" className="font-mono">
                        {item.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={item.example} language="asm" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="memory" className="mt-0">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="mb-6">
              <Card className="border-primary/20 animate-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                    Gestion de la mémoire en assembleur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>L'assembleur offre un contrôle total sur la mémoire, mais sans protection</li>
                    <li>Les sections .data et .bss permettent d'allouer de la mémoire statique</li>
                    <li>La pile (stack) est utilisée pour les variables locales et les appels de fonction</li>
                    <li>
                      Les appels système (brk, mmap) ou les fonctions C (malloc, free) permettent l'allocation dynamique
                    </li>
                    <li>La gestion manuelle de la mémoire est nécessaire pour éviter les fuites</li>
                    <li>Les registres sont utilisés pour un accès rapide aux données fréquemment utilisées</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {filteredMemoryExamples.map((item, index) => (
              <motion.div key={item.title} variants={itemVariants} className="h-full">
                <Card className="border-muted hover:border-primary/50 transition-all duration-300 animate-glow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={item.example} language="asm" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
