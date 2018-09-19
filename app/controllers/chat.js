module.exports.multiroomchat = function(application, req, res){

    var login = req.body;

    req.assert('nickname','Apelodi deverá ser preenchdi').notEmpty();
    req.assert('nickname','Apelido deve ter entre 3 e 30 caracteres').len(3,30);

    var errors = req.validationErrors();

    if (errors) {
        res.render("index", {validacao : errors});
        return;
    }

    res.render("chat");
}