import { HostEnv } from '../helpers/host-env';
import { PageTitleTocResolver } from '../../src/utils/page-title-toc-resolver';
import { Navigator, SpreadMode } from '../../src/navigator';

// tslint:disable-next-line:no-implicit-dependencies
import { assert } from 'chai';

describe('PageTitleTocResolver', () => {
  let hostEnv: HostEnv;

  beforeEach(async () => {
    hostEnv = new HostEnv();
  });

  afterEach(() => {
    hostEnv.clear();
  });

  describe('PageTitleTocResolver', () => {
    beforeEach(async () => {
      await hostEnv.openPublicationR2('/fixtures/publications/igp-twss-fxl/manifest.json');
    });

    it('getPageTitleFromLocation', async () => {
      const rendition = hostEnv.getRendition();
      rendition.viewport.setViewportSize(800, 600);

      rendition.setPageLayout({
        spreadMode: SpreadMode.Freeform,
        pageWidth: 400,
        pageHeight: 800,
      });
      rendition.setViewAsVertical(false);
      rendition.viewport.enableScroll(false);

      await rendition.render();
      const navigator = new Navigator(rendition);
      const pageListManager = new PageTitleTocResolver(rendition);

      await rendition.viewport.renderAtSpineItem(2);

      const loc = navigator.getCurrentLocation();
      if (loc) {
        // console.log(loc.getLocation());
        const pageTitle = pageListManager.getPageTitleFromLocation(loc);
        assert.equal(pageTitle, 'iii');
      }
    });

    it('getPageTitleFromLocation', async () => {
      const rendition = hostEnv.getRendition();
      rendition.viewport.setViewportSize(800, 600);

      rendition.setPageLayout({
        spreadMode: SpreadMode.Freeform,
        pageWidth: 400,
        pageHeight: 800,
      });
      rendition.setViewAsVertical(false);
      rendition.viewport.enableScroll(false);

      await rendition.render();
      const navigator = new Navigator(rendition);
      const pageListManager = new PageTitleTocResolver(rendition);

      await rendition.viewport.renderAtSpineItem(2);

      const loc = navigator.getCurrentLocation();
      if (loc) {
        const tocLink = pageListManager.getTocLinkFromLocation(loc);
        assert.isNotNull(tocLink);
        if (tocLink) {
          assert.equal(tocLink.title, 'THE WAR POEMS OF SIEGFRIED SASSOON');
        }
      }
    });
  });
});
