En lancant directement la commande npx eslint app.js on n'obtient aucune erreur ni problème sur le fichier app.js.

Cependant, si on lance la commande npx eslint indexedDB.js, on obtient les erreurs suivantes :
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
$
