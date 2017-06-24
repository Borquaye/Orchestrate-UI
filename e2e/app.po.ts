import { browser, by, element } from 'protractor';

export class OrchestrateUIPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('orc-root h1')).getText();
  }
}
