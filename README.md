1. Initialisation du projet et instaation d'ESLint
Toutes les étapes se sont déroulées correctement.


2. Test d’ESLint sur un fichier JavaScript
En lancant directement la commande npx eslint app.js on n'obtient aucune erreur ni problème sur le fichier app.js.

Cependant, si on lance la commande npx eslint indexed.js, on obtient les erreurs suivantes :
$ npx eslint index.js

C:\Users\adjao\OneDrive\Bureau\tp-eslint-git\index.js
   7:7   error  'unusedVar' is assigned a value but never used  no-unused-vars
  19:7   error  'message' is assigned a value but never used    no-unused-vars
  21:5   error  Unexpected constant condition                   no-constant-condition
  25:7   error  'tableau' is assigned a value but never used    no-unused-vars
  36:10  error  'toutFaire' is defined but never used           no-unused-vars
  56:7   error  'd' is assigned a value but never used          no-unused-vars
  58:10  error  'fetchData' is defined but never used           no-unused-vars
  63:7   error  'nombres' is assigned a value but never used    no-unused-vars
  67:1   error  Unexpected 'debugger' statement                 no-debugger

✖ 9 problems (9 errors, 0 warnings)

On corrige les erreurs manuellement et on remarque que maintenant on n'a plus d'erreurs dans le fichier index.js.
adjao@Anis MINGW64 ~/OneDrive/Bureau/tp-eslint-git (master)
$ npx eslint index.js

adjao@Anis MINGW64 ~/OneDrive/Bureau/tp-eslint-git (master)


3. Intégration avec Git Hooks Husky
En essayant de faire npx husky install on obtient des erreurs, on corrige ça en remplaçant npx husky install par npx husky init et on n'a plus d'erreurs 
Apres avoir installé husky et ajouté le hook pre-commit npx husky add .husky/pre-commit "npx eslint ."
On remarque qu'en faisant un git add . puis git commit le commit est passé donc on n'a pas d'erreurs
En essayant de créer une erreur sur un des fichiers js et en faisant un git add et commit on obtient
adjao@Anis MINGW64 ~/OneDrive/Bureau/tp-eslint-git (main)
$ git commit -m "test husky"

> tp-eslint-git@1.0.0 test
> echo "Error: no test specified" && exit 1

"Error: no test specified"
husky - pre-commit script failed (code 1)

ce qui confirme que ça marche très bien et que les commit sont bloqués quand le code contient des erreurs.


4. Configuration avancée d’ESLint
Après avoir modifié le fichier eslint.config.mjs, et ajouté le script lint dans package.js, on lance npm run lint :
adjao@Anis MINGW64 ~/OneDrive/Bureau/tp-eslint-git (main)
$ npm run lint
> tp-eslint-git@1.0.0 lint
> eslint .
adjao@Anis MINGW64 ~/OneDrive/Bureau/tp-eslint-git (main)

On remarque que tout fonctionne et on n'a plus d'erreurs, donc la confiuration est correct et prise en compte.


5. Mise en place de GitHub Actions
On crée le dépot directement sur gitHub et on le lie avec les commandes suivantes : 
git branch -M main
git remote add origin https://github.com/Anis-adjaoud/tp-eslint-git.git
git push -u origin main

Ensuite on ajoute le workflow CI:
mkdir -p .github/workflows
touch .github/workflows/lint.yml
et on met le contenu du fichier, ensuite on fait un git add commit push pour vérifier l'execution sur github
git add .
git commit -m "Ajout de GitHub Actions"
git push

On va sur gitHub->Actions afin de voir ce qui s'est passé, et on remarque une failure avec :
Annotations
1 error
Invalid workflow file: .github/workflows/lint.yml#L2
You have an error in your yaml syntax on line 2

Le contenu actuel de lint.yml est :
name: Lint Code
on: [push, pull_request]
  jobs:
    lint:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with:
            node-version: 18
        - run: npm ci
        - run: npm run lint

on remarque qu'on a une erreur d'indentation, on corrige le fichier :
name: Lint Code
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint

On relance le git add commit push, et regarde a nouveau sur Actions de gitHub :
On retouve :
Triggered via push now
@Anis-adjaoudAnis-adjaoud
pushed 7c62691 main
Status Success
Total duration 11s
Artifacts –

Donc ça a bien passé l'exécution

6. Simulation d’un travail d’équipe
$ git checkout -b feature/ajout-fonctionl
Switched to a new branch 'feature/ajout-fonctionl'

Ensuite on crée un fichier utils.js avec une erreur et on fait un git add et commit on voit bien que c'est bloqué par le hook :
$ git commit -m "Code non conforme"

C:\Users\adjao\OneDrive\Bureau\tp-eslint-git\utils.js
  17:1  error  Parsing error: 'import' and 'export' may only appear at the top level

✖ 1 problem (1 error, 0 warnings)

husky - pre-commit script failed (code 1)


On corrige les erreurs dans le fichier ensuite on refait un git add et commit :
adjao@Anis MINGW64 ~/OneDrive/Bureau/tp-eslint-git (feature/ajout-fonctionl)
$ git commit -m "Correction des erreurs ESLint"
[feature/ajout-fonctionl dcdcc8d] Correction des erreurs ESLint
 2 files changed, 24 insertions(+), 11 deletions(-)

ca passe bien donc c'est bon, on crée une pull request:
git push --set-upstream origin feature/ajout-fonctionl
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 22 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 1.37 KiB | 702.00 KiB/s, done.
Total 8 (delta 4), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (4/4), completed with 2 local objects.
remote:
remote: Create a pull request for 'feature/ajout-fonctionl' on GitHub by visiting:
remote:      https://github.com/Anis-adjaoud/tp-eslint-git/pull/new/feature/ajout-fonctionl
remote:
To https://github.com/Anis-adjaoud/tp-eslint-git.git
 * [new branch]      feature/ajout-fonctionl -> feature/ajout-fonctionl
branch 'feature/ajout-fonctionl' set up to track 'origin/feature/ajout-fonctionl'.


On vérifie sur GitHub Actions :
Triggered via push 1 minute ago
@Anis-adjaoudAnis-adjaoud
pushed dcdcc8d feature/ajout-fonctionl
Status Success
Total duration 11s
Artifacts –

On remarque que ça a très bien fonctionné.

On refait un dernier push afin de soumettre le readme à jour.

