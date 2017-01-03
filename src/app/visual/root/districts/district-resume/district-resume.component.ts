import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {District} from "../../../../dao/model/district";
import {Router} from "@angular/router";
import {DaoService} from "../../../../dao/dao.service";

@Component({
  selector: 'app-district-resume',
  templateUrl: './district-resume.component.html',
  styleUrls: ['./district-resume.component.css']
})
export class DistrictResumeComponent implements OnInit {


    @Input() district: District;
  @Output() onRemove = new EventEmitter<string>();
    @Output() onRoute = new EventEmitter<void>();

    private editing: boolean;

  private name: string;
  private id: string;

  constructor(private route: Router,
              private daoService: DaoService) {
  }

  ngOnInit() {
    if (!this.district.region || !this.district.census || !this.district.seats) {

      this.editing = true;
    }

    this.district.region.subscribe(r => {
      this.name = r.name;
      this.id = r.id;
    });
  }

  private save() {
    this.daoService.saveDistrict(this.district).then(() => {
      this.editing = false;
    })
  }

    private edit() {
        this.editing = true;
    }


  private view() {
    this.onRoute.emit();
    this.route.navigate(['/app/regions', this.id]);
  }


  private remove() {
    this.onRemove.emit(this.district.id);
  }
}
