let botonCalcular = document.querySelector('#botonCalcular')
let texto = document.querySelector('#monto')

let precioProducto = document.querySelector('#precioProducto')
let precioEnvio = document.querySelector('#precioEnvio')
let dolarOficial = document.querySelector('#dolarOficial')
let enviosAño = document.querySelector('#enviosAño')

let textoProducto = document.querySelector('#valorProducto')
let textoEnvio = document.querySelector('#valorEnvio')
let textoFranquicia = document.querySelector('#valorFranquicia')

//texto.textContent = document.querySelector('.product-price-current').textContent

let valorFranquiciaUSD
let impuestos = 1
let valorDolar
let exceso = 0

function totalDolares() {
    //Calculamos el subtotal
    valorFranquiciaUSD = (Number(precioProducto.value) + Number(precioEnvio.value))
    if (enviosAño.checked) {
        impuestos = 1.5
    } else if (valorFranquiciaUSD >= 50) {
        
        valorFranquiciaUSD = valorFranquiciaUSD + ((valorFranquiciaUSD - 50) / 2)
        exceso = valorFranquiciaUSD - 50
    } else {
        impuestos = 1
    }
    valorFranquiciaUSD = valorFranquiciaUSD * impuestos
}


precioEnvio.addEventListener('change', totalDolares);
precioProducto.addEventListener('change', totalDolares);
enviosAño.addEventListener('change', totalDolares)

botonCalcular.onclick = function() {
    //valorDolar = Number(dolarOficial.value) * 1.6
    textoProducto.textContent = precioProducto.value + 'USD'
    textoEnvio.textContent = precioEnvio.value + 'USD'
    textoFranquicia.textContent = exceso + 'USD'
    texto.textContent = ((dolarOficial.value * valorFranquiciaUSD) + 4300).toFixed(2) + ' ARS'
}

fetch("https://dolarapi.com/v1/dolares/tarjeta")
    .then(response => response.json())
    .then(data => {
        //console.log(data.venta)
        dolarOficial.value = data.venta
    });

