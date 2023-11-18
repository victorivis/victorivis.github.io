let angulo = 0; //o angulo da circunferencia em funcao do tempo
let listaPontos = []; //Guarda cada posicao da onda

let numCirculos;

//Esse código é rodado assim que o programa inicia
function setup(){ 
    createCanvas(1000, 450);
    numCirculos = createSlider(1, 12, 1);
    numCirculos.elt.id = "circulos";
    
    velocidade = createSlider(1, 20, 1);
    velocidade.elt.id = "velocidade";
    console.log(velocidade);
}

const botao_pausa = document.getElementById("parar");

let executar = true;
botao_pausa.addEventListener("click", ()=>{
    executar = !executar;
})

//Essa função é rodada multiplas vezes por segundo enquanto o programa é executado
function draw(){
    if(executar){
        background(0);
        translate(200, 250);
        
        let x = 0;
        let y = 0;
        
        for(let i = 0; i < numCirculos.value(); i++){
            let xAnterior = x;
            let yAnterior = y;

            let n = i*2 + 1;
        
            let raio = 75 * 4 / (n * PI);
            x += raio * cos(n * angulo);
            y += raio * sin(n * angulo);
            
            stroke(255);
            noFill();
            ellipse(xAnterior, yAnterior, raio*2);

            fill(255);
            stroke(255);
            line(xAnterior, yAnterior, x, y);
            //ellipse(x, y, 8);
        }
        listaPontos.unshift(y);
        translate(200, 0);
        line(x-200, y, 0, listaPontos[0]);

        if(listaPontos.lenght > 10){
            listaPontos.pop();
        }    

        if(listaPontos.length > 500){
            listaPontos.pop();
        }

        /*
        for(let i =0; i<wave.length; i++){
            ellipse(i, wave[i], 4);
        }
        */
            
        beginShape();
        noFill();
        for(let i =0; i<listaPontos.length; i++){
            console.log("caramba!");
            vertex(i, listaPontos[i]);
        }
        endShape();

        angulo -= velocidade.value()/100;
        //console.log(document.getElementById("circulos"));
    }
}
