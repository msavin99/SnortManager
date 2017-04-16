import { SnortAngularPage } from './app.po';

describe('snort-angular App', () => {
  let page: SnortAngularPage;

  beforeEach(() => {
    page = new SnortAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
