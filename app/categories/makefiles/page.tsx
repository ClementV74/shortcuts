"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MakefilesPage() {
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
          /(\$$$[a-zA-Z0-9_]+$$)/g,
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Makefiles</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Guide complet des Makefiles: syntaxe, templates et bonnes pratiques pour automatiser vos builds.
        </p>
      </motion.div>

      <Tabs defaultValue="syntax" className="mb-12">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="syntax">Syntaxe</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="variables">Variables</TabsTrigger>
          <TabsTrigger value="functions">Fonctions</TabsTrigger>
        </TabsList>

        <TabsContent value="syntax" className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Structure de base</CardTitle>
                <CardDescription>
                  La structure fondamentale d'un Makefile avec règles, cibles et commandes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Règle de base</h3>
                  <p className="text-muted-foreground">
                    Une règle définit comment construire une cible à partir de ses dépendances.
                  </p>
                  <MakefileCodeBlock
                    code={`target: dependency1 dependency2
\tcommand1
\tcommand2`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Cibles spéciales</h3>
                  <p className="text-muted-foreground">Les cibles spéciales modifient le comportement de make.</p>
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
                  <h3 className="text-lg font-medium">Règles implicites</h3>
                  <p className="text-muted-foreground">Make a des règles implicites pour les opérations courantes.</p>
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
                <CardTitle>Syntaxe avancée</CardTitle>
                <CardDescription>Fonctionnalités avancées pour des Makefiles plus puissants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Conditions</h3>
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
                  <h3 className="text-lg font-medium">Inclure d'autres Makefiles</h3>
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
                  <h3 className="text-lg font-medium">Règles à motifs</h3>
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
                <CardTitle>Makefile simple</CardTitle>
                <CardDescription>Template de base pour un petit projet C</CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock code={basicMakefile} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Makefile avancé</CardTitle>
                <CardDescription>Template pour un projet plus complexe avec dépendances automatiques</CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock code={advancedMakefile} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Makefile pour bibliothèque</CardTitle>
                <CardDescription>Template pour construire une bibliothèque partagée</CardDescription>
              </CardHeader>
              <CardContent>
                <MakefileCodeBlock code={libraryMakefile} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Makefile avec conditions</CardTitle>
                <CardDescription>Template avec logique conditionnelle pour différentes plateformes</CardDescription>
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
                <CardTitle>Types de variables</CardTitle>
                <CardDescription>Différentes façons de définir des variables dans un Makefile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Affectation simple</h3>
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
                  <h3 className="text-lg font-medium">Variables automatiques</h3>
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
                  <h3 className="text-lg font-medium">Variables d'environnement</h3>
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
                <CardTitle>Variables prédéfinies</CardTitle>
                <CardDescription>Variables standard reconnues par make</CardDescription>
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
                <CardTitle>Fonctions de texte</CardTitle>
                <CardDescription>Fonctions pour manipuler du texte dans les Makefiles</CardDescription>
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
                <CardTitle>Fonctions de fichiers</CardTitle>
                <CardDescription>Fonctions pour travailler avec des fichiers et des chemins</CardDescription>
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
                <CardTitle>Fonctions d'exécution</CardTitle>
                <CardDescription>Fonctions pour exécuter des commandes shell</CardDescription>
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
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-center">Bonnes pratiques</h2>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Organisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• Utilisez des variables pour tous les paramètres configurables</p>
              <p>• Regroupez les variables liées en sections</p>
              <p>• Utilisez des commentaires pour expliquer les sections complexes</p>
              <p>• Séparez les Makefiles en modules pour les grands projets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• Utilisez des commandes shell portables (sh, pas bash)</p>
              <p>• Testez les commandes avec des conditions</p>
              <p>• Utilisez des variables pour les chemins de fichiers</p>
              <p>• Évitez les fonctionnalités spécifiques à GNU Make si possible</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• Utilisez des dépendances précises pour éviter les recompilations inutiles</p>
              <p>• Utilisez la génération automatique de dépendances (-MMD -MP)</p>
              <p>• Utilisez make -j pour la compilation parallèle</p>
              <p>• Évitez les appels shell inutiles dans les variables récursives</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Débogage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• Utilisez make -n pour voir les commandes sans les exécuter</p>
              <p>• Utilisez $(info ...) pour afficher des informations de débogage</p>
              <p>• Créez une cible "debug" pour afficher les variables</p>
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

