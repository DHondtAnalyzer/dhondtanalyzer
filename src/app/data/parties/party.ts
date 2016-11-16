export class Party {

    private _name: string;
    private _abbreviation: string;
    private _color: string;

    constructor(name?: string, abbreviation?: string, color?: string){
        this._name = name;
        this._abbreviation = abbreviation;
        this._color = color;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    get abbreviation(): string {
        return this._abbreviation;
    }

    set abbreviation(value: string) {
        this._abbreviation = value;
    }
    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }
}
