/**
 * Clase Link.
 *
 * Representa un enlace
 */
export var Link = (function () {
    /**
     * Constructor de la clase.
     *
     * @param name atributo name.
     * @param url atributo url.
     */
    function Link(name, url) {
        this.name = name;
        this.url = url;
    }
    Object.defineProperty(Link.prototype, "name", {
        /**
         * Getter del atributo name.
         *
         * @returns {string}
         */
        get: function () {
            return this._name;
        },
        /**
         * Setter del atributo name.
         *
         * @param value
         */
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "url", {
        /**
         * Getter del atributo url.
         * @returns {string}
         */
        get: function () {
            return this._url;
        },
        /**
         * Setter del atributo url.
         * @param value
         */
        set: function (value) {
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });
    return Link;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/shared/link.js.map