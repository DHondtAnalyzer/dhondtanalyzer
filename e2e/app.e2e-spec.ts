import { DHondtAnalyzerWebPage } from './app.po';

describe('dhondt-analyzer-web App', function() {
  let page: DHondtAnalyzerWebPage;

  beforeEach(() => {
    page = new DHondtAnalyzerWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
