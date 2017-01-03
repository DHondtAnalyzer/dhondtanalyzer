/**
 * Created by garciparedes on 28/11/2016.
 */
export var Tile = (function () {
    function Tile(cols, rows) {
        if (cols === void 0) { cols = 3; }
        if (rows === void 0) { rows = 1; }
        this.cols = cols;
        this.rows = rows;
        this.expanded = false;
    }
    Tile.prototype.maximize = function () {
        this.cols = this.cols * 2;
        this.rows = this.rows * 2;
        this.expanded = true;
    };
    Tile.prototype.minimize = function () {
        this.cols = this.cols / 2;
        this.rows = this.rows / 2;
        this.expanded = false;
    };
    Tile.prototype.toggle = function () {
        if (this.expanded) {
            this.minimize();
        }
        else {
            this.maximize();
        }
    };
    return Tile;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/districts/shared/tile.js.map