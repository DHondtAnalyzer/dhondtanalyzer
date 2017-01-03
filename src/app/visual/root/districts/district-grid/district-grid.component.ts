import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {District} from "../../../../dao/model/district";
import {DaoService} from "../../../../dao/dao.service";
import {Region} from "../../../../dao/model/region";
import {AppList} from "../../../../dao/app-list";

@Component({
    selector: 'app-district-grid',
    templateUrl: './district-grid.component.html',
    styleUrls: ['./district-grid.component.css']
})
export class DistrictGridComponent implements OnInit {


    @Input() districtList: AppList<District>;
    @Input() editable: boolean;
    @Output() onRoute = new EventEmitter<void>();

  @Output() onPush = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();

    constructor(private daoService: DaoService) {
    }

  ngOnInit() {
  }


  private addDistrict(regionId: string): void {
    this.onPush.emit(regionId);
  }

  private remove(districtId: string) {
    this.onRemove.emit(districtId)
  }

    private routeChanged(): void {
        this.onRoute.emit()
    }

  private get posibleRegions(): AppList<Region> {
    return this.daoService.getRegionListObservable();
  }
}
