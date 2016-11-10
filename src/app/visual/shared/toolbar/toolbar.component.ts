import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Link} from "../link";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    private links: Link[];

    @Input() title: string;
    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
        this.links = [
            new Link('Home', '/app/home'),
            new Link('Elections', '/app/elections'),
            new Link('Parties', '/app/parties'),
            new Link('Exit', '/')
        ]
    }

    goTo(link: Link): void {
        this.router.navigate([link.url]);
    }

}
