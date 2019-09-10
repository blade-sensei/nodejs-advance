# nodejs-advance

- Lien vers le code source:

https://github.com/blade-sensei/nodejs-advance


- API qui permet de récupérer une liste de projets, détail d'un projets et utilisateurs

- Authentification et récupération d'un token


Le projet comporte plusieurs routes principales

- localhost/api: Accès au routes pour récupérer des utilisateurs et projets
- localhost/explorer: swagger pour tester l'API
- localhost/seed: créer un jeu de données avec des utilisateurs et projets


## Test

- Créer un base de données mongo appelé "dev" en local
- Lancez le serveur de db
- Taper la commande suivante pour installer les dépendances

```bash
  npm install
```
- Lancer le serveur API avec la commande:

```
npm run start:dev
npm run start
```

- Créer les jeux de données, taper les urls
    - http://localhost:3000/seed/users
    - http://localhost:3000/seed/projects

![](https://i.imgur.com/2NuUX6V.png)



- Vous pouvez tester l'API en utilisant le swagger

- taper l'url: http://localhost:3000/explorer/#/

- Utiliser la route auth/login, click sur le bouton "try it out"
- username = demo et password = demo

![](https://i.imgur.com/WcVwibc.png)

- Récupérer (copiez) les token de la réponse

![](https://i.imgur.com/bYFoBMa.png)


- Click sur Authorize et rentrez copier le token

![](https://i.imgur.com/dpVjyn1.png)


- Vous pouvez maintenant accéder aux autres routes




## Configuration

Pour permettre la connection à la base de données on crée un fichier de configuration, avec une base de données appelé "dev"

```json
{
  "db" : {
    "uri" : "mongodb://127.0.0.1:27017/dev"
  },
  "server" : {
    "host" : "127.0.0.1",
    "port" : 3000
  }
}
```

> Pour tester l'app vous devez créer un base de données mongo appelé "dev"
>

## Jeu de données

Vous pouvez créer un jeu de données avec les routes /seeds/users et /seeds/projects
Il faut les lancer dans l'ordre cette ordre précis.


## Authentification

route: auth/login

Avec un middleware sur la route on vérifie d'abord si l'utilisateur a bien renseigné les champs "username" et "password" dans le body de sa requête.

C'est la méthode "hasRequiredParameters" qui fait cette vérification

```javascript=
router.post('/login', requestMiddleware.hasRequiredParameters, async (req, res) => {}
```

Ensuite si l'utilisateur existe dans la base de données on crée un JWT (jeton) avec une date d'expiration et on l'envoie dans la réponse.

Pour cela on utilise le package "jsonwebtoken"


## Les models

Pour faire une relation entre les documents (tables) de notre base de données et notre code on utilise l'outils moongoose

- Il permet de décrire les propriétés d'un model/document
- Met a disposition des fonctions pour requeter les models/base de données

Voici un example pour un model utilisateur

```javascript=
const schema = new mongoose.Schema({
  username: String,
  uid: String,
  name: String,
  password: String,
  admin: Boolean,
});

const User = mongoose.model('users', schema);

const findAll = () => {
  return User.find().exec();
};
```

## Services

Les services sont une couche dans l'architecture de l'application qui va utiliser des models pour proposer des services de type metier.

Dans notre application les services sont très basiques et n'ont pas + de traitement de données que les méthodes de models.

## Routes/Controllers

Dans cette route j'effectue des controlles pour savoir quel service je dois appeler.

De plus on peut faire des vérifications à l'aide de middlewares, comment la vérification de la presence d'un token dans la requête de l'utilisateur. C'est cette vérification qu'on fait ici.

```javascript=
token.verifyToken,
  async (req, res) => {
  try {
    const users = await userService.findAll();
    res.send(users);
  } catch (e) {
    logger.info(e);
    return res.status(500).send('not found');
  }
```
