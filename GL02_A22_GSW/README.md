# GL02 A22 GSW


## Sommaire

0. [Equipe](#équipe)
1. [Introduction](#introduction)
2. [Pré-requis](#prérequis)
3. [Utilisation du logiciel et description des fonctionnalités](#utilisation-du-logiciel-et-description-des-fonctionnalités)


## Equipe

Pour ce projet nous avons constitué une équipe nommée "Les devs du dimanche", elle est constituée de Noé Lecointe, Kylian Froge, Théo Cécille et Tony Gong. Cette équipe est celle responsable de la confection du cahier des charges et de la vérification de l'implémentation. L'équipe responsable de l'implémentation est constituée de Valentin Cabot-Bouchentouf, Julian Marques, Tristan Jogee et David Bounliane. Les deux équipes utilisent une licence nodeJS classique.

## Introduction

Le ministère de l'éducation nationale de la République de Sealand souhaite améliorer ses moyens d'évaluation des élèves, grâce à des examens en ligne. Le SRYEM propose l'emploi du format [GIFT](https://docs.moodle.org/311/en/GIFT_format) pour la gestion et la préparation de ces tests.

Le logiciel, écrit en Javascript, sera géré par un utilitaire en invite de commande qui permettra aux gestionnaire et enseignants de composer des tests à partir de d'une banque de questions. L'outil devra permettre de rechercher et visualiser une question pour la choisir. La principale fonction consistera pour un enseignant à regrouper un ensemble de questions pour créer un fichier GIFT d'examen. L'outil devra permettre de générer également un fichier d'identification et de contact de l'enseignant au format VCard. La solution devra permettre aussi de simuler la passation du test par un étudiant avec bilan des réponses à l'issue. Pendant le développement du logiciel nous n'avons pas pu respecter l'ABNF pour le format gift décrit dans le cahier des charges car celui-ci ne permettait pas de lire les fichiers présents dans le jeu de données. 


## Pré-requis

Pour s'assurer du bon fonctionnement du logiciel sur votre ordinateur, il est préférable d'avoir au préalable installer [node.js](https://nodejs.org/fr/download/). Nous avons utilité les packages de VegaLite et Vcard pour développer ce projet, ils peuvent être à réinstaller si cela ne fonctionne pas. Pour utiliser le parser, il est nécessaire d'installer l'ensemble de ses dépendances avec la commande ```npm install```.


## Utilisation du logiciel et description des fonctionnalités

L'utilisateur lance la commande "node caporalCli.js help" pour obtenir toutes les commandes associées au logiciel. La deuxième commande qu l'utilisateur devra entrer est "node CaporalCli.js clear" afin de nettoyer l'espace de travail. Enfin pour accéder à toutes l'autre commande il devra faire "node CaporalCli.js option" avec option étant une des commandes. 

### makeExam
Cette fonction permet de créer un fichier d'examen d'entre 15 et 20 questions aléatoires (sans doublons). Le logiciel va automatiquement créer le fichier au format GIFT (questions et réponses).

Arguments : Pas d'argument

Exemple : node caporalCli.js makeExam

### search 
Cette fonction permet de rechercher une question en rentrant un mot dans le terminal. Si celle-ci est trouvée, elle sera affichée dans l'invite de commande. 

Cette fonction n'est pas encore implémentée

### contact
Le logiciel va demander les différentes informations du professeur dans l'invite de commande. Ensuite, il va les enregistrer et générer un fichier VCard représentant le contact du professeur, dans un dosier nommé "vCards".

Arguments : Pas d'argument

Exemple : node caporalCli.js contact

### pass
Cette fonction permet de simuler un examen. Le logiciel va récupère une banque de questions (sans doublons) et les affiche sur le terminal. L'utilisateur y répond en rentrant sa réponse.

Arguments : Le nom du fichier gift

Exemple : node caporalCli.js pass fichier_examens/fichier_examen_0.gift

### visualisationExam 
Le logiciel sélectionne aléatoirement des questions et, grâce à VegaLite, cette fonction dresse le profil d'un examen avec ses différents types de questions, sous la forme d'histogramme. Pour lancer cette fonction il est nécessaire d'avoir créé au moins 1 fichier d'examen et donc la fonction makeExam

Arguments : Pas d'argument

Exemple : node caporalCli.js visualisationExam

Après avoir lancé cette commande, il faut suivre les insctructions et taper le numéro de l'examen qui démarre par 1

### compareExam 
Cette fonction compare un examen en particulier avec un ou plusieurs fichiers de la banque de questions. On obtiendra en sortie les différents types de question (et leur quantité) comparées quantitaivement à celles des autres fichiers (avec un opérateur d'égalité ou d'inégalité). Pour lancer cette fonction il est nécessaire d'avoir créé au moins 1 fichier d'examen et donc la fonction makeExam

Arguments : Pas d'argument

Exemple : node caporalCli.js compareExam

Après avoir lancé cette commande, il faut suivre les insctructions et taper le numéro de l'examen qui démarre par 1

### clear
Cette fonction permet de nettoyer l'espace de travail et de supprimer tous les fichiers créés lors de l'utilisation du logiciel.

Arguments : Pas d'argument

Exemple : node caporalCli.js clear

### check
Cette fonction vérifie si un fichier gift est valide ou pas

Arguments : Le nom du fichier gift

Options : -s, --showSymbols     ->   affiche l'analyse des symbole à chaque étape
          -t, --showTokenize    ->   affiche les résultats tokenisés

Exemple : node caporalCli.js check -t sujets\EM-U4-p32_33-Review.gift

### readme
Cette fonction permet d'afficher en details les informations de chaque commande possible et de l'installation

Arguments : Pas d'argument

Exemple : node caporalCli.js readme

### help

L'utilisateur pourra également taper "help" pour voir les différentes fonctionnalités possibles et leur utilité.

Commande : node caporalCli.js help





