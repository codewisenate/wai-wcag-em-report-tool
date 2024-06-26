<svelte:head>
  <title>{title} | WCAG-EM Report Tool</title>
</svelte:head>

<div class="page-content" id="{pageid}">
{#if needsPanelSpace}
  <div class="default-grid">
    <main class="main-with-panel">
      <h1>{title}</h1>
      {#if currentLocale.status === "draft"}
          <section id="translation-info" class="doc-note-translation" lang="en">
            <h2 class="visuallyhidden">About this translation</h2>
            <p>This volunteer translation is a <strong>draft</strong>. It contains English wording that will be translated soon.</p>
            <p>See <a href="{`${$basepath}/acknowledgements`}">Acknowledgements</a> for all translators and contributors.</p>
          </section>
      {/if}
      <slot />
    </main>
    {#if !isViewReport && !isViewVPAT && !isAcknowledgements}
      <YourReport />
    {/if}
  </div>
{:else}
  <div class="default-grid">
    <main class="main-without-panel">
      {#if !isViewReport && !isViewVPAT && !isOverview && !isAcknowledgements}
      <YourReport />
      {/if}
      <h1>{title}</h1>
      {#if currentLocale.status === "draft"}
          <section id="translation-info" class="doc-note-translation" lang="en">
            <h2 class="visuallyhidden">About this translation</h2>
            <p>This volunteer translation is a <strong>draft</strong>. It contains English wording that will be translated soon.</p>
            <p>See <a href="{`${$basepath}/acknowledgements`}">Acknowledgements</a> for all translators and contributors.</p>
          </section>
      {/if}
      <slot />
    </main>
  </div>
{/if}
</div>

<style>

  .page-content {
    padding: 2em 0;
  }
  .main-with-panel {
    grid-column: 2 / 8;
  }
  .main-without-panel {
    grid-column: 2 / 10;
  }
  :global(main > *:not(:last-child)) {
    margin-bottom: 1em;
  }

  :global(#wai-wcag-em-report-tool) {
    display: flex;
    flex-direction: column;
    min-height: calc(100dvh - 150px);
  }

  :global(.pager-container) {
    margin-top: auto;
  }

  :global(.mb-0.mb-0) {
    margin-bottom: 0;
  }

  :global(input:not([type="checkbox"]):not([type="radio"])), 
  :global(textarea) {
    padding: .66rem;
  }
  h1,
  .button {
    margin-block: 1rem 0;
  }
</style>

<script>
  import { onMount } from "svelte";
  import { useLocation } from 'svelte-navigator';
  import { honourFragmentIdLinks } from '@app/scripts/honourFragmentIdLinks.js';
  import { locale } from 'svelte-i18n';

  import locales from '@app/locales/index.json';
  $: currentLocale = locales.find((l) => l.lang === $locale);

  import { routes, basepath, yourReportPanelOpen } from '@app/stores/appStore.js';

  import YourReport from '@app/components/ui/YourReport.svelte';

  const location = useLocation();

  export let pageid;

  $: isViewReport = $location.pathname === $routes.VIEW_REPORT.path;
  $: isViewVPAT = $location.pathname === $routes.VIEW_VPAT.path;
  $: isOverview = $location.pathname === $routes.OVERVIEW.path;
  $: isAcknowledgements = $location.pathname === $routes.ACKNOWLEDGEMENTS.path;
  $: needsPanelSpace = !isViewReport && !isViewVPAT && !isOverview && !isAcknowledgements && $yourReportPanelOpen;

  onMount(() => {
    setTimeout(honourFragmentIdLinks($location), 100);
  });

  export let title;
</script>
