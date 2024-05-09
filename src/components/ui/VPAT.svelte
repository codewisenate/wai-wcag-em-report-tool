<!--
 * @component
 *   VPAT
 * -->
<div tabindex="-1" bind:this="{sectionAbout}">
  <h3>{TRANSLATED.REPORT_DATE}</h3>
  <ReportHeaderValue field="EVALUATION_DATE" store="summaryStore" />

  <div tabindex="-1" bind:this="{sectionExecutiveSummary}">
    <h3>{TRANSLATED.HEADING_SUMMARY_VPAT}</h3>

    <div>
      <ReportHeaderValue
        multiline="{true}"
        field="EVALUATION_SUMMARY"
        store="summaryStore"
      />
    </div>
  </div>

  <h3>{TRANSLATED.HEADING_ABOUT_VPAT}</h3>

  <dl>
    <dt>
      <ReportHeaderKey field="EVALUATION_CREATOR">
        {TRANSLATED.LABEL_EVALUATOR}
      </ReportHeaderKey>
    </dt>
    <dd>
      <ReportHeaderValue field="EVALUATION_CREATOR" store="summaryStore" />
    </dd>

    <dt>
      <ReportHeaderKey field="EVALUATION_CREATOR_CONTACT">
        {TRANSLATED.LABEL_EVALUATOR_CONTACT}
      </ReportHeaderKey>
    </dt>
    <dd>
      <ReportHeaderValue
        field="EVALUATION_CREATOR_CONTACT"
        store="summaryStore"
      />
    </dd>

    <dt>
      <ReportHeaderKey field="EVALUATION_COMMISSIONER">
        {TRANSLATED.LABEL_COMMISSIONER}
      </ReportHeaderKey>
    </dt>
    <dd>
      <ReportHeaderValue field="EVALUATION_COMMISSIONER" store="summaryStore" />
    </dd>
  </dl>

  <h3>Notes</h3>
  <dl>
    <dt>
      <ReportHeaderKey field="SITE_NAME">
        {labelMap[TRANSLATED.LABEL_WEBSITE_NAME]}
      </ReportHeaderKey>
    </dt>
    <dd>
      <ReportHeaderValue
        field="SITE_NAME"
        store="scopeStore"
      />
    </dd>
    <dt>
      <ReportHeaderKey field="WEBSITE_SCOPE">
        {labelMap[TRANSLATED.LABEL_WEBSITE_SCOPE]}
      </ReportHeaderKey>
    </dt>
    <dd>
      <ReportHeaderValue
        field="WEBSITE_SCOPE"
        store="scopeStore"
        multiline="{true}"
      />
    </dd>
  </dl>

  <h3>Evaluation Methods Used</h3>
  <dl>
    <dt>
      <ReportHeaderKey field="AS_BASELINE">
        {TRANSLATED.LABEL_ACCESSIBILITY_SUPPORT_BASELINE}
      </ReportHeaderKey>
    </dt>
    <dd>
      <ReportHeaderValue
        field="AS_BASELINE"
        store="scopeStore"
        multiline="{true}"
      />
    </dd>

    <dt>
      <ReportHeaderKey field="ADDITIONAL_REQUIREMENTS">
        {TRANSLATED.LABEL_EXTRA_REQUIREMENTS}
      </ReportHeaderKey>
    </dt>
    <dd>
      <ReportHeaderValue
        field="ADDITIONAL_REQUIREMENTS"
        store="scopeStore"
        multiline="{true}"
      />
    </dd>
  </dl>
</div>

<div tabindex="-1" bind:this="{sectionEvaluationScope}">
  <h3>{TRANSLATED.HEADING_SCOPE_VPAT}</h3>
  <div>
    This report covers the degree of conformance for the following accessibility
    standard/guidelines:
  </div>
  <dl>
    <dt>
      <ReportHeaderKey field="WCAG_VERSION">
        {TRANSLATED.LABEL_WCAG_VERSION}
      </ReportHeaderKey>
    </dt>
    <dd>
      <ReportHeaderMultiValue
        field="WCAG_VERSION"
        store="scopeStore"
        options="{wcagVersions}"
      />
    </dd>

    <dt>
      <ReportHeaderKey field="CONFORMANCE_TARGET">
        Level {TRANSLATED.LABEL_CONFORMANCE_TARGET}
      </ReportHeaderKey>
    </dt>
    <dd>
      <ReportHeaderMultiValue
        field="CONFORMANCE_TARGET"
        store="scopeStore"
        options="{conformanceLevels}"
      />
    </dd>
  </dl>
</div>

<h3>Terms</h3>
<div>
  The terms used in the Conformance Level information are defined as follows:
</div>
<div class="card">
  <dl>
    <dt>Supports</dt>
    <dd>
      The functionality of the product has at least one method that meets the
      criterion without known defects or meets with equivalent facilitation.
    </dd>
    <dt>Partially Supports</dt>
    <dd>Some functionality of the product does not meet the criterion.</dd>
    <dt>Does Not Support</dt>
    <dd>The majority of product functionality does not meet the criterion.</dd>
    <dt>Not Applicable</dt>
    <dd>The criterion is not relevant to the product.</dd>
    <dt>Not Evaluated</dt>
    <dd>
      The product has not been evaluated against the criterion. This can be used
      only in WCAG 2.0 Level AAA.
    </dd>
  </dl>
</div>

<h2>{TRANSLATED.HEADING_AUDIT_RESULTS_DETAIL}</h2>

<ReportVPATResults criteria="{$wcag}" />

<h2 class="strip">Disclaimer</h2>
<p>
  This report covers the degree of conformance for Web Content Accessibility
  Guidelines
  <ReportHeaderMultiValue
    editing="{editEvaluationScope}"
    field="WCAG_VERSION"
    store="scopeStore"
    options="{wcagVersions}"
  />. Therefore other details and standards have not been included.
</p>

<div>
  “Voluntary Product Accessibility Template” and “VPAT” are registered service
  marks of the Information Technology Industry Council (ITI)
</div>

<!-- /component -->

<style>
  h3 {
    margin-bottom: 0.5rem;
  }
  dt {
    margin-top: 0;
    font-weight: normal;
  }
  dt:after {
    content: ':';
  }
  dd {
    margin-left: 0;
    margin-bottom: 1em;
  }
  @media (min-width: 40em) {
    dl {
      display: grid;
      grid-template-columns: minmax(auto, 1fr) 3fr;
      gap: 0.5em 1em;
    }
    dd {
      margin-bottom: 0;
    }
  }

  .card dt {
    font-weight: bold;
  }
  .no-result {
    font-weight: normal;
    font-style: italic;
    margin-bottom: 1em;
    display: block;
  }
</style>

<script>
  import { getContext } from 'svelte';
  import marked from 'marked';

  import {
    wcag,
    CONFORMANCE_LEVELS,
    WCAG_VERSIONS
  } from '@app/stores/wcagStore.js';

  import ReportVPATResults from '@app/components/ui/Report/ReportVPATResults.svelte';
  import ReportHeaderKey from '@app/components/ui/Report/ReportHeaderKey.svelte';
  import ReportHeaderValue from '@app/components/ui/Report/ReportHeaderValue.svelte';
  import ReportHeaderMultiValue from '@app/components/ui/Report/ReportHeaderMultiValue.svelte';
  import ReportSummary from './Report/ReportSummary.svelte';
  import evaluationStore from '@app/stores/evaluationStore.js';

  const { sampleStore, summaryStore, exploreStore, translate } = getContext(
    'app'
  );

  let editAbout = false;
  let editExecutiveSummary = false;
  let editEvaluationScope = false;
  let sectionAbout, sectionEvaluationScope, sectionExecutiveSummary;

  $: TRANSLATED = {
    LABEL_EVALUATOR: $translate('UI.REPORT.BY'),
    LABEL_EVALUATOR_CONTACT: $translate('UI.REPORT.BY_CONTACT'),
    LABEL_COMMISSIONER: $translate('UI.REPORT.COMMISION_BY'),
    LABEL_NOT_PROVIDED: $translate('UI.REPORT.LABEL_NOT_PROVIDED'),
    LABEL_DATE: $translate('PAGES.SUMMARY.LABEL_DATE'),
    REPORT_DATE: $translate('PAGES.SUMMARY.REPORT_DATE'),
    BUTTON_SAVE: $translate('UI.REPORT.SAVE'),
    BUTTON_EDIT: $translate('UI.REPORT.EDIT'),
    HEADING_ABOUT: $translate('UI.REPORT.HD_ABOUT'),
    HEADING_ABOUT_VPAT: $translate('UI.REPORT.HD_ABOUT_VPAT'),
    HEADING_SUMMARY: $translate('UI.REPORT.HD_SUMMARY'),
    HEADING_SUMMARY_VPAT: $translate('UI.REPORT.HD_SUMMARY_VPAT'),
    HEADING_SCOPE: $translate('UI.REPORT.HD_SCOPE'),
    HEADING_SCOPE_VPAT: $translate('UI.REPORT.HD_SCOPE_VPAT'),
    LABEL_WEBSITE_NAME: $translate('PAGES.SCOPE.LABEL_SITE_NAME'),
    LABEL_WEBSITE_SCOPE: $translate('PAGES.SCOPE.LABEL_SITE_SCOPE'),
    LABEL_WCAG_VERSION: $translate('PAGES.SCOPE.LABEL_WCAG_VERSION'),
    LABEL_CONFORMANCE_TARGET: $translate('PAGES.SCOPE.LABEL_CONFORMANCE_TGT'),
    LABEL_EXTRA_REQUIREMENTS: $translate(
      'PAGES.SCOPE.LABEL_EXTRA_REQUIREMENTS'
    ),
    LABEL_ACCESSIBILITY_SUPPORT_BASELINE: $translate(
      'PAGES.SCOPE.LABEL_SUPPORT_BASE'
    ),
    HEADING_AUDIT_RESULTS_OVERVIEW: $translate('UI.REPORT.HD_SCORE'),
    HEADING_AUDIT_RESULTS_DETAIL: $translate('UI.REPORT.HD_CRITERIA_REPORT'),
    HEADING_SAMPLE: $translate('UI.REPORT.HD_SAMPLE'),
    HEADING_SPECIFICS: $translate('UI.REPORT.HD_SPECIFICS'),
    HEADING_RESOURCES: $translate('UI.REPORT.HD_DOCS'),
    CONFORMANCE_LEVEL: $translate('WCAG.COMMON.CONFORMANCE_LEVEL'),
    TEXT_NO_SAMPLE: $translate('PAGES.AUDIT.NO_SAMPLE'),
    SUMMARY: $translate('UI.REPORT.SUMMARY'),
    ALL_RESULTS: $translate('UI.REPORT.ALL_RESULTS'),
    LABEL_TECH: $translate('PAGES.EXPLORE.LABEL_TECH')
  };

  $: report = {
    commissioner: $summaryStore['EVALUATION_COMMISSIONER'],
    creator: $summaryStore['EVALUATION_CREATOR'],
    creatorContact: $summaryStore['EVALUATION_CREATOR_CONTACT'],
    date: $summaryStore['EVALUATION_DATE'],
    samples: [
      ...$sampleStore['STRUCTURED_SAMPLE'],
      ...$sampleStore['RANDOM_SAMPLE']
    ],
    specifics: $summaryStore['EVALUATION_SPECIFICS'],
    summary: $summaryStore['EVALUATION_SUMMARY'],
    title:
      $summaryStore['EVALUATION_TITLE'] || $translate('PAGES.REPORT.TITLE'),
    tech: $exploreStore['TECHNOLOGIES_RELIED_UPON']
  };

  const labelMap = {
    "Website name": "Product name",
    "Scope of the website": "Scope of the product evaluation",
  };

  let wcagVersions = [...WCAG_VERSIONS].reverse().map((version) => {
    return {
      title: `WCAG ${version}`,
      value: version
    };
  });

  $: conformanceLevels = CONFORMANCE_LEVELS.map((level) => {
    return {
      title: `${TRANSLATED.CONFORMANCE_LEVEL} ${level}`,
      value: level
    };
  });

  function toggleEditAbout() {
    editAbout = !editAbout;
    sectionAbout.focus();
  }

  function toggleEditExecutiveSummary() {
    editExecutiveSummary = !editExecutiveSummary;
    sectionExecutiveSummary.focus();
  }

  function toggleEditEvaluationScope() {
    editEvaluationScope = !editEvaluationScope;
    sectionEvaluationScope.focus();
  }
</script>
