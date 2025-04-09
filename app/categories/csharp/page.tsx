"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"

export default function CSharpLanguagePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Format specifiers for string formatting
  const formatSpecifiers = [
    {
      specifier: "{0}, {1}, ...",
      description: "Placeholders numérotés pour String.Format",
      example:
        'string name = "John";\nint age = 30;\nstring message = string.Format("Hello, {0}! You are {1} years old.", name, age);',
    },
    {
      specifier: '$"...{var}..."',
      description: "Chaînes interpolées (C# 6+)",
      example: 'string name = "John";\nint age = 30;\nstring message = $"Hello, {name}! You are {age} years old.";',
    },
    {
      specifier: "{0:d}",
      description: "Format entier décimal",
      example: 'int number = 42;\nstring formatted = string.Format("{0:d}", number);',
    },
    {
      specifier: "{0:f2}",
      description: "Format nombre à virgule flottante avec 2 décimales",
      example: 'double pi = 3.14159;\nstring formatted = string.Format("{0:f2}", pi); // "3.14"',
    },
    {
      specifier: "{0:c}",
      description: "Format monétaire",
      example:
        'decimal price = 123.45m;\nstring formatted = string.Format("{0:c}", price); // "$123.45" (dépend de la culture)',
    },
    {
      specifier: "{0:p}",
      description: "Format pourcentage",
      example: 'double ratio = 0.25;\nstring formatted = string.Format("{0:p}", ratio); // "25.00%"',
    },
    {
      specifier: "{0:n}",
      description: "Format nombre avec séparateurs de milliers",
      example: 'int number = 1234567;\nstring formatted = string.Format("{0:n0}", number); // "1,234,567"',
    },
    {
      specifier: "{0:x}",
      description: "Format hexadécimal (minuscules)",
      example: 'int number = 255;\nstring formatted = string.Format("{0:x}", number); // "ff"',
    },
    {
      specifier: "{0:X}",
      description: "Format hexadécimal (majuscules)",
      example: 'int number = 255;\nstring formatted = string.Format("{0:X}", number); // "FF"',
    },
    {
      specifier: "{0:dd/MM/yyyy}",
      description: "Format date personnalisé",
      example:
        'DateTime date = new DateTime(2023, 12, 31);\nstring formatted = string.Format("{0:dd/MM/yyyy}", date); // "31/12/2023"',
    },
    {
      specifier: "{0,10}",
      description: "Alignement à droite (largeur 10)",
      example: 'string text = "Hello";\nstring formatted = string.Format("{0,10}", text); // "     Hello"',
    },
    {
      specifier: "{0,-10}",
      description: "Alignement à gauche (largeur 10)",
      example: 'string text = "Hello";\nstring formatted = string.Format("{0,-10}", text); // "Hello     "',
    },
    {
      specifier: "Console.WriteLine()",
      description: "Afficher du texte sur la console",
      example:
        'Console.WriteLine("Hello, World!");\nConsole.WriteLine("Value: {0}", 42);\nConsole.WriteLine($"Value: {42}");',
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
      type: "byte",
      size: "1 byte",
      range: "0 à 255",
      example: "byte b = 255;",
    },
    {
      type: "sbyte",
      size: "1 byte",
      range: "-128 à 127",
      example: "sbyte sb = -128;",
    },
    {
      type: "char",
      size: "2 bytes",
      range: "U+0000 à U+FFFF (caractère Unicode)",
      example: "char c = 'A';",
    },
    {
      type: "short",
      size: "2 bytes",
      range: "-32,768 à 32,767",
      example: "short s = 32767;",
    },
    {
      type: "ushort",
      size: "2 bytes",
      range: "0 à 65,535",
      example: "ushort us = 65535;",
    },
    {
      type: "int",
      size: "4 bytes",
      range: "-2,147,483,648 à 2,147,483,647",
      example: "int i = 42;",
    },
    {
      type: "uint",
      size: "4 bytes",
      range: "0 à 4,294,967,295",
      example: "uint ui = 4294967295;",
    },
    {
      type: "long",
      size: "8 bytes",
      range: "-9,223,372,036,854,775,808 à 9,223,372,036,854,775,807",
      example: "long l = 9223372036854775807L;",
    },
    {
      type: "ulong",
      size: "8 bytes",
      range: "0 à 18,446,744,073,709,551,615",
      example: "ulong ul = 18446744073709551615UL;",
    },
    {
      type: "float",
      size: "4 bytes",
      range: "±1.5 × 10^−45 à ±3.4 × 10^38 (7 chiffres)",
      example: "float f = 3.14f;",
    },
    {
      type: "double",
      size: "8 bytes",
      range: "±5.0 × 10^−324 à ±1.7 × 10^308 (15-16 chiffres)",
      example: "double d = 3.14159265359;",
    },
    {
      type: "decimal",
      size: "16 bytes",
      range: "±1.0 × 10^−28 à ±7.9 × 10^28 (28-29 chiffres)",
      example: "decimal m = 3.14159265359m;",
    },
    {
      type: "string",
      size: "Variable",
      range: "Chaîne de caractères Unicode (immuable)",
      example: 'string s = "Hello, World!";',
    },
    {
      type: "object",
      size: "Variable",
      range: "Tout type (type de base)",
      example: "object obj = 42;",
    },
    {
      type: "dynamic",
      size: "Variable",
      range: "Tout type (résolution à l'exécution)",
      example: 'dynamic d = 42; d = "Hello";',
    },
    {
      type: "var",
      size: "Variable",
      range: "Type inféré par le compilateur",
      example: 'var name = "John"; // string',
    },
    {
      type: "List<T>",
      size: "Variable",
      range: "Liste générique d'éléments de type T",
      example: "List<int> numbers = new List<int> { 1, 2, 3 };",
    },
    {
      type: "Dictionary<K,V>",
      size: "Variable",
      range: "Dictionnaire avec clés de type K et valeurs de type V",
      example: 'Dictionary<string, int> ages = new Dictionary<string, int> { { "John", 30 } };',
    },
  ]

  // Control structures
  const controlStructures = [
    {
      name: "if-else",
      description: "Exécution conditionnelle",
      example: `if (x > 0)
{
    Console.WriteLine("Positif");
}
else if (x < 0)
{
    Console.WriteLine("Négatif");
}
else
{
    Console.WriteLine("Zéro");
}`,
    },
    {
      name: "switch",
      description: "Sélection multi-voies",
      example: `switch (day)
{
    case 1:
        Console.WriteLine("Lundi");
        break;
    case 2:
        Console.WriteLine("Mardi");
        break;
    default:
        Console.WriteLine("Autre jour");
        break;
}

// Switch expressions (C# 8+)
string result = day switch
{
    1 => "Lundi",
    2 => "Mardi",
    _ => "Autre jour"
};`,
    },
    {
      name: "for loop",
      description: "Boucle avec compteur",
      example: `for (int i = 0; i < 10; i++)
{
    Console.WriteLine(i);
}`,
    },
    {
      name: "foreach loop",
      description: "Boucle sur les éléments d'une collection",
      example: `int[] numbers = { 1, 2, 3, 4, 5 };
foreach (int num in numbers)
{
    Console.WriteLine(num);
}`,
    },
    {
      name: "while loop",
      description: "Boucle conditionnelle",
      example: `int count = 5;
while (count > 0)
{
    Console.WriteLine(count);
    count--;
}`,
    },
    {
      name: "do-while loop",
      description: "Boucle conditionnelle (exécutée au moins une fois)",
      example: `int count = 5;
do
{
    Console.WriteLine(count);
    count--;
} while (count > 0);`,
    },
    {
      name: "break",
      description: "Sortir d'une boucle ou d'un switch",
      example: `for (int i = 0; i < 10; i++)
{
    if (i == 5)
    {
        break;  // Sortie de la boucle
    }
    Console.WriteLine(i);
}`,
    },
    {
      name: "continue",
      description: "Passer à l'itération suivante",
      example: `for (int i = 0; i < 10; i++)
{
    if (i % 2 == 0)
    {
        continue;  // Passer à l'itération suivante
    }
    Console.WriteLine(i);  // Affiche uniquement les nombres impairs
}`,
    },
    {
      name: "try-catch-finally",
      description: "Gestion des exceptions",
      example: `try
{
    // Code qui peut lancer une exception
    int result = 10 / 0;
}
catch (DivideByZeroException ex)
{
    Console.WriteLine($"Division par zéro: {ex.Message}");
}
catch (Exception ex)
{
    Console.WriteLine($"Autre exception: {ex.Message}");
}
finally
{
    Console.WriteLine("Ce bloc est toujours exécuté");
}`,
    },
    {
      name: "using statement",
      description: "Gestion automatique des ressources",
      example: `// Classique
using (StreamReader reader = new StreamReader("file.txt"))
{
    string line = reader.ReadLine();
    Console.WriteLine(line);
}

// C# 8+ (using declaration)
using StreamReader reader = new StreamReader("file.txt");
string line = reader.ReadLine();
Console.WriteLine(line);`,
    },
    {
      name: "LINQ",
      description: "Language Integrated Query",
      example: `// Syntaxe de requête
var result1 = from num in numbers
              where num > 5
              orderby num
              select num * 2;

// Syntaxe de méthode
var result2 = numbers
    .Where(num => num > 5)
    .OrderBy(num => num)
    .Select(num => num * 2);`,
    },
  ]

  // Common functions
  const commonFunctions = [
    {
      name: "Console.WriteLine()",
      namespace: "System",
      description: "Afficher du texte sur la console avec un saut de ligne",
      example: 'Console.WriteLine("Hello, World!");\nConsole.WriteLine($"Value: {42}");',
    },
    {
      name: "Console.ReadLine()",
      namespace: "System",
      description: "Lire une ligne depuis la console",
      example: 'string input = Console.ReadLine();\nConsole.WriteLine($"You entered: {input}");',
    },
    {
      name: "int.Parse()",
      namespace: "System",
      description: "Convertir une chaîne en entier",
      example: 'string str = "42";\nint num = int.Parse(str);',
    },
    {
      name: "int.TryParse()",
      namespace: "System",
      description: "Tenter de convertir une chaîne en entier",
      example:
        'string str = "42";\nif (int.TryParse(str, out int num))\n{\n    Console.WriteLine($"Parsed: {num}");\n}\nelse\n{\n    Console.WriteLine("Failed to parse");\n}',
    },
    {
      name: "string.Format()",
      namespace: "System",
      description: "Formater une chaîne de caractères",
      example: 'string message = string.Format("Hello, {0}! You are {1} years old.", "John", 30);',
    },
    {
      name: "string.Join()",
      namespace: "System",
      description: "Joindre des éléments d'une collection avec un séparateur",
      example: 'string[] fruits = { "apple", "banana", "cherry" };\nstring joined = string.Join(", ", fruits);',
    },
    {
      name: "string.Split()",
      namespace: "System",
      description: "Diviser une chaîne en sous-chaînes",
      example: "string csv = \"apple,banana,cherry\";\nstring[] fruits = csv.Split(',');",
    },
    {
      name: "List<T>.Add()",
      namespace: "System.Collections.Generic",
      description: "Ajouter un élément à une liste",
      example: "List<int> numbers = new List<int>();\nnumbers.Add(1);\nnumbers.Add(2);\nnumbers.Add(3);",
    },
    {
      name: "List<T>.Remove()",
      namespace: "System.Collections.Generic",
      description: "Supprimer un élément d'une liste",
      example: "List<int> numbers = new List<int> { 1, 2, 3 };\nnumbers.Remove(2);",
    },
    {
      name: "Dictionary<K,V>.Add()",
      namespace: "System.Collections.Generic",
      description: "Ajouter une paire clé-valeur à un dictionnaire",
      example:
        'Dictionary<string, int> ages = new Dictionary<string, int>();\nages.Add("John", 30);\nages.Add("Jane", 25);',
    },
    {
      name: "File.ReadAllText()",
      namespace: "System.IO",
      description: "Lire tout le contenu d'un fichier",
      example: 'string content = File.ReadAllText("file.txt");',
    },
    {
      name: "File.WriteAllText()",
      namespace: "System.IO",
      description: "Écrire du texte dans un fichier",
      example: 'File.WriteAllText("file.txt", "Hello, World!");',
    },
    {
      name: "Task.Run()",
      namespace: "System.Threading.Tasks",
      description: "Exécuter une tâche de manière asynchrone",
      example:
        'Task task = Task.Run(() => {\n    // Code à exécuter en arrière-plan\n    Console.WriteLine("Background task");\n});',
    },
    {
      name: "async/await",
      namespace: "System.Threading.Tasks",
      description: "Programmation asynchrone",
      example:
        'async Task<string> DownloadDataAsync(string url)\n{\n    using HttpClient client = new HttpClient();\n    return await client.GetStringAsync(url);\n}\n\n// Utilisation\nstring data = await DownloadDataAsync("https://example.com");',
    },
  ]

  // Memory management examples
  const memoryExamples = [
    {
      title: "Garbage Collection",
      description: "C# gère automatiquement la mémoire avec un ramasse-miettes",
      example: `// Les objets sans référence sont automatiquement collectés
object obj = new object();
obj = null;  // L'objet devient éligible pour la collecte

// Forcer la collecte (généralement déconseillé)
GC.Collect();
GC.WaitForPendingFinalizers();`,
    },
    {
      title: "IDisposable et using",
      description: "Libération déterministe des ressources",
      example: `// Implémentation de IDisposable
public class ResourceManager : IDisposable
{
    private bool disposed = false;
    private FileStream file;

    public ResourceManager(string path)
    {
        file = new FileStream(path, FileMode.Open);
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!disposed)
        {
            if (disposing)
            {
                // Libérer les ressources managées
                file?.Dispose();
            }

            // Libérer les ressources non managées
            disposed = true;
        }
    }

    ~ResourceManager()
    {
        Dispose(false);
    }
}

// Utilisation avec using
using (ResourceManager res = new ResourceManager("file.txt"))
{
    // Utiliser res...
} // res.Dispose() est appelé automatiquement`,
    },
    {
      title: "Références faibles",
      description: "Références qui n'empêchent pas la collecte de l'objet",
      example: `using System;
using System.Threading;

class Program
{
    static void Main()
    {
        // Créer un objet et une référence faible
        object obj = new object();
        WeakReference weakRef = new WeakReference(obj);

        // Vérifier que la référence faible est valide
        if (weakRef.Target != null)
        {
            Console.WriteLine("Object still exists");
        }

        // Supprimer la référence forte
        obj = null;

        // Forcer la collecte des déchets
        GC.Collect();
        GC.WaitForPendingFinalizers();

        // La référence faible devrait maintenant être null
        if (weakRef.Target == null)
        {
            Console.WriteLine("Object has been collected");
        }
    }
}`,
    },
    {
      title: "Mémoire non managée",
      description: "Utilisation de mémoire non gérée par le GC",
      example: `using System;
using System.Runtime.InteropServices;

class Program
{
    static void Main()
    {
        // Allouer de la mémoire non managée
        IntPtr buffer = Marshal.AllocHGlobal(100);
        
        try
        {
            // Utiliser la mémoire non managée
            // Écrire dans la mémoire
            byte value = 42;
            Marshal.WriteByte(buffer, value);
            
            // Lire depuis la mémoire
            byte readValue = Marshal.ReadByte(buffer);
            Console.WriteLine($"Read value: {readValue}");
        }
        finally
        {
            // Toujours libérer la mémoire non managée
            Marshal.FreeHGlobal(buffer);
        }
    }
}`,
    },
    {
      title: "Span<T> et Memory<T>",
      description: "Types pour manipuler efficacement la mémoire (C# 7+)",
      example: `using System;

class Program
{
    static void Main()
    {
        // Span sur un tableau
        byte[] array = new byte[100];
        Span<byte> span = array;
        
        // Remplir avec des valeurs
        for (int i = 0; i < span.Length; i++)
        {
            span[i] = (byte)(i & 0xFF);
        }
        
        // Créer une tranche (slice)
        Span<byte> slice = span.Slice(10, 20);
        
        // Modifier la tranche (modifie aussi le tableau original)
        slice.Fill(42);
        
        // Span sur la pile
        Span<byte> stackSpan = stackalloc byte[128];
        stackSpan.Fill(0xFF);
        
        // Memory<T> pour les contextes asynchrones
        Memory<byte> memory = new Memory<byte>(array);
        DoSomethingAsync(memory);
    }
    
    static async Task DoSomethingAsync(Memory<byte> memory)
    {
        // Utiliser memory dans un contexte asynchrone
        await Task.Delay(100);
        
        // Convertir en Span pour l'accès
        Span<byte> span = memory.Span;
        span[0] = 123;
    }
}`,
    },
    {
      title: "Finalizers",
      description: "Méthode appelée avant qu'un objet ne soit collecté",
      example: `using System;

class ResourceHolder
{
    private IntPtr resource;
    
    public ResourceHolder()
    {
        // Acquérir une ressource
        resource = AcquireResource();
        Console.WriteLine("Resource acquired");
    }
    
    // Finalizer
    ~ResourceHolder()
    {
        // Libérer la ressource si elle n'a pas été libérée
        if (resource != IntPtr.Zero)
        {
            ReleaseResource(resource);
            resource = IntPtr.Zero;
            Console.WriteLine("Resource released by finalizer");
        }
    }
    
    // Méthodes simulées pour acquérir/libérer des ressources
    private IntPtr AcquireResource()
    {
        return new IntPtr(1);
    }
    
    private void ReleaseResource(IntPtr handle)
    {
        // Libérer la ressource
    }
}

class Program
{
    static void Main()
    {
        // Créer un objet
        ResourceHolder holder = new ResourceHolder();
        
        // Supprimer la référence
        holder = null;
        
        // Forcer la collecte des déchets
        GC.Collect();
        GC.WaitForPendingFinalizers();
        
        Console.WriteLine("Program completed");
    }
}`,
    },
  ]

  // Filter items based on search query
  const filteredFormatSpecifiers = formatSpecifiers.filter(
    (item) =>
      item.specifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes ||
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
      item.namespace.toLowerCase().includes(searchQuery.toLowerCase()),
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
          Langage C#
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          L'essentiel du langage C#: syntaxe, fonctions et exemples
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
            Format string
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
                    <CodeBlock code={item.example} language="csharp" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="types" className="mt-0">
          <Card className="animate-glow">
            <CardHeader>
              <CardTitle>Types de données en C#</CardTitle>
              <CardDescription>
                Les types de données fondamentaux en C# avec leur taille et plage de valeurs
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
                    <CodeBlock code={item.example} language="csharp" />
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
                        {item.namespace}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={item.example} language="csharp" />
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
                    Gestion de la mémoire en C#
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>C# utilise un ramasse-miettes (Garbage Collector) automatique</li>
                    <li>Les types valeur (int, float, struct) sont stockés sur la pile (stack)</li>
                    <li>Les types référence (class, interface, delegate) sont stockés sur le tas (heap)</li>
                    <li>Utilisez IDisposable et using pour libérer les ressources non managées</li>
                    <li>Les finaliseurs (~ClassName) permettent de nettoyer les ressources non managées</li>
                    <li>Span&lt;T&gt; et Memory&lt;T&gt; permettent de manipuler efficacement la mémoire</li>
                    <li>unsafe et fixed permettent d'accéder directement à la mémoire (avec précaution)</li>
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
                    <CodeBlock code={item.example} language="csharp" />
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
