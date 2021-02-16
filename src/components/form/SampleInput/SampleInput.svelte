<!--
 * @component
 *   SampleInput
 * -->
<fieldset id="{id}">
  <legend>
    {label}
    {#if helptext}
    <button type="button" on:click={toggle} class="button button-small showhidebutton">
      {TRANSLATED.SHOW_HIDE_HELPTEXT}
    </button>
    {#if showHelptext}
        <div class="SampleInput__helptext">
        {@html helptext}
        </div>
      {/if}
    {/if}
  </legend>
  <slot />

  {#if value.length > 0}
    <ol title="{label}" bind:this="{valueContainer}">
      {#each value as sample, index (sample.ID)}
        <li>
          <Sample
            id="{id}__{index + 1}"
            bind:data="{sample}"
            on:DELETE="{handleSampleDelete}"
          />
        </li>
      {/each}
    </ol>
  {:else}
    <p><em>{TRANSLATED.NO_SAMPLE}</em></p>
  {/if}

  <AddOther
    label="{TRANSLATED.ADD_PAGE_BUTTON}"
    on:ADD="{handleSampleAdd}"
  ></AddOther>
</fieldset>
<!-- /component -->

<style>
  .SampleInput__helptext {
    font-size: 1rem; /* reset legend size */
    font-weight: normal; /* reset legend weight */
    margin: 1em 0;
    border: solid 1px #069;
    padding: 1em;
    background-color: #d0e1f1;
  }
</style>

<script>
  import { getContext } from 'svelte';

  import subjects, { TestSubjectTypes } from '@app/stores/earl/subjectStore/index.js';

  import AddOther from '@app/components/form/AddOther.svelte';
  import Sample from './Sample.svelte';

  export let id;
  export let label;
  export let helptext;
  export let value = [];

  let valueContainer;
  let showHelptext = false;
  const { translate } = getContext('app');

  $: TRANSLATED = {
    NO_SAMPLE: $translate('PAGES.SAMPLE.NO_PAGES_DEFINED'),
    ADD_PAGE_BUTTON: $translate('PAGES.SAMPLE.BTN_ADD_PAGE'),
    SHOW_INFO_BUTTON: $translate('UI.COMMON.BUTTON.INFO'),
    SHOW_HIDE_HELPTEXT: showHelptext
      ? $translate('UI.COMMON.BUTTON.HIDE', {
          values: { subject: $translate('UI.COMMON.BUTTON.INFO') }
        })
      : $translate('UI.COMMON.BUTTON.SHOW', {
          values: { subject: $translate('UI.COMMON.BUTTON.INFO') }
        })
    };

  function toggle() {
    showHelptext = !showHelptext;
  }

  function handleSampleAdd() {
    const newSample = subjects.create({
      type: TestSubjectTypes.WEBPAGE
    });

    value = [...value, newSample];
  }

  function handleSampleDelete(event) {

    const removeSample = value.find(sample => sample.ID === event.detail);
    const indexSample = value.indexOf(removeSample);

    // value need to be set explicitly
    const newValue = value;
    newValue.splice(indexSample, 1);
    value = newValue;
    // @TODO: removeSample.delete(); !required for cleanup
    subjects.remove(removeSample);
  }
</script>