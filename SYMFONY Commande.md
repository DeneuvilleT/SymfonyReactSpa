1 ==============>
symfony new **nom_du_projet**
php -S localhost:8000 -t public

# Permet de créer un nouveau projet symfony

2 ==============>
composer require symfony/maker-bundle --dev

# Débloque les commandes maker

composer require webapp

# Deébloque les commandes maker

3 ==============>
php bin/console doctrine:database:create

<!-- DATABASE_URL="mysql://root:root@127.0.0.1:3306/{ nom du projet }?serverVersion=5.7.36&charset=utf8mb4" -->

# Créer la BDD

4 ==============>
php bin/console make:entity **name**

# Finaliser la table User (firstname, lastname ...)

5 ==============>
php bin/console make:migration

# Prépare la migration de la BDD

php bin/console doctrine:migration:migrate

# Migre la BDD

6 ==============>  
symfony serve

# Lance le serveur

symfony server:stop

# Stop le serveur

USER ===========>
php bin/console make:user

# Va créer une entity User avec les essentiels mot de passe, mail et roles

symfony console make:registration-form

# Construis le REGISTER

# Il faudra créer SecurityController.php manuellement en suivant la documentation

7 ==============>  
composer require twig

# Pour les templates

composer require symfony/asset

# Pour les assets CSS

omposer require --dev symfony/profiler-pack

# Pour la barre d'état

composer require orm

# Débloque ORM

composer require form validator security-csrf annotations

# Permet de débloquer le CRUD

composer require form validator

# Débloque la création de forum

composer require symfony/validator

# Débloque les controles des formulaires

composer require security

# Débloque

<!-- https://symfony.com/doc/current/security.html -->

8 ==============>
php bin/console make:crud

# Créer un CRUD

9 ==============>
php bin/console make:form

# Permet de créer un formulaire par rapport à une entity

10 ==============>
php bin/console make:subscriber

# Permet de créer un subscriber

- ==============>  
  symfony local:php:list

# Affiche la liste des versions de PHP installées

php bin/console

# Affiche les options de php

php bin/console debug:router

# Pour afficher toutes les routes

- ==============>
  php bin/console make:test

# créer un test

php bin/phpunit

# lance le test

$env:SERVER_NAME="http://localhost:3000";
$env:MERCURE_PUBLISHER_JWT_KEY='freddymercuryfreddymercuryfreddymercuryfreddymercuryfreddymercury'; $env:MERCURE_SUBSCRIBER_JWT_KEY='freddymercuryfreddymercuryfreddymercuryfreddymercuryfreddymercury'; 
$env:MERCURE_EXTRA_DIRECTIVES="cors_origins http://localhost:8000";
.\mercure.exe run --config Caddyfile.dev

# JWT

mkdir -p config/jwt
openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout

- à la place de (php bin/console lexik:jwt:generate-keypair)
