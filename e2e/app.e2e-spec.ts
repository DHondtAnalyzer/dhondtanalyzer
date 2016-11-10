import { DhondtanalyzerPage } from './app.po';

describe('dhondtanalyzer App', function() {
    let page: DhondtanalyzerPage;

    beforeEach(() => {
        page = new DhondtanalyzerPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
