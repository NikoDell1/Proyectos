class Contador{

    constructor(){

        this.numero = 0;

    }

    sumar(){

        this.numero++;

    }

    restar(){

        if(this.numero > 0){
        this.numero--;
        } else {
            console.log("Ingrese un numero mayor a 0");
        }

    }

    reinicar(){

        this.numero = 0;

    }
}

const objContador = new Contador();
const pantalla = document.getElementById('numero');

function mostrarNumero(){

    pantalla.textContent = objContador.numero;

}

document.getElementById('sumar').onclick = function(){

    objContador.sumar();
    mostrarNumero();

}

document.getElementById('restar').onclick = function(){

    objContador.restar();
    mostrarNumero();

}

document.getElementById('reiniciar').onclick = function(){

    objContador.reinicar();
    mostrarNumero();

}