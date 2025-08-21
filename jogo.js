$().ready(function () {
    var canvas = $("#quadro")[0];
    var ctx = canvas.getContext("2d");
    var colisao = false;
    var gol = false;
    var bola = {
        "vx": -1,
        "vy": 0,
        "x": canvas.width / 2,
        "y": canvas.height / 2,
        "l": 15,
        "a": 15,
        "cor": "red",
        atualiza: function () {
            this.x += this.vx;
            this.y += this.vy;
        },
        desenharObjeto: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.l, this.a);
        }
    }   
    var player1 = {
        "vx": 0,
        "vy": 0,
        "x": 50,
        "y": 100,
        "l": 15,
        "a": 80,
        "cor": "white",
        atualiza: function () {
            this.x += this.vx;
            this.y += this.vy;
        },
        desenharObjeto: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.l, this.a);
            if (colisao) {
            bola.vx = -bola.vx;
            console.log("hello world!");
        }
        },
        
    }

    var inimigo = {
        "vy": 2,
        "x": 200,
        "y": 200,
        "l": 15,
        "a": 80,
        "cor": "white",
        atualiza: function () {
            this.x += this.vx;
            this.y += this.vy;
        },
        desenharObjeto: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.l, this.a);
            if (colisao) {
            bola.vx = -bola.vx;
            console.log("hello world!");
        }
        },
        
    }


    function detectaColisao(o1, o2) {
        var top1 = o1.y;
        var top2 = o2.y;
        var esq1 = o1.x;
        var esq2 = o2.x;
        var dir1 = o1.x + o1.a;
        var dir2 = o2.x + o2.a;
        var base1 = o1.y + o1.l;
        var base2 = o2.y + o2.l;
        if (base1 > top2 && dir1 > esq2 && base2 > top1 && dir2 > esq1) {
            colisao = true;
        }
        else {
            colisao = false;
        }
    }
    function desenharTela() {
        apagarTela();
        //obj.atualiza();
        player1.atualiza();
        bola.atualiza();
        inimigo.atualiza();
        detectaColisao(player1, bola);
        detectaLimitePlayer(player1);
        detectaLimiteObj(inimigo);
        player1.desenharObjeto();
        bola.desenharObjeto();
        inimigo.desenharObjeto();
        

        requestAnimationFrame(desenharTela);
    }
    function apagarTela() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function detectaLimitePlayer(obj) {
        if (obj.y<0) {
            obj.y = 0;
            obj.vy = 0;
        }
        if (obj.y + obj.a> canvas.height) {
            obj.y = canvas.height - obj.a;
            obj.vy = 0;
        } }
    function detectaLimiteObj(obj) {
            if (obj.y<0) {
                obj.y = 0;
                obj.vy = -obj.vy;
            }
            if (obj.y + obj.a> canvas.height) {
                obj.y = canvas.height - obj.a;
                obj.vy = -obj.vy;
            }
            if (obj.x<0) {
                obj.y = 0;
                obj.vy = -obj.vy;
            }
            if (obj.y + obj.a> canvas.height) {
                obj.y = canvas.height - obj.a;
                obj.vy = -obj.vy;
            }

    } 
desenharTela();
    $(window).keydown(function (event) {
        if (event.which == 87) { //cima
            player1.vy = -2;
        }
        if (event.which == 83) { //baixo
            player1.vy = 2;
            
        }
    });
    
}); 


    

    //A =  65, W = 87, S = 83, D = 68