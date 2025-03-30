"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"

export default function CppLanguagePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Format specifiers for cout/cin
  const formatSpecifiers = [
    {
      specifier: "std::cout",
      description: "Flux de sortie standard",
      example: 'std::cout << "Hello, World!" << std::endl;',
    },
    {
      specifier: "std::cin",
      description: "Flux d'entrée standard",
      example: "int age;\nstd::cin >> age;",
    },
    {
      specifier: "std::cerr",
      description: "Flux d'erreur standard",
      example: 'std::cerr << "Error: " << strerror(errno) << std::endl;',
    },
    {
      specifier: "std::clog",
      description: "Flux de journalisation standard",
      example: 'std::clog << "Log message" << std::endl;',
    },
    {
      specifier: "std::endl",
      description: "Manipulateur de fin de ligne",
      example: 'std::cout << "Line 1" << std::endl << "Line 2" << std::endl;',
    },
    {
      specifier: "std::setw",
      description: "Définir la largeur du champ",
      example: "#include <iomanip>\n\nstd::cout << std::setw(10) << 42 << std::endl;",
    },
    {
      specifier: "std::setprecision",
      description: "Définir la précision des nombres à virgule flottante",
      example: "#include <iomanip>\n\nstd::cout << std::setprecision(3) << 3.14159 << std::endl;",
    },
    {
      specifier: "std::fixed",
      description: "Utiliser la notation à virgule fixe",
      example: "#include <iomanip>\n\nstd::cout << std::fixed << std::setprecision(2) << 3.14159 << std::endl;",
    },
    {
      specifier: "std::scientific",
      description: "Utiliser la notation scientifique",
      example: "#include <iomanip>\n\nstd::cout << std::scientific << 3.14159e+10 << std::endl;",
    },
    {
      specifier: "std::hex",
      description: "Afficher en hexadécimal",
      example: 'std::cout << std::hex << 255 << std::endl; // affiche "ff"',
    },
    {
      specifier: "std::dec",
      description: "Afficher en décimal",
      example: 'std::cout << std::dec << 0xff << std::endl; // affiche "255"',
    },
    {
      specifier: "std::oct",
      description: "Afficher en octal",
      example: 'std::cout << std::oct << 64 << std::endl; // affiche "100"',
    },
    {
      specifier: "std::boolalpha",
      description: "Afficher les booléens sous forme de texte",
      example: 'std::cout << std::boolalpha << true << std::endl; // affiche "true"',
    },
  ]

  // Data types
  const dataTypes = [
    {
      type: "bool",
      size: "1 byte",
      range: "true ou false",
      example: "bool isValid = true;",
    },
    {
      type: "char",
      size: "1 byte",
      range: "-128 à 127 ou 0 à 255",
      example: "char c = 'A';",
    },
    {
      type: "unsigned char",
      size: "1 byte",
      range: "0 à 255",
      example: "unsigned char c = 255;",
    },
    {
      type: "short",
      size: "2 bytes",
      range: "-32,768 à 32,767",
      example: "short s = 32767;",
    },
    {
      type: "unsigned short",
      size: "2 bytes",
      range: "0 à 65,535",
      example: "unsigned short s = 65535;",
    },
    {
      type: "int",
      size: "4 bytes",
      range: "-2,147,483,648 à 2,147,483,647",
      example: "int i = 42;",
    },
    {
      type: "unsigned int",
      size: "4 bytes",
      range: "0 à 4,294,967,295",
      example: "unsigned int i = 4294967295U;",
    },
    {
      type: "long",
      size: "4 ou 8 bytes",
      range: "Dépend de la plateforme",
      example: "long l = 2147483647L;",
    },
    {
      type: "unsigned long",
      size: "4 ou 8 bytes",
      range: "Dépend de la plateforme",
      example: "unsigned long l = 4294967295UL;",
    },
    {
      type: "long long",
      size: "8 bytes",
      range: "-9,223,372,036,854,775,808 à 9,223,372,036,854,775,807",
      example: "long long ll = 9223372036854775807LL;",
    },
    {
      type: "float",
      size: "4 bytes",
      range: "±3.4E±38 (6-7 chiffres significatifs)",
      example: "float f = 3.14159f;",
    },
    {
      type: "double",
      size: "8 bytes",
      range: "±1.7E±308 (15-16 chiffres significatifs)",
      example: "double d = 3.14159265358979;",
    },
    {
      type: "std::string",
      size: "Variable",
      range: "Chaîne de caractères dynamique",
      example: '#include <string>\n\nstd::string name = "John Doe";',
    },
    {
      type: "std::vector<T>",
      size: "Variable",
      range: "Tableau dynamique d'éléments de type T",
      example: "#include <vector>\n\nstd::vector<int> numbers = {1, 2, 3, 4, 5};",
    },
    {
      type: "std::array<T, N>",
      size: "N * sizeof(T)",
      range: "Tableau fixe de N éléments de type T",
      example: "#include <array>\n\nstd::array<int, 5> numbers = {1, 2, 3, 4, 5};",
    },
  ]

  // Control structures
  const controlStructures = [
    {
      name: "if-else",
      description: "Exécution conditionnelle",
      example: `if (x > 0) {
  std::cout << "Positif" << std::endl;
} else if (x < 0) {
  std::cout << "Négatif" << std::endl;
} else {
  std::cout << "Zéro" << std::endl;
}`,
    },
    {
      name: "switch",
      description: "Sélection multi-voies",
      example: `switch (day) {
case 1:
  std::cout << "Lundi" << std::endl;
  break;
case 2:
  std::cout << "Mardi" << std::endl;
  break;
default:
  std::cout << "Autre jour" << std::endl;
  break;
}`,
    },
    {
      name: "for",
      description: "Boucle avec compteur",
      example: `for (int i = 0; i < 10; i++) {
  std::cout << i << std::endl;
}`,
    },
    {
      name: "range-based for",
      description: "Boucle sur les éléments d'un conteneur (C++11)",
      example: `std::vector<int> numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
  std::cout << num << std::endl;
}`,
    },
    {
      name: "while",
      description: "Boucle conditionnelle",
      example: `int count = 5;
while (count > 0) {
  std::cout << count << std::endl;
  count--;
}`,
    },
    {
      name: "do-while",
      description: "Boucle conditionnelle (exécutée au moins une fois)",
      example: `int count = 5;
do {
  std::cout << count << std::endl;
  count--;
} while (count > 0);`,
    },
    {
      name: "break",
      description: "Sortir d'une boucle ou d'un switch",
      example: `for (int i = 0; i < 10; i++) {
  if (i == 5) {
    break;  // Sortie de la boucle
  }
  std::cout << i << std::endl;
}`,
    },
    {
      name: "continue",
      description: "Passer à l'itération suivante",
      example: `for (int i = 0; i < 10; i++) {
  if (i % 2 == 0) {
    continue;  // Passer à l'itération suivante
  }
  std::cout << i << std::endl;  // Affiche uniquement les nombres impairs
}`,
    },
    {
      name: "try-catch",
      description: "Gestion des exceptions",
      example: `try {
  // Code qui peut lancer une exception
  throw std::runtime_error("Une erreur s'est produite");
} catch (const std::exception& e) {
  std::cerr << "Exception: " << e.what() << std::endl;
} catch (...) {
  std::cerr << "Exception inconnue" << std::endl;
}`,
    },
  ]

  // Common functions
  const commonFunctions = [
    {
      name: "std::cout",
      header: "iostream",
      description: "Afficher du texte sur la sortie standard",
      example: `#include <iostream>\n\nstd::cout << "Hello, World!" << std::endl;`,
    },
    {
      name: "std::cin",
      header: "iostream",
      description: "Lire des entrées depuis l'entrée standard",
      example: `#include <iostream>\n\nint age;\nstd::cin >> age;`,
    },
    {
      name: "std::getline",
      header: "string",
      description: "Lire une ligne de texte",
      example: `#include <iostream>\n#include <string>\n\nstd::string line;\nstd::getline(std::cin, line);`,
    },
    {
      name: "std::to_string",
      header: "string",
      description: "Convertir un nombre en chaîne de caractères",
      example: `#include <string>\n\nint num = 42;\nstd::string str = std::to_string(num);`,
    },
    {
      name: "std::stoi, std::stod",
      header: "string",
      description: "Convertir une chaîne en nombre",
      example: `#include <string>\n\nstd::string str = "42";\nint num = std::stoi(str);\ndouble d = std::stod("3.14");`,
    },
    {
      name: "std::sort",
      header: "algorithm",
      description: "Trier un conteneur",
      example: `#include <algorithm>\n#include <vector>\n\nstd::vector<int> v = {5, 2, 8, 1, 3};\nstd::sort(v.begin(), v.end());`,
    },
    {
      name: "std::find",
      header: "algorithm",
      description: "Trouver un élément dans un conteneur",
      example: `#include <algorithm>\n#include <vector>\n\nstd::vector<int> v = {1, 2, 3, 4, 5};\nauto it = std::find(v.begin(), v.end(), 3);\nif (it != v.end()) {\n  std::cout << "Found: " << *it << std::endl;\n}`,
    },
    {
      name: "std::copy",
      header: "algorithm",
      description: "Copier des éléments d'un conteneur à un autre",
      example: `#include <algorithm>\n#include <vector>\n\nstd::vector<int> src = {1, 2, 3};\nstd::vector<int> dest(3);\nstd::copy(src.begin(), src.end(), dest.begin());`,
    },
    {
      name: "std::transform",
      header: "algorithm",
      description: "Appliquer une fonction à chaque élément d'un conteneur",
      example: `#include <algorithm>\n#include <vector>\n\nstd::vector<int> v = {1, 2, 3, 4, 5};\nstd::vector<int> result(v.size());\nstd::transform(v.begin(), v.end(), result.begin(), [](int x) { return x * x; });`,
    },
    {
      name: "std::accumulate",
      header: "numeric",
      description: "Calculer la somme des éléments d'un conteneur",
      example: `#include <numeric>\n#include <vector>\n\nstd::vector<int> v = {1, 2, 3, 4, 5};\nint sum = std::accumulate(v.begin(), v.end(), 0);`,
    },
    {
      name: "std::ifstream, std::ofstream",
      header: "fstream",
      description: "Lire et écrire des fichiers",
      example: `#include <fstream>\n#include <string>\n\n// Écrire dans un fichier\nstd::ofstream outFile("data.txt");\noutFile << "Hello, World!" << std::endl;\noutFile.close();\n\n// Lire depuis un fichier\nstd::ifstream inFile("data.txt");\nstd::string line;\nwhile (std::getline(inFile, line)) {\n  std::cout << line << std::endl;\n}\ninFile.close();`,
    },
  ]

  // Memory management examples
  const memoryExamples = [
    {
      title: "Allocation dynamique avec new/delete",
      description: "Allouer et libérer de la mémoire pour un seul objet",
      example: `#include <iostream>

int main() {
  // Allocation
  int* ptr = new int;
  
  // Utilisation
  *ptr = 42;
  std::cout << *ptr << std::endl;
  
  // Libération
  delete ptr;
  ptr = nullptr;  // Bonne pratique
  
  return 0;
}`,
    },
    {
      title: "Allocation dynamique de tableaux",
      description: "Allouer et libérer de la mémoire pour un tableau",
      example: `#include <iostream>

int main() {
  int size = 5;
  
  // Allocation
  int* arr = new int[size];
  
  // Utilisation
  for (int i = 0; i < size; i++) {
    arr[i] = i * 10;
    std::cout << arr[i] << " ";
  }
  std::cout << std::endl;
  
  // Libération
  delete[] arr;  // Notez les crochets []
  arr = nullptr;
  
  return 0;
}`,
    },
    {
      title: "Smart Pointers: unique_ptr",
      description: "Pointeur intelligent avec propriété exclusive",
      example: `#include <iostream>
#include <memory>

int main() {
  // Création et initialisation automatique
  std::unique_ptr<int> ptr = std::make_unique<int>(42);
  
  // Utilisation
  std::cout << *ptr << std::endl;
  *ptr = 100;
  std::cout << *ptr << std::endl;
  
  // Libération automatique à la fin de la portée
  return 0;
}`,
    },
    {
      title: "Smart Pointers: shared_ptr",
      description: "Pointeur intelligent avec comptage de références",
      example: `#include <iostream>
#include <memory>

int main() {
  // Création d'un shared_ptr
  std::shared_ptr<int> ptr1 = std::make_shared<int>(42);
  
  {
    // Création d'un second shared_ptr qui partage la propriété
    std::shared_ptr<int> ptr2 = ptr1;
    
    std::cout << "Nombre de références: " << ptr1.use_count() << std::endl;  // 2
    std::cout << *ptr2 << std::endl;  // 42
  }  // ptr2 est détruit ici, mais la mémoire n'est pas libérée
  
  std::cout << "Nombre de références: " << ptr1.use_count() << std::endl;  // 1
  std::cout << *ptr1 << std::endl;  // 42
  
  return 0;  // La mémoire est libérée ici quand ptr1 est détruit
}`,
    },
    {
      title: "RAII (Resource Acquisition Is Initialization)",
      description: "Gestion des ressources basée sur la durée de vie des objets",
      example: `#include <iostream>
#include <fstream>
#include <string>

class FileHandler {
private:
  std::ofstream file;
  
public:
  FileHandler(const std::string& filename) {
    file.open(filename);
    if (!file.is_open()) {
      throw std::runtime_error("Impossible d'ouvrir le fichier");
    }
    std::cout << "Fichier ouvert" << std::endl;
  }
  
  void write(const std::string& text) {
    file << text << std::endl;
  }
  
  ~FileHandler() {
    if (file.is_open()) {
      file.close();
      std::cout << "Fichier fermé" << std::endl;
    }
  }
};

int main() {
  try {
    FileHandler handler("test.txt");
    handler.write("Hello, World!");
    // Le fichier sera automatiquement fermé quand handler sera détruit
  } catch (const std::exception& e) {
    std::cerr << "Erreur: " << e.what() << std::endl;
  }
  
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
            <Code className="h-16 w-16 text-primary" />
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Langage C++
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          L'essentiel du langage C++: syntaxe, fonctions et exemples
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

      <Tabs defaultValue="cout" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger
            value="cout"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Format cout/cin
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
            Fonctions communes
          </TabsTrigger>
          <TabsTrigger
            value="memory"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Gestion mémoire
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cout" className="mt-0">
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
                    <CodeBlock code={item.example} language="cpp" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="types" className="mt-0">
          <Card className="animate-glow">
            <CardHeader>
              <CardTitle>Types de données en C++</CardTitle>
              <CardDescription>
                Les types de données fondamentaux en C++ avec leur taille et plage de valeurs
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
                    <CodeBlock code={item.example} language="cpp" />
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
                    <CodeBlock code={item.example} language="cpp" />
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
                    Bonnes pratiques de gestion mémoire en C++
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Préférez les smart pointers (std::unique_ptr, std::shared_ptr) aux pointeurs bruts</li>
                    <li>Utilisez RAII (Resource Acquisition Is Initialization) pour gérer les ressources</li>
                    <li>Évitez les fuites de mémoire en libérant toute la mémoire allouée</li>
                    <li>Suivez la règle des trois/cinq/zéro pour la gestion des ressources dans les classes</li>
                    <li>Utilisez std::vector et autres conteneurs STL au lieu des tableaux C</li>
                    <li>Initialisez les pointeurs à nullptr après les avoir libérés</li>
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
                    <CodeBlock code={item.example} language="cpp" />
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

