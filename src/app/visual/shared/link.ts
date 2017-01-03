/**
 * Clase Link.
 *
 * Representa un enlace
 */
export class Link {


    /**
     * Atributo name.
     *
     * El tipo es string.
     */
    private _name: string;


    /**
     * Atributo url.
     *
     * El tipo es string.
     */
    private _url: string;


    /**
     * Constructor de la clase.
     *
     * @param name atributo name.
     * @param url atributo url.
     */
    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }


    /**
     * Getter del atributo name.
     *
     * @returns {string}
     */
    get name(): string {
        return this._name;
    }


    /**
     * Setter del atributo name.
     *
     * @param value
     */
    set name(value: string) {
        this._name = value;
    }


    /**
     * Getter del atributo url.
     * @returns {string}
     */
    get url(): string {
        return this._url;
    }


    /**
     * Setter del atributo url.
     * @param value
     */
    set url(value: string) {
        this._url = value;
    }
}
