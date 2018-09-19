var express = require('express'); //Framework para aplicações web
var consign = require('consign'); //gerencia os routes e módulos
var bodyParser = require('body-parser'); //facilita a comunicação view <--> model
var expressValidator = require('express-validator'); //lib de validações server side

var app = express(); //inclui express no projeto

app.set('view engine', 'ejs'); //seta o tecnologia usada nas views

app.set('views', './app/views'); //Seta a pasta onde estão as views

app.use(express.static('./app/views/assets')); //mapeia a pasta assets (onde estão os arquivos estaticos: css, js, img, etc)

app.use(bodyParser.urlencoded({extended: true})); //pega os dados do submit e coloca em um json indexados pela tag name

app.use(expressValidator()); //valida submits

consign() //autoload dos routes e models
	.include('app/routes') //roteia os views
	.then('app/models') //aplica os models
	.then('app/controllers') //aplica os controllers
	.into(app);

module.exports = app;