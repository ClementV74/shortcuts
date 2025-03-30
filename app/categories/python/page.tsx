"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"

export default function PythonLanguagePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Format specifiers for print
  const formatSpecifiers = [
    {
      specifier: "print()",
      description: "Fonction d'affichage standard",
      example: 'print("Hello, World!")',
    },
    {
      specifier: "f-strings",
      description: "Chaînes de caractères formatées (Python 3.6+)",
      example: 'name = "John"\nage = 30\nprint(f"Hello, {name}! You are {age} years old.")',
    },
    {
      specifier: "str.format()",
      description: "Méthode de formatage de chaînes",
      example: 'name = "John"\nage = 30\nprint("Hello, {}! You are {} years old.".format(name, age))',
    },
    {
      specifier: "% operator",
      description: "Opérateur de formatage (style C)",
      example: 'name = "John"\nage = 30\nprint("Hello, %s! You are %d years old." % (name, age))',
    },
    {
      specifier: "{:d}",
      description: "Format entier",
      example: 'num = 42\nprint(f"Nombre: {num:d}")',
    },
    {
      specifier: "{:f}",
      description: "Format nombre à virgule flottante",
      example: 'pi = 3.14159\nprint(f"Pi: {pi:f}")',
    },
    {
      specifier: "{:.2f}",
      description: "Format nombre à virgule flottante avec précision",
      example: 'pi = 3.14159\nprint(f"Pi: {pi:.2f}")',
    },
    {
      specifier: "{:,}",
      description: "Format nombre avec séparateur de milliers",
      example: 'num = 1000000\nprint(f"Nombre: {num:,}")',
    },
    {
      specifier: "{:e}",
      description: "Format notation scientifique",
      example: 'num = 1000000\nprint(f"Nombre: {num:e}")',
    },
    {
      specifier: "{:%}",
      description: "Format pourcentage",
      example: 'ratio = 0.25\nprint(f"Pourcentage: {ratio:%}")',
    },
    {
      specifier: "{:b}",
      description: "Format binaire",
      example: 'num = 42\nprint(f"Binaire: {num:b}")',
    },
    {
      specifier: "{:x}",
      description: "Format hexadécimal",
      example: 'num = 42\nprint(f"Hexadécimal: {num:x}")',
    },
    {
      specifier: "{:o}",
      description: "Format octal",
      example: 'num = 42\nprint(f"Octal: {num:o}")',
    },
  ]

  // Data types
  const dataTypes = [
    {
      type: "int",
      description: "Entier de précision arbitraire",
      example: "x = 42",
      operations:
        "Addition (+), Soustraction (-), Multiplication (*), Division (/), Division entière (//), Modulo (%), Puissance (**)",
    },
    {
      type: "float",
      description: "Nombre à virgule flottante",
      example: "x = 3.14",
      operations: "Addition (+), Soustraction (-), Multiplication (*), Division (/), Puissance (**)",
    },
    {
      type: "complex",
      description: "Nombre complexe",
      example: "x = 1 + 2j",
      operations: "Addition (+), Soustraction (-), Multiplication (*), Division (/), Puissance (**)",
    },
    {
      type: "bool",
      description: "Booléen (True ou False)",
      example: "x = True",
      operations: "ET logique (and), OU logique (or), NON logique (not)",
    },
    {
      type: "str",
      description: "Chaîne de caractères (immuable)",
      example: 'x = "Hello"',
      operations:
        "Concaténation (+), Répétition (*), Indexation ([]), Découpage ([:]), Méthodes (upper(), lower(), strip(), etc.)",
    },
    {
      type: "list",
      description: "Liste (mutable, ordonnée)",
      example: "x = [1, 2, 3]",
      operations:
        "Ajout (append()), Insertion (insert()), Suppression (remove(), pop()), Indexation ([]), Découpage ([:]), Concaténation (+)",
    },
    {
      type: "tuple",
      description: "Tuple (immuable, ordonné)",
      example: "x = (1, 2, 3)",
      operations: "Indexation ([]), Découpage ([:]), Concaténation (+)",
    },
    {
      type: "dict",
      description: "Dictionnaire (mutable, non ordonné avant Python 3.7)",
      example: 'x = {"a": 1, "b": 2}',
      operations:
        "Accès (x[key]), Ajout (x[key] = value), Suppression (del x[key], pop()), Méthodes (keys(), values(), items())",
    },
    {
      type: "set",
      description: "Ensemble (mutable, non ordonné, éléments uniques)",
      example: "x = {1, 2, 3}",
      operations: "Union (|), Intersection (&), Différence (-), Différence symétrique (^), Méthodes (add(), remove())",
    },
    {
      type: "frozenset",
      description: "Ensemble immuable",
      example: "x = frozenset([1, 2, 3])",
      operations: "Union (|), Intersection (&), Différence (-), Différence symétrique (^)",
    },
    {
      type: "bytes",
      description: "Séquence d'octets immuable",
      example: 'x = b"hello"',
      operations: "Indexation ([]), Découpage ([:]), Concaténation (+)",
    },
    {
      type: "bytearray",
      description: "Séquence d'octets mutable",
      example: 'x = bytearray(b"hello")',
      operations: "Indexation ([]), Découpage ([:]), Concaténation (+), Modification ([i] = value)",
    },
    {
      type: "None",
      description: "Valeur nulle",
      example: "x = None",
      operations: "Comparaison (is, is not)",
    },
  ]

  // Control structures
  const controlStructures = [
    {
      name: "if-elif-else",
      description: "Structure de contrôle conditionnel",
      example: `x = 10

if x > 20:
    print("x is greater than 20")
elif x > 5:
    print("x is greater than 5 but not greater than 20")
else:
    print("x is 5 or less")

# Opérateur ternaire
status = "adult" if age >= 18 else "minor"`,
    },
    {
      name: "for loop",
      description: "Boucle pour itérer sur une séquence",
      example: `# Itérer sur une liste
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Itérer avec index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Itérer sur une plage
for i in range(5):  # 0 à 4
    print(i)

# Itérer sur un dictionnaire
person = {"name": "John", "age": 30}
for key, value in person.items():
    print(f"{key}: {value}")`,
    },
    {
      name: "while loop",
      description: "Boucle qui s'exécute tant que la condition est vraie",
      example: `count = 5
while count > 0:
    print(count)
    count -= 1

# break et continue
n = 0
while True:
    n += 1
    if n == 3:
        continue  # Passer à l'itération suivante
    print(n)
    if n == 5:
        break  # Sortir de la boucle`,
    },
    {
      name: "list comprehension",
      description: "Créer des listes de manière concise",
      example: `# Compréhension de liste simple
squares = [x**2 for x in range(10)]  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Avec condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]  # [0, 4, 16, 36, 64]

# Compréhension de dictionnaire
square_dict = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Compréhension d'ensemble
even_set = {x for x in range(10) if x % 2 == 0}  # {0, 2, 4, 6, 8}`,
    },
    {
      name: "try-except",
      description: "Gestion des exceptions",
      example: `try:
    result = 10 / 0  # Ceci va lever une ZeroDivisionError
except ZeroDivisionError:
    print("Division par zéro!")
except (ValueError, TypeError) as e:
    print(f"Erreur de valeur ou de type: {e}")
except Exception as e:
    print(f"Une erreur s'est produite: {e}")
else:
    print("Aucune exception n'a été levée")
finally:
    print("Ce bloc est toujours exécuté")`,
    },
    {
      name: "with statement",
      description: "Gestion de contexte (Context Manager)",
      example: `# Utilisation avec des fichiers
with open("file.txt", "r") as file:
    content = file.read()
    # Le fichier est automatiquement fermé à la sortie du bloc

# Création d'un gestionnaire de contexte personnalisé
from contextlib import contextmanager

@contextmanager
def my_context():
    print("Entering context")
    try:
        yield
    finally:
        print("Exiting context")

with my_context():
    print("Inside context")`,
    },
  ]

  // Common functions
  const commonFunctions = [
    {
      name: "print()",
      module: "built-in",
      description: "Afficher du texte sur la sortie standard",
      example: `print("Hello, World!")
print("Multiple", "arguments", sep=", ")
print("No newline", end=" ")
print("on same line")`,
    },
    {
      name: "input()",
      module: "built-in",
      description: "Lire une entrée utilisateur",
      example: `name = input("Enter your name: ")
age = int(input("Enter your age: "))  # Conversion en entier`,
    },
    {
      name: "len()",
      module: "built-in",
      description: "Obtenir la longueur d'une séquence",
      example: `my_list = [1, 2, 3, 4, 5]
length = len(my_list)  # 5

my_string = "Hello"
length = len(my_string)  # 5`,
    },
    {
      name: "range()",
      module: "built-in",
      description: "Générer une séquence de nombres",
      example: `# range(stop)
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# range(start, stop)
for i in range(2, 5):  # 2, 3, 4
    print(i)

# range(start, stop, step)
for i in range(0, 10, 2):  # 0, 2, 4, 6, 8
    print(i)`,
    },
    {
      name: "type()",
      module: "built-in",
      description: "Obtenir le type d'un objet",
      example: `x = 42
print(type(x))  # <class 'int'>

y = "Hello"
print(type(y))  # <class 'str'>`,
    },
    {
      name: "sorted()",
      module: "built-in",
      description: "Trier une séquence",
      example: `numbers = [3, 1, 4, 1, 5, 9, 2]
sorted_numbers = sorted(numbers)  # [1, 1, 2, 3, 4, 5, 9]

# Tri inversé
reverse_sorted = sorted(numbers, reverse=True)  # [9, 5, 4, 3, 2, 1, 1]

# Tri avec une clé personnalisée
words = ["apple", "banana", "cherry"]
sorted_by_length = sorted(words, key=len)  # ["apple", "cherry", "banana"]`,
    },
    {
      name: "open()",
      module: "built-in",
      description: "Ouvrir un fichier",
      example: `# Lecture d'un fichier
with open("file.txt", "r") as file:
    content = file.read()
    
# Écriture dans un fichier
with open("output.txt", "w") as file:
    file.write("Hello, World!")
    
# Ajout à un fichier
with open("log.txt", "a") as file:
    file.write("New log entry\\n")`,
    },
    {
      name: "map()",
      module: "built-in",
      description: "Appliquer une fonction à chaque élément d'une séquence",
      example: `numbers = [1, 2, 3, 4, 5]

# Utilisation avec une fonction lambda
squares = list(map(lambda x: x**2, numbers))  # [1, 4, 9, 16, 25]

# Utilisation avec une fonction nommée
def cube(x):
    return x**3

cubes = list(map(cube, numbers))  # [1, 8, 27, 64, 125]`,
    },
    {
      name: "filter()",
      module: "built-in",
      description: "Filtrer une séquence selon une condition",
      example: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filtrer les nombres pairs
even = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4, 6, 8, 10]

# Avec une fonction nommée
def is_odd(x):
    return x % 2 != 0

odd = list(filter(is_odd, numbers))  # [1, 3, 5, 7, 9]`,
    },
    {
      name: "zip()",
      module: "built-in",
      description: "Combiner des séquences élément par élément",
      example: `names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

# Combiner deux listes
combined = list(zip(names, ages))  # [("Alice", 25), ("Bob", 30), ("Charlie", 35)]

# Décompresser (unzip)
names_again, ages_again = zip(*combined)
# names_again = ("Alice", "Bob", "Charlie")
# ages_again = (25, 30, 35)`,
    },
    {
      name: "enumerate()",
      module: "built-in",
      description: "Itérer avec un index",
      example: `fruits = ["apple", "banana", "cherry"]

for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
    
# Avec un index de départ personnalisé
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}: {fruit}")`,
    },
    {
      name: "json.loads() / json.dumps()",
      module: "json",
      description: "Convertir entre JSON et objets Python",
      example: `import json

# Conversion d'une chaîne JSON en objet Python
json_string = '{"name": "John", "age": 30}'
person = json.loads(json_string)
print(person["name"])  # "John"

# Conversion d'un objet Python en chaîne JSON
data = {"name": "Alice", "age": 25, "languages": ["Python", "JavaScript"]}
json_string = json.dumps(data, indent=2)
print(json_string)`,
    },
  ]

  // Memory management examples
  const memoryExamples = [
    {
      title: "Garbage Collection",
      description: "Python gère automatiquement la mémoire avec un ramasse-miettes",
      example: `# Python libère automatiquement la mémoire quand les objets ne sont plus référencés
x = [1, 2, 3]  # Alloue de la mémoire pour la liste
x = "hello"    # La liste précédente n'est plus référencée et sera collectée

# Forcer la collecte des déchets (rarement nécessaire)
import gc
gc.collect()`,
    },
    {
      title: "Références et comptage de références",
      description: "Python utilise le comptage de références pour suivre les objets",
      example: `import sys

# Créer un objet et vérifier son nombre de références
x = [1, 2, 3]
print(sys.getrefcount(x) - 1)  # -1 car getrefcount() crée une référence temporaire

# Créer une autre référence au même objet
y = x
print(sys.getrefcount(x) - 1)  # Le compteur augmente

# Supprimer une référence
del y
print(sys.getrefcount(x) - 1)  # Le compteur diminue`,
    },
    {
      title: "Cycles de références et collecteur générationnel",
      description: "Python utilise un collecteur générationnel pour détecter les cycles de références",
      example: `import gc

# Créer un cycle de références
class Node:
    def __init__(self, name):
        self.name = name
        self.next = None

# Créer un cycle
node1 = Node("node1")
node2 = Node("node2")
node1.next = node2
node2.next = node1

# Les objets se référencent mutuellement
# Le comptage de références ne suffit pas
# Le collecteur générationnel s'en chargera

# Vérifier les objets suivis par le collecteur
print(gc.get_objects())

# Forcer la collecte
del node1
del node2
gc.collect()`,
    },
    {
      title: "Gestionnaires de contexte pour les ressources",
      description: "Utiliser des gestionnaires de contexte pour libérer les ressources",
      example: `# Les fichiers sont automatiquement fermés
with open("file.txt", "w") as f:
    f.write("Hello, World!")
# Le fichier est fermé ici, même en cas d'exception

# Créer un gestionnaire de contexte personnalisé
from contextlib import contextmanager

@contextmanager
def resource_manager():
    print("Acquiring resource")
    resource = {"data": "important data"}
    try:
        yield resource
    finally:
        print("Releasing resource")
        # Nettoyage des ressources ici

# Utilisation
with resource_manager() as res:
    print(f"Using resource: {res['data']}")`,
    },
    {
      title: "Utilisation de weakref pour éviter les cycles",
      description: "Utiliser des références faibles pour éviter les cycles de références",
      example: `import weakref

class Node:
    def __init__(self, name):
        self.name = name
        self.parent = None
        self.children = []
    
    def add_child(self, child):
        self.children.append(child)
        # Utiliser une référence faible pour éviter un cycle
        child.parent = weakref.ref(self)

# Création d'une hiérarchie
root = Node("root")
child = Node("child")
root.add_child(child)

# Accès via une référence faible
parent = child.parent()  # Notez les parenthèses pour obtenir l'objet référencé
if parent:
    print(f"Child's parent is: {parent.name}")

# Si root est supprimé, child.parent() retournera None
del root
print(child.parent())  # None`,
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
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.operations.toLowerCase().includes(searchQuery.toLowerCase()),
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
      item.module.toLowerCase().includes(searchQuery.toLowerCase()),
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
          Langage Python
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          L'essentiel du langage Python: syntaxe, fonctions et exemples
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

      <Tabs defaultValue="print" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger
            value="print"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Format print
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

        <TabsContent value="print" className="mt-0">
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
                    <CodeBlock code={item.example} language="python" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="types" className="mt-0">
          <Card className="animate-glow">
            <CardHeader>
              <CardTitle>Types de données en Python</CardTitle>
              <CardDescription>
                Les types de données fondamentaux en Python avec leurs caractéristiques et opérations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-4 font-medium">Type</th>
                      <th className="text-left py-2 px-4 font-medium">Description</th>
                      <th className="text-left py-2 px-4 font-medium">Exemple</th>
                      <th className="text-left py-2 px-4 font-medium">Opérations</th>
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
                        <td className="py-2 px-4">{type.description}</td>
                        <td className="py-2 px-4">
                          <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{type.example}</code>
                        </td>
                        <td className="py-2 px-4 text-sm">{type.operations}</td>
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
                    <CodeBlock code={item.example} language="python" />
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
                        {item.module}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={item.example} language="python" />
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
                    Gestion de la mémoire en Python
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Python utilise un ramasse-miettes automatique pour gérer la mémoire</li>
                    <li>Le comptage de références est le mécanisme principal de gestion de la mémoire</li>
                    <li>Un collecteur générationnel détecte et nettoie les cycles de références</li>
                    <li>Les objets sont automatiquement libérés lorsqu'ils ne sont plus référencés</li>
                    <li>Utilisez des gestionnaires de contexte (with) pour gérer les ressources</li>
                    <li>Les références faibles (weakref) peuvent aider à éviter les cycles de références</li>
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
                    <CodeBlock code={item.example} language="python" />
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

