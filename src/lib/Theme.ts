
type ColorPaletteKeys = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
type ColorPalette = {
    [key in ColorPaletteKeys]: string;
}
type ColorThemes = {
    [key: string]: ColorPalette;
}
export const themes : ColorThemes = {
    'black-pearl': {
        '50': '#f1f9fe',
        '100': '#e2f3fc',
        '200': '#bfe5f8',
        '300': '#87d3f2',
        '400': '#47bbe9',
        '500': '#1fa4d8',
        '600': '#1183b8',
        '700': '#0f6895',
        '800': '#11597b',
        '900': '#09222f',
    },
    'malibu': {
        '50': '#eff8ff',
        '100': '#dff1ff',
        '200': '#b8e4ff',
        '300': '#78cfff',
        '400': '#52c2ff',
        '500': '#069df1',
        '600': '#007dce',
        '700': '#0063a7',
        '800': '#02548a',
        '900': '#084672',
    },
    'cinder': {
        '50': '#f4f6f9',
        '100': '#dce2eb',
        '200': '#b8c4d7',
        '300': '#8d9cbb',
        '400': '#65769c',
        '500': '#4b5b81',
        '600': '#3a4667',
        '700': '#323a53',
        '800': '#2b3144',
        '900': '#08090c',
    },
    'shuttle-gray': {
        '50': '#f5f5f6',
        '100': '#e4e6e9',
        '200': '#cccfd5',
        '300': '#a8acb8',
        '400': '#7d8393',
        '500': '#5c6170',
        '600': '#545766',
        '700': '#484b56',
        '800': '#292b2f',
        '900': '#1f1f25',
    },
    'mountain-meadow': {
        '50': '#f1fcf9',
        '100': '#cef9eb',
        '200': '#9df2d9',
        '300': '#64e4c2',
        '400': '#34cdaa',
        '500': '#1bb191',
        '600': '#14997f',
        '700': '#137260',
        '800': '#145b4e',
        '900': '#154c42',
    },
    'forest-green': {
        '50': '#f1fcf2',
        '100': '#defae3',
        '200': '#bff3c8',
        '300': '#8ee79f',
        '400': '#55d36e',
        '500': '#2eb949',
        '600': '#22a03b',
        '700': '#1d782f',
        '800': '#1c5f2a',
        '900': '#194e25',
    },
}


export class Theme {
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get primary(): string {
        return this._primary;
    }

    set primary(value: string) {
        if (!themes[value]){
            throw new Error(`Theme ${value} does not exist`);
        }
        this._primary = value;
    }

    get secondary(): string {
        return this._secondary;
    }

    set secondary(value: string) {
        if (!themes[value]){
            throw new Error(`Theme ${value} does not exist`);
        }
        this._secondary = value;
    }

    get neutral(): string {
        return this._neutral;
    }

    set neutral(value: string) {
        if (!themes[value]){
            throw new Error(`Theme ${value} does not exist`);
        }
        this._neutral = value;
    }

    get neutralPalette(): ColorPalette {
        return themes[this.neutral];
    }

    get primaryPalette(): ColorPalette {
        return themes[this.primary];
    }

    get secondaryPalette(): ColorPalette {
        return themes[this.secondary];
    }


    private _name: string;
    private _primary: string;
    private _secondary: string;
    private _neutral: string;

    constructor(name: string, primary: string, secondary: string, neutral: string) {
        this._name = name;
        this._primary = primary;
        this._secondary = secondary;
        this._neutral = neutral;
    }

    apply() {
        const steps: ColorPaletteKeys[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        const palettes = ['primary', 'secondary', 'neutral'];

        palettes.forEach(palette => {
            steps.forEach(step  => {
                if (palette === 'neutral'){
                    document.documentElement.style.setProperty(`--color-${palette}-${step}`, this.neutralPalette[step]);
                    return;
                } else if (palette === 'primary'){
                    document.documentElement.style.setProperty(`--color-${palette}-${step}`, this.primaryPalette[step]);
                    return;
                } else if (palette === 'secondary'){
                    document.documentElement.style.setProperty(`--color-${palette}-${step}`, this.secondaryPalette[step]);
                    return;
                }
            });
        });
    }
}

