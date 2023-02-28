# Web App

## Nom
Application web d'émargement électronique
***
## Description
Cette application web codée en React JS permet la gestion des groupes d'étudiants et des sessions d'émargement(Création, modification, visualisation). Elle est utilisée conjointement avec l'application mobile qui permet l'émargement des étudiants.
***

## Installation
```
cd project/
git clone https://web.isen-ouest.fr/gitlab/projet-m1/application_emargement_electronique/web-app.git
cd web-app/
``` 
Use npm to install the missing dependancies.
```
npm install --force
```
Create the .env.local file. Update the REACT_APP_CAS_ENDPOINT with your CAS server endpoint and the REACT_APP_API_ENDPOINT with your API endpoint.
```
cp .env .env.local
```

Run the app
```
npm run start
```
***

## Utilisation
Seuls les administrateurs peuvent accéder à l'application. <br>
Pour se connecter, utilisez vos identifiants CAS. <br>
Une fois connecté, vous pouvez créer, modifier et visualiser les groupes d'étudiants et les sessions d'émargement. <br>
***
## Auteurs
Projet réalisé en 2023 par Yohann LE CAM et Clément YZIQUEL dans le cadre d'un projet M1 à l'ISEN Brest. <br>
Projet proposé et supervisé par Olivier PODEUR, dévoloppeur informatique à l'ISEN Brest.
