# Pajomatic

Calculatrice d'aide aux parents qui paient une assistante maternelle.

[https://tut-tuuut.github.io/pajomatic/](https://tut-tuuut.github.io/pajomatic/)

## Architecture technique

* HTML généré par [jekyll](http://jekyllrb.com/).
* CSS fourni par [twitter bootstrap](http://getbootstrap.com/).
* JavaScript : scripts maison (voir `model.js`, `view.js` et `controller.js`) sur une base jQuery (voir `bootstrap.js`).

Tout le calcul est effectué en pur javascript côté client… afin de pouvoir utiliser les Github-pages comme hébergement gratuit. #grosseRadine

## Comment installer le projet sur mon poste ?

Le plus dur est de [faire marcher le serveur jekyll](http://jekyllrb.com/docs/installation/).

1. Il faut d'abord installer sur votre système une version récente de [Ruby](https://www.ruby-lang.org/fr/downloads/) et [Rubygems](https://rubygems.org/pages/download).
2. Ensuite, je vous recommande d'installer la gem `bundler` (il s'agit d'un gestionnaire de dépendances, façon composer.json) : `gem install bundler`
3. Finalement, rendez-vous dans le code source du pajomatic et lancez la commande `bundle install`. Bundler se charge de récupérer le matériel nécessaire à l'aide des instructions que j'ai posées dans le Gemfile.
4. Une fois l'installation terminée, vous pouvez exécuter `bundle exec jekyll serve -w` pour lancer le serveur. Votre Pajomatic local sera disponible à une adresse du genre `http://localhost:4000/pajomatic/`.

Ces instructions sont valables pour des systèmes Unix (Mac OS ou Linux). Il existe aussi une [documentation pour windows](http://jekyllrb.com/docs/windows/#installation) que je n'ai pas essayée.

### Alternative avec docker

Si docker est installé sur votre poste :

1. Placez-vous à la racine du projet.
2. Lancez `docker run --rm -v "$PWD:/src" -p 4000:4000 grahamc/jekyll serve --watch`
3. Ouvrez votre navigateur préféré avec l'url `localhost:4000/pajomatic/`

Normalement, les modifications faites dans le code sont disponibles après un simple rafraîchissement dans le navigateur.

## Comment contribuer ?

### Pull Requests

Ça sera très apprécié, donc n'hésitez pas !

Quelques instructions :
* Lancez vos pull requests vers la branche `master`.
* Créez des PR _unitaires_. Il vaut mieux beaucoup de petites PR qui résolvent des tout petits problèmes qu'une grosse PR fourre-tout.

Vous pouvez jeter un œil aux tâches/issues portant le label `easy`, par exemple, pour commencer doucement.

### Oui mais si j'veux pas coder ?

1. Donnez-moi une [étoile](https://github.com/tut-tuuut/pajomatic/stargazers) !
2. [Signalez les bugs](https://github.com/tut-tuuut/pajomatic/issues/new) que vous trouvez.
3. [Dites-moi](https://twitter.com/tut_tuuut) ce que vous pensez du projet.
