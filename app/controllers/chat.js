module.exports.multiroomchat = function(application, req, res){

    var login = req.body;

    req.assert('nickname','Apelido deverá ser preenchdi').notEmpty();
    req.assert('nickname','Apelido deve ter entre 3 e 30 caracteres').len(3,30);

    var errors = req.validationErrors();

    if (errors) {
        res.render("index", {validacao : errors});
        return;
    }

    application.get('io').emit(
        'msgLogonClient', 
        {nickname : login.nickname, msg : ' acabou de entrar no chat!'}
    );

    res.render("chat");
}