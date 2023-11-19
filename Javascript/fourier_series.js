let angulo = 0; //o angulo da circunferencia em funcao do tempo
let listaPontos = []; //Guarda cada posicao da onda

let numCirculos;

//Esse código é rodado assim que o programa inicia
function setup(){ 
    createCanvas(1000, 450);
    numCirculos = createSlider(1, 12, 1);
    numCirculos.elt.id = "circulos";
    
    velocidade = createSlider(1, 100, 1);
    velocidade.elt.id = "velocidade";
    console.log(velocidade);
}

const botao_pausa = document.getElementById("parar");
let executar = false;
botao_pausa.addEventListener("click", ()=>{    
    executar = !executar;
    if(executar){
        botao_pausa.textContent = "Pausar";
    }
    else{
        botao_pausa.textContent = "Continuar";
    }
});



const botao_exibir = document.getElementById("exibicao");
let exibir = true
botao_exibir.addEventListener("click", ()=>{    
    exibir = !exibir;
});

//Essa função é rodada multiplas vezes por segundo enquanto o programa é executado
function draw(){
    if(executar || angulo === 0){
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
            //ellipse(x, y, 4);
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
        
        if(exibir){
            beginShape();
            noFill();
            for(let i =0; i<listaPontos.length; i++){
                vertex(i, listaPontos[i]);
            }
            endShape();
        }
        else{
            for(let i=0; i<listaPontos.length; i++){
                ellipse(i, listaPontos[i], 4);
            }
        }
        
        document.getElementById("display_circulos").children[0].textContent = "Número de circulos: " + numCirculos.value();
        document.getElementById("display_velocidade").children[0].textContent = "Velocidade: " + velocidade.value()/100;

        angulo -= velocidade.value()/100;
    }
}