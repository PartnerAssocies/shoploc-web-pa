# shoploc-web-pa

Ce repository contient la partie front de l'application ShopLoc.  
Le projet est une PWA développée en Angular 10.  

## Mise en place du projet

Voici les étapes à suivre pour récupérer et lancer le projet en local : 

* Assurez vous que Node est bien installé sur votre machine avec la commande "npm --version", sinon installez Node.
* Assurez vous que Angular est bien installé et est au minimum à la version 10 avec la commande "ng version", sinon installez ou mettez à jour Angular.
* Clonez ce repository en local.
* AVec votre terminal déplacez vous à la racine du repository, puis lancer la commande "git config core.hooksPath .githooks". Cette commande va indiquer à votre repository git d'utiliser le dossier ".githooks" pour aller chercher les hooks. Nous utilisons un hook pour contrôller le format des messages de commit.
* Dans le fichier ".githooks/commit-msg" dans la première ligne remplacez "python" par "python3" si votre environement python est python3.
* Puis déplacer vous dans le dossier "shoploc-pa".
* Lancez la commande "npm install". (cette opération peut prendre un peu de temps)
* Lancez la commane "ng serve". (cette opération peut prendre un peu de temps)
* C'est bon, l'application est lancé sur le port 4200 ! 
