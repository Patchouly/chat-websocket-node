var app = require('./config/server');

var server = app.listen(80, function () {
    console.log("Server Online");
});

//npm install socket.io --save
//Configurar porta para o websocket
var io = require('socket.io').listen(server);

app.set('io', io);

//criar a conexão com o websocket assim que o client acessa a página com o script socket.io
io.on('connection', function(socket) {
    socket.on('disconnect', function(data) {
        console.log('Usuário Desconectou');
        if ( parseInt(data.online) === 1 ) {
            socket.emit(
                'removeParticipantes', 
                {nickname: data.nickname}
            );
            socket.broadcast.emit(
                'removeParticipantes', 
                {nickname: data.nickname}
            );
        }
    });

    socket.on('msgToServer', function(data) {
        socket.emit(
            'msgToClient', 
            {nickname: data.nickname, msg: data.msg}
        );
        socket.broadcast.emit(
            'msgToClient', 
            {nickname: data.nickname, msg: data.msg}
        );
        if ( parseInt(data.online) === 0 ) {
            socket.emit(
                'updateParticipantes', 
                {nickname: data.nickname}
            );
            socket.broadcast.emit(
                'updateParticipantes', 
                {nickname: data.nickname}
            );
        }
    });
});