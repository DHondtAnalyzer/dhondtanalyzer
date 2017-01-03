import { async, TestBed } from '@angular/core/testing';
import { AutoCompleteInputComponent } from './autocomplete-input.component';
describe('AutoCompleteInputComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AutoCompleteInputComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AutoCompleteInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/shared/autocomplete-input/autocomplete-input.component.spec.js.map