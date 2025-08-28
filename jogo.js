$().ready(function () {
    var canvas = $("#quadro")[0];
    var ctx = canvas.getContext("2d");
    var colisao = false;
    var cont = 0;
    var gol = 0;
    var bola = {
        "vx": -1,
        "vy": 1,
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
        "l": 5,
        "a": 60,
        "cor": "white",
        atualiza: function () {
            this.x += this.vx;
            this.y += this.vy;
        },
        desenharObjeto: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.l, this.a);
            
        }
        
    }

    var inimigo = {
        "vy": 1.7,
        "x": 200,
        "y": 200,
        "l": 5,
        "a": 60,
        "cor": "white",
        atualiza: function () {
            this.y += this.vy;
        },
        desenharObjeto: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.l, this.a);
           
        }
        
    }


    function detectaColisao(o1, o2) {
        var top1 = o1.y;
        var top2 = o2.y;
        var esq1 = o1.x;
        var esq2 = o2.x;
        var dir1 = o1.x + o1.l;
        var dir2 = o2.x + o2.l;
        var base1 = o1.y + o1.a;
        var base2 = o2.y + o2.a;
        return (base1 > top2 && dir1 > esq2 && base2 > top1 && dir2 > esq1);
           
    }
    function desenharTela() {
        apagarTela();
        
        player1.atualiza();
        bola.atualiza();
        inimigo.atualiza();
        
       if (detectaColisao(player1, bola)) {
    bola.vx *= -1;
    bola.x = player1.x + player1.l; 
    console.log("colidiu com player1");
}


else if (detectaColisao(inimigo, bola)) {
    bola.vx *= -1;
    bola.x = inimigo.x - bola.l; 
    console.log("colidiu com inimigo");
}
        
        detectaLimitePlayer(player1);
        detectaLimiteObj(inimigo);
        detectaPonto(bola);
        if (gol == 1) {
            cont++;
            bola.x =  canvas.width / 2;
            bola.y = canvas.height / 2;
            
        } else if (gol == 2) {
            cont--;
            bola.x =  canvas.width / 2;
            bola.y = canvas.height / 2;
        }
        detectaLimiteObj(bola);
        document.getElementById('pontuacao').value = cont;

        inimigo.desenharObjeto();
        player1.desenharObjeto();
        bola.desenharObjeto();

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
        
    } function detectaPonto(obj) {
            if (obj.x<0) {
                gol = 2;
            } else if ( obj.x>300) {
                gol = 1;
            } else {
                gol = 0;
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