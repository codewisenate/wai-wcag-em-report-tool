<Page title="all•Access Accessibility Conformance Report" pageid="view-report">

  <p><strong>Based on VPAT<small><sup>&reg;</sup></small> version 2.5 WCAG Edition (November 2023)</strong></p>

  <Button on:click="{handleVPATDownloadClick}">
    <span>{TRANSLATED.BUTTON_SAVE_VPAT_HTML}</span>
  </Button>

  <h2 class="mb-0">Name of Product: {$summaryStore['EVALUATION_TITLE'] ? $summaryStore['EVALUATION_TITLE'] : TRANSLATED.PAGE_TITLE}</h2>
  <div><small>Includes version if necessary</small></div>

  <VPAT />

</Page> 

<script>
  import { getContext } from 'svelte';

  import evaluationStore from '@app/stores/evaluationStore.js';
  import summaryStore from '@app/stores/summaryStore.js';
  import scopeStore from '@app/stores/scopeStore.js';
  import sampleStore from '@app/stores/sampleStore.js';
  import exploreStore from '@app/stores/exploreStore.js';
  import subjects, {
  initialSubjectStore,
  TestSubjectTypes
  } from '@app/stores/earl/subjectStore/index.js';
  import assertions from '@app/stores/earl/assertionStore/index.js';
  import { slugify } from '@app/scripts/slugify.js';
  import { t as t, locale } from 'svelte-i18n';  
  import { downloadFileHTML } from '@app/scripts/files-conformance.js';

  import Button from '@app/components/ui/Button.svelte';
  import Page from '@app/components/ui/Page.svelte';
  import Report from '@app/components/ui/Report.svelte';
  import VPAT from '@app/components/ui/VPAT.svelte';

  const { translate } = getContext('app');

  const updateEvaluation = getContext('updateEvaluation');

  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.REPORT.TITLE'),
    BUTTON_SAVE_HTML: $translate('PAGES.REPORT.BTN_SAVE_HTML'),
    BUTTON_SAVE_VPAT_HTML: $translate('PAGES.REPORT.BTN_SAVE_VPAT_HTML'),
    BUTTON_SAVE_JSON: $translate('PAGES.REPORT.BTN_SAVE_JSON')
  };

  $: htmlFilename = $scopeStore.SITE_NAME ? `${slugify($scopeStore.SITE_NAME)}-report.html` : 'report.html';

  function handleVPATDownloadClick() {
    let reportContents = document.getElementById("view-report");
    
    downloadFileHTML({
      contents: reportContents,
      name: 'vpat-' + htmlFilename,
      type: 'text/html',
      lang: $locale
    });
  }

</script>
