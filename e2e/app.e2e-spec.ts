import { OrchestrateUIPage } from './app.po';

describe('orchestrate-ui App', () => {
  let page: OrchestrateUIPage;

  beforeEach(() => {
    page = new OrchestrateUIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to orc!!');
  });
});
