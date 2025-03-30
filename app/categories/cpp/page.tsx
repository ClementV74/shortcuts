"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"

// Define the syntax item type
type SyntaxItem = {
  name: string
  description: string
  example: string
  category: string
}

export default function CppLanguagePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // C++ language syntax organized by category
  const syntaxItems: SyntaxItem[] = [
    // Basic syntax
    {
      name: "#include",
      description: "Directive de préprocesseur pour inclure des fichiers d'en-tête",
      example: '#include <iostream>\n#include <vector>\n#include "myheader.h"',
      category: "basic",
    },
    {
      name: "main()",
      description: "Point d'entrée principal d'un programme C++",
      example: `int main(int argc, char *argv[]) {
  // code
  return 0;
}`,
      category: "basic",
    },
    {
      name: "cout",
      description: "Flux de sortie standard pour afficher du texte",
      example:
        '#include <iostream>\n\nstd::cout << "Hello, " << name << "! You are " << age << " years old." << std::endl;',
      category: "basic",
    },
    {
      name: "cin",
      description: "Flux d'entrée standard pour lire des entrées",
      example: "#include <iostream>\n\nint age;\nstd::string name;\nstd::cin >> age >> name;",
      category: "basic",
    },
    {
      name: "namespace",
      description: "Regroupement de code sous un nom unique",
      example:
        "namespace MyNamespace {\n  int value = 10;\n  void function() { /* code */ }\n}\n\n// Usage\nMyNamespace::function();\n\n// Or with using directive\nusing namespace MyNamespace;\nfunction();",
      category: "basic",
    },
    {
      name: "comments",
      description: "Commentaires en C++",
      example: "// Single line comment\n/* Multi-line\n   comment */",
      category: "basic",
    },

    // Data types
    {
      name: "basic types",
      description: "Types de données fondamentaux en C++",
      example:
        "int count = 10;\ndouble price = 99.99;\nchar grade = 'A';\nbool isValid = true;\n// C++11 and later\nauto value = 42;  // type inferred",
      category: "datatypes",
    },
    {
      name: "string",
      description: "Type de données pour les chaînes de caractères",
      example: '#include <string>\n\nstd::string name = "John Doe";\nname += " Jr.";\nsize_t length = name.length();',
      category: "datatypes",
    },
    {
      name: "vector",
      description: "Conteneur de séquence dynamique",
      example:
        "#include <vector>\n\nstd::vector<int> numbers = {1, 2, 3, 4, 5};\nnumbers.push_back(6);\nint third = numbers[2];",
      category: "datatypes",
    },
    {
      name: "array",
      description: "Conteneur de tableau à taille fixe (C++11)",
      example:
        "#include <array>\n\nstd::array<int, 5> numbers = {1, 2, 3, 4, 5};\nint first = numbers[0];\nsize_t size = numbers.size();",
      category: "datatypes",
    },
    {
      name: "map",
      description: "Conteneur associatif clé-valeur",
      example:
        '#include <map>\n\nstd::map<std::string, int> ages;\nages["John"] = 30;\nages["Jane"] = 25;\nint johnsAge = ages["John"];',
      category: "datatypes",
    },
    {
      name: "struct",
      description: "Type de données composé défini par l'utilisateur",
      example:
        'struct Person {\n  std::string name;\n  int age;\n  \n  void printInfo() {\n    std::cout << name << ", " << age << std::endl;\n  }\n};\n\nPerson person1 = {"John", 30};\nperson1.printInfo();',
      category: "datatypes",
    },
    {
      name: "enum class",
      description: "Énumération fortement typée (C++11)",
      example:
        "enum class Color { Red, Green, Blue };\nColor c = Color::Red;\n\n// Traditional enum\nenum Direction { North, East, South, West };",
      category: "datatypes",
    },

    // Object-oriented programming
    {
      name: "class",
      description: "Définition d'une classe",
      example:
        'class Person {\nprivate:\n  std::string name;\n  int age;\n\npublic:\n  Person(std::string n, int a) : name(n), age(a) {}\n  \n  void setName(std::string n) { name = n; }\n  std::string getName() const { return name; }\n  \n  void printInfo() const;\n};\n\nvoid Person::printInfo() const {\n  std::cout << name << ", " << age << std::endl;\n}',
      category: "oop",
    },
    {
      name: "inheritance",
      description: "Héritage de classe",
      example:
        'class Animal {\npublic:\n  virtual void makeSound() const {\n    std::cout << "Some sound" << std::endl;\n  }\n};\n\nclass Dog : public Animal {\npublic:\n  void makeSound() const override {\n    std::cout << "Woof!" << std::endl;\n  }\n};',
      category: "oop",
    },
    {
      name: "polymorphism",
      description: "Polymorphisme avec fonctions virtuelles",
      example: "Animal* pet = new Dog();\npet->makeSound();  // Outputs: Woof!\ndelete pet;",
      category: "oop",
    },
    {
      name: "abstract class",
      description: "Classe avec au moins une fonction virtuelle pure",
      example:
        "class Shape {\npublic:\n  virtual double area() const = 0;  // pure virtual function\n  virtual ~Shape() {}\n};\n\nclass Circle : public Shape {\nprivate:\n  double radius;\npublic:\n  Circle(double r) : radius(r) {}\n  double area() const override {\n    return 3.14159 * radius * radius;\n  }\n};",
      category: "oop",
    },
    {
      name: "constructor",
      description: "Méthode spéciale pour initialiser des objets",
      example:
        "class MyClass {\nprivate:\n  int x, y;\npublic:\n  // Default constructor\n  MyClass() : x(0), y(0) {}\n  \n  // Parameterized constructor\n  MyClass(int a, int b) : x(a), y(b) {}\n  \n  // Copy constructor\n  MyClass(const MyClass& other) : x(other.x), y(other.y) {}\n};",
      category: "oop",
    },
    {
      name: "destructor",
      description: "Méthode spéciale appelée lors de la destruction d'un objet",
      example:
        "class ResourceManager {\nprivate:\n  int* data;\npublic:\n  ResourceManager() : data(new int[100]) {}\n  ~ResourceManager() {\n    delete[] data;  // Free resources\n  }\n};",
      category: "oop",
    },
    {
      name: "operator overloading",
      description: "Redéfinir le comportement des opérateurs pour les classes",
      example:
        "class Complex {\nprivate:\n  double real, imag;\npublic:\n  Complex(double r, double i) : real(r), imag(i) {}\n  \n  Complex operator+(const Complex& other) const {\n    return Complex(real + other.real, imag + other.imag);\n  }\n  \n  bool operator==(const Complex& other) const {\n    return real == other.real && imag == other.imag;\n  }\n};",
      category: "oop",
    },

    // Modern C++ features
    {
      name: "auto",
      description: "Déduction automatique de type (C++11)",
      example:
        'auto i = 42;  // int\nauto d = 42.5;  // double\nauto s = "text";  // const char*\nauto v = std::vector<int>{1, 2, 3};  // std::vector<int>',
      category: "modern",
    },
    {
      name: "lambda expressions",
      description: "Fonctions anonymes (C++11)",
      example:
        "auto add = [](int a, int b) { return a + b; };\nint sum = add(3, 4);  // 7\n\n// With capture\nint multiplier = 2;\nauto multiply = [multiplier](int x) { return x * multiplier; };\nint result = multiply(5);  // 10",
      category: "modern",
    },
    {
      name: "smart pointers",
      description: "Pointeurs avec gestion automatique de la mémoire (C++11)",
      example:
        "#include <memory>\n\n// Unique ownership\nstd::unique_ptr<int> p1 = std::make_unique<int>(42);  // C++14\n\n// Shared ownership\nstd::shared_ptr<int> p2 = std::make_shared<int>(42);\nstd::shared_ptr<int> p3 = p2;  // Reference count = 2\n\n// Weak reference\nstd::weak_ptr<int> p4 = p2;",
      category: "modern",
    },
    {
      name: "range-based for",
      description: "Boucle for simplifiée pour les conteneurs (C++11)",
      example:
        "std::vector<int> numbers = {1, 2, 3, 4, 5};\n\n// By value\nfor (int num : numbers) {\n  std::cout << num << std::endl;\n}\n\n// By reference\nfor (auto& num : numbers) {\n  num *= 2;  // Modify the original values\n}",
      category: "modern",
    },
    {
      name: "move semantics",
      description: "Transfert efficace des ressources (C++11)",
      example:
        "std::vector<int> createVector() {\n  std::vector<int> result = {1, 2, 3, 4, 5};\n  return result;  // Move semantics applied automatically\n}\n\nstd::vector<int> v1 = createVector();\nstd::vector<int> v2 = std::move(v1);  // Explicit move",
      category: "modern",
    },
    {
      name: "nullptr",
      description: "Littéral de pointeur nul typé (C++11)",
      example: "int* ptr = nullptr;\n\n// Better than old style\n// int* ptr = NULL;\n// int* ptr = 0;",
      category: "modern",
    },
    {
      name: "constexpr",
      description: "Évaluation à la compilation (C++11)",
      example:
        "constexpr int factorial(int n) {\n  return (n <= 1) ? 1 : n * factorial(n - 1);\n}\n\nconstexpr int fact5 = factorial(5);  // Computed at compile time",
      category: "modern",
    },
    {
      name: "variadic templates",
      description: "Templates avec un nombre variable de paramètres (C++11)",
      example:
        'template<typename T>\nvoid print(T t) {\n  std::cout << t << std::endl;\n}\n\ntemplate<typename T, typename... Args>\nvoid print(T t, Args... args) {\n  std::cout << t << " ";\n  print(args...);\n}\n\n// Usage\nprint(1, 2.5, "text", \'c\');',
      category: "modern",
    },

    // Templates and STL
    {
      name: "function templates",
      description: "Fonctions génériques",
      example:
        "template<typename T>\nT max(T a, T b) {\n  return (a > b) ? a : b;\n}\n\n// Usage\nint maxInt = max<int>(3, 7);  // 7\ndouble maxDouble = max(3.14, 2.71);  // 3.14 (type deduced)",
      category: "templates",
    },
    {
      name: "class templates",
      description: "Classes génériques",
      example:
        "template<typename T>\nclass Stack {\nprivate:\n  std::vector<T> elements;\npublic:\n  void push(const T& value) {\n    elements.push_back(value);\n  }\n  \n  T pop() {\n    T top = elements.back();\n    elements.pop_back();\n    return top;\n  }\n};\n\n// Usage\nStack<int> intStack;\nStack<std::string> stringStack;",
      category: "templates",
    },
    {
      name: "STL algorithms",
      description: "Algorithmes de la bibliothèque standard",
      example:
        "#include <algorithm>\n#include <vector>\n\nstd::vector<int> v = {5, 2, 8, 1, 3};\n\n// Sorting\nstd::sort(v.begin(), v.end());\n\n// Finding\nauto it = std::find(v.begin(), v.end(), 3);\n\n// Transforming\nstd::vector<int> squared;\nstd::transform(v.begin(), v.end(), std::back_inserter(squared),\n               [](int x) { return x * x; });",
      category: "templates",
    },
    {
      name: "STL containers",
      description: "Conteneurs de la bibliothèque standard",
      example:
        "#include <vector>   // Dynamic array\n#include <list>     // Doubly linked list\n#include <deque>    // Double-ended queue\n#include <set>      // Set of unique keys\n#include <map>      // Key-value pairs\n#include <unordered_set>  // Hash set (C++11)\n#include <unordered_map>  // Hash map (C++11)",
      category: "templates",
    },
    {
      name: "STL iterators",
      description: "Itérateurs pour parcourir les conteneurs",
      example:
        'std::vector<int> v = {1, 2, 3, 4, 5};\n\n// Using iterators\nfor (auto it = v.begin(); it != v.end(); ++it) {\n  std::cout << *it << " ";\n}\n\n// Reverse iterators\nfor (auto rit = v.rbegin(); rit != v.rend(); ++rit) {\n  std::cout << *rit << " ";\n}',
      category: "templates",
    },

    // Exception handling
    {
      name: "try-catch",
      description: "Bloc pour gérer les exceptions",
      example:
        'try {\n  int* arr = new int[1000000000];  // Might throw std::bad_alloc\n  // Use arr...\n  delete[] arr;\n} catch (const std::bad_alloc& e) {\n  std::cerr << "Memory allocation failed: " << e.what() << std::endl;\n} catch (const std::exception& e) {\n  std::cerr << "Standard exception: " << e.what() << std::endl;\n} catch (...) {\n  std::cerr << "Unknown exception caught" << std::endl;\n}',
      category: "exceptions",
    },
    {
      name: "throw",
      description: "Lancer une exception",
      example:
        'void divide(int a, int b) {\n  if (b == 0) {\n    throw std::invalid_argument("Division by zero");\n  }\n  return a / b;\n}',
      category: "exceptions",
    },
    {
      name: "custom exceptions",
      description: "Créer des classes d'exception personnalisées",
      example:
        'class FileError : public std::exception {\nprivate:\n  std::string message;\npublic:\n  FileError(const std::string& filename) \n    : message("Error processing file: " + filename) {}\n  \n  const char* what() const noexcept override {\n    return message.c_str();\n  }\n};\n\n// Usage\nvoid processFile(const std::string& filename) {\n  if (!fileExists(filename)) {\n    throw FileError(filename);\n  }\n  // Process file...\n}',
      category: "exceptions",
    },
  ]

  // Group items by category
  const categories = [
    { id: "basic", name: "Syntaxe de base", icon: "📝" },
    { id: "datatypes", name: "Types de données", icon: "🔢" },
    { id: "oop", name: "Programmation orientée objet", icon: "🧩" },
    { id: "modern", name: "C++ moderne", icon: "🚀" },
    { id: "templates", name: "Templates et STL", icon: "📋" },
    { id: "exceptions", name: "Gestion des exceptions", icon: "⚠️" },
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
          <Code className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">C++</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Une référence complète de la syntaxe, des méthodes et des bonnes pratiques du langage C++
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
            placeholder="Rechercher la syntaxe..."
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
                                <p className="text-xs font-medium text-muted-foreground mb-2">Exemple:</p>
                                <CodeBlock code={item.example} language="cpp" className="mt-1" />
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

