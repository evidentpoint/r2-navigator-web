// tslint:disable-next-line:no-implicit-dependencies
import { assert } from 'chai';
import {
  CfiNavigationLogic,
} from '../../../src/navigator/views/cfi/cfi-navigation-logic';
import { Rect } from '../../../src/navigator/views/cfi/rect';

import { HostEnv } from '../../helpers/host-env';

describe('CfiNavigationLogic', () => {
  let hostEnv: HostEnv;

  before(() => {
    const head = document.querySelector('head');
    if (head) {
      head.innerHTML +=
        '<link rel="stylesheet" type="text/css" href="fixtures/window.css">';
    }
  });

  beforeEach(async () => {
    hostEnv = new HostEnv();
    await hostEnv.openPublicationR2('/fixtures/publications/metamorphosis/manifest.json');
  });

  afterEach(() => {
    // hostEnv.clear();
  });

  describe('CfiNavigationLogic', () => {
    it('getFirstVisibleCfi()', async () => {
      const pageWidth = 400;
      const siv4 = hostEnv.createSpineItemView(pageWidth, 800);
      await hostEnv.loadSpineItem(siv4, 4);

      const iframe = hostEnv.getIframe();
      const doc = <Document>(iframe.contentDocument);

      const left = pageWidth;
      const right = left + pageWidth;
      const viewportRect = new Rect(left, 0, right, 800);
      const navLogic = new CfiNavigationLogic(doc, hostEnv.getElementChecker());
      const firstVisCfi = navLogic.getFirstVisibleCfi(viewportRect);

      assert.equal(firstVisCfi, '/4/2[chapter-i]/4/8/1:118');
    });

    it('getElementByCfi()', async () => {
      const pageWidth = 400;
      const siv4 = hostEnv.createSpineItemView(pageWidth, 800);
      await hostEnv.loadSpineItem(siv4, 4);

      const iframe = hostEnv.getIframe();
      const doc = <Document>(iframe.contentDocument);

      const navLogic = new CfiNavigationLogic(doc, hostEnv.getElementChecker());

      // console.log(navLogic.isRangeCfi('/4/2[chapter-i]/4/8/1:118'));

      const ele = navLogic.getElementByCfi('/4/2[chapter-i]/4/8/1:118');
      assert.isNotNull(ele);

      const text = (<Node>ele).textContent;
      assert.isNotNull(text);
      assert.isTrue((<string>text).startsWith('“Oh, God”, he thought'));
    });
  });
});
