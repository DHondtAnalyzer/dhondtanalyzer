/**
 * Created by garciparedes on 28/11/2016.
 */

export class Tile {
    cols: number;
    rows: number;
    expanded: boolean;

    constructor(cols: number = 3, rows: number = 1) {
        this.cols = cols;
        this.rows = rows;
        this.expanded = false;
    }

    public maximize() {
        this.cols = this.cols * 2;
        this.rows = this.rows * 2;
        this.expanded = true;
    }

    public minimize() {
        this.cols = this.cols / 2;
        this.rows = this.rows / 2;
        this.expanded = false;
    }

    public toggle() {
        if (this.expanded) {
            this.minimize();
        } else {
            this.maximize();
        }
    }
}
