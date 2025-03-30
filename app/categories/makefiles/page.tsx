"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MakefilesPage() {
  const { t, language } = useLanguage()

  // Extend CodeBlock to support Makefile syntax
  const MakefileCodeBlock = ({ code, className }: { code: string; className?: string }) => {
    // Custom highlighting for Makefiles
    const highlightMakefile = (code: string) => {
      const lines = code.split("\n")

      const processLine = (line: string) => {
        // Rules (targets)
        let processedLine = line.replace(
          /^([a-zA-Z0-9_.-]+)(\s*:)(?!=)/g,
          '<span class="text-yellow-500 dark:text-yellow-300">$1</span><span class="text-purple-500 dark:text-purple-300">$2</span>',
        )

        // Variables assignment
        processedLine = processedLine.replace(
          /^([a-zA-Z0-9_]+)(\s*\??=)/g,
          '<span class="text-blue-500 dark:text-blue-300">$1</span><span class="text-purple-500 dark:text-purple-300">$2</span>',
        )

        // Variable usage
        processedLine = processedLine.replace(
          /(\$$[a-zA-Z0-9_]+$$)/g,
          '<span class="text-green-500 dark:text-green-300">$1</span>',
        )

        // Comments
        processedLine = processedLine.replace(
          /(#.*)$/g,
          '<span class="text-emerald-400 dark:text-emerald-300">$1</span>',
        )

        // Special targets
        processedLine = processedLine.replace(
          /^(\.PHONY|\.SILENT|\.DEFAULT|\.PRECIOUS|\.INTERMEDIATE|\.SECONDARY|\.DELETE_ON_ERROR|\.IGNORE)(\s*:)/g,
          '<span class="text-red-500 dark:text-red-300">$1</span><span class="text-purple-500 dark:text-purple-300">$2</span>',
        )

        // Commands (lines starting with tabs)
        if (line.startsWith("\t")) {
          processedLine = '<span class="text-cyan-500 dark:text-cyan-300">' + processedLine + "</span>"
        }

        return processedLine
      }

      const highlightedLines = lines.map((line) => processLine(line))
      return highlightedLines.join("\n")
    }

    return (
      <div className={`relative rounded-md ${className}`}>
        <div className="absolute top-0 right-0 bg-muted px-2 py-1 rounded-bl rounded-tr text-xs text-muted-foreground">
          Makefile
        </div>
        <pre className="bg-muted p-4 pt-8 rounded-md overflow-x-auto text-sm md:text-base">
          <code className="font-mono" dangerouslySetInnerHTML={{ __html: highlightMakefile(code) }} />
        </pre>
      </div>
    )
  }

  const basicMakefile = `# Simple Makefile example
CC = gcc
CFLAGS = -Wall -g

# The target executable
TARGET = myprogram

# Source files
SRCS = main.c utils.c

# Object files
OBJS = $(SRCS:.c=.o)

# Default target
all: $(TARGET)

# Link object files to create executable
$(TARGET): $(OBJS)
\t$(CC) $(CFLAGS) -o $@ $^

# Compile source files to object files
%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

# Clean up
clean:
\trm -f $(OBJS) $(TARGET)

# Phony targets
.PHONY: all clean
`

  const advancedMakefile = `# Advanced Makefile with automatic dependencies
CC = gcc
CXX = g++
CFLAGS = -Wall -Wextra -g
CXXFLAGS = $(CFLAGS) -std=c++17
LDFLAGS = -lm

# Directories
SRC_DIR = src
OBJ_DIR = obj
BIN_DIR = bin
INC_DIR = include

# Target executable
TARGET = $(BIN_DIR)/myprogram

# Find all source files
C_SRCS = $(wildcard $(SRC_DIR)/*.c)
CXX_SRCS = $(wildcard $(SRC_DIR)/*.cpp)

# Generate object file names
C_OBJS = $(patsubst $(SRC_DIR)/%.c,$(OBJ_DIR)/%.o,$(C_SRCS))
CXX_OBJS = $(patsubst $(SRC_DIR)/%.cpp,$(OBJ_DIR)/%.o,$(CXX_SRCS))
OBJS = $(C_OBJS) $(CXX_OBJS)

# Generate dependency files
DEPS = $(OBJS:.o=.d)

# Default target
all: directories $(TARGET)

# Create necessary directories
directories:
\tmkdir -p $(OBJ_DIR) $(BIN_DIR)

# Link object files to create executable
$(TARGET): $(OBJS)
\t$(CXX) $(CXXFLAGS) -o $@ $^ $(LDFLAGS)

# Compile C source files
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
\t$(CC) $(CFLAGS) -MMD -MP -I$(INC_DIR) -c $< -o $@

# Compile C++ source files
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.cpp
\t$(CXX) $(CXXFLAGS) -MMD -MP -I$(INC_DIR) -c $< -o $@

# Clean up
clean:
\trm -rf $(OBJ_DIR) $(BIN_DIR)

# Include dependency files
-include $(DEPS)

# Phony targets
.PHONY: all clean directories
`

  const libraryMakefile = `# Makefile for building a shared library
CC = gcc
CFLAGS = -Wall -fPIC -g
LDFLAGS = -shared

# Library name and version
LIB_NAME = mylib
VERSION = 1.0.0
SONAME = lib$(LIB_NAME).so.$(shell echo $(VERSION) | cut -d. -f1)
TARGET = lib$(LIB_NAME).so.$(VERSION)

# Directories
SRC_DIR = src
OBJ_DIR = obj
LIB_DIR = lib
INC_DIR = include

# Source files
SRCS = $(wildcard $(SRC_DIR)/*.c)
OBJS = $(patsubst $(SRC_DIR)/%.c,$(OBJ_DIR)/%.o,$(SRCS))

# Default target
all: directories $(LIB_DIR)/$(TARGET)

# Create necessary directories
directories:
\tmkdir -p $(OBJ_DIR) $(LIB_DIR)

# Build the shared library
$(LIB_DIR)/$(TARGET): $(OBJS)
\t$(CC) $(LDFLAGS) -Wl,-soname,$(SONAME) -o $@ $^
\tln -sf $(TARGET) $(LIB_DIR)/lib$(LIB_NAME).so

# Compile source files
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
\t$(CC) $(CFLAGS) -I$(INC_DIR) -c $< -o $@

# Install the library
install: all
\tinstall -d $(DESTDIR)/usr/lib
\tinstall -d $(DESTDIR)/usr/include
\tinstall -m 644 $(LIB_DIR)/$(TARGET) $(DESTDIR)/usr/lib
\tln -sf $(TARGET) $(DESTDIR)/usr/lib/lib$(LIB_NAME).so
\tinstall -m 644 $(INC_DIR)/*.h $(DESTDIR)/usr/include

# Clean up
clean:
\trm -rf $(OBJ_DIR) $(LIB_DIR)

# Phony targets
.PHONY: all clean directories install
`

  const conditionalMakefile = `# Makefile with conditional logic
# Detect operating system
UNAME := $(shell uname)

# Set variables based on OS
ifeq ($(UNAME), Linux)
    CC = gcc
    CFLAGS = -Wall -g
    LDFLAGS = -lm
else ifeq ($(UNAME), Darwin)
    CC = clang
    CFLAGS = -Wall -g
    LDFLAGS = -lm
else
    CC = gcc
    CFLAGS = -Wall -g
    LDFLAGS =
endif

# Debug build?
DEBUG ?= 1
ifeq ($(DEBUG), 1)
    CFLAGS += -DDEBUG -g
else
    CFLAGS += -DNDEBUG -O2
endif

# Source files
SRCS = main.c utils.c
OBJS = $(SRCS:.c=.o)
TARGET = myprogram

# Default target
all: $(TARGET)

# Link object files
$(TARGET): $(OBJS)
\t$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

# Compile source files
%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

# Clean up
clean:
\trm -f $(OBJS) $(TARGET)

# Phony targets
.PHONY: all clean
`

  return (
    <div className="container px-4 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {language === "fr" ? "Makefiles" : "Makefiles"}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {language === "fr"
            ? "Guide complet des Makefiles: syntaxe, templates et bonnes pratiques pour automatiser vos builds."
            : "Complete guide to Makefiles: syntax, templates, and best practices for automating your builds."}
        </p>
      </motion.div>

      <Tabs defaultValue="syntax" className="mb-12">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="syntax">{language === "fr" ? "Syntaxe" : "Syntax"}</TabsTrigger>
          <TabsTrigger value="templates">{language === "fr" ? "Templates" : "Templates"}</TabsTrigger>
          <TabsTrigger value="variables">{language === "fr" ? "Variables" : "Variables"}</TabsTrigger>
          <TabsTrigger value="functions">{language === "fr" ? "Fonctions" : "Functions"}</TabsTrigger>
        </TabsList>

        <TabsContent value="syntax" className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Structure de base" : "Basic Structure"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "La structure fondamentale d'un Makefile avec règles, cibles et commandes"
                    : "The fundamental structure of a Makefile with rules, targets, and commands"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{language === "fr" ? "Règle de base" : "Basic Rule"}</h3>
                  <p className="text-muted-foreground">
                    {language === "fr"
                      ? "Une règle définit comment construire une cible à partir de ses dépendances."
                      : "A rule defines how to build a target from its dependencies."}
                  </p>
                  <MakefileCodeBlock
                    code={`target: dependency1 dependency2
\tcommand1
\tcommand2`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{language === "fr" ? "Cibles spéciales" : "Special Targets"}</h3>
                  <p className="text-muted-foreground">
                    {language === "fr"
                      ? "Les cibles spéciales modifient le comportement de make."
                      : "Special targets modify the behavior of make."}
                  </p>
                  <MakefileCodeBlock
                    code={`.PHONY: all clean install
.DEFAULT_GOAL := all

all: program

clean:
\trm -f *.o program

install: program
\tcp program /usr/local/bin/`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{language === "fr" ? "Règles implicites" : "Implicit Rules"}</h3>
                  <p className="text-muted-foreground">
                    {language === "fr"
                      ? "Make a des règles implicites pour les opérations courantes."
                      : "Make has implicit rules for common operations."}
                  </p>
                  <MakefileCodeBlock
                    code={`# Règle implicite pour compiler un fichier .c en .o
%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

# Utilisation de la règle implicite
main.o: main.c header.h`}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Syntaxe avancée" : "Advanced Syntax"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Fonctionnalités avancées pour des Makefiles plus puissants"
                    : "Advanced features for more powerful Makefiles"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{language === "fr" ? "Conditions" : "Conditionals"}</h3>
                  <MakefileCodeBlock
                    code={`# Vérification de la valeur d'une variable
ifeq ($(DEBUG), yes)
    CFLAGS += -g -DDEBUG
else
    CFLAGS += -O2
endif

# Vérification de l'existence d'une commande
ifneq ($(shell which clang),)
    CC = clang
else
    CC = gcc
endif`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {language === "fr" ? "Inclure d'autres Makefiles" : "Including Other Makefiles"}
                  </h3>
                  <MakefileCodeBlock
                    code={`# Inclure un autre Makefile
include config.mk

# Inclure conditionnellement
-include $(DEPS)

# Inclure tous les Makefiles d'un répertoire
include $(wildcard modules/*.mk)`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{language === "fr" ? "Règles à motifs" : "Pattern Rules"}</h3>
                  <MakefileCodeBlock
                    code={`# Règle à motif pour convertir des fichiers .c en .o
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
\t$(CC) $(CFLAGS) -c $< -o $@

# Règle à motif pour convertir des fichiers .md en .html
%.html: %.md
\tpandoc -f markdown -t html -o $@ $<`}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Makefile simple" : "Simple Makefile"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Template de base pour un petit projet C"
                    : "Basic template for a small C project"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock code={basicMakefile} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Makefile avancé" : "Advanced Makefile"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Template pour un projet plus complexe avec dépendances automatiques"
                    : "Template for a more complex project with automatic dependencies"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock code={advancedMakefile} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Makefile pour bibliothèque" : "Library Makefile"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Template pour construire une bibliothèque partagée"
                    : "Template for building a shared library"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock code={libraryMakefile} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Makefile avec conditions" : "Conditional Makefile"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Template avec logique conditionnelle pour différentes plateformes"
                    : "Template with conditional logic for different platforms"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock code={conditionalMakefile} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="variables" className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Types de variables" : "Variable Types"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Différentes façons de définir des variables dans un Makefile"
                    : "Different ways to define variables in a Makefile"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {language === "fr" ? "Affectation simple" : "Simple Assignment"}
                  </h3>
                  <MakefileCodeBlock
                    code={`# Affectation immédiate (évaluée au moment de la définition)
CC = gcc
CFLAGS = -Wall -g

# Affectation récursive (évaluée à chaque utilisation)
SOURCES = $(wildcard *.c)
OBJECTS = $(SOURCES:.c=.o)

# Affectation conditionnelle (seulement si la variable n'est pas déjà définie)
DEBUG ?= 1

# Affectation avec ajout (ajoute à la valeur existante)
CFLAGS += -O2`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {language === "fr" ? "Variables automatiques" : "Automatic Variables"}
                  </h3>
                  <MakefileCodeBlock
                    code={`target: dependency1 dependency2
\t# $@ - Le nom de la cible
\t# $< - La première dépendance
\t# $^ - Toutes les dépendances
\t# $* - La partie qui correspond au % dans une règle à motif
\t$(CC) $(CFLAGS) -o $@ $^`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {language === "fr" ? "Variables d'environnement" : "Environment Variables"}
                  </h3>
                  <MakefileCodeBlock
                    code={`# Utiliser une variable d'environnement avec une valeur par défaut
CC ?= $(CC)
INSTALL_DIR ?= /usr/local

# Exporter une variable vers l'environnement
export PATH := $(PATH):$(shell pwd)/bin`}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Variables prédéfinies" : "Predefined Variables"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Variables standard reconnues par make"
                    : "Standard variables recognized by make"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock
                  code={`# Variables pour les compilateurs et options
CC = gcc           # Compilateur C
CXX = g++          # Compilateur C++
CFLAGS = -Wall     # Options pour le compilateur C
CXXFLAGS = -Wall   # Options pour le compilateur C++
CPPFLAGS = -I.     # Options de préprocesseur (comme les chemins d'inclusion)
LDFLAGS = -L/usr/lib # Options de l'éditeur de liens
LDLIBS = -lm       # Bibliothèques à lier

# Variables pour l'installation
PREFIX = /usr/local
BINDIR = $(PREFIX)/bin
LIBDIR = $(PREFIX)/lib
INCLUDEDIR = $(PREFIX)/include
MANDIR = $(PREFIX)/man

# Commandes d'installation
INSTALL = install
INSTALL_PROGRAM = $(INSTALL)
INSTALL_DATA = $(INSTALL) -m 644`}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="functions" className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Fonctions de texte" : "Text Functions"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Fonctions pour manipuler du texte dans les Makefiles"
                    : "Functions for manipulating text in Makefiles"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock
                  code={`# Substitution de texte
SOURCES = foo.c bar.c baz.c
OBJECTS = $(SOURCES:.c=.o)        # Résultat: foo.o bar.o baz.o

# Extraction de parties de texte
DIR = /usr/local/bin
NOTDIR = $(notdir $(DIR))         # Résultat: bin

# Ajout de préfixe/suffixe
FILES = foo bar baz
WITH_DIR = $(addprefix src/,$(FILES))  # Résultat: src/foo src/bar src/baz
WITH_EXT = $(addsuffix .c,$(FILES))    # Résultat: foo.c bar.c baz.c

# Filtrage
SOURCES = foo.c bar.cpp baz.c
C_SOURCES = $(filter %.c,$(SOURCES))   # Résultat: foo.c baz.c
NON_C = $(filter-out %.c,$(SOURCES))   # Résultat: bar.cpp

# Recherche de mots
WORDS = foo bar baz
HAS_BAR = $(findstring bar,$(WORDS))   # Résultat: bar (si trouvé)
WORD_POS = $(word 2,$(WORDS))          # Résultat: bar (2ème mot)
WORD_COUNT = $(words $(WORDS))         # Résultat: 3 (nombre de mots)`}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Fonctions de fichiers" : "File Functions"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Fonctions pour travailler avec des fichiers et des chemins"
                    : "Functions for working with files and paths"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock
                  code={`# Recherche de fichiers
C_FILES = $(wildcard src/*.c)     # Trouve tous les fichiers .c dans src/
HEADERS = $(wildcard include/*.h) # Trouve tous les fichiers .h dans include/

# Manipulation de chemins
ABS_PATH = $(abspath ../foo/bar)  # Chemin absolu
REL_PATH = $(realpath ../foo/bar) # Chemin réel (résout les liens symboliques)

# Manipulation de noms de fichiers
DIR_PART = $(dir src/foo.c)       # Résultat: src/
FILE_PART = $(notdir src/foo.c)   # Résultat: foo.c
BASE_PART = $(basename src/foo.c) # Résultat: src/foo
EXT_PART = $(suffix src/foo.c)    # Résultat: .c

# Jointure de chemins
DIRS = src include lib
PATHS = $(foreach dir,$(DIRS),$(dir)/*.c)  # Résultat: src/*.c include/*.c lib/*.c`}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "fr" ? "Fonctions d'exécution" : "Execution Functions"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Fonctions pour exécuter des commandes shell"
                    : "Functions for executing shell commands"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock
                  code={`# Exécuter une commande shell
FILES = $(shell ls -1 *.c)
VERSION = $(shell git describe --tags)
UNAME = $(shell uname -s)

# Exécuter une commande et vérifier le résultat
CHECK_LIB = $(shell pkg-config --exists libfoo && echo yes || echo no)
ifeq ($(CHECK_LIB), yes)
    CFLAGS += $(shell pkg-config --cflags libfoo)
    LDLIBS += $(shell pkg-config --libs libfoo)
endif

# Afficher un message pendant l'exécution
$(info Building version $(VERSION))
$(warning This Makefile requires GNU Make 4.0 or later)
$(error Compilation aborted due to fatal error)

# Évaluer une expression
RESULT = $(eval TEMP := foo bar)$(TEMP)`}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-center">
          {language === "fr" ? "Bonnes pratiques" : "Best Practices"}
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{language === "fr" ? "Organisation" : "Organization"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                {language === "fr"
                  ? "• Utilisez des variables pour tous les paramètres configurables"
                  : "• Use variables for all configurable parameters"}
              </p>
              <p>
                {language === "fr"
                  ? "• Regroupez les variables liées en sections"
                  : "• Group related variables into sections"}
              </p>
              <p>
                {language === "fr"
                  ? "• Utilisez des commentaires pour expliquer les sections complexes"
                  : "• Use comments to explain complex sections"}
              </p>
              <p>
                {language === "fr"
                  ? "• Séparez les Makefiles en modules pour les grands projets"
                  : "• Split Makefiles into modules for large projects"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "fr" ? "Portabilité" : "Portability"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                {language === "fr"
                  ? "• Utilisez des commandes shell portables (sh, pas bash)"
                  : "• Use portable shell commands (sh, not bash)"}
              </p>
              <p>
                {language === "fr"
                  ? "• Testez les commandes avec des conditions"
                  : "• Test for commands with conditionals"}
              </p>
              <p>
                {language === "fr"
                  ? "• Utilisez des variables pour les chemins de fichiers"
                  : "• Use variables for file paths"}
              </p>
              <p>
                {language === "fr"
                  ? "• Évitez les fonctionnalités spécifiques à GNU Make si possible"
                  : "• Avoid GNU Make-specific features when possible"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "fr" ? "Performance" : "Performance"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                {language === "fr"
                  ? "• Utilisez des dépendances précises pour éviter les recompilations inutiles"
                  : "• Use accurate dependencies to avoid unnecessary recompilations"}
              </p>
              <p>
                {language === "fr"
                  ? "• Utilisez la génération automatique de dépendances (-MMD -MP)"
                  : "• Use automatic dependency generation (-MMD -MP)"}
              </p>
              <p>
                {language === "fr"
                  ? "• Utilisez make -j pour la compilation parallèle"
                  : "• Use make -j for parallel compilation"}
              </p>
              <p>
                {language === "fr"
                  ? "• Évitez les appels shell inutiles dans les variables récursives"
                  : "• Avoid unnecessary shell calls in recursive variables"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "fr" ? "Débogage" : "Debugging"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                {language === "fr"
                  ? "• Utilisez make -n pour voir les commandes sans les exécuter"
                  : "• Use make -n to see commands without executing them"}
              </p>
              <p>
                {language === "fr"
                  ? "• Utilisez $(info ...) pour afficher des informations de débogage"
                  : "• Use $(info ...) to print debugging information"}
              </p>
              <p>
                {language === "fr"
                  ? '• Créez une cible "debug" pour afficher les variables'
                  : '• Create a "debug" target to print variables'}
              </p>
              <MakefileCodeBlock
                code={`debug:
\t@echo "SOURCES: $(SOURCES)"
\t@echo "OBJECTS: $(OBJECTS)"
\t@echo "CFLAGS: $(CFLAGS)"`}
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

