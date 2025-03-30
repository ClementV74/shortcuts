"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Coffee, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import CodeBlock from "@/components/code-block"

// Define the syntax item type
type SyntaxItem = {
  name: string
  description: string
  example: string
  category: string
}

export default function JavaLanguagePage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  // Java language syntax organized by category
  const syntaxItems: SyntaxItem[] = [
    // Basic syntax
    {
      name: "class declaration",
      description: language === "fr" ? "Déclaration d'une classe Java" : "Java class declaration",
      example: "public class MyClass {\n  // Class body\n}",
      category: "basic",
    },
    {
      name: "main method",
      description:
        language === "fr" ? "Point d'entrée principal d'un programme Java" : "Main entry point of a Java program",
      example:
        'public static void main(String[] args) {\n  // Code starts here\n  System.out.println("Hello, World!");\n}',
      category: "basic",
    },
    {
      name: "package",
      description: language === "fr" ? "Regroupement de classes liées" : "Grouping of related classes",
      example: "package com.example.myapp;\n\npublic class MyClass {\n  // Class body\n}",
      category: "basic",
    },
    {
      name: "import",
      description: language === "fr" ? "Importer des classes ou des packages" : "Import classes or packages",
      example: "import java.util.ArrayList;\nimport java.util.*; // Import all classes in package",
      category: "basic",
    },
    {
      name: "System.out.println()",
      description: language === "fr" ? "Afficher du texte dans la console" : "Print text to the console",
      example:
        'System.out.println("Hello, World!");\nSystem.out.print("No newline");\nSystem.out.printf("Formatted %s", "text");',
      category: "basic",
    },
    {
      name: "comments",
      description: language === "fr" ? "Commentaires en Java" : "Comments in Java",
      example:
        "// Single line comment\n\n/* Multi-line\n   comment */\n\n/**\n * Javadoc comment\n * @param args command line arguments\n */",
      category: "basic",
    },

    // Data types
    {
      name: "primitive types",
      description: language === "fr" ? "Types de données primitifs" : "Primitive data types",
      example:
        "byte b = 100;         // 8-bit signed\nshort s = 10000;      // 16-bit signed\nint i = 100000;       // 32-bit signed\nlong l = 100000L;     // 64-bit signed\nfloat f = 3.14f;      // 32-bit floating point\ndouble d = 3.14159;   // 64-bit floating point\nboolean bool = true;  // true or false\nchar c = 'A';         // 16-bit Unicode character",
      category: "datatypes",
    },
    {
      name: "String",
      description: language === "fr" ? "Type de données pour les chaînes de caractères" : "Data type for text strings",
      example:
        'String name = "John Doe";\nint length = name.length();\nString upper = name.toUpperCase();\nboolean contains = name.contains("John");',
      category: "datatypes",
    },
    {
      name: "arrays",
      description:
        language === "fr" ? "Collections d'éléments du même type" : "Collections of elements of the same type",
      example:
        "// Declaration\nint[] numbers;\n\n// Initialization\nnumbers = new int[5];\n\n// Declaration and initialization\nint[] values = {1, 2, 3, 4, 5};\nString[] names = new String[3];\n\n// Accessing elements\nint first = values[0];\nvalues[2] = 10;",
      category: "datatypes",
    },
    {
      name: "ArrayList",
      description: language === "fr" ? "Liste dynamique redimensionnable" : "Resizable dynamic list",
      example:
        'import java.util.ArrayList;\n\nArrayList<String> list = new ArrayList<>();\nlist.add("Apple");\nlist.add("Banana");\nlist.add("Cherry");\n\nString fruit = list.get(1);  // "Banana"\nlist.remove(0);  // Removes "Apple"\nint size = list.size();  // 2',
      category: "datatypes",
    },
    {
      name: "HashMap",
      description: language === "fr" ? "Collection de paires clé-valeur" : "Collection of key-value pairs",
      example:
        'import java.util.HashMap;\n\nHashMap<String, Integer> ages = new HashMap<>();\nages.put("John", 30);\nages.put("Jane", 25);\n\nInteger johnsAge = ages.get("John");  // 30\nboolean hasJane = ages.containsKey("Jane");  // true\nages.remove("John");',
      category: "datatypes",
    },
    {
      name: "enum",
      description:
        language === "fr" ? "Type de données pour un ensemble de constantes" : "Data type for a set of constants",
      example:
        'enum Day {\n  MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY\n}\n\nDay today = Day.MONDAY;\n\nswitch (today) {\n  case MONDAY:\n    System.out.println("Start of work week");\n    break;\n  case FRIDAY:\n    System.out.println("End of work week");\n    break;\n  default:\n    System.out.println("Other day");\n}',
      category: "datatypes",
    },

    // Object-oriented programming
    {
      name: "class",
      description: language === "fr" ? "Modèle pour créer des objets" : "Blueprint for creating objects",
      example:
        "public class Person {\n  // Fields (attributes)\n  private String name;\n  private int age;\n  \n  // Constructor\n  public Person(String name, int age) {\n    this.name = name;\n    this.age = age;\n  }\n  \n  // Methods\n  public String getName() {\n    return name;\n  }\n  \n  public void setName(String name) {\n    this.name = name;\n  }\n  \n  public int getAge() {\n    return age;\n  }\n  \n  public void setAge(int age) {\n    this.age = age;\n  }\n}",
      category: "oop",
    },
    {
      name: "inheritance",
      description:
        language === "fr"
          ? "Mécanisme pour dériver une classe d'une autre"
          : "Mechanism to derive a class from another",
      example:
        'public class Animal {\n  protected String name;\n  \n  public void eat() {\n    System.out.println(name + " is eating");\n  }\n}\n\npublic class Dog extends Animal {\n  public Dog(String name) {\n    this.name = name;\n  }\n  \n  public void bark() {\n    System.out.println(name + " is barking");\n  }\n}',
      category: "oop",
    },
    {
      name: "interface",
      description:
        language === "fr"
          ? "Contrat spécifiant des méthodes qu'une classe doit implémenter"
          : "Contract specifying methods a class must implement",
      example:
        'public interface Drawable {\n  void draw();\n  int getX();\n  int getY();\n}\n\npublic class Circle implements Drawable {\n  private int x, y, radius;\n  \n  @Override\n  public void draw() {\n    System.out.println("Drawing a circle");\n  }\n  \n  @Override\n  public int getX() { return x; }\n  \n  @Override\n  public int getY() { return y; }\n}',
      category: "oop",
    },
    {
      name: "abstract class",
      description:
        language === "fr"
          ? "Classe qui ne peut pas être instanciée et peut contenir des méthodes abstraites"
          : "Class that cannot be instantiated and can contain abstract methods",
      example:
        "public abstract class Shape {\n  protected int x, y;\n  \n  public abstract double area();  // Abstract method\n  \n  public void moveTo(int newX, int newY) {  // Concrete method\n    x = newX;\n    y = newY;\n  }\n}\n\npublic class Circle extends Shape {\n  private double radius;\n  \n  public Circle(double radius) {\n    this.radius = radius;\n  }\n  \n  @Override\n  public double area() {\n    return Math.PI * radius * radius;\n  }\n}",
      category: "oop",
    },
    {
      name: "polymorphism",
      description:
        language === "fr"
          ? "Capacité d'un objet à prendre plusieurs formes"
          : "Ability of an object to take many forms",
      example:
        "Shape shape1 = new Circle(5.0);\nShape shape2 = new Rectangle(4.0, 6.0);\n\ndouble area1 = shape1.area();  // Calls Circle's area method\ndouble area2 = shape2.area();  // Calls Rectangle's area method",
      category: "oop",
    },
    {
      name: "encapsulation",
      description:
        language === "fr"
          ? "Masquer les détails d'implémentation et restreindre l'accès aux données"
          : "Hiding implementation details and restricting access to data",
      example:
        "public class BankAccount {\n  private double balance;  // Private field\n  \n  public double getBalance() {  // Public getter\n    return balance;\n  }\n  \n  public void deposit(double amount) {  // Public method\n    if (amount > 0) {\n      balance += amount;\n    }\n  }\n  \n  public boolean withdraw(double amount) {  // Public method\n    if (amount > 0 && amount <= balance) {\n      balance -= amount;\n      return true;\n    }\n    return false;\n  }\n}",
      category: "oop",
    },

    // Control structures
    {
      name: "if-else",
      description: language === "fr" ? "Structure de contrôle conditionnel" : "Conditional control structure",
      example:
        'if (x > 10) {\n  System.out.println("x is greater than 10");\n} else if (x < 0) {\n  System.out.println("x is negative");\n} else {\n  System.out.println("x is between 0 and 10");\n}',
      category: "control",
    },
    {
      name: "switch",
      description: language === "fr" ? "Structure de contrôle multi-voies" : "Multi-way branch control structure",
      example:
        'switch (day) {\n  case 1:\n    System.out.println("Monday");\n    break;\n  case 2:\n    System.out.println("Tuesday");\n    break;\n  default:\n    System.out.println("Other day");\n}\n\n// Enhanced switch (Java 14+)\nswitch (day) {\n  case 1 -> System.out.println("Monday");\n  case 2 -> System.out.println("Tuesday");\n  default -> System.out.println("Other day");\n}',
      category: "control",
    },
    {
      name: "for loop",
      description:
        language === "fr"
          ? "Boucle avec initialisation, condition et incrémentation"
          : "Loop with initialization, condition, and increment",
      example:
        "for (int i = 0; i < 10; i++) {\n  System.out.println(i);\n}\n\n// Enhanced for loop (for-each)\nint[] numbers = {1, 2, 3, 4, 5};\nfor (int num : numbers) {\n  System.out.println(num);\n}",
      category: "control",
    },
    {
      name: "while loop",
      description:
        language === "fr"
          ? "Boucle qui s'exécute tant que la condition est vraie"
          : "Loop that executes as long as the condition is true",
      example: "int count = 5;\nwhile (count > 0) {\n  System.out.println(count);\n  count--;\n}",
      category: "control",
    },
    {
      name: "do-while loop",
      description: language === "fr" ? "Boucle qui s'exécute au moins une fois" : "Loop that executes at least once",
      example: "int count = 5;\ndo {\n  System.out.println(count);\n  count--;\n} while (count > 0);",
      category: "control",
    },
    {
      name: "break and continue",
      description:
        language === "fr" ? "Contrôler le flux d'exécution dans les boucles" : "Control execution flow in loops",
      example:
        "// break\nfor (int i = 0; i < 10; i++) {\n  if (i == 5) {\n    break;  // Exit the loop\n  }\n  System.out.println(i);\n}\n\n// continue\nfor (int i = 0; i < 10; i++) {\n  if (i % 2 == 0) {\n    continue;  // Skip to next iteration\n  }\n  System.out.println(i);  // Print odd numbers only\n}",
      category: "control",
    },

    // Exception handling
    {
      name: "try-catch",
      description: language === "fr" ? "Bloc pour gérer les exceptions" : "Block for handling exceptions",
      example:
        'try {\n  int result = 10 / 0;  // This will throw ArithmeticException\n  System.out.println(result);\n} catch (ArithmeticException e) {\n  System.out.println("Cannot divide by zero");\n  e.printStackTrace();\n} finally {\n  System.out.println("This always executes");\n}',
      category: "exceptions",
    },
    {
      name: "throw",
      description: language === "fr" ? "Lancer une exception" : "Throw an exception",
      example:
        'public void deposit(double amount) {\n  if (amount <= 0) {\n    throw new IllegalArgumentException("Amount must be positive");\n  }\n  balance += amount;\n}',
      category: "exceptions",
    },
    {
      name: "throws",
      description:
        language === "fr"
          ? "Déclarer qu'une méthode peut lancer des exceptions"
          : "Declare that a method may throw exceptions",
      example:
        "public void readFile(String filename) throws IOException {\n  FileReader reader = new FileReader(filename);\n  // Read file...\n  reader.close();\n}",
      category: "exceptions",
    },
    {
      name: "custom exceptions",
      description:
        language === "fr" ? "Créer des classes d'exception personnalisées" : "Create custom exception classes",
      example:
        'public class InsufficientFundsException extends Exception {\n  private double amount;\n  \n  public InsufficientFundsException(double amount) {\n    super("Insufficient funds: missing " + amount);\n    this.amount = amount;\n  }\n  \n  public double getAmount() {\n    return amount;\n  }\n}\n\n// Usage\npublic void withdraw(double amount) throws InsufficientFundsException {\n  if (amount > balance) {\n    throw new InsufficientFundsException(amount - balance);\n  }\n  balance -= amount;\n}',
      category: "exceptions",
    },
    {
      name: "try-with-resources",
      description:
        language === "fr"
          ? "Gérer automatiquement les ressources qui doivent être fermées"
          : "Automatically manage resources that need to be closed",
      example:
        '// Java 7+\ntry (FileReader reader = new FileReader("file.txt");\n     BufferedReader br = new BufferedReader(reader)) {\n  String line;\n  while ((line = br.readLine()) != null) {\n    System.out.println(line);\n  }\n} catch (IOException e) {\n  e.printStackTrace();\n}\n// No need for finally block to close resources',
      category: "exceptions",
    },

    // Collections and generics
    {
      name: "List",
      description: language === "fr" ? "Interface pour les collections ordonnées" : "Interface for ordered collections",
      example:
        'import java.util.List;\nimport java.util.ArrayList;\nimport java.util.LinkedList;;\n\n// ArrayList implementation\nList<String> fruits = new ArrayList<>();\nfruits.add("Apple");\nfruits.add("Banana");\nfruits.add("Cherry");\n\n// LinkedList implementation\nList<String> colors = new LinkedList<>();\ncolors.add("Red");\ncolors.add("Green");\ncolors.add("Blue");',
      category: "collections",
    },
    {
      name: "Set",
      description:
        language === "fr"
          ? "Interface pour les collections sans doublons"
          : "Interface for collections with no duplicates",
      example:
        'import java.util.Set;\nimport java.util.HashSet;\nimport java.util.TreeSet;\n\n// HashSet (unordered)\nSet<String> uniqueNames = new HashSet<>();\nuniqueNames.add("John");\nuniqueNames.add("Jane");\nuniqueNames.add("John");  // Ignored (duplicate)\n\n// TreeSet (sorted)\nSet<Integer> sortedNumbers = new TreeSet<>();\nsortedNumbers.add(5);\nsortedNumbers.add(2);\nsortedNumbers.add(8);\n// Elements will be in order: 2, 5, 8',
      category: "collections",
    },
    {
      name: "Map",
      description:
        language === "fr"
          ? "Interface pour les collections de paires clé-valeur"
          : "Interface for key-value pair collections",
      example:
        'import java.util.Map;\nimport java.util.HashMap;\nimport java.util.TreeMap;\n\n// HashMap (unordered)\nMap<String, Integer> ages = new HashMap<>();\nages.put("John", 30);\nages.put("Jane", 25);\nInteger johnsAge = ages.get("John");  // 30\n\n// TreeMap (sorted by keys)\nMap<String, String> capitals = new TreeMap<>();\ncapitals.put("USA", "Washington DC");\ncapitals.put("France", "Paris");\ncapitals.put("Japan", "Tokyo");',
      category: "collections",
    },
    {
      name: "generics",
      description:
        language === "fr"
          ? "Paramètres de type pour les classes et méthodes"
          : "Type parameters for classes and methods",
      example:
        '// Generic class\npublic class Box<T> {\n  private T content;\n  \n  public void put(T content) {\n    this.content = content;\n  }\n  \n  public T get() {\n    return content;\n  }\n}\n\n// Usage\nBox<String> stringBox = new Box<>();\nstringBox.put("Hello");\nString value = stringBox.get();\n\n// Generic method\npublic <E> void printArray(E[] array) {\n  for (E element : array) {\n    System.out.println(element);\n  }\n}',
      category: "collections",
    },

    // Concurrency
    {
      name: "Thread",
      description: language === "fr" ? "Unité d'exécution légère" : "Lightweight unit of execution",
      example:
        '// Extending Thread\nclass MyThread extends Thread {\n  public void run() {\n    System.out.println("Thread is running");\n  }\n}\n\n// Implementing Runnable\nclass MyRunnable implements Runnable {\n  public void run() {\n    System.out.println("Runnable is running");\n  }\n}\n\n// Usage\nMyThread thread1 = new MyThread();\nthread1.start();\n\nThread thread2 = new Thread(new MyRunnable());\nthread2.start();\n\n// Lambda (Java 8+)\nThread thread3 = new Thread(() -> {\n  System.out.println("Lambda thread is running");\n});\nthread3.start();',
      category: "concurrency",
    },
    {
      name: "synchronized",
      description:
        language === "fr"
          ? "Mécanisme pour contrôler l'accès concurrent aux ressources partagées"
          : "Mechanism to control concurrent access to shared resources",
      example:
        "public class Counter {\n  private int count = 0;\n  \n  // Synchronized method\n  public synchronized void increment() {\n    count++;\n  }\n  \n  // Synchronized block\n  public void decrement() {\n    synchronized(this) {\n      count--;\n    }\n  }\n  \n  public int getCount() {\n    return count;\n  }\n}",
      category: "concurrency",
    },
    {
      name: "ExecutorService",
      description:
        language === "fr"
          ? "Framework pour exécuter des tâches asynchrones"
          : "Framework for executing asynchronous tasks",
      example:
        'import java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\nimport java.util.concurrent.Future;\n\n// Create thread pool\nExecutorService executor = Executors.newFixedThreadPool(5);\n\n// Submit tasks\nexecutor.execute(() -> {\n  System.out.println("Task executed");\n});\n\n// Submit task with result\nFuture<Integer> future = executor.submit(() -> {\n  return 42;\n});\n\n// Get result\ntry {\n  Integer result = future.get();\n  System.out.println("Result: " + result);\n} catch (Exception e) {\n  e.printStackTrace();\n}\n\n// Shutdown\nexecutor.shutdown();',
      category: "concurrency",
    },
  ]

  // Group items by category
  const categories = [
    { id: "basic", name: language === "fr" ? "Syntaxe de base" : "Basic Syntax", icon: "📝" },
    { id: "datatypes", name: language === "fr" ? "Types de données" : "Data Types", icon: "🔢" },
    { id: "oop", name: language === "fr" ? "Programmation orientée objet" : "Object-Oriented Programming", icon: "🧩" },
    { id: "control", name: language === "fr" ? "Structures de contrôle" : "Control Structures", icon: "🔄" },
    { id: "exceptions", name: language === "fr" ? "Gestion des exceptions" : "Exception Handling", icon: "⚠️" },
    {
      id: "collections",
      name: language === "fr" ? "Collections et génériques" : "Collections and Generics",
      icon: "📚",
    },
    { id: "concurrency", name: language === "fr" ? "Concurrence" : "Concurrency", icon: "⚡" },
  ]

  // Filter items based on search query
  const filteredItems = syntaxItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase()),
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
          <Coffee className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">{language === "fr" ? "Java" : "Java"}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {language === "fr"
            ? "Une référence complète de la syntaxe, des méthodes et des bonnes pratiques du langage Java"
            : "A comprehensive reference of Java language syntax, methods, and best practices"}
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
            placeholder={language === "fr" ? "Rechercher la syntaxe..." : "Search syntax..."}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        <Accordion type="single" collapsible className="w-full" defaultValue="basic">
          {categories.map((category, index) => {
            const categoryItems = filteredItems.filter((item) => item.category === category.id)

            if (categoryItems.length === 0) return null

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
                        {categoryItems.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                      {categoryItems.map((item, itemIndex) => (
                        <motion.div
                          key={`${category.id}-${itemIndex}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + itemIndex * 0.05, duration: 0.3 }}
                        >
                          <Card className="h-full border-muted/40 hover:border-primary/40 transition-colors">
                            <CardHeader className="p-4 pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-mono">{item.name}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <CardDescription className="text-sm text-foreground/80 mb-4">
                                {item.description}
                              </CardDescription>
                              <div className="mt-4 pt-2 border-t border-border/50">
                                <p className="text-xs font-medium text-muted-foreground mb-2">
                                  {language === "fr" ? "Exemple:" : "Example:"}
                                </p>
                                <CodeBlock code={item.example} language="java" className="mt-1" />
                              </div>
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

