var app = require('./config/server');

var server = app.listen(3000, function () {
    console.log("Server Online");
});

//npm install socket.io --save
//Configurar porta para o websocket
var io = require('socket.io').listen(server);

app.set('io', io);

//criar a conexão com o websocket assim que o client acessa a página com o script socket.io
io.on('connection', function(socket) {
    console.log('Usuário Conectou');

    socket.on('disconnect', function() {
        console.log('Usuário Desconectou');
    });
});