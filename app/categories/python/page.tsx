"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Search } from "lucide-react"
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

export default function PythonLanguagePage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  // Python language syntax organized by category
  const syntaxItems: SyntaxItem[] = [
    // Basic syntax
    {
      name: "print()",
      description: language === "fr" ? "Afficher du texte ou des variables" : "Display text or variables",
      example:
        'print("Hello, World!")\nname = "John"\nage = 30\nprint(f"Hello, {name}! You are {age} years old.")\nprint("Score:", 100)',
      category: "basic",
    },
    {
      name: "variables",
      description: language === "fr" ? "Stocker des valeurs" : "Store values",
      example:
        'name = "John Doe"  # string\nage = 30  # integer\nheight = 1.85  # float\nis_student = True  # boolean\n\n# Multiple assignment\nx, y, z = 1, 2, 3',
      category: "basic",
    },
    {
      name: "comments",
      description: language === "fr" ? "Ajouter des notes dans le code" : "Add notes in code",
      example:
        '# This is a single-line comment\n\n"""\nThis is a multi-line comment\nor docstring that can be used\nto document functions, classes, etc.\n"""',
      category: "basic",
    },
    {
      name: "input()",
      description: language === "fr" ? "Lire l'entrée de l'utilisateur" : "Read user input",
      example: 'name = input("Enter your name: ")\nage = int(input("Enter your age: "))  # Convert to integer',
      category: "basic",
    },
    {
      name: "import",
      description: language === "fr" ? "Importer des modules ou des packages" : "Import modules or packages",
      example:
        "import math\nresult = math.sqrt(16)  # 4.0\n\nfrom datetime import datetime\nnow = datetime.now()\n\nimport numpy as np  # with alias\narr = np.array([1, 2, 3])",
      category: "basic",
    },

    // Data types
    {
      name: "numbers",
      description: language === "fr" ? "Types numériques (int, float, complex)" : "Numeric types (int, float, complex)",
      example:
        "x = 10  # int\ny = 3.14  # float\nz = 1 + 2j  # complex\n\n# Operations\nsum = x + y  # 13.14\nproduct = x * y  # 31.4\npower = x ** 2  # 100 (exponentiation)\ndivision = x / 3  # 3.3333... (float division)\nint_division = x // 3  # 3 (integer division)\nremainder = x % 3  # 1 (modulo)",
      category: "datatypes",
    },
    {
      name: "strings",
      description: language === "fr" ? "Séquences de caractères" : "Sequences of characters",
      example:
        "s1 = 'Single quotes'\ns2 = \"Double quotes\"\ns3 = '''Triple quotes for\nmulti-line strings'''\n\n# String operations\nname = \"Python\"\nlength = len(name)  # 6\nfirst = name[0]  # 'P'\nlast = name[-1]  # 'n'\nslice = name[1:4]  # 'yth'\n\n# Methods\nupper = name.upper()  # 'PYTHON'\nreplaced = name.replace('P', 'J')  # 'Jython'\nsplit_result = \"a,b,c\".split(',')  # ['a', 'b', 'c']\n\n# Formatting\nformatted = f\"{name} has {length} characters\"",
      category: "datatypes",
    },
    {
      name: "lists",
      description: language === "fr" ? "Collections ordonnées et modifiables" : "Ordered and mutable collections",
      example:
        'fruits = ["apple", "banana", "cherry"]\nnumbers = [1, 2, 3, 4, 5]\nmixed = [1, "hello", 3.14, True]\n\n# Accessing elements\nfirst = fruits[0]  # "apple"\nlast = fruits[-1]  # "cherry"\nsubset = fruits[1:3]  # ["banana", "cherry"]\n\n# Modifying\nfruits.append("orange")  # Add to end\nfruits.insert(1, "mango")  # Insert at position\nfruits.remove("banana")  # Remove by value\npopped = fruits.pop()  # Remove and return last item\nfruits[0] = "pear"  # Change value\n\n# Other operations\nlength = len(fruits)\nsorted_fruits = sorted(fruits)\nfruits.reverse()\nfruits.sort()\nindex = fruits.index("cherry")\ncount = fruits.count("apple")',
      category: "datatypes",
    },
    {
      name: "tuples",
      description: language === "fr" ? "Collections ordonnées et immuables" : "Ordered and immutable collections",
      example:
        'coordinates = (10, 20)\ncolors = ("red", "green", "blue")\nsingle_item = (1,)  # Comma needed for single item\n\n# Accessing elements (similar to lists)\nfirst = colors[0]  # "red"\nsubset = colors[1:]  # ("green", "blue")\n\n# Operations\nlength = len(colors)\ncount = colors.count("red")\nindex = colors.index("green")\n\n# Unpacking\nx, y = coordinates\nr, g, b = colors',
      category: "datatypes",
    },
    {
      name: "dictionaries",
      description: language === "fr" ? "Collections de paires clé-valeur" : "Collections of key-value pairs",
      example:
        'person = {\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}\n\n# Accessing values\nname = person["name"]  # "John"\nage = person.get("age")  # 30\nunknown = person.get("job", "Not specified")  # Default value\n\n# Modifying\nperson["email"] = "john@example.com"  # Add new key-value\nperson["age"] = 31  # Update value\ndel person["city"]  # Remove key-value\npopped = person.pop("email")  # Remove and return value\n\n# Other operations\nkeys = person.keys()\nvalues = person.values()\nitems = person.items()  # Returns (key, value) pairs\n\n# Iteration\nfor key in person:\n  print(key, person[key])\n\nfor key, value in person.items():\n  print(key, value)',
      category: "datatypes",
    },
    {
      name: "sets",
      description:
        language === "fr" ? "Collections non ordonnées d'éléments uniques" : "Unordered collections of unique elements",
      example:
        'fruits = {"apple", "banana", "cherry"}\nnumbers = set([1, 2, 2, 3, 4, 4])  # Creates {1, 2, 3, 4}\n\n# Modifying\nfruits.add("orange")\nfruits.remove("banana")  # Raises error if not found\nfruits.discard("banana")  # No error if not found\npopped = fruits.pop()  # Remove and return arbitrary element\n\n# Set operations\nset1 = {1, 2, 3}\nset2 = {3, 4, 5}\nunion = set1 | set2  # or set1.union(set2)\nintersection = set1 & set2  # or set1.intersection(set2)\ndifference = set1 - set2  # or set1.difference(set2)\nsymm_diff = set1 ^ set2  # or set1.symmetric_difference(set2)',
      category: "datatypes",
    },

    // Control structures
    {
      name: "if-elif-else",
      description: language === "fr" ? "Structure de contrôle conditionnel" : "Conditional control structure",
      example:
        'x = 10\n\nif x > 20:\n  print("x is greater than 20")\nelif x > 5:\n  print("x is greater than 5 but not greater than 20")\nelse:\n  print("x is 5 or less")\n\n# Ternary operator (conditional expression)\nstatus = "adult" if age >= 18 else "minor"',
      category: "control",
    },
    {
      name: "for loops",
      description: language === "fr" ? "Itérer sur une séquence" : "Iterate over a sequence",
      example:
        '# Iterate over a list\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n  print(fruit)\n\n# Iterate with index\nfor i, fruit in enumerate(fruits):\n  print(f"{i}: {fruit}")\n\n# Iterate over a range\nfor i in range(5):  # 0 to 4\n  print(i)\n\nfor i in range(2, 8):  # 2 to 7\n  print(i)\n\nfor i in range(1, 10, 2):  # 1, 3, 5, 7, 9\n  print(i)\n\n# Iterate over a dictionary\nperson = {"name": "John", "age": 30}\nfor key in person:\n  print(key, person[key])\n\nfor key, value in person.items():\n  print(key, value)',
      category: "control",
    },
    {
      name: "while loops",
      description:
        language === "fr" ? "Exécuter tant qu'une condition est vraie" : "Execute as long as a condition is true",
      example:
        "count = 5\nwhile count > 0:\n  print(count)\n  count -= 1\n\n# break and continue\nn = 0\nwhile True:\n  n += 1\n  if n == 3:\n    continue  # Skip the rest of this iteration\n  print(n)\n  if n == 5:\n    break  # Exit the loop",
      category: "control",
    },
    {
      name: "list comprehensions",
      description: language === "fr" ? "Créer des listes de manière concise" : "Create lists concisely",
      example:
        "# Basic list comprehension\nsquares = [x**2 for x in range(10)]  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]\n\n# With condition\neven_squares = [x**2 for x in range(10) if x % 2 == 0]  # [0, 4, 16, 36, 64]\n\n# Nested loops\ncoordinates = [(x, y) for x in range(3) for y in range(2)]\n# [(0, 0), (0, 1), (1, 0), (1, 1), (2, 0), (2, 1)]\n\n# Dictionary comprehension\nsquare_dict = {x: x**2 for x in range(5)}\n# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}\n\n# Set comprehension\neven_set = {x for x in range(10) if x % 2 == 0}\n# {0, 2, 4, 6, 8}",
      category: "control",
    },

    // Functions
    {
      name: "function definition",
      description: language === "fr" ? "Définir des fonctions réutilisables" : "Define reusable functions",
      example:
        'def greet(name):\n  """This function greets the person passed in as a parameter"""\n  return f"Hello, {name}!"\n\n# Function call\nmessage = greet("John")\nprint(message)  # "Hello, John!"\n\n# Default parameters\ndef greet_with_time(name, time="morning"):\n  return f"Good {time}, {name}!"\n\nprint(greet_with_time("John"))  # "Good morning, John!"\nprint(greet_with_time("John", "evening"))  # "Good evening, John!"',
      category: "functions",
    },
    {
      name: "args and kwargs",
      description: language === "fr" ? "Nombre variable d'arguments" : "Variable number of arguments",
      example:
        '# *args for variable positional arguments\ndef sum_all(*args):\n  total = 0\n  for num in args:\n    total += num\n  return total\n\nresult = sum_all(1, 2, 3, 4, 5)  # 15\n\n# **kwargs for variable keyword arguments\ndef print_info(**kwargs):\n  for key, value in kwargs.items():\n    print(f"{key}: {value}")\n\nprint_info(name="John", age=30, city="New York")\n\n# Both together\ndef combined_example(a, b, *args, **kwargs):\n  print(f"a = {a}, b = {b}")\n  print(f"args = {args}")\n  print(f"kwargs = {kwargs}")\n\ncombined_example(1, 2, 3, 4, 5, x=10, y=20)',
      category: "functions",
    },
    {
      name: "lambda functions",
      description: language === "fr" ? "Fonctions anonymes courtes" : "Short anonymous functions",
      example:
        "# Basic lambda function\nsquare = lambda x: x**2\nprint(square(5))  # 25\n\n# With multiple parameters\nsum_func = lambda x, y: x + y\nprint(sum_func(3, 4))  # 7\n\n# Used with built-in functions\nnumbers = [1, 5, 3, 9, 2]\nsorted_numbers = sorted(numbers)  # [1, 2, 3, 5, 9]\nsorted_by_abs = sorted([-3, -2, 1, 4], key=lambda x: abs(x))  # [1, -2, -3, 4]\n\n# With map and filter\nsquares = list(map(lambda x: x**2, numbers))  # [1, 25, 9, 81, 4]\neven_numbers = list(filter(lambda x: x % 2 == 0, numbers))  # [2]",
      category: "functions",
    },
    {
      name: "decorators",
      description: language === "fr" ? "Modifier ou étendre des fonctions" : "Modify or extend functions",
      example:
        '# Basic decorator\ndef my_decorator(func):\n  def wrapper():\n    print("Something before the function is called.")\n    func()\n    print("Something after the function is called.")\n  return wrapper\n\n@my_decorator\ndef say_hello():\n  print("Hello!")\n\n# Equivalent to: say_hello = my_decorator(say_hello)\nsay_hello()\n\n# Decorator with arguments\ndef repeat(n):\n  def decorator(func):\n    def wrapper(*args, **kwargs):\n      for _ in range(n):\n        result = func(*args, **kwargs)\n      return result\n    return wrapper\n  return decorator\n\n@repeat(3)\ndef say_hi(name):\n  print(f"Hi, {name}!")\n  return name\n\nsay_hi("Alice")  # Prints "Hi, Alice!" three times',
      category: "functions",
    },

    // Object-oriented programming
    {
      name: "classes",
      description:
        language === "fr"
          ? "Définir des objets avec attributs et méthodes"
          : "Define objects with attributes and methods",
      example:
        'class Person:\n  # Class attribute\n  species = "Homo sapiens"\n  \n  # Constructor\n  def __init__(self, name, age):\n    # Instance attributes\n    self.name = name\n    self.age = age\n  \n  # Instance method\n  def greet(self):\n    return f"Hello, my name is {self.name}"\n  \n  # String representation\n  def __str__(self):\n    return f"{self.name}, {self.age} years old"\n\n# Creating objects\nperson1 = Person("John", 30)\nperson2 = Person("Jane", 25)\n\n# Accessing attributes and methods\nprint(person1.name)  # "John"\nprint(person1.greet())  # "Hello, my name is John"\nprint(person1)  # "John, 30 years old"',
      category: "oop",
    },
    {
      name: "inheritance",
      description:
        language === "fr"
          ? "Créer une classe qui hérite d'une autre classe"
          : "Create a class that inherits from another class",
      example:
        'class Animal:\n  def __init__(self, name):\n    self.name = name\n  \n  def speak(self):\n    pass  # Abstract method to be overridden\n\nclass Dog(Animal):\n  def speak(self):\n    return f"{self.name} says Woof!"\n\nclass Cat(Animal):\n  def speak(self):\n    return f"{self.name} says Meow!"\n\n# Creating objects\ndog = Dog("Rex")\ncat = Cat("Whiskers")\n\nprint(dog.speak())  # "Rex says Woof!"\nprint(cat.speak())  # "Whiskers says Meow!"',
      category: "oop",
    },
    {
      name: "special methods",
      description:
        language === "fr"
          ? "Méthodes magiques pour personnaliser le comportement des objets"
          : "Magic methods to customize object behavior",
      example:
        'class Vector:\n  def __init__(self, x, y):\n    self.x = x\n    self.y = y\n  \n  # String representation\n  def __str__(self):\n    return f"Vector({self.x}, {self.y})"\n  \n  # Addition\n  def __add__(self, other):\n    return Vector(self.x + other.x, self.y + other.y)\n  \n  # Equality comparison\n  def __eq__(self, other):\n    return self.x == other.x and self.y == other.y\n  \n  # Length (magnitude)\n  def __len__(self):\n    return int((self.x**2 + self.y**2)**0.5)\n\n# Usage\nv1 = Vector(2, 3)\nv2 = Vector(3, 4)\nv3 = v1 + v2  # Vector(5, 7)\nprint(v1 == Vector(2, 3))  # True\nprint(len(v2))  # 5',
      category: "oop",
    },

    // Modules and packages
    {
      name: "modules",
      description: language === "fr" ? "Organiser le code en fichiers séparés" : "Organize code in separate files",
      example:
        '# File: mymodule.py\ndef greet(name):\n  return f"Hello, {name}!"\n\nPI = 3.14159\n\nclass Person:\n  def __init__(self, name):\n    self.name = name\n\n# In another file\nimport mymodule\n\nprint(mymodule.greet("John"))  # "Hello, John!"\nprint(mymodule.PI)  # 3.14159\nperson = mymodule.Person("Jane")\n\n# Import specific items\nfrom mymodule import greet, PI\nprint(greet("Alice"))  # "Hello, Alice!"\n\n# Import with alias\nimport mymodule as mm\nprint(mm.greet("Bob"))  # "Hello, Bob!"',
      category: "modules",
    },
    {
      name: "packages",
      description: language === "fr" ? "Organiser les modules en répertoires" : "Organize modules in directories",
      example:
        "# Directory structure:\n# mypackage/\n#   __init__.py\n#   module1.py\n#   module2.py\n#   subpackage/\n#     __init__.py\n#     module3.py\n\n# In __init__.py (optional)\nfrom .module1 import function1\nfrom .subpackage import module3\n\n# Usage\nimport mypackage\nfrom mypackage import module1\nfrom mypackage.subpackage import module3\n\n# Relative imports (inside package)\n# In module2.py\nfrom . import module1  # Same directory\nfrom .subpackage import module3  # Subdirectory",
      category: "modules",
    },

    // Exception handling
    {
      name: "try-except",
      description: language === "fr" ? "Gérer les erreurs et les exceptions" : "Handle errors and exceptions",
      example:
        '# Basic try-except\ntry:\n  result = 10 / 0  # This will raise a ZeroDivisionError\nexcept ZeroDivisionError:\n  print("Cannot divide by zero!")\n\n# Multiple exceptions\ntry:\n  num = int(input("Enter a number: "))\n  result = 10 / num\nexcept ValueError:\n  print("Invalid input. Please enter a number.")\nexcept ZeroDivisionError:\n  print("Cannot divide by zero!")\n\n# Catching any exception\ntry:\n  # Some risky code\n  pass\nexcept Exception as e:\n  print(f"An error occurred: {e}")\n\n# try-except-else-finally\ntry:\n  file = open("data.txt", "r")\nexcept FileNotFoundError:\n  print("File not found!")\nelse:\n  # Runs if no exception was raised\n  content = file.read()\n  print(content)\nfinally:\n  # Always runs, regardless of exception\n  if \'file\' in locals() and not file.closed:\n    file.close()\n    print("File closed.")',
      category: "exceptions",
    },
    {
      name: "raise",
      description: language === "fr" ? "Lever des exceptions" : "Raise exceptions",
      example:
        'def divide(a, b):\n  if b == 0:\n    raise ZeroDivisionError("Cannot divide by zero")\n  return a / b\n\n# Custom exceptions\nclass CustomError(Exception):\n  """Custom exception class"""\n  def __init__(self, message, code):\n    self.message = message\n    self.code = code\n    super().__init__(self.message)\n\ndef process_data(data):\n  if not data:\n    raise CustomError("Empty data provided", 100)\n  # Process data...\n\n# Using custom exception\ntry:\n  process_data([])\nexcept CustomError as e:\n  print(f"Error {e.code}: {e.message}")',
      category: "exceptions",
    },

    // File handling
    {
      name: "file operations",
      description: language === "fr" ? "Lire et écrire des fichiers" : "Read and write files",
      example:
        '# Writing to a file\nwith open("data.txt", "w") as file:\n  file.write("Hello, World!\\n")\n  file.write("This is a test.")\n\n# Reading from a file\nwith open("data.txt", "r") as file:\n  content = file.read()  # Read entire file\n  print(content)\n\n# Reading line by line\nwith open("data.txt", "r") as file:\n  for line in file:\n    print(line.strip())  # strip() removes newline\n\n# Reading specific lines\nwith open("data.txt", "r") as file:\n  lines = file.readlines()  # List of lines\n  first_line = lines[0]\n\n# Appending to a file\nwith open("data.txt", "a") as file:\n  file.write("\\nAppended line.")\n\n# Binary files\nwith open("image.jpg", "rb") as file:\n  data = file.read()\n\nwith open("copy.jpg", "wb") as file:\n  file.write(data)',
      category: "files",
    },
    {
      name: "JSON handling",
      description: language === "fr" ? "Travailler avec des données JSON" : "Work with JSON data",
      example:
        'import json\n\n# Python object to JSON string\ndata = {\n  "name": "John",\n  "age": 30,\n  "city": "New York",\n  "languages": ["Python", "JavaScript"],\n  "is_employee": True,\n  "salary": None\n}\n\njson_string = json.dumps(data, indent=2)\nprint(json_string)\n\n# Writing JSON to a file\nwith open("data.json", "w") as file:\n  json.dump(data, file, indent=2)\n\n# JSON string to Python object\njson_str = \'{"name":"Jane","age":25}\'\nperson = json.loads(json_str)\nprint(person["name"])  # "Jane"\n\n# Reading JSON from a file\nwith open("data.json", "r") as file:\n  loaded_data = json.load(file)\nprint(loaded_data["city"])  # "New York"',
      category: "files",
    },
  ]

  // Group items by category
  const categories = [
    { id: "basic", name: language === "fr" ? "Syntaxe de base" : "Basic Syntax", icon: "📝" },
    { id: "datatypes", name: language === "fr" ? "Types de données" : "Data Types", icon: "🔢" },
    { id: "control", name: language === "fr" ? "Structures de contrôle" : "Control Structures", icon: "🔄" },
    { id: "functions", name: language === "fr" ? "Fonctions" : "Functions", icon: "📋" },
    { id: "oop", name: language === "fr" ? "Programmation orientée objet" : "Object-Oriented Programming", icon: "🧩" },
    { id: "modules", name: language === "fr" ? "Modules et packages" : "Modules and Packages", icon: "📦" },
    { id: "exceptions", name: language === "fr" ? "Gestion des exceptions" : "Exception Handling", icon: "⚠️" },
    { id: "files", name: language === "fr" ? "Manipulation de fichiers" : "File Handling", icon: "📄" },
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
          <h1 className="text-4xl font-bold tracking-tight">{language === "fr" ? "Python" : "Python"}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {language === "fr"
            ? "Une référence complète de la syntaxe, des méthodes et des bonnes pratiques du langage Python"
            : "A comprehensive reference of Python language syntax, methods, and best practices"}
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
                                <CodeBlock code={item.example} language="python" className="mt-1" />
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

