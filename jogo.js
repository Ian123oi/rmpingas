$().ready(function () {
    var canvas = $("#quadro")[0];
    var ctx = canvas.getContext("2d");
    var colisao = false;
    var contplayer = 0;
    var gol = 0;
    var contInimigo = 0;
    var bola = {
    
        "vx": -2,
        "vy": 2,
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
        "x": 5,
        "y": canvas.height/2,
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

    var inimigo = {
        "vy": 3,
        "x": canvas.width - 10,
        "y": canvas.height/2,
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
            contplayer++;
            bola.x =  canvas.width / 2;
            bola.y = canvas.height / 2;
            
        } else if (gol == 2) {
            contInimigo++;
            bola.x =  canvas.width / 2;
            bola.y = canvas.height / 2;
        }
        detectaLimiteObj(bola);
        document.getElementById('pontuacao').value = contplayer;
        document.getElementById('pontuacaoInimigo').value = contInimigo;
        

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
            
            
        
    } function detectaPonto(obj) {
            if (obj.x<0) {
                gol = 2;
            } else if ( obj.x>canvas.width - obj.l) {
                gol = 1;
            } else {
                gol = 0;
            }
        }
desenharTela();
    $(window).keydown(function (event) {
        if (event.which == 87) { //cima
            player1.vy = -3;
        }
        if (event.which == 83) { //baixo
            player1.vy = 3;
            
        }
    });
        
}); 

    


    

    //A =  65, W = 87, S = 83, D = 68