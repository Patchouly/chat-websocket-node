var socket = io('http://10.100.6.25:80');

$(document).ready(function () {
    $("#exibe_chat").click(function () {
        $("#conversa").show();
        $("#participantes").hide();
        ocultaNavbar();
    });

    $("#exibe_participantes").click(function () {
        $("#participantes").show();
        $("#conversa").hide();
        ocultaNavbar();
    });

    $("#NSFW").click(function () {
        $(".fodase").addClass("in");
        $(".fodase").animate({
            height: 'toggle'
        }, "slow");
    });

    $('.alert-info').click(function() {
        $('.alert-info').hide();
    })

    $(document).keypress(function (e) {
        if (e.which == 13) {
            $('#enviar').click();
        }
    });
});

$('#enviar').click(function () {
    socket.emit(
        'msgToServer',
        {
            nickname: $('#nickname').val(),
            msg: $('#mensagem').val(),
            online: $('#online').val()
        }
    );
    $('#mensagem').val("");
    $('#online').val(1);
});

socket.on('msgToClient', function (data) {
    var html = '';
    html += '<div class="dialogo">';
    html += '<h4>' + data.nickname + '</h4>';
    html += '<p>' + data.msg + '</p>';
    html += '</div>';

    $('#dialogos').append(html);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('alertClient', function (data) {
    $('.alert-info').children().remove();
    var html = '<h4>' + data.nickname + data.msg + '</h4>';
    $('.alert-info').append(html);
    $('.alert-info').show();
});

socket.on('updateParticipantes', function (data) {
    console.log("atualizou");
    var html = '';
    html += '<span class="participante">';
    html += '<img src="media/ico_usuario.png">';
    html += data.nickname;
    html += '</span>';

    $('#membros').append(html);
});

function ocultaNavbar() {
    $("#btn_navbar_toggle").attr("class", "navbar-toggle collapsed");
    $("#navbar-collapse-1").attr("class", "navbar-collapse collapse");
    $("#btn_navbar_toggle").attr("aria-expanded", "false");
    $("#navbar-collapse-1").attr("aria-expanded", "false");
}