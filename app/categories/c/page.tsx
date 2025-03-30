"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileCode, Search, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useLanguage } from "@/contexts/language-context"
import CodeBlock from "@/components/code-block"

export default function CLanguagePage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  // Format specifiers for printf/scanf
  const formatSpecifiers = [
    {
      specifier: "%d",
      description: language === "fr" ? "Entier signé (int)" : "Signed integer (int)",
      example: 'printf("Valeur: %d\\n", 42);',
    },
    {
      specifier: "%u",
      description: language === "fr" ? "Entier non signé (unsigned int)" : "Unsigned integer (unsigned int)",
      example: 'printf("Valeur: %u\\n", 42u);',
    },
    {
      specifier: "%f",
      description: language === "fr" ? "Nombre à virgule flottante (float, double)" : "Floating point (float, double)",
      example: 'printf("Valeur: %f\\n", 3.14159);',
    },
    {
      specifier: "%e",
      description: language === "fr" ? "Notation scientifique" : "Scientific notation",
      example: 'printf("Valeur: %e\\n", 3.14159);',
    },
    {
      specifier: "%g",
      description: language === "fr" ? "Utilise %f ou %e selon la valeur" : "Uses %f or %e depending on value",
      example: 'printf("Valeur: %g\\n", 0.000123);',
    },
    {
      specifier: "%c",
      description: language === "fr" ? "Caractère" : "Character",
      example: "printf(\"Caractère: %c\\n\", 'A');",
    },
    {
      specifier: "%s",
      description: language === "fr" ? "Chaîne de caractères" : "String",
      example: 'printf("Texte: %s\\n", "Hello");',
    },
    {
      specifier: "%p",
      description: language === "fr" ? "Adresse mémoire (pointeur)" : "Memory address (pointer)",
      example: 'printf("Adresse: %p\\n", &variable);',
    },
    {
      specifier: "%x",
      description: language === "fr" ? "Hexadécimal (minuscules)" : "Hexadecimal (lowercase)",
      example: 'printf("Hex: %x\\n", 255);',
    },
    {
      specifier: "%X",
      description: language === "fr" ? "Hexadécimal (majuscules)" : "Hexadecimal (uppercase)",
      example: 'printf("Hex: %X\\n", 255);',
    },
    {
      specifier: "%o",
      description: language === "fr" ? "Octal" : "Octal",
      example: 'printf("Octal: %o\\n", 64);',
    },
    {
      specifier: "%.nf",
      description: language === "fr" ? "Flottant avec n décimales" : "Float with n decimal places",
      example: 'printf("Pi: %.2f\\n", 3.14159);',
    },
    {
      specifier: "%n$",
      description: language === "fr" ? "Accès positionnel aux arguments" : "Positional access to arguments",
      example: 'printf("%2$s %1$s\\n", "second", "first");',
    },
  ]

  // Data types
  const dataTypes = [
    {
      type: "char",
      size: "1 byte",
      range: language === "fr" ? "-128 à 127 ou 0 à 255" : "-128 to 127 or 0 to 255",
      example: "char c = 'A';",
    },
    {
      type: "unsigned char",
      size: "1 byte",
      range: "0 to 255",
      example: "unsigned char c = 255;",
    },
    {
      type: "short",
      size: "2 bytes",
      range: language === "fr" ? "-32,768 à 32,767" : "-32,768 to 32,767",
      example: "short s = 32767;",
    },
    {
      type: "unsigned short",
      size: "2 bytes",
      range: "0 to 65,535",
      example: "unsigned short s = 65535;",
    },
    {
      type: "int",
      size: "4 bytes",
      range: language === "fr" ? "-2,147,483,648 à 2,147,483,647" : "-2,147,483,648 to 2,147,483,647",
      example: "int i = 42;",
    },
    {
      type: "unsigned int",
      size: "4 bytes",
      range: "0 to 4,294,967,295",
      example: "unsigned int i = 4294967295;",
    },
    {
      type: "long",
      size: "4 or 8 bytes",
      range: language === "fr" ? "Dépend de la plateforme" : "Platform dependent",
      example: "long l = 2147483647L;",
    },
    {
      type: "unsigned long",
      size: "4 or 8 bytes",
      range: language === "fr" ? "Dépend de la plateforme" : "Platform dependent",
      example: "unsigned long l = 4294967295UL;",
    },
    {
      type: "long long",
      size: "8 bytes",
      range:
        language === "fr"
          ? "-9,223,372,036,854,775,808 à 9,223,372,036,854,775,807"
          : "-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807",
      example: "long long ll = 9223372036854775807LL;",
    },
    {
      type: "float",
      size: "4 bytes",
      range: language === "fr" ? "±3.4E±38 (6-7 chiffres significatifs)" : "±3.4E±38 (6-7 significant digits)",
      example: "float f = 3.14159f;",
    },
    {
      type: "double",
      size: "8 bytes",
      range: language === "fr" ? "±1.7E±308 (15-16 chiffres significatifs)" : "±1.7E±308 (15-16 significant digits)",
      example: "double d = 3.14159265358979;",
    },
    {
      type: "long double",
      size: "8, 12, or 16 bytes",
      range: language === "fr" ? "Dépend de la plateforme" : "Platform dependent",
      example: "long double ld = 3.14159265358979L;",
    },
    {
      type: "bool",
      size: "1 byte",
      range: "true or false",
      example: "#include <stdbool.h>\nbool flag = true;",
    },
  ]

  // Control structures
  const controlStructures = [
    {
      name: "if-else",
      description: language === "fr" ? "Exécution conditionnelle" : "Conditional execution",
      example: `if (x > 0) {
  printf("Positif\\n");
} else if (x < 0) {
  printf("Négatif\\n");
} else {
  printf("Zéro\\n");
}`,
    },
    {
      name: "switch",
      description: language === "fr" ? "Sélection multi-voies" : "Multi-way selection",
      example: `switch (day) {
  case 1:
    printf("Lundi\\n");
    break;
  case 2:
    printf("Mardi\\n");
    break;
  default:
    printf("Autre jour\\n");
    break;
}`,
    },
    {
      name: "for",
      description: language === "fr" ? "Boucle avec compteur" : "Counter-based loop",
      example: `for (int i = 0; i < 10; i++) {
  printf("%d\\n", i);
}`,
    },
    {
      name: "while",
      description: language === "fr" ? "Boucle conditionnelle" : "Conditional loop",
      example: `while (count > 0) {
  printf("%d\\n", count);
  count--;
}`,
    },
    {
      name: "do-while",
      description:
        language === "fr"
          ? "Boucle conditionnelle (exécutée au moins une fois)"
          : "Conditional loop (executed at least once)",
      example: `do {
  printf("%d\\n", count);
  count--;
} while (count > 0);`,
    },
    {
      name: "break",
      description: language === "fr" ? "Sortir d'une boucle ou d'un switch" : "Exit a loop or switch",
      example: `for (int i = 0; i < 10; i++) {
  if (i == 5) {
    break;  // Sortie de la boucle
  }
  printf("%d\\n", i);
}`,
    },
    {
      name: "continue",
      description: language === "fr" ? "Passer à l'itération suivante" : "Skip to next iteration",
      example: `for (int i = 0; i < 10; i++) {
  if (i % 2 == 0) {
    continue;  // Passer à l'itération suivante
  }
  printf("%d\\n", i);  // Affiche uniquement les nombres impairs
}`,
    },
    {
      name: "goto",
      description: language === "fr" ? "Saut inconditionnel (à éviter)" : "Unconditional jump (avoid using)",
      example: `int i = 0;
start:
  printf("%d\\n", i);
  i++;
  if (i < 5) {
    goto start;
  }`,
    },
  ]

  // Common functions
  const commonFunctions = [
    {
      name: "printf",
      header: "stdio.h",
      description: language === "fr" ? "Afficher du texte formaté" : "Print formatted text",
      example: `printf("Hello, %s! You are %d years old.\\n", name, age);`,
    },
    {
      name: "scanf",
      header: "stdio.h",
      description: language === "fr" ? "Lire des entrées formatées" : "Read formatted input",
      example: `int age;
scanf("%d", &age);`,
    },
    {
      name: "fgets",
      header: "stdio.h",
      description:
        language === "fr" ? "Lire une ligne de texte (plus sûr que gets)" : "Read a line of text (safer than gets)",
      example: `char buffer[100];
fgets(buffer, sizeof(buffer), stdin);`,
    },
    {
      name: "strlen",
      header: "string.h",
      description: language === "fr" ? "Calculer la longueur d'une chaîne" : "Calculate string length",
      example: `size_t length = strlen(str);`,
    },
    {
      name: "strcpy",
      header: "string.h",
      description: language === "fr" ? "Copier une chaîne" : "Copy a string",
      example: `char dest[100];
strcpy(dest, source);`,
    },
    {
      name: "strcat",
      header: "string.h",
      description: language === "fr" ? "Concaténer des chaînes" : "Concatenate strings",
      example: `strcat(dest, source);  // Ajoute source à la fin de dest`,
    },
    {
      name: "strcmp",
      header: "string.h",
      description: language === "fr" ? "Comparer des chaînes" : "Compare strings",
      example: `if (strcmp(str1, str2) == 0) {
  printf("Les chaînes sont identiques\\n");
}`,
    },
    {
      name: "malloc",
      header: "stdlib.h",
      description: language === "fr" ? "Allouer de la mémoire" : "Allocate memory",
      example: `int* arr = (int*)malloc(10 * sizeof(int));`,
    },
    {
      name: "free",
      header: "stdlib.h",
      description: language === "fr" ? "Libérer la mémoire allouée" : "Free allocated memory",
      example: `free(arr);`,
    },
    {
      name: "exit",
      header: "stdlib.h",
      description: language === "fr" ? "Terminer le programme" : "Terminate the program",
      example: `exit(EXIT_SUCCESS);  // ou exit(0)`,
    },
    {
      name: "fopen",
      header: "stdio.h",
      description: language === "fr" ? "Ouvrir un fichier" : "Open a file",
      example: `FILE* file = fopen("data.txt", "r");  // "r" pour lecture`,
    },
    {
      name: "fclose",
      header: "stdio.h",
      description: language === "fr" ? "Fermer un fichier" : "Close a file",
      example: `fclose(file);`,
    },
  ]

  // Memory management examples
  const memoryExamples = [
    {
      title: language === "fr" ? "Allocation dynamique d'un tableau" : "Dynamic array allocation",
      description:
        language === "fr"
          ? "Allouer un tableau d'entiers et le libérer correctement"
          : "Allocate an array of integers and free it properly",
      example: `#include <stdio.h>
#include <stdlib.h>

int main() {
  int size = 5;
  
  // Allocation
  int* arr = (int*)malloc(size * sizeof(int));
  
  // Vérification
  if (arr == NULL) {
    printf("Erreur d'allocation\\n");
    return 1;
  }
  
  // Utilisation
  for (int i = 0; i < size; i++) {
    arr[i] = i * 10;
    printf("%d\\n", arr[i]);
  }
  
  // Libération
  free(arr);
  arr = NULL;  // Bonne pratique
  
  return 0;
}`,
    },
    {
      title: language === "fr" ? "Allocation d'une chaîne de caractères" : "String allocation",
      description:
        language === "fr" ? "Allouer de la mémoire pour une chaîne de caractères" : "Allocate memory for a string",
      example: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
  const char* source = "Hello, World!";
  
  // Allocation (+1 pour le caractère nul)
  char* str = (char*)malloc(strlen(source) + 1);
  
  if (str == NULL) {
    return 1;
  }
  
  // Copie
  strcpy(str, source);
  printf("%s\\n", str);
  
  // Libération
  free(str);
  
  return 0;
}`,
    },
    {
      title: language === "fr" ? "Structure dynamique" : "Dynamic structure",
      description:
        language === "fr"
          ? "Allouer une structure et y accéder via un pointeur"
          : "Allocate a structure and access it via pointer",
      example: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
  char name[50];
  int age;
} Person;

int main() {
  // Allocation
  Person* person = (Person*)malloc(sizeof(Person));
  
  if (person == NULL) {
    return 1;
  }
  
  // Initialisation et accès
  strcpy(person->name, "John");
  person->age = 30;
  
  printf("Name: %s, Age: %d\\n", person->name, person->age);
  
  // Libération
  free(person);
  
  return 0;
}`,
    },
    {
      title: language === "fr" ? "Tableau de structures" : "Array of structures",
      description: language === "fr" ? "Allouer un tableau de structures" : "Allocate an array of structures",
      example: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
  char name[50];
  int age;
} Person;

int main() {
  int count = 3;
  
  // Allocation
  Person* people = (Person*)malloc(count * sizeof(Person));
  
  if (people == NULL) {
    return 1;
  }
  
  // Initialisation
  strcpy(people[0].name, "Alice");
  people[0].age = 25;
  
  strcpy(people[1].name, "Bob");
  people[1].age = 30;
  
  strcpy(people[2].name, "Charlie");
  people[2].age = 35;
  
  // Accès
  for (int i = 0; i < count; i++) {
    printf("%s: %d\\n", people[i].name, people[i].age);
  }
  
  // Libération
  free(people);
  
  return 0;
}`,
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
      item.example.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <FileCode className="h-16 w-16 text-primary" />
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {language === "fr" ? "Langage C" : "C Language"}
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {language === "fr"
            ? "L'essentiel du langage C: syntaxe, fonctions et exemples"
            : "The essentials of C language: syntax, functions, and examples"}
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
            placeholder={language === "fr" ? "Rechercher..." : "Search..."}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <Tabs defaultValue="printf" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger
            value="printf"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {language === "fr" ? "Format printf" : "Printf Format"}
          </TabsTrigger>
          <TabsTrigger
            value="types"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {language === "fr" ? "Types de données" : "Data Types"}
          </TabsTrigger>
          <TabsTrigger
            value="control"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {language === "fr" ? "Structures de contrôle" : "Control Structures"}
          </TabsTrigger>
          <TabsTrigger
            value="functions"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {language === "fr" ? "Fonctions communes" : "Common Functions"}
          </TabsTrigger>
          <TabsTrigger
            value="memory"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {language === "fr" ? "Gestion mémoire" : "Memory Management"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="printf" className="mt-0">
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
                    <CodeBlock code={item.example} language="c" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="types" className="mt-0">
          <Card className="animate-glow">
            <CardHeader>
              <CardTitle>{language === "fr" ? "Types de données en C" : "C Data Types"}</CardTitle>
              <CardDescription>
                {language === "fr"
                  ? "Les types de données fondamentaux en C avec leur taille et plage de valeurs"
                  : "Fundamental data types in C with their size and range of values"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-4 font-medium">{language === "fr" ? "Type" : "Type"}</th>
                      <th className="text-left py-2 px-4 font-medium">{language === "fr" ? "Taille" : "Size"}</th>
                      <th className="text-left py-2 px-4 font-medium">{language === "fr" ? "Plage" : "Range"}</th>
                      <th className="text-left py-2 px-4 font-medium">{language === "fr" ? "Exemple" : "Example"}</th>
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
                    <CodeBlock code={item.example} language="c" />
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
                        {item.header}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={item.example} language="c" />
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
                    <Info className="h-5 w-5 text-primary" />
                    {language === "fr" ? "Bonnes pratiques de gestion mémoire" : "Memory Management Best Practices"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {language === "fr"
                        ? "Toujours vérifier le retour de malloc/calloc (NULL en cas d'échec)"
                        : "Always check the return value of malloc/calloc (NULL on failure)"}
                    </li>
                    <li>
                      {language === "fr"
                        ? "Libérer la mémoire avec free() quand elle n'est plus nécessaire"
                        : "Free memory with free() when it's no longer needed"}
                    </li>
                    <li>
                      {language === "fr"
                        ? "Mettre les pointeurs à NULL après les avoir libérés"
                        : "Set pointers to NULL after freeing them"}
                    </li>
                    <li>
                      {language === "fr"
                        ? "Éviter les fuites de mémoire en libérant toute la mémoire allouée"
                        : "Avoid memory leaks by freeing all allocated memory"}
                    </li>
                    <li>
                      {language === "fr"
                        ? "Attention aux dépassements de tampon (buffer overflows)"
                        : "Be careful with buffer overflows"}
                    </li>
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
                    <CodeBlock code={item.example} language="c" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                <Info className="h-4 w-4" />
                {language === "fr"
                  ? "Astuce: Utilisez la recherche pour filtrer le contenu"
                  : "Tip: Use the search to filter content"}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {language === "fr"
                  ? "La recherche fonctionne sur tous les onglets simultanément"
                  : "Search works across all tabs simultaneously"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </div>
  )
}

