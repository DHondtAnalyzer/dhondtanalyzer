import { async, TestBed } from '@angular/core/testing';
import { RegionListComponent } from './region-list.component';
describe('RegionListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [RegionListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(RegionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/regions/region/region-list/region-list.component.spec.js.map