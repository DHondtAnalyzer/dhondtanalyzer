import { async, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
describe('LandingComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LandingComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/landing/landing.component.spec.js.map