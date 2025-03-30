"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Coffee, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"

export default function JavaLanguagePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Format specifiers for printf
  const formatSpecifiers = [
    {
      specifier: "%d",
      description: "Entier signé (int)",
      example: 'System.out.printf("Valeur: %d\\n", 42);',
    },
    {
      specifier: "%f",
      description: "Nombre à virgule flottante (float, double)",
      example: 'System.out.printf("Valeur: %f\\n", 3.14159);',
    },
    {
      specifier: "%.2f",
      description: "Nombre à virgule flottante avec précision",
      example: 'System.out.printf("Valeur: %.2f\\n", 3.14159);',
    },
    {
      specifier: "%e",
      description: "Notation scientifique",
      example: 'System.out.printf("Valeur: %e\\n", 3.14159);',
    },
    {
      specifier: "%s",
      description: "Chaîne de caractères",
      example: 'System.out.printf("Texte: %s\\n", "Hello");',
    },
    {
      specifier: "%c",
      description: "Caractère",
      example: "System.out.printf(\"Caractère: %c\\n\", 'A');",
    },
    {
      specifier: "%b",
      description: "Booléen",
      example: 'System.out.printf("Booléen: %b\\n", true);',
    },
    {
      specifier: "%x",
      description: "Hexadécimal (minuscules)",
      example: 'System.out.printf("Hex: %x\\n", 255);',
    },
    {
      specifier: "%X",
      description: "Hexadécimal (majuscules)",
      example: 'System.out.printf("Hex: %X\\n", 255);',
    },
    {
      specifier: "%o",
      description: "Octal",
      example: 'System.out.printf("Octal: %o\\n", 64);',
    },
    {
      specifier: "%n",
      description: "Saut de ligne spécifique à la plateforme",
      example: 'System.out.printf("Ligne 1%nLigne 2");',
    },
    {
      specifier: "%tF",
      description: "Date au format ISO (yyyy-MM-dd)",
      example: 'import java.util.Date;\n\nSystem.out.printf("Date: %tF\\n", new Date());',
    },
    {
      specifier: "%tT",
      description: "Heure au format 24h (HH:mm:ss)",
      example: 'import java.util.Date;\n\nSystem.out.printf("Heure: %tT\\n", new Date());',
    },
    {
      specifier: "String.format()",
      description: "Méthode statique pour formater des chaînes",
      example: 'String message = String.format("Hello, %s! You are %d years old.", "John", 30);',
    },
  ]

  // Data types
  const dataTypes = [
    {
      type: "byte",
      size: "1 byte",
      range: "-128 à 127",
      example: "byte b = 100;",
    },
    {
      type: "short",
      size: "2 bytes",
      range: "-32,768 à 32,767",
      example: "short s = 10000;",
    },
    {
      type: "int",
      size: "4 bytes",
      range: "-2,147,483,648 à 2,147,483,647",
      example: "int i = 100000;",
    },
    {
      type: "long",
      size: "8 bytes",
      range: "-9,223,372,036,854,775,808 à 9,223,372,036,854,775,807",
      example: "long l = 100000L;",
    },
    {
      type: "float",
      size: "4 bytes",
      range: "±3.4E±38 (6-7 chiffres significatifs)",
      example: "float f = 3.14f;",
    },
    {
      type: "double",
      size: "8 bytes",
      range: "±1.7E±308 (15-16 chiffres significatifs)",
      example: "double d = 3.14159;",
    },
    {
      type: "boolean",
      size: "1 bit",
      range: "true ou false",
      example: "boolean flag = true;",
    },
    {
      type: "char",
      size: "2 bytes",
      range: "0 à 65,535 (caractère Unicode)",
      example: "char c = 'A';",
    },
    {
      type: "String",
      size: "Variable",
      range: "Chaîne de caractères (immuable)",
      example: 'String s = "Hello";',
    },
    {
      type: "Integer",
      size: "Variable",
      range: "Wrapper pour int",
      example: "Integer i = Integer.valueOf(42);",
    },
    {
      type: "Double",
      size: "Variable",
      range: "Wrapper pour double",
      example: "Double d = Double.valueOf(3.14);",
    },
    {
      type: "ArrayList<T>",
      size: "Variable",
      range: "Liste dynamique d'éléments de type T",
      example: "ArrayList<String> list = new ArrayList<>();",
    },
    {
      type: "HashMap<K,V>",
      size: "Variable",
      range: "Table de hachage avec clés de type K et valeurs de type V",
      example: "HashMap<String, Integer> map = new HashMap<>();",
    },
    {
      type: "int[]",
      size: "4 bytes × taille",
      range: "Tableau d'entiers",
      example: "int[] numbers = {1, 2, 3, 4, 5};",
    },
  ]

  // Control structures
  const controlStructures = [
    {
      name: "if-else",
      description: "Exécution conditionnelle",
      example: `if (x > 0) {
  System.out.println("Positif");
} else if (x < 0) {
  System.out.println("Négatif");
} else {
  System.out.println("Zéro");
}`,
    },
    {
      name: "switch",
      description: "Sélection multi-voies",
      example: `switch (day) {
case 1:
  System.out.println("Lundi");
  break;
case 2:
  System.out.println("Mardi");
  break;
default:
  System.out.println("Autre jour");
  break;
}

// Switch expressions (Java 14+)
String result = switch (day) {
  case 1 -> "Lundi";
  case 2 -> "Mardi";
  default -> "Autre jour";
};`,
    },
    {
      name: "for loop",
      description: "Boucle avec compteur",
      example: `// Boucle for classique
for (int i = 0; i < 10; i++) {
  System.out.println(i);
}

// Boucle for-each (enhanced for)
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
  System.out.println(num);
}`,
    },
    {
      name: "while loop",
      description: "Boucle conditionnelle",
      example: `int count = 5;
while (count > 0) {
  System.out.println(count);
  count--;
}`,
    },
    {
      name: "do-while loop",
      description: "Boucle conditionnelle (exécutée au moins une fois)",
      example: `int count = 5;
do {
  System.out.println(count);
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
  System.out.println(i);
}`,
    },
    {
      name: "continue",
      description: "Passer à l'itération suivante",
      example: `for (int i = 0; i < 10; i++) {
  if (i % 2 == 0) {
    continue;  // Passer à l'itération suivante
  }
  System.out.println(i);  // Affiche uniquement les nombres impairs
}`,
    },
    {
      name: "try-catch-finally",
      description: "Gestion des exceptions",
      example: `try {
  // Code qui peut lancer une exception
  int result = 10 / 0;
} catch (ArithmeticException e) {
  System.out.println("Division par zéro: " + e.getMessage());
} catch (Exception e) {
  System.out.println("Autre exception: " + e.getMessage());
} finally {
  System.out.println("Ce bloc est toujours exécuté");
}`,
    },
    {
      name: "try-with-resources",
      description: "Gestion automatique des ressources (Java 7+)",
      example: `try (
  FileInputStream input = new FileInputStream("file.txt");
  BufferedReader reader = new BufferedReader(new InputStreamReader(input))
) {
  String line;
  while ((line = reader.readLine()) != null) {
    System.out.println(line);
  }
} catch (IOException e) {
  e.printStackTrace();
}
// Les ressources sont automatiquement fermées`,
    },
  ]

  // Common functions
  const commonFunctions = [
    {
      name: "System.out.println()",
      package: "java.lang",
      description: "Afficher du texte avec un saut de ligne",
      example: 'System.out.println("Hello, World!");',
    },
    {
      name: "System.out.print()",
      package: "java.lang",
      description: "Afficher du texte sans saut de ligne",
      example:
        'System.out.print("Hello, ");\
System.out.print("World!");',
    },
    {
      name: "System.out.printf()",
      package: "java.lang",
      description: "Afficher du texte formaté",
      example: 'System.out.printf("Hello, %s! You are %d years old.%n", "John", 30);',
    },
    {
      name: "String.format()",
      package: "java.lang",
      description: "Formater une chaîne de caractères",
      example: 'String message = String.format("Hello, %s! You are %d years old.", "John", 30);',
    },
    {
      name: "Integer.parseInt()",
      package: "java.lang",
      description: "Convertir une chaîne en entier",
      example:
        'String str = "42";\
int num = Integer.parseInt(str);',
    },
    {
      name: "Double.parseDouble()",
      package: "java.lang",
      description: "Convertir une chaîne en nombre à virgule flottante",
      example:
        'String str = "3.14";\
double num = Double.parseDouble(str);',
    },
    {
      name: "String.valueOf()",
      package: "java.lang",
      description: "Convertir une valeur en chaîne de caractères",
      example: "int num = 42;\nString str = String.valueOf(num);",
    },
    {
      name: "Math.random()",
      package: "java.lang",
      description: "Générer un nombre aléatoire entre 0.0 (inclus) et 1.0 (exclus)",
      example:
        "double random = Math.random();\
int randomInt = (int)(Math.random() * 100);  // Entre 0 et 99",
    },
    {
      name: "Math.max(), Math.min()",
      package: "java.lang",
      description: "Trouver le maximum ou le minimum de deux valeurs",
      example:
        "int max = Math.max(10, 20);  // 20\
int min = Math.min(10, 20);  // 10",
    },
    {
      name: "Arrays.sort()",
      package: "java.util",
      description: "Trier un tableau",
      example:
        "import java.util.Arrays;\n\nint[] numbers = {5, 2, 8, 1, 9};\nArrays.sort(numbers);  // [1, 2, 5, 8, 9]",
    },
    {
      name: "Collections.sort()",
      package: "java.util",
      description: "Trier une collection",
      example:
        'import java.util.ArrayList;\nimport java.util.Collections;\n\nArrayList<String> names = new ArrayList<>();\nnames.add("Charlie");\nnames.add("Alice");\nnames.add("Bob");\nCollections.sort(names);  // [Alice, Bob, Charlie]',
    },
    {
      name: "Files.readAllLines()",
      package: "java.nio.file",
      description: "Lire toutes les lignes d'un fichier",
      example:
        'import java.nio.file.Files;\nimport java.nio.file.Paths;\nimport java.util.List;\n\nList<String> lines = Files.readAllLines(Paths.get("file.txt"));\nfor (String line : lines) {\n  System.out.println(line);\n}',
    },
  ]

  // Memory management examples
  const memoryExamples = [
    {
      title: "Garbage Collection",
      description: "Java gère automatiquement la mémoire avec un ramasse-miettes",
      example: `// Les objets sans référence sont automatiquement collectés
Object obj = new Object();
obj = null;  // L'objet devient éligible pour la collecte

// Forcer la collecte (généralement déconseillé)
System.gc();`,
    },
    {
      title: "Finalizers",
      description: "Méthode appelée avant qu'un objet ne soit collecté (déconseillé)",
      example: `public class Resource {
  private FileHandle file;
  
  public Resource(String path) {
    file = new FileHandle(path);
  }
  
  @Override
  protected void finalize() throws Throwable {
    try {
      if (file != null) {
        file.close();
      }
    } finally {
      super.finalize();
    }
  }
}

// Note: finalize() est déprécié depuis Java 9
// Préférez les blocs try-with-resources ou les Cleaners`,
    },
    {
      title: "try-with-resources",
      description: "Gestion automatique des ressources (Java 7+)",
      example: `import java.io.*;

// Avant Java 7
BufferedReader reader = null;
try {
  reader = new BufferedReader(new FileReader("file.txt"));
  String line;
  while ((line = reader.readLine()) != null) {
    System.out.println(line);
  }
} catch (IOException e) {
  e.printStackTrace();
} finally {
  try {
    if (reader != null) {
      reader.close();
    }
  } catch (IOException e) {
    e.printStackTrace();
  }
}

// Avec try-with-resources (Java 7+)
try (BufferedReader reader2 = new BufferedReader(new FileReader("file.txt"))) {
  String line;
  while ((line = reader2.readLine()) != null) {
    System.out.println(line);
  }
} catch (IOException e) {
  e.printStackTrace();
}`,
    },
    {
      title: "WeakReference",
      description: "Référence qui n'empêche pas la collecte de l'objet",
      example: `import java.lang.ref.WeakReference;

// Création d'un objet et d'une référence faible
Object obj = new Object();
WeakReference<Object> weakRef = new WeakReference<>(obj);

// Accès à l'objet via la référence faible
Object retrieved = weakRef.get();
if (retrieved != null) {
  System.out.println("L'objet existe encore");
}

// Si l'objet original n'est plus référencé, il peut être collecté
obj = null;
System.gc();  // Suggère une collecte des déchets

// La référence faible peut maintenant retourner null
retrieved = weakRef.get();
if (retrieved == null) {
  System.out.println("L'objet a été collecté");
}`,
    },
    {
      title: "SoftReference",
      description: "Référence qui peut être collectée en cas de besoin de mémoire",
      example: `import java.lang.ref.SoftReference;

// Utile pour les caches sensibles à la mémoire
byte[] data = new byte[10 * 1024 * 1024];  // 10 MB
SoftReference<byte[]> softRef = new SoftReference<>(data);

// Libérer la référence forte
data = null;

// Plus tard, essayer de récupérer les données
byte[] cachedData = softRef.get();
if (cachedData != null) {
  System.out.println("Données en cache disponibles");
} else {
  System.out.println("Données en cache collectées, recréation nécessaire");
  data = new byte[10 * 1024 * 1024];
  softRef = new SoftReference<>(data);
}`,
    },
    {
      title: "PhantomReference et ReferenceQueue",
      description: "Notification lorsqu'un objet est collecté",
      example: `import java.lang.ref.PhantomReference;
import java.lang.ref.ReferenceQueue;

// File d'attente pour les références fantômes
ReferenceQueue<Object> refQueue = new ReferenceQueue<>();

// Créer un objet et une référence fantôme
Object obj = new Object();
PhantomReference<Object> phantomRef = new PhantomReference<>(obj, refQueue);

// La référence fantôme ne peut pas être utilisée pour accéder à l'objet
// phantomRef.get() retourne toujours null

// Rendre l'objet éligible pour la collecte
obj = null;
System.gc();

// Vérifier si la référence a été mise en file d'attente
try {
  // Bloquer jusqu'à ce qu'une référence soit disponible ou timeout
  Object ref = refQueue.remove(1000);
  if (ref != null) {
    System.out.println("L'objet a été collecté");
  }
} catch (InterruptedException e) {
  e.printStackTrace();
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
      item.example.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.package.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Coffee className="h-16 w-16 text-primary" />
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Langage Java
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          L'essentiel du langage Java: syntaxe, fonctions et exemples
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

      <Tabs defaultValue="printf" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger
            value="printf"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Format printf
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
                    <CodeBlock code={item.example} language="java" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="types" className="mt-0">
          <Card className="animate-glow">
            <CardHeader>
              <CardTitle>Types de données en Java</CardTitle>
              <CardDescription>
                Les types de données fondamentaux en Java avec leur taille et plage de valeurs
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
                    <CodeBlock code={item.example} language="java" />
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
                        {item.package}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={item.example} language="java" />
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
                    Gestion de la mémoire en Java
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Java utilise un ramasse-miettes (Garbage Collector) automatique</li>
                    <li>Les objets sont créés sur le tas (heap) et les variables primitives sur la pile (stack)</li>
                    <li>Les objets sans référence sont automatiquement collectés</li>
                    <li>Utilisez try-with-resources pour gérer les ressources qui doivent être fermées</li>
                    <li>Évitez les fuites de mémoire en supprimant les références aux objets inutilisés</li>
                    <li>Utilisez WeakReference, SoftReference ou PhantomReference pour des cas spécifiques</li>
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
                    <CodeBlock code={item.example} language="java" />
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

