import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    private title: string;

    constructor(
        private router: Router,
    ) { }


    ngOnInit() {
        this.title = 'DHondtAnalyzer'
    }

    goTo(url: string): void {
        this.router.navigate([url])
    }

}
