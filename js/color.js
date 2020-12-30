class Color {
    /**
     * This class creates a color
     * @param {number} p1 - param 1
     * @param {number} p2 - param 2
     * @param {number} p3 - param 3
     * @param {"hsl", "rgb", "hsv"} type - the type
     */
    constructor(p1, p2, p3, type) {
        /**
         * @property {number} _p1 - param 1
         * @property {number} _p2 - param 2
         * @property {number} _p3 - param 3
         * @property {"hsl", "rgb", "hsv"} _type - the type of color
         */
        this._p1 = p1
        this._p2 = p2
        this._p3 = p3
        this._type = type
    }

    /**
     * '_to' method returns the type you want to convert the color
     * @param {"hsl", "rgb", "hsv"} type - the type you want to convert, it could be "hsl", "rgb", "hsv".
     */
    _to = (type) => {

        switch (this._type) {
            /**
             * If this is RGB
             */
            case "rgb":
                {

                    switch (type) {

                        case "rgb":
                            return this;

                        case "hsl":
                            {

                                let r = this._p1,
                                    g = this._p2,
                                    b = this._p3

                                this.r /= 255,
                                g /= 255,
                                b /= 255;

                                var max = Math.max(r, g, b),
                                    min = Math.min(r, g, b);
                                var h, s, l = (max + min) / 2;

                                if (max == min) {
                                    h = s = 0; // achromatic
                                } else {
                                    var d = max - min;
                                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

                                    switch (max) {
                                        case r:
                                            h = (g - b) / d + (g < b ? 6 : 0);
                                            break;
                                        case g:
                                            h = (b - r) / d + 2;
                                            break;
                                        case b:
                                            h = (r - g) / d + 4;
                                            break;
                                    }

                                    h /= 6;
                                }

                                return new Color.HSL(h, s, l);

                            }

                        case "hsv":
                            {
                                let r = this._p1,
                                    g = this._p2,
                                    b = this._p3;

                                r /= 255,
                                g /= 255,
                                b /= 255;

                                var max = Math.max(r, g, b),
                                    min = Math.min(r, g, b);
                                var h, s, v = max;

                                var d = max - min;
                                s = max == 0 ? 0 : d / max;

                                if (max == min) {
                                    h = 0; // achromatic
                                } else {
                                    switch (max) {
                                        case r:
                                            h = (g - b) / d + (g < b ? 6 : 0);
                                            break;
                                        case g:
                                            h = (b - r) / d + 2;
                                            break;
                                        case b:
                                            h = (r - g) / d + 4;
                                            break;
                                    }

                                    h /= 6;
                                }

                                return new Color.HSV(h, s, v);
                            }

                        default:
                            return null;
                    }

                }

                /**
                 * If this is HSL
                 */
            case "hsl":
                {

                    switch (type) {
                        case "rgb":
                            {
                                let h = this._p1,
                                    s = this._p2,
                                    l = this._p3

                                let r = this._p1,
                                    g = this._p2,
                                    b = this._p3;

                                if (s == 0) {
                                    r = g = b = l; // achromatic
                                } else {
                                    function hue2rgb(p, q, t) {
                                        if (t < 0) t += 1;
                                        if (t > 1) t -= 1;
                                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                                        if (t < 1 / 2) return q;
                                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                                        return p;
                                    }

                                    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                                    var p = 2 * l - q;

                                    r = hue2rgb(p, q, h + 1 / 3);
                                    g = hue2rgb(p, q, h);
                                    b = hue2rgb(p, q, h - 1 / 3);
                                }

                                return new Color.RGB(r * 255, g * 255, b * 255);


                            }

                        case "hsl":
                            {
                                return this
                            }

                        case "hsv":
                            {
                                return this._to("rgb")._to("hsv")
                            }

                        default:
                            return null;
                    }

                }

            case "hsv":
                {

                    if (type == "rgb") {

                        var h = this._p1,
                            s = this._p2,
                            v = this._p3,
                            r = 0,
                            g = 0,
                            b = 0;

                        var i = Math.floor(h * 6)
                        var f = h * 6 - i;
                        var p = v * (1 - s);
                        var q = v * (1 - f * s);
                        var t = v * (1 - (1 - f) * s);

                        switch (i % 6) {
                            case 0:
                                r = v, g = t, b = p;
                                break;
                            case 1:
                                r = q, g = v, b = p;
                                break;
                            case 2:
                                r = p, g = v, b = t;
                                break;
                            case 3:
                                r = p, g = q, b = v;
                                break;
                            case 4:
                                r = t, g = p, b = v;
                                break;
                            case 5:
                                r = v, g = p, b = q;
                                break;
                        }

                        return new Color.RGB(r * 255, g * 255, b * 255);


                    } else {
                        try {
                            return this._to("rgb")._to(type)
                        } catch (e) {
                            console.log(e)
                            return null;
                        }
                    }


                }

            default:
                return null;
        }


    }

    html() {
        var rgbarr = this._to("rgb").array()

        return '#' + rgbarr.map(x => {
            const hex = Math.floor(x).toString(16)
            return hex.length === 1 ? '0' + hex : hex
        }).join('')
    }

    /**
     * this method return an array with the three params
     * @returns { Array } - [p1, p2, p3]
     */
    array() {
        return [this._p1, this._p2, this._p3]
    }

    /**
     * this methods use the params in the function on order "func(p1, p2, p3)"
     * @param {function} func - pas the three params to the function
     */
    fn(func) {
        return func(this._p1, this._p2, this._p3)
    }

    rgb = () => this._to("rgb")
    hsl = () => this._to("hsl")
    hsv = () => this._to("hsv")

}

Color.RGB = class extends Color {
    constructor(red, green, blue) {
        super(red, green, blue, "rgb")

        Object.defineProperty(this, 'red', {
            get: () => this._p1,
            set: (v) => (this._p1 = v)
        })
        Object.defineProperty(this, 'r', {
            get: () => this._p1,
            set: (v) => (this._p1 = v)
        })
        Object.defineProperty(this, 'green', {
            get: () => this._p2,
            set: (v) => (this._p2 = v)
        })
        Object.defineProperty(this, 'g', {
            get: () => this._p2,
            set: (v) => (this._p2 = v)
        })
        Object.defineProperty(this, 'blue', {
            get: () => this._p3,
            set: (v) => (this._p3 = v)
        })
        Object.defineProperty(this, 'b', {
            get: () => this._p3,
            set: (v) => (this._p3 = v)
        })
    }

    setRed(h) {
        this.red = h
        return this;
    }
    setGreen(h) {
        this.green = h
        return this;
    }
    setBlue(h) {
        this.blue = h
        return this;
    }

}

Color.HSL = class extends Color {
    constructor(hue, saturation, light) {
        super(hue, saturation, light, "hsl")

        Object.defineProperty(this, 'hue', {
            get: () => this._p1,
            set: (v) => (this._p1 = v)
        })
        Object.defineProperty(this, 'h', {
            get: () => this._p1,
            set: (v) => (this._p1 = v)
        })
        Object.defineProperty(this, 'saturation', {
            get: () => this._p2,
            set: (v) => (this._p2 = v)
        })
        Object.defineProperty(this, 's', {
            get: () => this._p2,
            set: (v) => (this._p2 = v)
        })
        Object.defineProperty(this, 'light', {
            get: () => this._p3,
            set: (v) => (this._p3 = v)
        })
        Object.defineProperty(this, 'l', {
            get: () => this._p3,
            set: (v) => (this._p3 = v)
        })
    }

    setHue(h) {
        this.hue = h
        return this;
    }
    setSaturation(h) {
        this.saturation = h
        return this;
    }
    setLight(h) {
        this.light = h
        return this;
    }

}

Color.HSV = class extends Color {
    constructor(hue, saturation, value) {
        super(hue, saturation, value, "hsv")

        Object.defineProperty(this, 'hue', {
            get: () => this._p1,
            set: (v) => (this._p1 = v)
        })
        Object.defineProperty(this, 'h', {
            get: () => this._p1,
            set: (v) => (this._p1 = v)
        })
        Object.defineProperty(this, 'saturation', {
            get: () => this._p2,
            set: (v) => (this._p2 = v)
        })
        Object.defineProperty(this, 's', {
            get: () => this._p2,
            set: (v) => (this._p2 = v)
        })
        Object.defineProperty(this, 'value', {
            get: () => this._p3,
            set: (v) => (this._p3 = v)
        })
        Object.defineProperty(this, 'v', {
            get: () => this._p3,
            set: (v) => (this._p3 = v)
        })
    }

    setHue(h) {
        this.hue = h
        return this;
    }
    setSaturation(h) {
        this.saturation = h
        return this;
    }
    setValue(h) {
        this.value = h
        return this;
    }
}

Color.html = (htmlcolor) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(htmlcolor);
    result = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : false;
    if (!result) return null;

    return new Color.RGB(result.r, result.g, result.b)

}


var rgb = (red, green = false, blue = false) => {
        if (!(green && blue)) {
            return Color.html(red)
        } else {
            return new Color.RGB(red, green, blue)
        }
    },
    hsl = (hue, saturation, light) => new Color.HSL(hue, saturation, light),
    hsv = (hue, saturation, value) => new Color.HSV(hue, saturation, value);


// module.exports.rgb = rgb;
// module.exports.hsl = hsl;
// module.exports.hsv = hsv;