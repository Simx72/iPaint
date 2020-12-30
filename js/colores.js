/// <reference path="./color.d.ts"/>

var colores = {
    rojo: rgb(255, 15, 15),
    naranja: rgb(255, 180, 20),
    amarillo: rgb(255, 250, 20),
    verde: rgb(50, 250, 50),
    aguamarina: rgb(50, 250, 150),
    azul: rgb(10, 60, 220).hsv().setValue(0.5),
    "azul claro": rgb(10, 60, 220).hsv().setValue(0.99).setSaturation(0.8),
    morado: rgb(150, 100, 255),
    purpura: rgb(150, 100, 255).hsv().setValue(0.6),
    negro: hsl(0, 0, 0),
    "gris oscuro": hsv(0, 0, 0.3),
    gris: hsv(0, 0, 0.5),
    "gris claro": hsv(0, 0, 0.7),
    blanco: hsv(0, 0, 1),
}

var currentColor = "rojo";

function actualizarColores() {
    document.getElementById('botones-colores').innerHTML = "";
    for (const c in colores) {
        const elcolor = colores[c]

        const bg = elcolor.html()

        // console.log(c, elcolor.hsv().value)

        const fg = (elcolor.hsv().value <= 0.65) ? "#FFFFFF" : "#2F2F2F"

        const id = `boton-color-${c}`

        // console.log(c, fg, bg)

        var boton = document.createElement('button')

        document.getElementById('botones-colores').appendChild(boton)

        boton.outerHTML = `<button id="${id}" data-color="${c}" class="boton color" style="--color-fg: ${fg}; --color-bg: ${bg};">${c}</button>`

    }

    for (const btnColor of document.getElementById("botones-colores").children) {

        btnColor.addEventListener('click', e => {
            e.preventDefault()
            currentColor = e.target.getAttribute('data-color')
                // console.log(currentColor)
            isfill = false;
        })


    }
}
actualizarColores()