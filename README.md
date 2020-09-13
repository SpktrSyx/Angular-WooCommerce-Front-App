# :iphone: Angular-WooCommerce-Front-App

Ce repository est un réupload, public cette fois, de **l'application Angular** que j'ai créé lors de mon stage de fin de formation chez Graine de Zèle en 2020, en télétravail.

[:clipboard: Mes recherches](https://start.me/p/nRg0pn/dwwm-stage-cindy)

 ## :round_pushpin: Le but :

Gérer sa boutique **WooCommerce** (voir ses 2 boutiques, l’autre étant sur Etsy) de façon globale, l’application mobile android devra se découper en plusieurs parties pour mettre en avant les **commandes**, les **produits**, les **statistiques** de la boutique ainsi que les **comptes d’utilisateurs** qui auront accès à cette application si la cliente souhaite déléguer certaines tâches à d’autres personnes par exemple.

- Simplifier les interactions de la cliente avec sa boutique en ligne. 
- Être claire, épurée et efficace.

###  :package: Installation
1. Avec NPM

    `
    npm install
    `
 

2. Modifier les fichiers sans src/environment :

|Nom du fichier     |Fonction       | 
|-------------------|---------------|
|apiBdd.ts          | back avec database les comptes utilisateurs + numéros de suivi des colis|
|apiWoocommerce.ts  | clés [API créées](https://docs.woocommerce.com/document/woocommerce-rest-api/) pour accéder à la boutique WooCommerce, url de l'API, version de l'API|
