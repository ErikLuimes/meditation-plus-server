# README #

## Installation ##

* Install [ruby](https://www.ruby-lang.org/en/installation/)
* Install [compass](http://compass-style.org/install/)
* Install [composer](http://getcomposer.org)
* Go into app's root folder
* Copy `app/config/parameters.yml.dist` to `app/config/parameters.yml` and configure your paths and database
* Run `php path/to/composer install` inside the app's root folder
* Run `php app/console doctrine:schema:update --force`
* Run `php app/console server:run`
* Browse to `localhost:8000`
