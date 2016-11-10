import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
    title = 'DHondtAnalyzer';

    constructor() { }

    ngOnInit() {
    }

}
