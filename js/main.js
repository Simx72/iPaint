/// <reference path="./color.d.ts"/>
/// <reference path="/usr/local/lib/node_modules/@types/p5/index.d.ts"/>

var relleno;
var isbg = false;
var isfill = false;

function setup() {

    var canvas = createCanvas(400, 400)
    canvas.style('border', '2px solid black')
        .style('margin', '1rem auto')

    noStroke()

    relleno = createColorPicker()

    var colorear = createButton('->')
    colorear.html('&#x2752;')
        .mouseClicked(() => {
            isbg = true
        })

    var micolor = createButton('-')
    micolor.html('&#x270E;')
        .mouseClicked(() => {
            isfill = true
        })
    var añadir = createButton('-')
    añadir.html('<b>+</b>')
        .mouseClicked(() => {
            colores[relleno.value()] = rgb(relleno.value())
            actualizarColores()
        })

    document.getElementById('rellenar').appendChild(relleno.elt)
    document.getElementById('rellenar').appendChild(colorear.elt)
    document.getElementById('rellenar').appendChild(micolor.elt)
    document.getElementById('rellenar').appendChild(añadir.elt)



}

function draw() {

    if (isbg) {
        let [r, g, b] = rgb(relleno.value()).array()
        background(r, g, b)
            // console.log(isbg, r, g, b, relleno.value())
        isbg = false
    }
    if (isfill) {
        let [r, g, b] = rgb(relleno.value()).array()
        fill(r, g, b)
            // console.log(isfill, r, g, b, relleno.value())
    } else {
        colores[currentColor].rgb().fn(fill)
    }

    if (mouseIsPressed) {

        ellipse(mouseX, mouseY, 30, 30)


    }

}