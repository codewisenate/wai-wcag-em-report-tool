export function downloadFileHTML({ contents, name = 'download.txt', type = 'text/plain', lang = 'en' }) {
  const _a = document.createElement('a');

  const htmlDocument = document.implementation.createHTMLDocument(name);
  htmlDocument.body.innerHTML = contents.innerHTML;
  let file;

  // set charset
  meta = document.createElement("meta");
  meta.setAttribute("charset", "utf-8");
  htmlDocument.head.appendChild(meta);

  // set lang 
  htmlDocument.documentElement.setAttribute('lang', lang);

  // remove certain elements
  Array.from(
    htmlDocument.querySelectorAll("button, input, aside, footer, .Controls, #site-header, .Nav, .strip")
  ).forEach((el) => {
    el.parentNode.removeChild(el);
  });

  // remove certain attributes
  Array.from(
    htmlDocument.querySelectorAll("[tabindex], [class]")
  ).forEach((el) => {
    el.removeAttribute("tabindex");
    // el.removeAttribute("class");
    const classes = el.getAttribute("class");
    if (classes) {
      const classList = classes.split(" ");
      const newClassList = classList.map(className => {
        if (className.startsWith("svelte-")) {
          return "svelte";
        }
        return className;
      });
      el.setAttribute("class", newClassList.join(" "));
    };
  });

  // add CSS 
  const styleEl = document.createElement("style");
  const styleElContents = document.createTextNode(`
  :root {
    --w3c-classic: #005a9c;
    --w3c-blue: #036;
    --wai-green: #005a6a;
    --off-black: #1d1d1d;
    --dk-grey: #3b3b3b;
    --faded-red: #c0272d;
    --red-subtle: #f1d0e1;
    --light-blue: #196cac;
    --dk-blue: #091832;
    --gold: #eed009;
    --gold-light: rgba(238, 208, 9, .35);
    --ocean: #00818d;
    --cloudy: #bccbd3;
    --cloudy-subtle: #d0e1f1;
    --grey: #686868;
    --line-grey: #ddd;
    --trans-line-grey: hsla(0, 0%, 87%, .32);
    --off-white: #f2f2f2;
    --body-bg: #fafafc;
    --lt-off-white: #fafafa;
    --pure-white: #fff;
    --white-transparent: hsla(0, 0%, 100%, .92);
    --visited-link: #606;
    --footer-grey: #efefef;
  }
 
  .no-display,
  .visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }
 
  .no-display.focusable:active,
  .no-display.focusable:focus,
  .visuallyhidden.focusable:active,
  .visuallyhidden.focusable:focus {
    clip: auto;
    -webkit-clip-path: none;
    clip-path: none;
    height: auto;
    margin: 0;
    overflow: visible;
    position: static;
    width: auto;
    white-space: inherit;
  }
 
  html {
    background-color: #f2f2f2;
    background-color: var(--off-white);
  }
 
  @media print {
    html {
      font-size: 12pt;
      background-color: #fff
    };
  }
 
  body {
    font-family: Noto Sans, Trebuchet MS, Helvetica Neue, Arial, sans-serif;
    line-height: 1.5;
    font-size: 16px;
    font-size: 1rem;
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
    background-color: #fafafc;
    background-color: var(--body-bg);
    color: #1d1d1d;
    color: var(--off-black);
    padding: 0;
    padding: constant(safe-area-inset-top) constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left);
    margin: 0 auto;
    max-width: 1250px;
  }
 
  @supports (display:grid) {
    body {
      max-width: none;
      margin: 0
    };
  }
 
  @media print {
    body {
      color: #000;
      background-color: #fff;
      -webkit-text-decoration-skip-ink: none;
      text-decoration-skip-ink: none
    };
  }
 
  :lang(ar) {
    font-family: Noto Naskh Arabic, Noto Sans, Trebuchet MS, Helvetica Neue, Arial, sans-serif;
  }
 
  .langlist :lang(ar),
  .languagelist :lang(ar) {
    font-family: Noto Naskh Arabic Minimal, Noto Sans, Trebuchet MS, Helvetica Neue, Arial, sans-serif;
  }
 
  code {
    font-size: 1em;
    font-family: Noto Sans Mono, monospace;
  }
 
  a {
    color: #036;
    color: var(--w3c-blue);
  }
 
  a:focus,
  a:hover {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  a:visited {
    color: #606;
    color: var(--visited-link);
  }
 
  a.stealthy-link {
    text-decoration: none;
    color: inherit;
  }
 
  a.stealthy-link:focus,
  a.stealthy-link:hover,
  a.stealthy-link:visited {
    color: inherit;
  }
 
  @media print {
    a {
      color: #000
    }
 
    a[href^="#"]:after {
      content: "(⇘ " attr(href) ")"
    }
 
    a[href^=http]:after {
      content: " (" attr(href) ")"
    }
 
    a[href^="/WAI/"]:after {
      content: " (https://www.w3.org" attr(href) ")"
    };
  }
 
  [tabindex]:not([tabindex="-1"]):focus,
  a:focus,
  button:focus,
  input:focus,
  select:focus:focus,
  textarea:focus {
    outline-color: currentColor;
    outline-offset: 2px;
    outline: 2px solid;
  }
 
  .able-media-container,
  .media-wrapper {
    position: relative;
    padding-top: 56.25%;
  }
 
  .able-media-container .img,
  .able-media-container iframe,
  .able-media-container video,
  .media-wrapper .img,
  .media-wrapper iframe,
  .media-wrapper video {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
 
  .contentarea {
    position: relative;
  }
 
  [dir=ltr] img.symbol {
    float: right;
  }
 
  [dir=rtl] img.symbol {
    float: left;
  }
 
  [dir=ltr] img.symbol {
    margin-left: 1em;
  }
 
  [dir=rtl] img.symbol {
    margin-right: 1em;
  }
 
  img.symbol {
    margin-bottom: 1em;
  }
 
  figure {
    margin: 0 0 1em;
  }
 
  figcaption {
    font-weight: 700;
    border-bottom: 1px solid #ddd;
    border-bottom: 1px solid var(--line-grey);
    margin-bottom: .5em;
  }
 
  .button,
  button {
    border-radius: 5px;
    display: inline-block;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 8px 12px;
    border: 2px solid #005a6a;
    border: 2px solid var(--wai-green);
    font-size: 13px;
    font-size: .8125rem;
    line-height: 1.4;
    background-color: #005a6a;
    background-color: var(--wai-green);
    text-decoration: none;
    font-weight: 700;
  }
 
  .button,
  .button:visited,
  button,
  button:visited {
    color: #fff;
    color: var(--pure-white);
  }
 
  .button.button-nobg,
  button.button-nobg {
    background: transparent;
  }
 
  .button.button-nobg:focus,
  .button.button-nobg:hover,
  button.button-nobg:focus,
  button.button-nobg:hover {
    background-color: transparent;
    border-color: #fff;
    border-color: var(--pure-white);
  }
 
  .button.button-noborder,
  button.button-noborder {
    border-color: transparent;
  }
 
  .button.button-noborder:focus,
  .button.button-noborder:hover,
  button.button-noborder:focus,
  button.button-noborder:hover {
    border-color: #fff;
    border-color: var(--pure-white);
  }
 
  .button.button-small,
  button.button-small {
    padding: 2px 4px;
  }
 
  .button.button-inline,
  button.button-inline {
    padding: 0;
  }
 
  .button:focus,
  .button:hover,
  .stealthy-link:focus span.button,
  .stealthy-link:hover span.button,
  button:focus,
  button:hover {
    background-color: #036;
    background-color: var(--w3c-blue);
    color: #fff;
    color: var(--pure-white);
  }
 
  .button:focus,
  .button:hover,
  button:focus,
  button:hover {
    border-color: #036;
    border-color: var(--w3c-blue);
  }
 
  .button:focus,
  button:focus {
    outline-color: #036;
    outline-color: var(--w3c-blue);
  }
 
  .button:disabled,
  button:disabled {
    opacity: .75;
    text-decoration: line-through;
  }
 
  .button-secondary {
    background-color: #fff;
    background-color: var(--pure-white);
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .button-secondary:visited {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .button-secondary:visited:focus,
  .button-secondary:visited:hover {
    color: #fff;
    color: var(--pure-white);
  }
 
  .button-backtotop {
    position: fixed;
    cursor: pointer;
    bottom: 16px;
    right: 16px;
    left: auto;
  }
 
  [dir=rtl] .button-backtotop {
    right: auto;
    left: 16px;
  }
 
  .button-backtotop {
    opacity: .85;
    border-radius: 100px;
    background-color: #036;
    background-color: var(--w3c-blue);
    border-color: #036;
    border-color: var(--w3c-blue);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
    opacity: 0;
    transition: opacity .5s linear;
  }
 
  .button-backtotop.active,
  .button-backtotop:focus {
    opacity: 1;
  }
 
  .button-backtotop svg {
    vertical-align: -1px;
  }
 
  [dir=ltr] .button-backtotop.inline {
    float: right;
  }
 
  [dir=rtl] .button-backtotop.inline {
    float: left;
  }
 
  .button-backtotop.inline {
    position: static;
  }
 
  @media print {
    .button-backtotop {
      display: none
    };
  }
 
  [dir=ltr] .button-menu {
    margin-left: auto;
  }
 
  [dir=rtl] .button-menu {
    margin-right: auto;
  }
 
  .button-menu {
    text-transform: uppercase;
    background-color: #fff;
    background-color: var(--pure-white);
    color: #036;
    color: var(--w3c-blue);
    border-color: #eed009;
    border-color: var(--gold);
  }
 
  .button-menu:focus,
  .button-menu:hover {
    border-color: #fff;
    border-color: var(--pure-white);
    background-color: #eed009;
    background-color: var(--gold);
    color: #1d1d1d;
    color: var(--off-black);
  }
 
  .button-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 0 -8px;
  }
 
  .button-group .button,
  .button-group button {
    min-width: 7em;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
    margin: 8px;
  }
 
  mark {
    background-color: rgba(238, 208, 9, .35);
    background-color: var(--gold-light);
  }
 
  p {
    margin: 1em 0;
  }
 
  .showhidebutton {
    display: inline;
    background: transparent;
    color: inherit;
    border-color: transparent;
    font-weight: 400;
  }
 
  [dir=ltr] .showhidebutton:after {
    margin-left: .5em;
  }
 
  [dir=rtl] .showhidebutton:after {
    margin-right: .5em;
  }
 
  .showhidebutton:after {
    display: inline-block;
    background-color: #036;
    background-color: var(--w3c-blue);
    color: #fff;
    color: var(--pure-white);
    content: "–";
    font-weight: 700;
    padding: .3em;
    border-radius: 3px;
    width: 1em;
    height: 1em;
    line-height: 1em;
  }
 
  .showhidebutton:focus:after,
  .showhidebutton:hover:after {
    color: #036;
    color: var(--w3c-blue);
    background-color: #fff !important;
    background-color: var(--pure-white) !important;
  }
 
  .showhidebutton[aria-expanded=false]:after {
    content: "+";
  }
 
  blockquote {
    font-style: italic;
    margin-bottom: 1em;
  }
 
  blockquote cite {
    display: block;
    font-style: normal;
    padding-left: 32px;
    padding-left: 2rem;
  }
 
  [dir=ltr] blockquote cite:before {
    margin-left: -32px;
    margin-left: -2rem;
  }
 
  [dir=rtl] blockquote cite:before {
    margin-right: -32px;
    margin-right: -2rem;
  }
 
  blockquote cite:before {
    content: "— ";
    font-weight: 700;
    width: 32px;
    width: 2rem;
    display: inline-block;
  }
 
  [dir=ltr] blockquote p:first-of-type:before {
    margin-left: -.75ch;
  }
 
  [dir=rtl] blockquote p:first-of-type:before {
    margin-right: -.75ch;
  }
 
  blockquote p:first-of-type:before {
    content: "“";
  }
 
  blockquote p:last-of-type {
    margin-bottom: 0;
  }
 
  blockquote p:last-of-type:after {
    content: "”";
  }
 
  blockquote.special {
    text-align: center;
  }
 
  [dir=ltr] blockquote.pull {
    margin-left: 64px;
    margin-left: 4rem;
  }
 
  [dir=rtl] blockquote.pull {
    margin-right: 64px;
    margin-right: 4rem;
  }
 
  [dir=ltr] blockquote.pull {
    border-left: 2px solid var(--line-grey);
  }
 
  [dir=rtl] blockquote.pull {
    border-right: 2px solid var(--line-grey);
  }
 
  [dir=ltr] blockquote.pull {
    border-left: 2px solid #ddd;
  }
 
  [dir=rtl] blockquote.pull {
    border-right: 2px solid #ddd;
  }
 
  blockquote.pull {
    position: relative;
    font-size: 20px;
    font-size: 1.25rem;
    padding-left: 1ch;
    border: 1px solid transparent;
    color: #036;
    color: var(--w3c-blue);
    font-weight: 700;
  }
 
  blockquote.pull.left,
  blockquote.pull.right {
    max-width: 256px;
    max-width: 16rem;
  }
 
  [dir=ltr] blockquote.pull.right {
    float: right;
  }
 
  [dir=ltr] blockquote.pull.left,
  [dir=rtl] blockquote.pull.right {
    float: left;
  }
 
  [dir=rtl] blockquote.pull.left {
    float: right;
  }
 
  [dir=ltr] blockquote.pull.left {
    margin-right: 32px;
    margin-right: 2rem;
  }
 
  [dir=rtl] blockquote.pull.left {
    margin-left: 32px;
    margin-left: 2rem;
  }
 
  [dir=ltr] blockquote.pull p:first-of-type:before {
    margin-left: -1.25ch;
  }
 
  [dir=rtl] blockquote.pull p:first-of-type:before {
    margin-right: -1.25ch;
  }
 
  blockquote.pull p:first-of-type:before {
    font-size: 80px;
    font-size: 5rem;
    position: absolute;
    left: 0;
    top: -.25ch;
  }
 
  blockquote.pull cite {
    margin-top: 8px;
    margin-top: .5rem;
    font-size: 16px;
    font-size: 1rem;
    font-weight: 400;
    color: #1d1d1d;
    color: var(--off-black);
  }
 
  blockquote.pull.alt-1 {
    color: #005a9c;
    color: var(--w3c-classic);
  }
 
  blockquote.pull.alt-2 {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  blockquote.pull.alt-3 {
    color: #1d1d1d;
    color: var(--off-black);
  }
 
  .box {
    border: 1px solid #ddd;
    border: solid 1px var(--line-grey);
    margin-top: 16px;
    background-color: #fff;
    background-color: var(--pure-white);
  }
 
  .box+.box#toc {
    margin-top: 0;
    border-top: 0;
  }
 
  .box.box-space-above {
    margin-top: 90px;
  }
 
  .box-h {
    padding: 8px 16px;
    color: #005a6a;
    color: var(--wai-green);
  }
 
  @media print {
    .box-h {
      color: #000
    };
  }
 
  .box-h {
    font-weight: 700;
    background-color: #f2f2f2;
    background-color: var(--off-white);
  }
 
  .box-h h1,
  .box-h h2,
  .box-h h3,
  .box-h h4,
  .box-h h5,
  .box-h h6 {
    border: none;
    font-size: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
    font-weight: inherit;
    display: inline-block;
  }
 
  @supports (all:unset) {
 
    .box-h h1,
    .box-h h2,
    .box-h h3,
    .box-h h4,
    .box-h h5,
    .box-h h6 {
      all: unset
    };
  }
 
  .box-h-large {
    font-size: 20px;
    font-size: 1.25rem;
    color: #036;
    color: var(--w3c-blue);
    padding-bottom: 7px;
    font-weight: 400;
    border-bottom: 1px solid #ddd;
    border-bottom: solid 1px var(--line-grey);
  }
 
  [dir=ltr] .box-h-icon svg {
    margin-right: 4px;
  }
 
  [dir=rtl] .box-h-icon svg {
    margin-left: 4px;
  }
 
  .box-i:after,
  .box-i:before {
    content: " ";
    display: table;
  }
 
  .box-i:after {
    clear: both;
  }
 
  .box-i {
    padding: 8px 16px;
    font-size: 14/16 * 16px;
    font-size: 14/16 * 1rem;
  }
 
  .box-i>:first-child {
    margin-top: 0;
  }
 
  .box-i>:last-child {
    margin-bottom: 0;
  }
 
  .box.box-list .box-i ol,
  .box.box-list .box-i ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
 
  .box.box-linklist .box-i {
    padding: 0;
  }
 
  .box.box-simple .box-i {
    padding: 2px 8px 8px;
  }
 
  .box.box-simple .box-h-simple {
    padding: 8px 8px 2px;
    background-color: transparent;
    line-height: 1.57;
  }
 
  .box.box-simple.box-aside .box-i,
  .box.box-simple .box-h-simple {
    font-size: 14px;
    font-size: .875rem;
  }
 
  .box.box-highlighted {
    background-color: #d0e1f1;
    background-color: var(--cloudy-subtle);
  }
 
  .box.box-highlighted .box-h-highlighted {
    color: #091832;
    color: var(--dk-blue);
    border-bottom: 1px solid #ddd;
    border-bottom: solid 1px var(--line-grey);
    background-color: #fff;
    background-color: var(--pure-white);
  }
 
  @media (min-width:35em) {
 
    .box.box-left,
    .box.box-right {
      width: 33%;
      margin-top: -9px
    }
 
    .box.box-left.box-simple,
    .box.box-right.box-simple {
      margin-top: -3px
    }
 
    [dir=ltr] .box.box-left {
      clear: left
    }
 
    [dir=rtl] .box.box-left {
      clear: right
    }
 
    [dir=ltr] .box.box-left {
      float: left
    }
 
    [dir=rtl] .box.box-left {
      float: right
    }
 
    [dir=ltr] .box.box-left {
      margin-right: 1em
    }
 
    [dir=rtl] .box.box-left {
      margin-left: 1em
    }
 
    [dir=ltr] .box.box-right {
      clear: right
    }
 
    [dir=rtl] .box.box-right {
      clear: left
    }
 
    [dir=ltr] .box.box-right {
      float: right
    }
 
    [dir=rtl] .box.box-right {
      float: left
    }
 
    [dir=ltr] .box.box-right {
      margin-left: 1em
    }
 
    [dir=rtl] .box.box-right {
      margin-right: 1em
    };
  }
 
  @media print {
    #helpimprove {
      display: none
    };
  }
 
  .breadcrumb {
    font-size: 13px;
    font-size: .8125rem;
    background-color: #fff;
    background-color: var(--pure-white);
    border-bottom: 1px solid #ddd;
    border-bottom: 1px solid var(--line-grey);
    padding-top: 16px;
    padding-bottom: 16px;
    margin-bottom: 32px;
  }
 
  .breadcrumb ul {
    margin: 0;
    padding: 0;
    grid-column: 2/10;
  }
 
  .breadcrumb ul li {
    display: inline-block;
    margin: 0;
    padding: 0;
  }
 
  .breadcrumb ul li:after {
    content: " / ";
    color: #005a6a;
    color: var(--wai-green);
    white-space: pre-wrap;
  }
 
  .breadcrumb ul li:last-child:after {
    content: "";
    display: none;
  }
 
  .breadcrumb a {
    color: #036;
    color: var(--w3c-blue);
  }
 
  @media print {
    .breadcrumb a:after {
      content: ""
    };
  }
 
  .breadcrumb [aria-current=page] {
    font-weight: 700;
    text-decoration: none;
  }
 
  .content {
    display: grid;
    grid-area: content;
    grid-template-columns: repeat(6, minmax(0, 120px));
    grid-column-gap: 32px;
  }
 
  .content>* {
    grid-column: 1/5;
    grid-auto-flow: dense;
  }
 
  .content {
 
    &>.ref-side,
    >& .aside,
    >& .demo-side {
      grid-column: 5/7;
      font-size: 14px;
      font-size: .875rem;
      line-height: 1.2
    }
 
    &>.ref-side p:first-of-type,
    >& .aside p:first-of-type,
    >& .demo-side p:first-of-type {
      margin-top: 0
    };
  }
 
  .content.wide {
    grid-template-columns: repeat(8, minmax(0, 120px));
    grid-column-start: navigation;
    grid-column-end: content;
  }
 
  .content.wide>* {
    grid-column: 3/9;
  }
 
  .content.wide .sn-contents {
    grid-column: 1/3;
    grid-row: 1/99;
  }
 
  [dir=ltr] .example-bar {
    padding-left: 32px;
  }
 
  [dir=ltr] .example-bar,
  [dir=rtl] .example-bar {
    padding-right: 32px;
  }
 
  [dir=rtl] .example-bar {
    padding-left: 32px;
  }
 
  .example-bar {
    display: -ms-flexbox;
    display: flex;
  }
 
  @supports (display:grid) {
    .example-bar {
      display: grid;
      grid-column-gap: 32px;
      padding: 0;
      max-width: none
    };
  }
 
  .example-bar {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
 
  .example-bar>* {
    grid-column: 2/7;
  }
 
  [dir=ltr] .example-bar .eg {
    border-right: 2px solid var(--wai-green);
  }
 
  [dir=rtl] .example-bar .eg {
    border-left: 2px solid var(--wai-green);
  }
 
  [dir=ltr] .example-bar .eg {
    border-right: 2px solid #005a6a;
  }
 
  [dir=rtl] .example-bar .eg {
    border-left: 2px solid #005a6a;
  }
 
  .example-bar .eg {
    grid-column: 1/2;
    grid-row: 1/99;
    text-align: right;
    padding: 0 8px;
    font-weight: 700;
    font-style: italic;
    color: #005a6a;
    color: var(--wai-green);
  }
 
  [dir=ltr] .example-sheet {
    padding-right: 32px;
  }
 
  [dir=rtl] .example-sheet {
    padding-left: 32px;
  }
 
  .example-sheet {
    display: -ms-flexbox;
    display: flex;
    padding-inlne-start: 32px;
  }
 
  @supports (display:grid) {
    .example-sheet {
      display: grid;
      grid-column-gap: 32px;
      padding: 0;
      max-width: none
    };
  }
 
  .example-sheet {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
 
  .example-sheet .example-sheet-inner {
    grid-column: 2/6;
    background-color: #fff;
    background-color: var(--pure-white);
    padding: 16px 32px;
  }
 
  .decision-tree {
    list-style: none;
    margin: 1em 0;
    padding: 0;
  }
 
  .decision-tree>li {
    border: 2px solid #bccbd3;
    border: 2px solid var(--cloudy);
    border-top: none;
    margin-bottom: 0;
  }
 
  .decision-tree>li>strong {
    display: block;
    padding: 1em .5em;
  }
 
  .decision-tree>li:first-child {
    border-top: 2px solid #bccbd3;
    border-top: 2px solid var(--cloudy);
  }
 
  .decision-tree>li>ul {
    padding: 0;
    list-style: none;
    border-top: 1px dotted #bccbd3;
    border-top: 1px dotted var(--cloudy);
  }
 
  @supports (display:flex) {
    .decision-tree>li>ul {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: row-reverse;
      flex-direction: row-reverse;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -ms-flex-align: stretch;
      align-items: stretch
    };
  }
 
  .decision-tree>li>ul>li {
    text-indent: 0;
    box-sizing: border-box;
    font-weight: 400;
    margin-bottom: 0;
  }
 
  @supports (display:flex) {
    .decision-tree>li>ul>li {
      -ms-flex-preferred-size: 25%;
      flex-basis: 25%
    };
  }
 
  .decision-tree>li>ul>li {
    padding: .5em;
  }
 
  @supports (display:flex) {
    .decision-tree>li>ul>li:nth-child(odd) {
      -ms-flex-preferred-size: 75%;
      flex-basis: 75%
    };
  }
 
  .decision-tree>li>ul>li:nth-child(odd):last-child {
    display: block;
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
  }
 
  .decision-tree>li>ul>li ul {
    padding: 0;
    margin: 0;
  }
 
  .decision-tree>li>ul>li li {
    padding: 0;
    padding-bottom: .5em;
    margin-bottom: .5em;
    border-bottom: 1px solid #3b3b3b;
    border-bottom: 1px solid var(--dk-grey);
    list-style: none;
  }
 
  .decision-tree>li>ul>li li>em {
    display: block;
    padding-left: 1.5em;
    position: relative;
    margin-top: .25em;
    font-style: normal;
  }
 
  [dir=ltr] .decision-tree>li>ul>li li>em:before {
    margin-left: -1.5em;
  }
 
  [dir=rtl] .decision-tree>li>ul>li li>em:before {
    margin-right: -1.5em;
  }
 
  .decision-tree>li>ul>li li>em:before {
    position: absolute;
    content: "";
    top: .2em;
  }
 
  .decision-tree>li>ul>li li:last-child {
    border-bottom-style: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
 
  .decision-tree .yes {
    background-color: #d0e1f1;
    background-color: var(--cloudy-subtle);
    border-bottom: none;
  }
 
  [dir=ltr] .decision-tree .yes li {
    margin-left: 1em;
  }
 
  [dir=rtl] .decision-tree .yes li {
    margin-right: 1em;
  }
 
  .decision-tree .yes li {
    list-style: disc;
  }
 
  .decision-tree .yes li:only-child {
    list-style: none;
  }
 
  [dir=ltr] .decision-tree .no {
    border-right: 1px dotted var(--cloudy);
  }
 
  [dir=rtl] .decision-tree .no {
    border-left: 1px dotted var(--cloudy);
  }
 
  [dir=ltr] .decision-tree .no {
    border-right: 1px dotted #bccbd3;
  }
 
  [dir=rtl] .decision-tree .no {
    border-left: 1px dotted #bccbd3;
  }
 
  .decision-tree .no {
    background-color: #f1d0e1;
    background-color: var(--red-subtle);
    border-bottom: none;
    position: relative;
  }
 
  [dir=ltr] .decision-tree .no:after {
    margin-left: -8px;
    margin-left: -.5rem;
  }
 
  [dir=rtl] .decision-tree .no:after {
    margin-right: -8px;
    margin-right: -.5rem;
  }
 
  .decision-tree .no:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: hsla(0, 0%, 47%, 0);
    border-top-color: #f1d0e1;
    border-top-color: var(--red-subtle);
    border-width: 16px;
    border-width: 1rem;
    z-index: 500;
  }
 
  [dir=ltr] .doc-note h1:before {
    margin-right: 8px;
  }
 
  [dir=rtl] .doc-note h1:before {
    margin-left: 8px;
  }
 
  .doc-note h1:before {
    background-color: #eed009;
    background-color: var(--gold);
    color: #091832;
    color: var(--dk-blue);
    display: inline-block;
    padding: 4px 8px;
    margin-top: -8px;
    font-size: 14px;
    font-size: .875rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    vertical-align: middle;
    border-radius: 3px;
  }
 
  .doc-note-box {
    border: 2px solid #eed009;
    border: 2px solid var(--gold);
    padding: 8px;
    background-color: #fff;
    background-color: var(--pure-white);
    margin-bottom: 20px;
  }
 
  .doc-note-box p:first-child {
    margin-top: 0;
  }
 
  .doc-note-box p:last-child {
    margin-bottom: 0;
  }
 
  .doc-draft h1:before {
    content: "Draft";
  }
 
  .doc-archived h1:before {
    content: "Archived";
  }
 
  .doc-deprecated h1:before {
    content: "Deprecated";
    background-color: #c0272d;
    background-color: var(--faded-red);
    color: #fff;
    color: var(--pure-white);
  }
 
  .doc-deprecated .doc-note-box {
    border-color: #c0272d;
    border-color: var(--faded-red);
  }
 
  .doc-note-translation {
    font-size: 13px;
    font-size: .8125rem;
  }
 
  .doc-note-translation p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
 
  .doc-note-translation p:first-of-type {
    margin-top: 0;
  }
 
  .doc-note-translation p:last-child {
    margin-bottom: 0;
  }
 
  .criterion {
    margin-bottom: 4em;
    background-color: #fff;
    background-color: var(--pure-white);
    border: 1px solid #ddd;
    border: 1px solid var(--line-grey);
    box-shadow: 1px 1px 4px -4px #000;
    padding: 1em;
  }
 
  .criterion__answers {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: start;
    align-items: flex-start;
    -ms-flex-pack: stretch;
    justify-content: stretch;
    -ms-flex-direction: column;
    flex-direction: column;
  }
 
  .criterion__answers label {
    font-size: 90%;
    display: block;
    color: #1d1d1d;
    color: var(--off-black);
    font-weight: 400;
    margin-bottom: .125em;
  }
 
  .criterion__answers label:after {
    content: ":";
  }
 
  .criterion__answers select {
    margin-right: 1em;
  }
 
  .criterion__answers>div:first-child {
    -ms-flex: 1;
    flex: 1;
  }
 
  .criterion__answers>div:last-child {
    -ms-flex: 3;
    flex: 3;
  }
 
  .criterion__answers textarea {
    width: 100%;
    font-family: Noto Sans Mono, monospace;
  }
 
  @media (min-width:35em) {
    .criterion__answers {
      -ms-flex-direction: row;
      flex-direction: row
    };
  }
 
  .criterion-header {
    margin-bottom: 1em;
  }
 
  .criterion-header h3 {
    font-weight: 400;
    display: inline;
  }
 
  .criterion-header__level {
    font-size: 13px;
    font-size: .8125rem;
    font-style: normal;
    margin: 0 1.5em 0 .5em;
    vertical-align: middle;
    white-space: nowrap;
  }
 
  .observation {
    margin-top: 1em;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
  }
 
  @media (min-width:35em) {
    .observation {
      margin-top: 0
    };
  }
 
  .observation__header {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-order: -1;
    order: -1;
  }
 
  @media (min-width:35em) {
    .observation__header {
      -ms-flex-direction: row;
      flex-direction: row
    };
  }
 
  .observation label {
    margin-right: .5em;
  }
 
  .observation select {
    margin-bottom: 1.5em;
  }
 
  .observation__meta {
    margin-left: auto;
    font-size: smaller;
    -ms-flex-item-align: baseline;
    align-self: baseline;
  }
 
  details {
    padding-left: 32px;
    padding-left: 2rem;
  }
 
  [dir=ltr] summary {
    margin-left: -32px;
    margin-left: -2rem;
  }
 
  [dir=rtl] summary {
    margin-right: -32px;
    margin-right: -2rem;
  }
 
  summary {
    cursor: pointer;
    display: block;
  }
 
  summary::-webkit-details-marker {
    display: none;
  }
 
  [dir=ltr] summary>:first-child:before {
    margin-right: 8px;
    margin-right: .5rem;
  }
 
  [dir=rtl] summary>:first-child:before {
    margin-left: 8px;
    margin-left: .5rem;
  }
 
  summary>:first-child:before {
    content: "+";
    display: inline-block;
    border-radius: 5px;
    width: 20.8px;
    width: 1.3rem;
    height: 20.8px;
    height: 1.3rem;
    line-height: 17.6px;
    line-height: 1.1rem;
    background: #fff;
    background: var(--pure-white);
    color: #005a6a;
    color: var(--wai-green);
    border: 2px solid #005a6a;
    border: 2px solid var(--wai-green);
    text-align: center;
    font-weight: 700;
  }
 
  summary:focus>:first-child:before,
  summary:hover>:first-child:before {
    background: #036;
    background: var(--w3c-blue);
    border-color: #036;
    border-color: var(--w3c-blue);
    color: #fff;
    color: var(--pure-white);
  }
 
  @moz-document url-prefix() {
    summary>:first-child:before {
      line-height: 1.3em
    };
  }
 
  details[open]>summary>:first-child:before {
    content: "–";
  }
 
  details>div:after {
    content: "";
    display: block;
    clear: both;
  }
 
  .excol-all {
    margin: 16px 0;
  }
 
  figure.shrink-wrap {
    box-sizing: border-box;
    background-color: #fff;
    background-color: var(--pure-white);
    width: -webkit-min-content;
    width: min-content;
    max-width: 100%;
    border: 1px solid #ddd;
    border: 1px solid var(--line-grey);
    border-radius: 3px;
    padding: 10px;
  }
 
  @media (min-width:47.5em) {
    figure.shrink-wrap .figcontent {
      display: -ms-flexbox;
      display: flex
    }
 
    figure.shrink-wrap .figcontent>* {
      -ms-flex: 1;
      flex: 1
    };
  }
 
  figure.shrink-wrap img {
    border: 1px solid #ddd;
    border: 1px solid var(--line-grey);
    max-width: none !important;
  }
 
  figure.shrink-wrap figcaption {
    font-weight: 400;
    border: none;
    margin: 0;
  }
 
  .page-footer,
  .site-footer {
    font-size: 14px;
    font-size: .875rem;
  }
 
  @media print {
 
    .page-footer,
    .site-footer {
      font-size: 8pt
    };
  }
 
  .page-footer,
  .site-footer {
    padding-top: 16px;
    padding-bottom: 16px;
  }
 
  .page-footer p:first-of-type,
  .site-footer p:first-of-type {
    margin-top: 0;
  }
 
  .page-footer p:last-of-type,
  .site-footer p:last-of-type {
    margin-bottom: 0;
  }
 
  .page-footer {
    margin-top: 32px;
    background-color: #efefef;
    background-color: var(--footer-grey);
  }
 
  .page-footer .inner {
    grid-area: content;
  }
 
  .site-footer {
    margin-top: 32px;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #3b3b3b;
    background-color: var(--dk-grey);
    color: #fff;
    color: var(--pure-white);
  }
 
  @media print {
    .site-footer {
      background-color: #efefef;
      background-color: var(--footer-grey);
      color: #3b3b3b;
      color: var(--dk-grey);
      border-top: 1px solid #3b3b3b;
      border-top: 1px solid var(--dk-grey)
    };
  }
 
  .site-footer a {
    color: #fff;
    color: var(--pure-white);
  }
 
  .site-footer a:focus,
  .site-footer a:hover {
    color: #eed009;
    color: var(--gold);
  }
 
  @media print {
    .site-footer a {
      color: #000
    };
  }
 
  @media print {
    .site-footer a:after {
      display: none
    };
  }
 
  .site-footer a.largelink {
    color: #eed009;
    color: var(--gold);
    font-size: 20px;
    font-size: 1.25rem;
    text-decoration: none;
  }
 
  @media print {
    .site-footer a.largelink {
      color: #3b3b3b;
      color: var(--dk-grey);
      font-size: 12pt
    };
  }
 
  .site-footer a.largelink:focus,
  .site-footer a.largelink:hover {
    text-decoration: underline;
  }
 
  .site-footer ul a {
    text-decoration: none;
  }
 
  .site-footer ul a:focus,
  .site-footer ul a:hover {
    text-decoration: underline;
  }
 
  .site-footer .footer-list-header {
    font-weight: 700;
    border-bottom: 1px solid hsla(0, 0%, 87%, .32);
    border-bottom: 1px solid var(--trans-line-grey);
    padding: 4px 0;
  }
 
  .site-footer .about {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
 
  @media print {
    .site-footer .about {
      grid-column-end: q4-end;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-flex-align: end;
      align-items: flex-end
    }
 
    .site-footer .about p {
      margin: 0
    };
  }
 
  @media print {
    .site-footer>:not(.about) {
      display: none
    };
  }
 
  .page-footer+.site-footer {
    margin-top: 0;
  }
 
  .site-footer ul {
    margin: 0;
    padding: 0;
  }
 
  .site-footer ul li {
    list-style: none;
  }
 
  .site-footer .social {
    margin-top: 1em;
    margin-bottom: 1em;
  }
 
  @media print {
    .site-footer .social {
      display: none
    };
  }
 
  .site-footer .social svg {
    vertical-align: middle;
    font-size: 2em;
  }
 
  .site-footer .social a {
    color: #fff;
    color: var(--pure-white);
    text-decoration: none;
  }
 
  .site-footer .social a:focus svg,
  .site-footer .social a:hover svg {
    color: #eed009;
    color: var(--gold);
  }
 
  .site-footer .social .button {
    border: 1px solid #fff;
    border: 1px solid var(--pure-white);
  }
 
  .site-footer .social ul {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
  }
 
  [dir=ltr] .site-footer .social ul li {
    margin-right: 1em;
  }
 
  [dir=rtl] .site-footer .social ul li {
    margin-left: 1em;
  }
 
  .footnotes {
    margin-top: 60px;
  }
 
  .footnotes ol {
    font-size: 13.6px;
    font-size: .85rem;
  }
 
  input,
  select,
  textarea {
    font-size: 1em;
    font-family: inherit;
  }
 
  input[type=search] {
    -webkit-appearance: none;
  }
 
  fieldset {
    margin: 0 0 32px;
    margin: 0 0 2rem;
    padding: 0;
  }
 
  input:not([type=checkbox]):not([type=radio]),
  textarea {
    border: 1px solid #686868;
    border: 1px solid var(--grey);
  }
 
  input:not([type=checkbox]):not([type=radio]):focus,
  input:not([type=checkbox]):not([type=radio]):hover,
  textarea:focus,
  textarea:hover {
    border: 1px solid #036;
    border: 1px solid var(--w3c-blue);
  }
 
  & ::-webkit-input-placeholder {
    color: #767676;
    font-style: italic;
    opacity: 1;
  }
 
  & :-moz-placeholder,
  & ::-moz-placeholder {
    color: #767676;
    font-style: italic;
    opacity: 1;
  }
 
  & :-ms-input-placeholder {
    color: #767676;
    font-style: italic;
    opacity: 1;
  }
 
  .field {
    padding: 4px;
    margin: 0 0 32px;
    margin: 0 0 2rem;
    outline: 2px solid transparent;
    outline-offset: 5px;
    transition: outline-offset .2s linear;
  }
 
  .field label {
    display: block;
  }
 
  .field input:not([type=checkbox]):not([type=radio]),
  .field textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
  }
 
  .field input:not([type=checkbox]):not([type=radio]):focus,
  .field textarea:focus {
    border-color: #005a9c;
    border-color: var(--w3c-classic);
    background-color: #edf4fa;
  }
 
  .field input:not([type=checkbox]):not([type=radio]):focus ::-webkit-input-placeholder,
  .field textarea:focus ::-webkit-input-placeholder {
    color: #545554;
  }
 
  .field input:not([type=checkbox]):not([type=radio]):focus :-moz-placeholder,
  .field input:not([type=checkbox]):not([type=radio]):focus ::-moz-placeholder,
  .field textarea:focus :-moz-placeholder,
  .field textarea:focus ::-moz-placeholder {
    color: #545554;
  }
 
  .field input:not([type=checkbox]):not([type=radio]):focus :-ms-input-placeholder,
  .field textarea:focus :-ms-input-placeholder {
    color: #545554;
  }
 
  .field[focus-within] {
    background-color: #edf4fa;
    outline-color: currentColor;
    outline-offset: 2px;
  }
 
  .field:focus-within {
    background-color: #edf4fa;
    outline-color: currentColor;
    outline-offset: 2px;
  }
 
  .field[focus-within] input:focus {
    outline: none;
    background-color: #fff !important;
    background-color: var(--pure-white) !important;
  }
 
  .field:focus-within input:focus {
    outline: none;
    background-color: #fff !important;
    background-color: var(--pure-white) !important;
  }
 
  [dir=ltr] .group>.field {
    margin-left: 32px;
    margin-left: 2rem;
  }
 
  [dir=rtl] .group>.field {
    margin-right: 32px;
    margin-right: 2rem;
  }
 
  .group>.field {
    margin-bottom: 8px;
    margin-bottom: .5rem;
  }
 
  .radio-field {
    display: -ms-flexbox;
    display: flex;
    padding: 4px;
    margin: 0 0 8px;
    border-radius: 3px;
  }
 
  [dir=ltr] .radio-field input {
    margin-right: .5em;
  }
 
  [dir=rtl] .radio-field input {
    margin-left: .5em;
  }
 
  .radio-field input {
    -ms-flex: 0 0 1em;
    flex: 0 0 1em;
    width: 1em;
    height: 1em;
  }
 
  .radio-field input:checked+label {
    font-weight: 700;
    color: #091832;
    color: var(--dk-blue);
  }
 
  .radio-field:focus,
  .radio-field:hover {
    background-color: #196cac;
    background-color: var(--light-blue);
    color: #fff;
  }
 
  .radio-field:focus :checked+label,
  .radio-field:hover :checked+label {
    color: inherit;
  }
 
  .radio-field label {
    -ms-flex: 1 1 100%;
    flex: 1 1 100%;
    cursor: pointer;
  }
 
  fieldset {
    border: none;
  }
 
  legend {
    font-size: 20px;
    font-size: 1.25rem;
    font-weight: 700;
  }
 
  @media (min-width:35em) {
    .searchform {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-align: center;
      align-items: center
    };
  }
 
  [dir=ltr] .searchform label {
    text-align: right;
  }
 
  [dir=rtl] .searchform label {
    text-align: left;
  }
 
  .searchform label {
    -ms-flex: 1;
    flex: 1;
  }
 
  [dir=ltr] .searchform input {
    margin-left: 10px;
  }
 
  [dir=rtl] .searchform input {
    margin-right: 10px;
  }
 
  .searchform input {
    -ms-flex: 4;
    flex: 4;
  }
 
  [dir=ltr] .searchform button {
    margin-left: 10px;
  }
 
  [dir=rtl] .searchform button {
    margin-right: 10px;
  }
 
  .searchform button {
    -ms-flex: 1;
    flex: 1;
  }
 
  .default-container,
  .default-grid {
    padding: 0 32px;
  }
 
  @media (min-width:35em) {
 
    .default-container,
    .default-grid {
      padding: 0
    };
  }
 
  .default-grid {
    padding: 0 16px;
  }
 
  @media (min-width:60em) {
    [dir=ltr] .default-grid {
      padding-left: 32px
    }
 
    [dir=ltr] .default-grid,
    [dir=rtl] .default-grid {
      padding-right: 32px
    }
 
    [dir=rtl] .default-grid {
      padding-left: 32px
    }
 
    .default-grid {
      padding: 0;
      display: -ms-flexbox;
      display: flex
    }
 
    @supports (display:grid) {
      .default-grid {
        display: grid;
        grid-column-gap: 32px;
        padding: 0;
        max-width: none;
        grid-template-columns: [complete-start] minmax(16px, 1fr) [navigation-start] repeat(2, minmax(0, 130px)) [navigation-end content-start] repeat(6, minmax(0, 130px)) [content-end] minmax(16px, 1fr) [complete-end]
      }
    }
 
    .default-grid.breadcrumb,
    .default-grid.page-footer {
      padding-top: 16px;
      padding-bottom: 16px
    }
 
    .default-grid .inner {
      grid-column-start: navigation-start;
      grid-column-end: content-end
    }
 
    .default-grid.page-footer .inner {
      grid-area: content
    };
  }
 
  @media print {
    .default-grid {
      display: block
    };
  }
 
  @supports (display:grid) {
    .compact-grid {
      grid-template-columns: [complete-start] minmax(16px, 1fr) [navigation-start] repeat(2, minmax(0, 50px)) [navigation-end content-start] repeat(6, minmax(0, 110px)) [content-end] minmax(16px, 1fr) [complete-end]
    };
  }
 
  @media (min-width:60em) {
    [dir=ltr] .grid-3 {
      padding-left: 32px
    }
 
    [dir=ltr] .grid-3,
    [dir=rtl] .grid-3 {
      padding-right: 32px
    }
 
    [dir=rtl] .grid-3 {
      padding-left: 32px
    }
 
    .grid-3 {
      display: -ms-flexbox;
      display: flex
    }
 
    @supports (display:grid) {
      .grid-3 {
        display: grid;
        grid-column-gap: 32px;
        padding: 0;
        max-width: none;
        grid-template-columns: repeat(3, minmax(0, 1fr))
      }
    }
 
    .grid-3.nogap {
      grid-column-gap: 0
    };
  }
 
  .grid-3 .col1,
  .grid-3 .from-col1 {
    grid-column-start: 1;
  }
 
  .grid-3 .col1,
  .grid-3 .to-col1 {
    grid-column-end: 2;
  }
 
  .grid-3 .col2,
  .grid-3 .from-col2 {
    grid-column-start: 2;
  }
 
  .grid-3 .col2,
  .grid-3 .to-col2 {
    grid-column-end: 3;
  }
 
  .grid-3 .col3,
  .grid-3 .from-col3 {
    grid-column-start: 3;
  }
 
  .grid-3 .col3,
  .grid-3 .to-col3 {
    grid-column-end: 4;
  }
 
  @media (min-width:60em) {
    [dir=ltr] .grid-4 {
      padding-left: 32px
    }
 
    [dir=ltr] .grid-4,
    [dir=rtl] .grid-4 {
      padding-right: 32px
    }
 
    [dir=rtl] .grid-4 {
      padding-left: 32px
    }
 
    .grid-4 {
      display: -ms-flexbox;
      display: flex
    }
 
    @supports (display:grid) {
      .grid-4 {
        display: grid;
        grid-column-gap: 32px;
        padding: 0;
        max-width: none;
        grid-template-columns: repeat(4, minmax(0, 1fr))
      }
    }
 
    .grid-4.nogap {
      grid-column-gap: 0
    };
  }
 
  .grid-4 .col1,
  .grid-4 .from-col1 {
    grid-column-start: 1;
  }
 
  .grid-4 .col1,
  .grid-4 .to-col1 {
    grid-column-end: 2;
  }
 
  .grid-4 .col2,
  .grid-4 .from-col2 {
    grid-column-start: 2;
  }
 
  .grid-4 .col2,
  .grid-4 .to-col2 {
    grid-column-end: 3;
  }
 
  .grid-4 .col3,
  .grid-4 .from-col3 {
    grid-column-start: 3;
  }
 
  .grid-4 .col3,
  .grid-4 .to-col3 {
    grid-column-end: 4;
  }
 
  .grid-4 .col4,
  .grid-4 .from-col4 {
    grid-column-start: 4;
  }
 
  .grid-4 .col4,
  .grid-4 .to-col4 {
    grid-column-end: 5;
  }
 
  @media (min-width:60em) {
    [dir=ltr] .grid-6 {
      padding-left: 32px
    }
 
    [dir=ltr] .grid-6,
    [dir=rtl] .grid-6 {
      padding-right: 32px
    }
 
    [dir=rtl] .grid-6 {
      padding-left: 32px
    }
 
    .grid-6 {
      display: -ms-flexbox;
      display: flex
    }
 
    @supports (display:grid) {
      .grid-6 {
        display: grid;
        grid-column-gap: 32px;
        padding: 0;
        max-width: none;
        grid-template-columns: repeat(6, minmax(0, 1fr))
      }
    };
  }
 
  .grid-6 .col1,
  .grid-6 .from-col1 {
    grid-column-start: 1;
  }
 
  .grid-6 .col1,
  .grid-6 .to-col1 {
    grid-column-end: 2;
  }
 
  .grid-6 .col2,
  .grid-6 .from-col2 {
    grid-column-start: 2;
  }
 
  .grid-6 .col2,
  .grid-6 .to-col2 {
    grid-column-end: 3;
  }
 
  .grid-6 .col3,
  .grid-6 .from-col3 {
    grid-column-start: 3;
  }
 
  .grid-6 .col3,
  .grid-6 .to-col3 {
    grid-column-end: 4;
  }
 
  .grid-6 .col4,
  .grid-6 .from-col4 {
    grid-column-start: 4;
  }
 
  .grid-6 .col4,
  .grid-6 .to-col4 {
    grid-column-end: 5;
  }
 
  .grid-6 .col5,
  .grid-6 .from-col5 {
    grid-column-start: 5;
  }
 
  .grid-6 .col5,
  .grid-6 .to-col5 {
    grid-column-end: 6;
  }
 
  .grid-6 .col6,
  .grid-6 .from-col6 {
    grid-column-start: 6;
  }
 
  .grid-6 .col6,
  .grid-6 .to-col6 {
    grid-column-end: 7;
  }
 
  .grid-6 .col1,
  .grid-6 .col2,
  .grid-6 .col3,
  .grid-6 .col4,
  .grid-6 .col5,
  .grid-6 .col6,
  .grid-6 .from-col2,
  .grid-6 .from-col3,
  .grid-6 .from-col4,
  .grid-6 .from-col5,
  .grid-6 .from-col6,
  .grid-6.from-col1 {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    -ms-flex-positive: 1;
    flex-grow: 1;
  }
 
  [dir=ltr] .grid-6 .col2,
  [dir=ltr] .grid-6 .col3,
  [dir=ltr] .grid-6 .col4,
  [dir=ltr] .grid-6 .col5,
  [dir=ltr] .grid-6 .col6,
  [dir=ltr] .grid-6 .from-col2,
  [dir=ltr] .grid-6 .from-col3,
  [dir=ltr] .grid-6 .from-col4,
  [dir=ltr] .grid-6 .from-col5,
  [dir=ltr] .grid-6 .from-col6 {
    margin-left: 32px;
  }
 
  [dir=rtl] .grid-6 .col2,
  [dir=rtl] .grid-6 .col3,
  [dir=rtl] .grid-6 .col4,
  [dir=rtl] .grid-6 .col5,
  [dir=rtl] .grid-6 .col6,
  [dir=rtl] .grid-6 .from-col2,
  [dir=rtl] .grid-6 .from-col3,
  [dir=rtl] .grid-6 .from-col4,
  [dir=rtl] .grid-6 .from-col5,
  [dir=rtl] .grid-6 .from-col6 {
    margin-right: 32px;
  }
 
  @supports (display:grid) {
 
    [dir=ltr] .grid-6 .col2,
    [dir=ltr] .grid-6 .col3,
    [dir=ltr] .grid-6 .col4,
    [dir=ltr] .grid-6 .col5,
    [dir=ltr] .grid-6 .col6,
    [dir=ltr] .grid-6 .from-col2,
    [dir=ltr] .grid-6 .from-col3,
    [dir=ltr] .grid-6 .from-col4,
    [dir=ltr] .grid-6 .from-col5,
    [dir=ltr] .grid-6 .from-col6 {
      margin-left: 0
    }
 
    [dir=rtl] .grid-6 .col2,
    [dir=rtl] .grid-6 .col3,
    [dir=rtl] .grid-6 .col4,
    [dir=rtl] .grid-6 .col5,
    [dir=rtl] .grid-6 .col6,
    [dir=rtl] .grid-6 .from-col2,
    [dir=rtl] .grid-6 .from-col3,
    [dir=rtl] .grid-6 .from-col4,
    [dir=rtl] .grid-6 .from-col5,
    [dir=rtl] .grid-6 .from-col6 {
      margin-right: 0
    };
  }
 
  .grid-6.from-col1.to-col6 {
    width: 100%;
  }
 
  [dir=ltr] .grid-three-five .col1,
  [dir=ltr] .grid-three-five .col2 {
    padding-left: 16px;
  }
 
  [dir=ltr] .grid-three-five .col1,
  [dir=ltr] .grid-three-five .col2,
  [dir=rtl] .grid-three-five .col1,
  [dir=rtl] .grid-three-five .col2 {
    padding-right: 16px;
  }
 
  [dir=rtl] .grid-three-five .col1,
  [dir=rtl] .grid-three-five .col2 {
    padding-left: 16px;
  }
 
  @media (min-width:35em) {
    [dir=ltr] .grid-three-five {
      padding-left: 32px
    }
 
    [dir=ltr] .grid-three-five,
    [dir=rtl] .grid-three-five {
      padding-right: 32px
    }
 
    [dir=rtl] .grid-three-five {
      padding-left: 32px
    }
 
    .grid-three-five {
      display: -ms-flexbox;
      display: flex
    }
 
    @supports (display:grid) {
      .grid-three-five {
        display: grid;
        grid-column-gap: 32px;
        padding: 0;
        max-width: none;
        grid-template-columns: [complete-start] 0 [three-start five-start] 1fr [three-end five-end] 0 [complete-end]
      }
 
      @media (min-width:35em) {
        .grid-three-five {
          grid-template-columns: [complete-start] minmax(16px, 1fr) [three-start] repeat(3, minmax(0, 130px)) [three-end five-start] repeat(5, minmax(0, 130px)) [five-end] minmax(16px, 1fr) [complete-end]
        }
      }
    }
 
    .grid-three-five .col1,
    .grid-three-five .col2 {
      padding: 0
    };
  }
 
  .grid-three-five .col1,
  .grid-three-five .col2 {
    -ms-flex-negative: 1;
    flex-shrink: 1;
  }
 
  [dir=ltr] .grid-three-five .col1 {
    margin-right: 32px;
  }
 
  [dir=rtl] .grid-three-five .col1 {
    margin-left: 32px;
  }
 
  .grid-three-five .col1 {
    -ms-flex-preferred-size: 35%;
    flex-basis: 35%;
    grid-column-start: three-start;
    grid-column-end: three-end;
  }
 
  @supports (display:grid) {
    [dir=ltr] .grid-three-five .col1 {
      margin-right: 0
    }
 
    [dir=rtl] .grid-three-five .col1 {
      margin-left: 0
    };
  }
 
  .grid-three-five .col2 {
    -ms-flex-preferred-size: 61%;
    flex-basis: 61%;
    grid-column-start: five-start;
    grid-column-end: five-end;
  }
 
  .grid-three-five .col12 {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    grid-column-start: three-start;
    grid-column-end: five-end;
  }
 
  [dir=ltr] .grid-five-three .col1,
  [dir=ltr] .grid-five-three .col2 {
    padding-left: 16px;
  }
 
  [dir=ltr] .grid-five-three .col1,
  [dir=ltr] .grid-five-three .col2,
  [dir=rtl] .grid-five-three .col1,
  [dir=rtl] .grid-five-three .col2 {
    padding-right: 16px;
  }
 
  [dir=rtl] .grid-five-three .col1,
  [dir=rtl] .grid-five-three .col2 {
    padding-left: 16px;
  }
 
  @media (min-width:35em) {
    [dir=ltr] .grid-five-three {
      padding-left: 32px
    }
 
    [dir=ltr] .grid-five-three,
    [dir=rtl] .grid-five-three {
      padding-right: 32px
    }
 
    [dir=rtl] .grid-five-three {
      padding-left: 32px
    }
 
    .grid-five-three {
      display: -ms-flexbox;
      display: flex
    }
 
    @supports (display:grid) {
      .grid-five-three {
        display: grid;
        grid-column-gap: 32px;
        padding: 0;
        max-width: none;
        grid-template-columns: [complete-start] 0 [three-start five-start] 1fr [three-end five-end] 0 [complete-end]
      }
 
      @media (min-width:35em) {
        .grid-five-three {
          grid-template-columns: [complete-start] minmax(16px, 1fr) [five-start] repeat(5, minmax(0, 130px)) [five-end three-start] repeat(3, minmax(0, 130px)) [three-end] minmax(16px, 1fr) [complete-end]
        }
      }
    }
 
    .grid-five-three .col1,
    .grid-five-three .col2 {
      padding: 0
    };
  }
 
  .grid-five-three .col1,
  .grid-five-three .col2 {
    -ms-flex-negative: 1;
    flex-shrink: 1;
  }
 
  [dir=ltr] .grid-five-three .col1 {
    margin-right: 32px;
  }
 
  [dir=rtl] .grid-five-three .col1 {
    margin-left: 32px;
  }
 
  .grid-five-three .col1 {
    -ms-flex: 1 1 62%;
    flex: 1 1 62%;
    grid-column-start: five-start;
    grid-column-end: five-end;
  }
 
  @supports (display:grid) {
    [dir=ltr] .grid-five-three .col1 {
      margin-right: 0
    }
 
    [dir=rtl] .grid-five-three .col1 {
      margin-left: 0
    };
  }
 
  .grid-five-three .col2 {
    -ms-flex: 1 1 37%;
    flex: 1 1 37%;
    grid-column-start: three-start;
    grid-column-end: three-end;
  }
 
  .grid-five-three .col12 {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    grid-column-start: five-start;
    grid-column-end: three-end;
  }
 
  [dir=ltr] .grid-4q {
    padding-left: 32px;
  }
 
  [dir=ltr] .grid-4q,
  [dir=rtl] .grid-4q {
    padding-right: 32px;
  }
 
  [dir=rtl] .grid-4q {
    padding-left: 32px;
  }
 
  .grid-4q {
    display: -ms-flexbox;
    display: flex;
  }
 
  @supports (display:grid) {
    .grid-4q {
      display: grid;
      grid-column-gap: 32px;
      padding: 0;
      max-width: none;
      grid-template-columns: [complete-start] 0 [q1-start q2-start q3-start q4-start] 1fr [q1-end q2-end q3-end q4-end] 0 [complete-end]
    }
 
    .grid-4q.site-footer {
      padding-top: 16px;
      padding-bottom: 16px
    }
 
    @media (min-width:60em) {
      .grid-4q {
        grid-template-columns: [complete-start] minmax(16px, 1fr) [content-start q1-start] repeat(2, minmax(0, 130px)) [q1-end q2-start] repeat(2, minmax(0, 130px)) [q2-end q3-start] repeat(2, minmax(0, 130px)) [q3-end q4-start] repeat(2, minmax(0, 130px)) [q4-end content-end] minmax(16px, 1fr) [complete-end]
      }
    };
  }
 
  .grid-4q.nogap {
    grid-template-columns: [complete-start] 0 [q1-start q2-start q3-start q4-start] 1fr [q1-end q2-end q3-end q4-end] 0 [complete-end];
  }
 
  @media (min-width:60em) {
    .grid-4q.nogap {
      grid-template-columns: [complete-start] minmax(16px, 1fr) [content-start q1-start] repeat(2, minmax(0, 158px)) [q1-end q2-start] repeat(2, minmax(0, 158px)) [q2-end q3-start] repeat(2, minmax(0, 158px)) [q3-end q4-start] repeat(2, minmax(0, 158px)) [q4-end content-end] minmax(16px, 1fr) [complete-end]
    };
  }
 
  .grid-4q.nogap {
    grid-column-gap: 0;
  }
 
  [dir=ltr] .grid-4q .q1-start {
    margin-right: 32px;
  }
 
  [dir=rtl] .grid-4q .q1-start {
    margin-left: 32px;
  }
 
  .grid-4q .q1-start {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    grid-column-start: q1-start;
  }
 
  [dir=ltr] .grid-4q .q2-start {
    margin-right: 32px;
  }
 
  [dir=rtl] .grid-4q .q2-start {
    margin-left: 32px;
  }
 
  .grid-4q .q2-start {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    grid-column-start: q2-start;
  }
 
  [dir=ltr] .grid-4q .q3-start {
    margin-right: 32px;
  }
 
  [dir=rtl] .grid-4q .q3-start {
    margin-left: 32px;
  }
 
  .grid-4q .q3-start {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    grid-column-start: q3-start;
  }
 
  [dir=ltr] .grid-4q .q4-start {
    margin-right: 32px;
  }
 
  [dir=rtl] .grid-4q .q4-start {
    margin-left: 32px;
  }
 
  .grid-4q .q4-start {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    grid-column-start: q4-start;
  }
 
  .grid-4q .q1-end {
    grid-column-end: q1-end;
  }
 
  .grid-4q .q2-end {
    grid-column-end: q2-end;
  }
 
  .grid-4q .q3-end {
    grid-column-end: q3-end;
  }
 
  [dir=ltr] .grid-4q .q4-end {
    margin-right: 0;
  }
 
  [dir=rtl] .grid-4q .q4-end {
    margin-left: 0;
  }
 
  .grid-4q .q4-end {
    grid-column-end: q4-end;
  }
 
  .grid-4q .q1-start.q2-end,
  .grid-4q .q2-start.q3-end,
  .grid-4q .q3-start.q4-end {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
  }
 
  .grid-4q .q1-start.q3-end,
  .grid-4q .q2-start.q4-end {
    -ms-flex-preferred-size: 75%;
    flex-basis: 75%;
  }
 
  [dir=ltr] .grid-4q.nogap .q1-start,
  [dir=ltr] .grid-4q.nogap .q2-start,
  [dir=ltr] .grid-4q.nogap .q3-start,
  [dir=ltr] .grid-4q.nogap .q4-start {
    margin-right: 0;
  }
 
  [dir=rtl] .grid-4q.nogap .q1-start,
  [dir=rtl] .grid-4q.nogap .q2-start,
  [dir=rtl] .grid-4q.nogap .q3-start,
  [dir=rtl] .grid-4q.nogap .q4-start {
    margin-left: 0;
  }
 
  @supports(display:grid) {
 
    [dir=ltr] .grid-4q .q1-start,
    [dir=ltr] .grid-4q .q2-start,
    [dir=ltr] .grid-4q .q3-start,
    [dir=ltr] .grid-4q .q4-start {
      margin-right: 0
    }
 
    [dir=rtl] .grid-4q .q1-start,
    [dir=rtl] .grid-4q .q2-start,
    [dir=rtl] .grid-4q .q3-start,
    [dir=rtl] .grid-4q .q4-start {
      margin-left: 0
    };
  }
 
  .leftcol nav {
    -ms-flex-preferred-size: 24.25%;
    flex-basis: 24.25%;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }
 
  [dir=ltr] .leftcol main {
    margin-left: 32px;
  }
 
  [dir=rtl] .leftcol main {
    margin-right: 32px;
  }
 
  .leftcol main {
    grid-area: content;
    -ms-flex: 1;
    flex: 1;
  }
 
  @supports (display:grid) {
    [dir=ltr] .leftcol main {
      margin-left: 0
    }
 
    [dir=rtl] .leftcol main {
      margin-right: 0
    };
  }
 
  @media (min-width:35em) {
    [dir=ltr] .grid-line-right {
      border-right: 1px solid var(--line-grey)
    }
 
    [dir=rtl] .grid-line-right {
      border-left: 1px solid var(--line-grey)
    }
 
    [dir=ltr] .grid-line-right {
      margin-right: -17px !important
    }
 
    [dir=rtl] .grid-line-right {
      margin-left: -17px !important
    }
 
    [dir=ltr] .grid-line-right {
      padding-right: 17px !important
    }
 
    [dir=rtl] .grid-line-right {
      padding-left: 17px !important
    }
 
    [dir=ltr] .grid-line-right {
      border-right: 1px solid #ddd
    }
 
    [dir=rtl] .grid-line-right {
      border-left: 1px solid #ddd
    };
  }
 
  @media (min-width:35em) {
    [dir=ltr] .grid-line-left {
      border-left: 1px solid var(--line-grey)
    }
 
    [dir=rtl] .grid-line-left {
      border-right: 1px solid var(--line-grey)
    }
 
    [dir=ltr] .grid-line-left {
      margin-left: -16px !important
    }
 
    [dir=rtl] .grid-line-left {
      margin-right: -16px !important
    }
 
    [dir=ltr] .grid-line-left {
      padding-left: 16px !important
    }
 
    [dir=rtl] .grid-line-left {
      padding-right: 16px !important
    }
 
    [dir=ltr] .grid-line-left {
      border-left: 1px solid #ddd
    }
 
    [dir=rtl] .grid-line-left {
      border-right: 1px solid #ddd
    };
  }
 
  #site-header {
    background-color: #005a9c;
    background-color: var(--w3c-classic);
    color: #fff;
    color: var(--pure-white);
  }
 
  @media print {
    #site-header {
      background-color: #f2f2f2;
      background-color: var(--off-white);
      color: #000
    };
  }
 
  #site-header {
    padding-top: 3px;
  }
 
  @supports (display:grid) {
    [dir=ltr] #site-header {
      padding-left: 8px
    }
 
    [dir=ltr] #site-header,
    [dir=rtl] #site-header {
      padding-right: 8px
    }
 
    [dir=rtl] #site-header {
      padding-left: 8px
    };
  }
 
  #site-header.header-minimal {
    margin-bottom: 32px;
  }
 
  #site-header a {
    color: #fff;
    color: var(--pure-white);
  }
 
  @media print {
    #site-header a {
      color: #005a9c;
      color: var(--w3c-classic)
    };
  }
 
  @media print {
    #site-header a:after {
      content: ""
    };
  }
 
  .wai {
    line-height: 1.2;
  }
 
  @media (min-width:35em) {
    .wai {
      vertical-align: middle;
      font-size: 1.5625rem
    };
  }
 
  .logos {
    grid-column-start: 2;
    grid-column-end: 6;
    grid-row-start: 1;
    padding: 16px 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    width: 60%;
  }
 
  @supports (display:grid) {
    .logos {
      width: auto
    };
  }
 
  .logos .claim {
    font-size: 14px;
    font-size: .875rem;
    font-style: italic;
  }
 
  .logos .claim:lang(ar) {
    font-style: normal;
  }
 
  [dir=ltr] .logos .claim {
    margin-left: 16px;
  }
 
  [dir=rtl] .logos .claim {
    margin-right: 16px;
  }
 
  [dir=ltr] .logos .claim {
    padding-left: 16px;
  }
 
  [dir=rtl] .logos .claim {
    padding-right: 16px;
  }
 
  [dir=ltr] .logos .claim {
    border-left: 1px solid var(--gold);
  }
 
  [dir=rtl] .logos .claim {
    border-right: 1px solid var(--gold);
  }
 
  [dir=ltr] .logos .claim {
    border-left: 1px solid #eed009;
  }
 
  [dir=rtl] .logos .claim {
    border-right: 1px solid #eed009;
  }
 
  .logos .claim {
    color: #fff;
    color: var(--pure-white);
  }
 
  @media print {
    .logos .claim {
      color: #005a9c;
      color: var(--w3c-classic)
    };
  }
 
  .logos .claim {
    -ms-flex: 1 0 0px;
    flex: 1 0 0;
    display: none;
  }
 
  @media (min-width:35em) {
    .logos .claim {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center
    };
  }
 
  @media (min-width:23em) {
    [dir=ltr] .home {
      margin-right: 32px
    }
 
    [dir=rtl] .home {
      margin-left: 32px
    };
  }
 
  .home {
    text-decoration: none;
    transition: color .25s ease-in .1s;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
 
  @supports (display:grid) {
    .home {
      -ms-flex: 0;
      flex: 0
    };
  }
 
  @media (min-width:60em) {
    [dir=ltr] .home {
      margin-right: 8px
    }
 
    [dir=rtl] .home {
      margin-left: 8px
    };
  }
 
  .home img,
  .home svg {
    vertical-align: middle;
    color: inherit;
    fill: currentColor;
    height: 30px;
  }
 
  @media (min-width:35em) {
 
    .home img,
    .home svg {
      height: 46px
    };
  }
 
  .home {
    [dir=ltr] img {
      padding-right: 8px
    }
 
    [dir=rtl] img {
      padding-left: 8px
    };
  }
 
  .home.w3c {
    border-bottom: 2px solid transparent;
  }
 
  .home.w3c:hover {
    border-bottom-color: currentColor;
  }
 
  .home .wai {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
  }
 
  @media (min-width:35em) {
    .home .wai {
      font-size: 1.25rem
    };
  }
 
  .home .wai .wa {
    padding-bottom: 2px;
  }
 
  .home .wai .i {
    border-top: 1px solid #eed009;
    border-top: 1px solid var(--gold);
    padding-top: 2px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
 
  .home:focus,
  .home:hover {
    text-decoration: underline;
    color: #eed009 !important;
    color: var(--gold) !important;
  }
 
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
  }
 
  h1,
  h2 {
    margin: 60px 0 20px;
  }
 
  h3 {
    margin: 40px 0 20px;
  }
 
  h4,
  h5,
  h6 {
    margin: 20px 0 10px;
  }
 
  h1,
  h2,
  h3,
  h4 {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  @media print {
 
    h1,
    h2,
    h3,
    h4 {
      color: #000
    };
  }
 
  h1 {
    font-size: 24px;
    font-size: 1.5rem;
  }
 
  @media (min-width:35em) {
    h1 {
      font-size: 2rem
    };
  }
 
  @media (min-width:60em) {
    h1 {
      font-size: 2.375rem
    };
  }
 
  @media print {
    h1 {
      font-size: 24pt
    };
  }
 
  h1 {
    line-height: 1.2;
    font-weight: 400;
  }
 
  h1,
  h1+h2 {
    margin-block: 1rem 0;
  }
 
  h2 {
    font-size: 22px;
    font-size: 1.375rem;
  }
 
  @media print {
    h2 {
      font-size: 21pt
    };
  }
 
  h2 {
    line-height: 1.2;
    font-weight: 700;
    border-bottom: 1px solid #ddd;
    border-bottom: 1px solid var(--line-grey);
  }
 
  h2+h3 {
    margin-top: 0;
  }
 
  h3,
  h4 {
    font-size: 18px;
    font-size: 1.125rem;
  }
 
  @media print {
 
    h3,
    h4 {
      font-size: 16pt
    };
  }
 
  h3,
  h4 {
    line-height: 1.4;
  }
 
  h3+h4 {
    margin-top: 0;
  }
 
  h4 {
    font-weight: 400;
  }
 
  @media print {
    h4 {
      font-size: 14pt
    };
  }
 
  h4+h5 {
    margin-top: 0;
  }
 
  h5 {
    font-weight: 700;
    line-height: 1.6;
    font-size: 16px;
    font-size: 1rem;
  }
 
  @media print {
    h5 {
      font-size: 12pt
    };
  }
 
  h5+h6 {
    margin-top: 0;
  }
 
  h6 {
    font-size: 14px;
    font-size: .875rem;
  }
 
  @media print {
    h6 {
      font-size: 12pt
    };
  }
 
  h6 {
    line-height: 1.8;
  }
 
  h1.ap:before,
  h1.ex:before,
  h2.ap:before,
  h2.ex:before,
  h3.ap:before,
  h3.ex:before,
  h4.ap:before,
  h4.ex:before,
  h5.ap:before,
  h5.ex:before,
  h6.ap:before,
  h6.ex:before {
    color: #036 !important;
    color: var(--w3c-blue) !important;
    font-weight: 700;
  }
 
  h1.ex,
  h2.ex,
  h3.ex,
  h4.ex,
  h5.ex,
  h6.ex {
    counter-increment: a;
    counter-reset: b;
  }
 
  h1.ex:before,
  h2.ex:before,
  h3.ex:before,
  h4.ex:before,
  h5.ex:before,
  h6.ex:before {
    content: "Example " counter(a) ": ";
  }
 
  h1.ex.inap,
  h2.ex.inap,
  h3.ex.inap,
  h4.ex.inap,
  h5.ex.inap,
  h6.ex.inap {
    counter-reset: none;
  }
 
  h1.newap,
  h2.newap,
  h3.newap,
  h4.newap,
  h5.newap,
  h6.newap {
    counter-reset: b;
  }
 
  h1.newex,
  h2.newex,
  h3.newex,
  h4.newex,
  h5.newex,
  h6.newex {
    counter-reset: a;
  }
 
  h1.first,
  h1.newexap,
  h2.first,
  h2.newexap,
  h3.first,
  h3.newexap,
  h4.first,
  h4.newexap,
  h5.first,
  h5.newexap,
  h6.first,
  h6.newexap {
    counter-reset: a b;
  }
 
  h1.ap,
  h2.ap,
  h3.ap,
  h4.ap,
  h5.ap,
  h6.ap {
    counter-increment: b;
  }
 
  h1.ap:before,
  h2.ap:before,
  h3.ap:before,
  h4.ap:before,
  h5.ap:before,
  h6.ap:before {
    content: "Approach " counter(b) ": ";
  }
 
  h1 code,
  h2 code,
  h3 code,
  h4 code,
  h5 code,
  h6 code {
    color: inherit !important;
  }
 
  .in-resource h1 {
    margin-bottom: 0;
  }
 
  .in-resource p {
    margin-top: 0;
    font-style: italic;
  }
 
  .in-resource-sub {
    display: block;
    font-size: 16px;
    font-size: 1rem;
    font-style: italic;
  }
 
  .in-resource a:visited {
    color: var(--w3c-dark);
  }
 
  #toc+h2,
  .tight-page h2 {
    margin-top: 45px;
  }
 
  [class*=" icon-"],
  [class^=icon-] {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }
 
  .icon-default {
    width: .9285714285714285em;
  }
 
  .icon-info {
    width: .8571428571428571em;
  }
 
  .icon-audio-description {
    width: 3.5em;
    height: 1.75em;
    margin: -.25em;
  }
 
  .icon-search {
    width: .9287109375em;
  }
 
  .icon-arrow-left {
    width: .8928571428571428em;
  }
 
  .icon-arrow-right {
    width: .8214285714285714em;
  }
 
  .icon-arrow-down,
  .icon-arrow-up {
    width: .9285714285714285em;
  }
 
  .icon-check-circle,
  .icon-ex-circle,
  .icon-external-link {
    width: .8571428571428571em;
  }
 
  .icon-readmore {
    width: .7142857142857142em;
  }
 
  .icon-desktop,
  .icon-laptop {
    width: 1.0714285714285714em;
  }
 
  .icon-tablet {
    width: .6428571428571428em;
  }
 
  .icon-mobile {
    width: .42857142857142855em;
  }
 
  .icon-code {
    width: 1.0714285714285714em;
  }
 
  .icon-fork {
    width: .5714285714285714em;
  }
 
  .icon-code-file {
    width: .8571428571428571em;
  }
 
  .icon-cart-plus {
    width: .9285714285714285em;
  }
 
  .icon-arrow-left-thin {
    width: .8928571428571428em;
  }
 
  .icon-arrow-right-thin {
    width: .8214285714285714em;
  }
 
  .icon-arrow-up-thin {
    width: .9285714285714285em;
  }
 
  .icon-languages {
    height: 1em;
    width: 2.75em;
    vertical-align: -8%;
  }
 
  .icon-translations {
    height: 1.6em;
    vertical-align: middle;
  }
 
  img.tiny {
    --img-width: 60px;
  }
 
  img.mini {
    --img-width: 90px;
  }
 
  img.small {
    --img-width: 120px;
  }
 
  img.normal {
    --img-width: 240px;
  }
 
  img.medium {
    --img-width: 360px;
  }
 
  img.large {
    --img-width: 480px;
  }
 
  [dir=ltr] img.left {
    clear: left;
  }
 
  [dir=rtl] img.left {
    clear: right;
  }
 
  [dir=ltr] img.left {
    float: left;
  }
 
  [dir=rtl] img.left {
    float: right;
  }
 
  [dir=ltr] img.left {
    margin-right: 1em;
  }
 
  [dir=rtl] img.left {
    margin-left: 1em;
  }
 
  [dir=ltr] img.right {
    clear: right;
  }
 
  [dir=rtl] img.right {
    clear: left;
  }
 
  [dir=ltr] img.right {
    float: right;
  }
 
  [dir=rtl] img.right {
    float: left;
  }
 
  [dir=ltr] img.right {
    margin-left: 1em;
  }
 
  [dir=rtl] img.right {
    margin-right: 1em;
  }
 
  img.video {
    border-radius: calc(var(--img-width) / 20);
  }
 
  main img {
    max-width: 100%;
  }
 
  main img:not([width]) {
    width: var(--img-width);
  }
 
  .img-card p {
    font-size: small;
  }
 
  ul {
    list-style-type: disc;
  }
 
  ul.alt,
  ul.alt ul {
    list-style-type: circle;
  }
 
  ol li,
  ul li {
    margin-bottom: 8px;
  }
 
  .linklist,
  .linklist li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
 
  .linklist a {
    display: block;
    padding: 4px 16px;
    border-bottom: 1px solid #ddd;
    border-bottom: 1px solid var(--line-grey);
    text-decoration: none;
  }
 
  .linklist a svg {
    height: .65em;
  }
 
  .linklist a:focus svg,
  .linklist a:hover svg {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .linklist a:focus .visual-a,
  .linklist a:hover .visual-a {
    text-decoration: underline;
  }
 
  .linklist li:last-child a {
    border-bottom: none;
  }
 
  .nolist,
  .nolist li {
    margin: 0;
    padding: 0;
  }
 
  .nolist li {
    list-style: none;
    overflow: auto;
  }
 
  .withicons {
    --img-width: 240px;
  }
 
  .withicons.tiny {
    --img-width: 60px;
  }
 
  .withicons.mini {
    --img-width: 90px;
  }
 
  .withicons.small {
    --img-width: 120px;
  }
 
  .withicons.normal {
    --img-width: 240px;
  }
 
  [dir=ltr] .withicons li.left img {
    float: left;
  }
 
  [dir=rtl] .withicons li.left img {
    float: right;
  }
 
  .withicons li.left img {
    min-width: 60px;
    width: calc(var(--img-width) / 2);
  }
 
  @media (min-width:35em) {
    [dir=ltr] .withicons li.left {
      padding-left: calc(var(--img-width) + 20px)
    }
 
    [dir=rtl] .withicons li.left {
      padding-right: calc(var(--img-width) + 20px)
    }
 
    [dir=ltr] .withicons li.left img {
      margin-left: calc((var(--img-width) + 20px) * -1)
    }
 
    [dir=rtl] .withicons li.left img {
      margin-right: calc((var(--img-width) + 20px) * -1)
    }
 
    .withicons li.left img {
      min-width: auto;
      width: var(--img-width)
    };
  }
 
  [dir=ltr] .withicons li.right img {
    float: right;
  }
 
  [dir=rtl] .withicons li.right img {
    float: left;
  }
 
  .withicons li.right img {
    min-width: 60px;
    width: calc(var(--img-width) / 2);
  }
 
  @media (min-width:35em) {
    [dir=ltr] .withicons li.right {
      padding-right: calc(var(--img-width) + 20px)
    }
 
    [dir=rtl] .withicons li.right {
      padding-left: calc(var(--img-width) + 20px)
    }
 
    [dir=ltr] .withicons li.right img {
      margin-right: calc((var(--img-width) + 20px) * -1)
    }
 
    [dir=rtl] .withicons li.right img {
      margin-left: calc((var(--img-width) + 20px) * -1)
    }
 
    .withicons li.right img {
      min-width: auto;
      width: var(--img-width)
    };
  }
 
  p+ol,
  p+ul {
    margin-top: -8px;
  }
 
  .checkbox {
    list-style-image: url(../images/checkbox.svg);
  }
 
  .columns {
    padding: 0;
  }
 
  [dir=ltr] .columns>* {
    margin-left: 32px;
  }
 
  [dir=rtl] .columns>* {
    margin-right: 32px;
  }
 
  .four.columns,
  .two.columns {
    column-gap: 32px;
  }
 
  @media (min-width:35em) {
 
    .four.columns,
    .two.columns {
      columns: 2
    };
  }
 
  .four.columns {
    padding: 0 8px;
  }
 
  @media (min-width:60em) {
    .four.columns {
      columns: 4
    };
  }
 
  .two.small.columns {
    column-gap: 32px;
  }
 
  @media (min-width:35em) {
    .two.small.columns {
      columns: 1
    };
  }
 
  @media (min-width:60em) {
    .two.small.columns {
      columns: 2
    };
  }
 
  dl {
    margin: 16px 0;
  }
 
  dt {
    font-weight: 700;
  }
 
  .notbold dt {
    font-weight: 400;
  }
 
  [dir=ltr] dd {
    margin-left: 32px;
  }
 
  [dir=rtl] dd {
    margin-right: 32px;
  }
 
  dd+dt {
    margin-top: 8px;
  }
 
  dl.paragraph-like dd+dt {
    margin-top: 1em;
  }
 
  ul.sentence,
  ul.sentence li {
    font-size: 0;
    display: inline;
    margin: 0;
    padding: 0;
    list-style: none;
  }
 
  ul.sentence li {
    font-size: 16px;
    font-size: 1rem;
  }
 
  .page-footer ul.sentence li {
    font-size: 14px;
    font-size: .875rem;
  }
 
  ul.sentence li:before {
    content: ", ";
  }
 
  ul.sentence li:first-child:before {
    content: "";
  }
 
  ul.sentence li:last-child:before {
    content: ", and ";
  }
 
  ul.sentence li:last-child:after {
    content: ".";
  }
 
  ul.sentence li:last-child:nth-child(2):before {
    content: " and ";
    display: inline-block;
  }
 
  ul.sentence li:last-child:first-child:before {
    content: "";
  }
 
  .tool-header {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
 
  .tool-header a {
    text-decoration: none;
  }
 
  .tool-header-name {
    font-size: 1.125em;
    line-height: 1;
  }
 
  .tool-header-logo {
    margin-left: auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-item-align: start;
    align-self: start;
  }
 
  .tool-header-logo img {
    display: block;
    margin: .75em 0 .75em .5em;
    height: 1.5em;
  }
 
  .minimal-header {
    display: -ms-flexbox;
    display: flex;
    margin: 1.2em 0;
    -ms-flex-align: stretch;
    align-items: stretch;
  }
 
  .minimal-header-container {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
  }
 
  .minimal-header .minimal-header-link,
  .minimal-header .minimal-header-name,
  .minimal-header .minimal-header-subtitle {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
  }
 
  .minimal-header-name {
    -ms-flex: width 0 0px;
    flex: width 0 0;
  }
 
  .minimal-header-link,
  .minimal-header-subtitle {
    -ms-flex: 1 0 0px;
    flex: 1 0 0;
  }
 
  .minimal-header-name {
    font-size: 1.125em;
    line-height: 1;
  }
 
  .minimal-header-subtitle {
    margin-top: 8px;
    display: block;
    font-size: .8em;
  }
 
  .minimal-header-link {
    border-left: 1px solid #eed009;
    border-left: 1px solid var(--gold);
    padding-left: 8px;
    margin-left: 18px;
    display: block;
    font-size: .8em;
  }
 
  .minimal-header-subtitle {
    font-style: italic;
  }
 
  .minimal-header-link {
    font-weight: 400;
    margin-right: 16px;
  }
 
  @media (min-width:60em) {
 
    .minimal-header-name,
    .tool-header-name {
      font-size: 1.5em
    }
 
    .minimal-header-link,
    .minimal-header-subtitle {
      font-size: 80%
    }
 
    .minimal-header-container {
      -ms-flex-direction: row;
      flex-direction: row
    }
 
    .minimal-header-subtitle {
      margin-top: 0;
      margin-bottom: 0;
      border-left: 1px solid #eed009;
      border-left: 1px solid var(--gold);
      padding-left: 8px;
      margin-left: 18px
    };
  }
 
  .minimal-header-logo {
    margin-left: auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-item-align: start;
    align-self: start;
  }
 
  .minimal-header-logo img {
    margin: 1px 0;
    height: 1.5em;
  }
 
  @media (min-width:60em) {
    .minimal-header-logo {
      -ms-flex-direction: row;
      flex-direction: row
    }
 
    .minimal-header-logo img,
    .tool-header-logo img {
      height: 2em
    };
  }
 
  .minimal-header-logo a :nth-child(2) {
    margin-left: -13px;
  }
 
  .minimal-header-container {
    background-color: #005a9c;
    background-color: var(--w3c-classic);
  }
 
  .minimal-header-container>.minimal-header {
    grid-column: navigation-start/content-end;
  }
 
  .nav {
    grid-column: 2/span 8;
    grid-row: 1;
    overflow: auto;
    background-color: #d0e1f1;
    background-color: var(--cloudy-subtle);
  }
 
  .nav ul {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    margin: 0;
    padding: 0;
  }
 
  .nav__item {
    list-style: none;
    margin: 0;
    text-decoration: none;
  }
 
  .nav__item a {
    display: block;
    font-size: .85em;
    padding: 1em;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    transition-duration: .1s;
    border-bottom: 1px solid transparent;
  }
 
  .nav__item .active {
    background-color: #fff;
    background-color: var(--pure-white);
    border-bottom: 1px solid #fff;
    border-bottom: 1px solid var(--pure-white);
  }
 
  .nav__item a:not(.active):focus,
  .nav__item a:not(.active):hover,
  .nav__item a:not([aria-current=page]):focus,
  .nav__item a:not([aria-current=page]):hover {
    background: #e5f1fc;
    text-decoration: underline;
    -webkit-text-decoration-color: #eed009;
    text-decoration-color: #eed009;
    -webkit-text-decoration-color: var(--gold);
    text-decoration-color: var(--gold);
    text-underline-offset: 6px;
    text-decoration-thickness: 2px;
  }
 
  .nav__item a:focus {
    outline-offset: -.5em;
  }
 
  .nav-container {
    background-color: #d0e1f1;
    background-color: var(--cloudy-subtle);
    margin-bottom: 2em;
  }
 
  .info {
    background-color: #eed009;
    background-color: var(--gold);
    background-image: linear-gradient(180deg, #eed009, color(#eed009 blackness(15%)));
    background-image: linear-gradient(180deg, var(--gold), color(var(--gold) blackness(15%)));
    background-size: 100% 20%;
    background-repeat: no-repeat;
    background-position: bottom;
    font-weight: 700;
    text-align: center;
  }
 
  [dir=ltr] .info svg {
    margin-right: 8px;
  }
 
  [dir=rtl] .info svg {
    margin-left: 8px;
  }
 
  .info svg {
    font-size: 2em;
    vertical-align: middle;
    margin-top: -.14em;
  }
 
  #controls {
    background-color: #f2f2f2;
    background-color: var(--off-white);
    padding: 0 8px;
  }
 
  @media (min-width:35em) {
    [dir=ltr] #controls {
      text-align: right
    }
 
    [dir=rtl] #controls {
      text-align: left
    };
  }
 
  #controls {
    font-size: .8125em;
  }
 
  #controls>ul {
    padding: 0;
    margin: 0;
  }
 
  @media (min-width:35em) {
    #controls>ul {
      grid-column-start: navigation;
      grid-column-end: content
    };
  }
 
  [dir=ltr] #controls>ul>li {
    margin-left: 4px;
  }
 
  [dir=rtl] #controls>ul>li {
    margin-right: 4px;
  }
 
  [dir=ltr] #controls>ul>li {
    padding-left: 4px;
  }
 
  [dir=rtl] #controls>ul>li {
    padding-right: 4px;
  }
 
  #controls>ul>li {
    display: inline;
    list-style: none;
    margin: 0;
    padding: 0;
  }
 
  @media (min-width:35em) {
    [dir=ltr] #controls>ul>li {
      margin-left: 8px
    }
 
    [dir=rtl] #controls>ul>li {
      margin-right: 8px
    }
 
    [dir=ltr] #controls>ul>li {
      padding-left: 8px
    }
 
    [dir=rtl] #controls>ul>li {
      padding-right: 8px
    }
 
    #controls>ul>li {
      margin: 0;
      padding: 0
    };
  }
 
  [dir=ltr] #controls>ul>li {
    border-left: 1px solid var(--w3c-blue);
  }
 
  [dir=rtl] #controls>ul>li {
    border-right: 1px solid var(--w3c-blue);
  }
 
  [dir=ltr] #controls>ul>li {
    border-left: 1px solid #036;
  }
 
  [dir=rtl] #controls>ul>li {
    border-right: 1px solid #036;
  }
 
  #controls>ul>li:first-child {
    border-left: 0;
    border-right: 0;
    margin: 0;
    padding: 0;
  }
 
  #controls a {
    color: #036;
    color: var(--w3c-blue);
    text-decoration: none;
    padding: 2px 0;
  }
 
  #controls a:focus,
  #controls a:hover {
    border-bottom: none;
    text-decoration: underline;
  }
 
  @media print {
    #controls {
      display: none
    };
  }
 
  #controls [hidden] {
    display: none !important;
  }
 
  .languagelist>ul {
    display: inline;
    margin: 0;
    padding: 0;
  }
 
  .languagelist>ul>li {
    border: none;
    padding: 0;
    margin: 0;
    display: inline-block;
  }
 
  [dir=ltr] .languagelist>ul>li:first-child {
    margin-right: 4px;
  }
 
  [dir=rtl] .languagelist>ul>li:first-child {
    margin-left: 4px;
  }
 
  .languagelist>ul>li:first-child:before {
    display: none;
    margin: 0;
  }
 
  [dir=ltr] .languagelist>ul>li:before {
    margin-right: 4px;
  }
 
  [dir=rtl] .languagelist>ul>li:before {
    margin-left: 4px;
  }
 
  .languagelist>ul>li:before {
    content: "";
    display: inline-block;
    background-color: #005a9c;
    width: 4px;
    height: 4px;
    margin: 0;
    margin-top: -4px;
    vertical-align: middle;
  }
 
  #showoptions {
    display: inline;
  }
 
  .mainnav {
    position: relative;
    font-size: 14px;
    font-size: .875rem;
    border-top: 1px solid #005a9c;
    border-top: 1px solid var(--w3c-classic);
    border-bottom: 1px solid #005a9c;
    border-bottom: 1px solid var(--w3c-classic);
    background-color: #036;
    background-color: var(--w3c-blue);
    display: none;
  }
 
  .mainnav.open {
    display: block;
  }
 
  @media (min-width:35em) {
    .mainnav {
      display: block
    };
  }
 
  @media print {
    .mainnav {
      display: none
    };
  }
 
  .mainnav>ul {
    width: 100%;
    max-width: 1268px;
    padding: 0;
    margin: 0 auto !important;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: stretch;
    align-items: stretch;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
 
  @media (min-width:35em) {
    .mainnav>ul {
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap
    };
  }
 
  .mainnav>ul>li {
    display: block;
    position: relative;
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
  }
 
  .mainnav>ul>li.active {
    background: #036;
    background: var(--w3c-blue);
  }
 
  .mainnav>ul>li.active>a>span {
    border-bottom: 2px solid #eed009 !important;
    border-bottom: 2px solid var(--gold) !important;
  }
 
  .mainnav>ul>li>a {
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    color: var(--pure-white);
    text-align: center;
    min-height: 44px;
    box-sizing: border-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-bottom: #005a9c;
    border-bottom: var(--w3c-classic);
  }
 
  .mainnav>ul>li>a>span {
    display: block;
    border-bottom: 2px solid transparent;
  }
 
  .mainnav>ul>li>a:focus,
  .mainnav>ul>li>a:hover {
    background-color: #091832;
    background-color: var(--dk-blue);
  }
 
  .mainnav>ul>li>a:focus>span,
  .mainnav>ul>li>a:hover>span,
  .mainnav>ul>li>a[aria-current=location]>span,
  .mainnav>ul>li>a[aria-current=page]>span {
    border-bottom: 2px solid #eed009;
    border-bottom: 2px solid var(--gold);
  }
 
  .mainnav>ul>li>a[aria-current=location]:focus>span,
  .mainnav>ul>li>a[aria-current=location]:hover>span,
  .mainnav>ul>li>a[aria-current=page]:focus>span,
  .mainnav>ul>li>a[aria-current=page]:hover>span {
    border-bottom: 2px solid #fff;
    border-bottom: 2px solid var(--pure-white);
  }
 
  [dir=ltr] .mainnav>ul>li+li>a {
    border-left: 1px solid #235a97;
  }
 
  [dir=rtl] .mainnav>ul>li+li>a {
    border-right: 1px solid #235a97;
  }
 
  @media (min-width:60em) {
    #openmenu {
      display: none
    };
  }
 
  @media print {
    #openmenu {
      display: none
    };
  }
 
  @media (min-width:35em) {
    .page-home #openmenu {
      display: none
    };
  }
 
  [dir=ltr] .metanav {
    text-align: right;
  }
 
  [dir=rtl] .metanav {
    text-align: left;
  }
 
  .metanav {
    width: 100%;
    display: none;
    font-size: .85em;
  }
 
  .metanav.open {
    display: block;
  }
 
  @media (min-width:35em) {
    .metanav {
      display: block
    };
  }
 
  @media print {
    .metanav {
      display: none
    };
  }
 
  .metanav a {
    text-decoration: none;
  }
 
  .metanav a:focus,
  .metanav a:hover,
  .metanav a[aria-current=page] {
    text-decoration: underline;
  }
 
  .metanav>ul {
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
 
  .metanav>ul li {
    display: inline-block;
    padding-left: 8px;
    padding-right: 8px;
  }
 
  @media (min-width:35em) {
    .metanav>ul li {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center
    };
  }
 
  .metanav>ul li:first-child {
    border: 0;
  }
 
  .metanav>ul li:last-child {
    margin-bottom: 0;
    padding: 0;
    border: 0;
  }
 
  .metanav>ul li a {
    position: relative;
    min-height: 24px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
 
  .metanav>ul li a:after,
  .metanav>ul li a:before {
    position: absolute;
    top: 12px;
    left: -8px;
    bottom: 12px;
    width: 1px;
    background-color: #eed009;
    background-color: var(--gold);
  }
 
  [dir=ltr] .metanav>ul li a:before,
  [dir=rtl] .metanav>ul li a:after {
    content: "";
  }
 
  @media (min-width:35em) {
    [dir=ltr] .metanav>ul li a {
      text-align: right
    }
 
    [dir=rtl] .metanav>ul li a {
      text-align: left
    }
 
    .metanav>ul li a {
      width: 100%
    };
  }
 
  [dir=ltr] .metanav>ul li:first-child a:before,
  [dir=rtl] .metanav>ul li:nth-last-child(2) a:after {
    display: none;
  }
 
  .metanav form[role=search] {
    background-color: #036;
    background-color: var(--w3c-blue);
    border: 1px solid #fff;
    border: 1px solid var(--pure-white);
  }
 
  .metanav form[role=search]>div {
    display: -ms-flexbox;
    display: flex;
  }
 
  .metanav form[role=search] label {
    text-transform: none;
    font-weight: 400;
  }
 
  .metanav form[role=search] input {
    box-sizing: border-box;
    -webkit-appearance: none;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    color: #f2f2f2;
    color: var(--off-white);
    height: 100%;
    padding: 5px;
    margin: 0;
    width: 10em;
  }
 
  .metanav form[role=search] input:focus {
    color: #fff;
    color: var(--pure-white);
  }
 
  .metanav form[role=search] input::-webkit-search-decoration {
    display: none;
  }
 
  .metanav form[role=search] input::-webkit-search-cancel-button,
  .metanav form[role=search] input::-webkit-search-results-button {
    filter: invert(100%);
  }
 
  .metanav form[role=search] button {
    display: block;
    margin: 0;
  }
 
  .metanav form[role=search] ::-webkit-input-placeholder {
    color: #fff;
    color: var(--pure-white);
    font-style: italic;
    opacity: 1;
  }
 
  .metanav form[role=search] :-moz-placeholder,
  .metanav form[role=search] ::-moz-placeholder {
    color: #fff;
    color: var(--pure-white);
    font-style: italic;
    opacity: 1;
  }
 
  .metanav form[role=search] :-ms-input-placeholder {
    color: #fff;
    color: var(--pure-white);
    font-style: italic;
    opacity: 1;
  }
 
  .navigations {
    position: relative;
    grid-column-start: 6;
    grid-column-end: -2;
    -ms-flex-positive: 1;
    flex-grow: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
 
  .navigations .nava11y {
    display: block;
  }
 
  .mainnav>ul,
  .metanav>ul {
    margin: 0;
    padding: 0;
  }
 
  .mainnav>ul>li,
  .metanav>ul>li {
    list-style: none;
    margin: 0;
  }
 
  .teaser.news {
    background-color: #fff;
    background-color: var(--pure-white);
  }
 
  .announce-box {
    background-color: #fafafa;
    background-color: var(--lt-off-white);
    border: 1px solid #ddd;
    border: 1px solid var(--line-grey);
    border-top: 1px;
    border-bottom: 1px;
    border-left: 0;
    border-right: 0;
    padding: 10px 25px !important;
  }
 
  .announce-box+.announce-box {
    border-top-width: 0;
  }
 
  .announce-box>:first-child {
    margin-top: 0;
  }
 
  .announce-box>:last-child {
    margin-bottom: 0;
  }
 
  .notes {
    font-size: .85em;
  }
 
  .notes strong:first-child {
    font-weight: 700;
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .pager {
    background-color: #fff;
    background-color: var(--pure-white);
    border: 1px solid #ddd;
    border: 1px solid var(--line-grey);
    margin-top: 32px;
  }
 
  .pager>ul {
    box-sizing: border-box;
    -ms-flex-line-pack: center;
    align-content: center;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 0;
    padding: 8px;
  }
 
  .pager--item,
  .pager>ul {
    display: -ms-flexbox;
    display: flex;
  }
 
  .pager--item {
    -ms-flex: 0 1 50%;
    flex: 0 1 50%;
  }
 
  .pager--item:only-child {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
  }
 
  .pager--item {
    list-style: none;
    margin: 0;
  }
 
  .pager--item a:link {
    color: #005a6a;
    color: var(--wai-green);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex: 1 100%;
    flex: 1 100%;
    text-decoration: none;
    -ms-flex-align: center;
    align-items: center;
  }
 
  .pager--item a:visited {
    color: #606;
    color: var(--visited-link);
  }
 
  .pager--item a:focus,
  .pager--item a:hover {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .pager--item a:active {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  [dir=ltr] .pager--item.next a {
    text-align: right;
  }
 
  [dir=rtl] .pager--item.next a {
    text-align: left;
  }
 
  .pager--item.next a {
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
 
  .pager--item-icon {
    display: -ms-flexbox;
    display: flex;
    font-size: 33px;
  }
 
  [dir=ltr] .pager--item-text {
    margin-right: 8px;
  }
 
  [dir=ltr] .pager--item-text,
  [dir=rtl] .pager--item-text {
    margin-left: 8px;
  }
 
  [dir=rtl] .pager--item-text {
    margin-right: 8px;
  }
 
  .pager--item-text {
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 1 auto;
    flex: 1 auto;
    width: 100%;
    -ms-flex-direction: column;
    flex-direction: column;
  }
 
  .pager--item-text-direction {
    color: #1d1d1d;
    color: var(--off-black);
    font-size: 12px;
    font-size: .75rem;
  }
 
  .pager--item-text-target {
    font-size: 16px;
    font-size: 1rem;
    line-height: 1;
  }
 
  .pagination {
    margin: 0;
    margin-top: 16px;
    margin-bottom: 16px;
    padding-top: 16px;
    border-top: 2px solid #ddd;
    border-top: 2px solid var(--line-grey);
  }
 
  .pagination ul {
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
 
  [dir=ltr] .pagination li {
    margin-left: 8px;
  }
 
  [dir=rtl] .pagination li {
    margin-right: 8px;
  }
 
  .pagination .like-a,
  .pagination a {
    padding: 8px 16px;
    border-radius: 4px;
    border: 2px solid #ddd;
    border: 2px solid var(--line-grey);
  }
 
  .pagination .is-active .like-a {
    background-color: #036;
    background-color: var(--w3c-blue);
    border-color: #036;
    border-color: var(--w3c-blue);
    color: #fff;
    color: var(--pure-white);
  }
 
  .pagination a:focus,
  .pagination a:hover {
    background-color: #ddd;
    background-color: var(--line-grey);
  }
 
  .progress-bar {
    height: .25em;
    width: 100%;
    background-color: #bccbd3;
    background-color: var(--cloudy);
    position: relative;
  }
 
  .progress-bar__progress {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: #00818d;
    background: var(--ocean);
    transition: width .2s;
  }
 
  .progress-bar--highcontrast {
    background-color: #fafafc;
    background-color: var(--body-bg);
    border: 1px solid #196cac;
    border: 1px solid var(--light-blue);
  }
 
  .progress-bar--highcontrast .progress-bar__progress {
    background-color: #196cac;
    background-color: var(--light-blue);
  }
 
  .related-content {
    background-color: #fff;
    background-color: var(--pure-white);
    border: 1px solid #ddd;
    border: 1px solid var(--line-grey);
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 1 100%;
    flex: 1 100%;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 50px;
  }
 
  .related-content--head {
    -ms-flex-align: center;
    align-items: center;
    background-color: #f2f2f2;
    background-color: var(--off-white);
    border-box-end: 1px solid #ddd;
    border-box-end: 1px solid var(--line-grey);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    height: 48px;
  }
 
  [dir=ltr] .related-content--head-icon {
    margin-right: 10px;
  }
 
  [dir=rtl] .related-content--head-icon {
    margin-left: 10px;
  }
 
  [dir=ltr] .related-content--head-icon {
    margin-left: 19px;
  }
 
  [dir=rtl] .related-content--head-icon {
    margin-right: 19px;
  }
 
  .related-content--head-icon {
    height: 22px;
    width: 22px;
  }
 
  .related-content--head-heading {
    border: none;
    color: #036;
    color: var(--w3c-blue);
    -ms-flex: 1 100%;
    flex: 1 100%;
    font-size: 20px;
    margin: 0;
    padding: 0;
  }
 
  .related-content--content {
    margin: 0;
    padding: 0;
  }
 
  .related-content--content-list {
    list-style: none;
    margin: 22px;
    padding: 0;
  }
 
  .related-content--content-list li {
    font-size: 14px;
    line-height: 2.2em;
  }
 
  .resource-link {
    font-weight: 400;
    color: #3b3b3b;
    color: var(--dk-grey);
    border: 1px solid #ddd;
    border: 1px solid var(--line-grey);
    vertical-align: middle;
    margin: 2px 0;
    padding: 2px 4px;
    border-radius: 5px;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 13px;
    font-size: .8125rem;
    line-height: 1.4;
    text-decoration: none;
  }
 
  .resource-link:hover {
    border-color: #ddd;
    border-color: var(--line-grey);
  }
 
  .resource-link:visited {
    color: #3b3b3b;
    color: var(--dk-grey);
  }
 
  .resource-link:focus,
  .resource-link:hover {
    color: #1d1d1d;
    color: var(--off-black);
    background-color: #f2f2f2;
    background-color: var(--off-white);
  }
 
  .resource-link svg {
    margin-right: .25em;
  }
 
  .resource-link--no-icon {
    background-color: #fff;
    background-color: var(--pure-white);
    padding-left: .75em;
    padding-right: .75em;
  }
 
  .results-by-category ul {
    margin: 0;
    padding: 0;
  }
 
  .results-by-category {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -ms-flex-flow: wrap;
    flex-flow: wrap;
    background-color: #f2f2f2;
    background-color: var(--off-white);
    border-radius: .5em;
  }
 
  @media (min-width:60em) {
    .results-by-category__missing {
      column-count: 2
    };
  }
 
  .results-by-category__item {
    list-style: none;
    display: inline-block;
    margin: 1em;
    text-align: center;
  }
 
  .results-by-category__number {
    font-size: 1.5em;
    display: block;
    margin-bottom: .125em;
    line-height: 1;
    color: #00818d;
    color: var(--ocean);
  }
 
  @media (min-width:60em) {
    .results-by-category__number {
      font-size: 3em
    };
  }
 
  .results-by-category__label {
    font-size: 1.125em;
  }
 
  .sidenav {
    grid-area: navigation;
    margin-bottom: 24px;
    display: none;
  }
 
  .sidenav.open {
    display: block;
    margin-top: 16px;
  }
 
  @media (min-width:60em) {
    .sidenav {
      display: block
    };
  }
 
  @media print {
    .sidenav {
      display: none
    };
  }
 
  .sidenav--list>:first-child>a {
    color: #fff;
    color: var(--pure-white);
    font-size: 22px;
    font-size: 1.375rem;
    font-weight: 700;
    border-top: none;
  }
 
  [dir=ltr] .sidenav--list {
    border-left-width: 5px;
  }
 
  [dir=rtl] .sidenav--list {
    border-right-width: 5px;
  }
 
  [dir=ltr] .sidenav--list {
    border-right-width: 0;
  }
 
  [dir=rtl] .sidenav--list {
    border-left-width: 0;
  }
 
  .sidenav--list {
    background-color: #036;
    background-color: var(--w3c-blue);
    border: 2px solid #036;
    border: 2px solid var(--w3c-blue);
    border-bottom-width: 5px;
    border-top-width: 0;
    margin: 0;
    padding: 0;
    font-size: 13px;
    font-size: .8125rem;
  }
 
  .sidenav--list a {
    display: -ms-flexbox;
    display: flex;
    box-sizing: border-box;
    padding: 8px 24px;
    min-height: 44px;
    color: #fff;
    color: var(--pure-white);
    text-decoration: none;
    -ms-flex-align: center;
    align-items: center;
  }
 
  .sidenav--list a:focus,
  .sidenav--list a:hover {
    text-decoration: underline;
    background-color: #f2f2f2;
    background-color: var(--off-white);
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .sidenav--list a:focus {
    outline-color: #eed009;
    outline-color: var(--gold);
  }
 
  .sidenav--list a span.lang {
    font-weight: 400;
  }
 
  .sidenav--list li a {
    border-top: 1px solid #005a9c;
    border-top: 1px solid var(--w3c-classic);
  }
 
  .sidenav--list {
    .sidenav-head+& {
      border-top: none
    };
  }
 
  [dir=ltr] .sidenav--list ul {
    padding-left: 24px;
  }
 
  [dir=rtl] .sidenav--list ul {
    padding-right: 24px;
  }
 
  .sidenav--list ul {
    padding: 0;
    margin: 0;
  }
 
  .sidenav--list a+ul {
    display: none;
  }
 
  .sidenav--list a[aria-current]+ul {
    display: block;
  }
 
  .sidenav--list li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
 
  .sidenav--list ul li:first-child a {
    border-top-color: transparent;
  }
 
  .sidenav--list a[aria-current=location] {
    padding-bottom: 4px;
    font-weight: 700;
  }
 
  .sidenav--list a[aria-current=page] {
    font-weight: 700;
    color: #005a6a;
    color: var(--wai-green);
    background-color: #fafafc;
    background-color: var(--body-bg);
    position: relative;
  }
 
  .sidenav--list a[aria-current=page]:after,
  .sidenav--list a[aria-current=page]:before {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    left: auto;
    right: 0;
  }
 
  [dir=rtl] .sidenav--list a[aria-current=page]:after,
  [dir=rtl] .sidenav--list a[aria-current=page]:before {
    left: 0;
    right: auto;
  }
 
  .sidenav--list a[aria-current=page]:after,
  .sidenav--list a[aria-current=page]:before {
    border: 1px solid #fff;
    border: 1px solid var(--pure-white);
    opacity: .9;
  }
 
  .sidenav--list a[aria-current=page]:before {
    top: -2px;
    border-color: transparent #fff #fff transparent;
    border-color: transparent var(--pure-white) var(--pure-white) transparent;
  }
 
  [dir=rtl] .sidenav--list a[aria-current=page]:before {
    border-color: transparent transparent #fff #fff;
    border-color: transparent transparent var(--pure-white) var(--pure-white);
  }
 
  .sidenav--list a[aria-current=page]:after {
    bottom: -2px;
    border-color: #fff #fff transparent transparent;
    border-color: var(--pure-white) var(--pure-white) transparent transparent;
  }
 
  [dir=rtl] .sidenav--list a[aria-current=page]:after {
    border-color: #fff transparent transparent #fff;
    border-color: var(--pure-white) transparent transparent var(--pure-white);
  }
 
  .sidenav-languages {
    font-size: 13px;
    font-size: .8125rem;
    margin-top: 32px;
    margin-top: 2rem;
    border-radius: 3px;
    border: 2px solid #eed009;
    border: 2px solid var(--gold);
    background-color: #fff;
    background-color: var(--pure-white);
  }
 
  .sidenav-languages header {
    border-bottom: 2px solid #eed009;
    border-bottom: 2px solid var(--gold);
    padding: 8px 27px;
    font-weight: 700;
  }
 
  [dir=ltr] .sidenav-languages .langlist {
    padding-left: 27px;
  }
 
  [dir=rtl] .sidenav-languages .langlist {
    padding-right: 27px;
  }
 
  .sidenav-languages .langlist {
    list-style-position: inside;
    list-style-type: square;
    color: #005a9c;
    color: var(--w3c-classic);
  }
 
  .sidenav-languages .langlist li {
    margin-bottom: 2px;
  }
 
  [dir=ltr] .sidenav-languages p {
    padding-left: 27px;
  }
 
  [dir=rtl] .sidenav-languages p {
    padding-right: 27px;
  }
 
  [dir=ltr] .sidenav-languages p {
    padding-right: 0;
  }
 
  [dir=rtl] .sidenav-languages p {
    padding-left: 0;
  }
 
  .sidenav-languages p {
    padding-top: 4px;
    padding-bottom: 4px;
    margin: 0;
    border-top: 1px solid #eed009;
  }
 
  .leftcol .standalone-resource__main {
    grid-column: 2/8;
    grid-row-start: 1;
  }
 
  .standalone-resource__type-of-guidance {
    display: block;
    font-size: .5em;
    margin-bottom: .25em;
  }
 
  .leftcol .standalone-resource__sidebar {
    grid-column: 8/10;
    grid-row-start: 1;
  }
 
  .standalone-resource__sidebar h2 {
    margin-top: 0;
    margin-bottom: 0;
  }
 
  .standalone-resource__sidebar dd {
    margin-left: 0;
  }
 
  .standalone-resource__prevnext {
    grid-column: 2/8;
  }
 
  .list-of-sources {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
    grid-gap: 1em;
    gap: 1em;
  }
 
  .list-of-sources li {
    list-style: none;
    margin-bottom: 0;
  }
 
  .list-of-sources li a {
    display: block;
    text-decoration: none;
    padding: 1em;
    background: #fff;
    background: var(--pure-white);
    border: 1px solid #ddd;
    border: 1px solid var(--line-grey);
    color: #1d1d1d;
    color: var(--off-black);
  }
 
  .list-of-sources li a:hover {
    background-color: #fafafa;
    background-color: var(--lt-off-white);
  }
 
  [dir=ltr] caption,
  [dir=ltr] table {
    text-align: left;
  }
 
  [dir=rtl] caption,
  [dir=rtl] table {
    text-align: right;
  }
 
  table {
    border: 1px solid #bccbd3;
    border: 1px solid var(--cloudy);
    border-collapse: collapse;
    margin-bottom: 2em;
  }
 
  caption {
    font-weight: 700;
    font-size: 18px;
    font-size: 1.125rem;
    color: #005a6a;
    color: var(--wai-green);
    line-height: 1.4;
    margin-bottom: 8px;
  }
 
  td,
  th {
    padding: 12px 18px;
    border: 1px solid #bccbd3;
    border: 1px solid var(--cloudy);
    vertical-align: top;
  }
 
  .dense td,
  .dense th {
    padding: 2px 4px;
  }
 
  th {
    font-weight: 700;
    color: #fff;
    color: var(--pure-white);
    background-color: #005a6a;
    background-color: var(--wai-green);
  }
 
  th a {
    color: inherit;
  }
 
  th a:focus,
  th a:hover {
    color: #eed009;
    color: var(--gold);
  }
 
  th a:visited {
    color: inherit;
  }
 
  td>:first-child,
  td>:last-child,
  th>:first-child,
  th>:last-child {
    margin-top: 0;
  }
 
  .quiet th {
    background-color: #f2f2f2;
    background-color: var(--off-white);
    color: #036;
    color: var(--w3c-blue);
  }
 
  .quiet th a {
    color: inherit;
  }
 
  .quiet th a:focus,
  .quiet th a:hover {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .quiet th a:visited {
    color: inherit;
  }
 
  .hyphenated {
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }
 
  .teaser.audiences-inline .title {
    display: block;
    font-size: 36px;
    font-size: 2.25rem;
  }
 
  .making-web-accessible {
    text-align: center;
    border-bottom: 1px solid #ddd;
    border-bottom: 1px solid var(--line-grey);
    -ms-flex-direction: column;
    flex-direction: column;
  }
 
  .making-web-accessible [hidden] {
    display: none !important;
  }
 
  .making-web-accessible .inner.hidesection {
    position: relative;
    -ms-flex-order: -1;
    order: -1;
  }
 
  [dir=ltr] .making-web-accessible .making-web-accessible-box {
    text-align: left;
  }
 
  [dir=rtl] .making-web-accessible .making-web-accessible-box {
    text-align: right;
  }
 
  [dir=ltr] .making-web-accessible .mwa-icon {
    margin-right: 16px;
    margin-right: 1rem;
  }
 
  [dir=rtl] .making-web-accessible .mwa-icon {
    margin-left: 16px;
    margin-left: 1rem;
  }
 
  .making-web-accessible .mwa-icon {
    width: 65px;
    height: 65px;
  }
 
  .making-web-accessible .mwa-icon.mwa-icon-book {
    height: 49px;
    padding-top: 16px;
  }
 
  .making-web-accessible .mwa-icon.mwa-icon-computer {
    height: 57px;
    padding-top: 8px;
  }
 
  .making-web-accessible .title {
    display: block;
    font-size: 36px;
    font-size: 2.25rem;
  }
 
  .making-web-accessible .teaser-h h2 {
    margin: 0;
  }
 
  .making-web-accessible .teaser-h p {
    margin-bottom: 8px;
    margin-bottom: .5rem;
  }
 
  .making-web-accessible h3 {
    margin-top: 10px;
    font-size: 24px;
    font-size: 1.5rem;
    margin-bottom: 0;
  }
 
  .making-web-accessible p {
    margin-top: 8px;
    margin-top: .5rem;
    margin-bottom: 0;
  }
 
  [dir=ltr] .making-web-accessible .showhidebutton {
    float: right;
  }
 
  [dir=rtl] .making-web-accessible .showhidebutton {
    float: left;
  }
 
  .making-web-accessible .showhidebutton {
    position: absolute;
    top: -1.35em;
    right: 0;
  }
 
  .teaser.media-inline .title {
    display: block;
    font-size: 36px;
    font-size: 2.25rem;
  }
 
  .white-bg {
    background-color: #fff;
    background-color: var(--pure-white);
  }
 
  .bordered {
    border: 0;
    border-color: #ddd;
    border-color: var(--line-grey);
  }
 
  .teaser.news-teaser .title {
    display: block;
    font-size: 36px;
    font-size: 2.25rem;
  }
 
  .teaser.news-teaser h3 {
    margin-bottom: 0;
  }
 
  .teaser.news-teaser p {
    margin: 0;
  }
 
  .teaser.resource-inline .title {
    display: block;
    font-size: 36px;
    font-size: 2.25rem;
  }
 
  .teaser {
    padding-top: 32px;
    padding-bottom: 32px;
  }
 
  .teaser.featured {
    background-size: cover;
    background-position: 50%;
  }
 
  .teaser.featured .teaser-c {
    background-color: hsla(0, 0%, 100%, .9);
    border-top: 5px solid #c0272d;
    border-top: 5px solid var(--faded-red);
    padding: 16px 32px;
    display: block;
  }
 
  .teaser-h h2,
  .teaser-h h3,
  .teaser-h h4,
  .teaser-h h5,
  .teaser-h h6 {
    margin: 0;
    margin-bottom: 16px;
    padding: 0;
    border: none;
    color: #005a6a;
    color: var(--wai-green);
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.2;
  }
 
  .teaser-h h2.title,
  .teaser-h h3.title,
  .teaser-h h4.title,
  .teaser-h h5.title,
  .teaser-h h6.title {
    font-size: 24px;
    font-size: 1.5rem;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 20px;
  }
 
  @media (min-width:35em) {
 
    .teaser-h h2.title,
    .teaser-h h3.title,
    .teaser-h h4.title,
    .teaser-h h5.title,
    .teaser-h h6.title {
      font-size: 2rem
    };
  }
 
  @media (min-width:60em) {
 
    .teaser-h h2.title,
    .teaser-h h3.title,
    .teaser-h h4.title,
    .teaser-h h5.title,
    .teaser-h h6.title {
      font-size: 2.375rem
    };
  }
 
  .teaser-h .subtitle {
    font-weight: 700;
    margin: 0;
    font-size: 14px;
    font-size: .875rem;
    color: #1d1d1d;
    color: var(--off-black);
  }
 
  [dir=ltr] .teaser-h-icon {
    margin-right: 10px;
  }
 
  [dir=rtl] .teaser-h-icon {
    margin-left: 10px;
  }
 
  .teaser-h-icon {
    height: 1em;
    width: 1em;
    vertical-align: middle;
  }
 
  .teaser-h-icon.full {
    display: block;
    height: 1.8em;
    width: 1.8em;
  }
 
  .teaser-tip {
    text-align: center;
  }
 
  .teaser-tip .teaser-h h2 {
    font-size: 28px;
    font-size: 1.75rem;
  }
 
  .teaser-tip .teaser-h svg {
    display: block;
    margin: 0 auto;
    height: 1.75em;
    width: 1.75em;
  }
 
  .teaser-tip .fakelink {
    margin: 0 auto;
  }
 
  .fakelink {
    text-decoration: underline;
    position: relative;
  }
 
  [dir=ltr] .fakelink svg {
    margin-left: 5px;
  }
 
  [dir=rtl] .fakelink svg {
    margin-right: 5px;
  }
 
  .fakelink svg {
    width: .75em;
    height: .75em;
  }
 
  @media (min-width:35em) {
    .teaser-about p {
      font-size: 1.25rem
    };
  }
 
  @media (min-width:60em) {
    .teaser-about p {
      font-size: 1.5rem
    };
  }
 
  .teaser-about p {
    color: #686868;
    color: var(--grey);
  }
 
  .teaser-about .teaser-h h2 {
    font-weight: 700;
  }
 
  .teaser-media {
    -ms-flex-align: center;
    align-items: center;
    background-color: #fff;
    background-color: var(--pure-white);
  }
 
  .teaser-sponsors {
    border-top: 1px solid #ddd;
    border-top: 1px solid var(--line-grey);
  }
 
  .area-teaser {
    display: block;
    background-color: #fff;
    background-color: var(--pure-white);
    border: 1px solid #ddd;
    border: 1px solid var(--line-grey);
    margin: -1px;
    padding: 20px 32px;
  }
 
  @media (min-width:35em) {
    .area-teaser {
      padding: 40px
    };
  }
 
  @media (min-width:60em) {
    .area-teaser {
      padding: 60px 40px
    };
  }
 
  .area-teaser .teaser-h {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: end;
    align-items: flex-end;
  }
 
  .area-teaser .teaser-h h2,
  .area-teaser .teaser-h h3,
  .area-teaser .teaser-h h4,
  .area-teaser .teaser-h h5,
  .area-teaser .teaser-h h6 {
    margin: 0;
    font-weight: 400;
  }
 
  .area-teaser .teaser-h-icon {
    margin-bottom: 10px;
  }
 
  .area-teaser:focus .teaser-h>:not(svg),
  .area-teaser:hover .teaser-h>:not(svg) {
    text-decoration: underline;
  }
 
  .video-card {
    max-width: 100%;
    width: 100%;
  }
 
  @media (min-width:47.5em) {
    [dir=ltr] .video-card {
      float: right
    }
 
    [dir=rtl] .video-card {
      float: left
    }
 
    [dir=ltr] .video-card {
      margin-left: 2em
    }
 
    [dir=rtl] .video-card {
      margin-right: 2em
    }
 
    .video-card {
      max-width: 45%
    };
  }
 
  .video-card p {
    font-size: small;
  }
 
  .video-card video {
    max-width: 100%;
    width: 100%;
    height: auto;
  }
 
  [dir=ltr] .video-card~aside,
  [dir=ltr] .video-card~h2,
  [dir=ltr] .video-card~hr {
    clear: right;
  }
 
  [dir=rtl] .video-card~aside,
  [dir=rtl] .video-card~h2,
  [dir=rtl] .video-card~hr {
    clear: left;
  }
 
  .video-card .able {
    margin-top: 0;
  }
 
  .video-link {
    display: inline-block;
    text-decoration: none;
    margin: 10px 0;
  }
 
  .video-link span {
    display: block;
    text-align: center;
    text-decoration: underline;
  }
 
  .video-link img {
    width: 240px;
    border-radius: 1rem;
  }
 
  .video-link-small img {
    width: 120px;
    border-radius: .5rem;
  }
 
  .video-link-inline {
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
    align-items: center;
  }
 
  [dir=ltr] .video-link-inline img {
    margin-right: 1em;
  }
 
  [dir=rtl] .video-link-inline img {
    margin-left: 1em;
  }
 
  .video-link-inline img {
    width: auto;
    height: 2em;
    border-radius: .25rem;
  }
 
  .video-link-inline {
    [dir=ltr] span {
      text-align: left
    }
 
    [dir=rtl] span {
      text-align: right
    };
  }
 
  .able-wrapper {
    margin: 1em 0;
    max-width: 100%;
    height: auto;
    box-sizing: content-box !important;
    text-align: left;
  }
 
  .able,
  .able-wrapper {
    position: relative;
    padding: 0;
  }
 
  .able {
    margin: 0;
    width: 100%;
    background-color: #000;
    box-shadow: 0 0 16px #262626;
    z-index: 5000;
  }
 
  .able-column-left,
  .able-column-right {
    float: left;
  }
 
  .able .able-vidcap-container {
    background-color: #000;
    left: 0;
    margin: 0;
    position: relative;
    top: 0;
  }
 
  .able .able-audcap-container {
    background-color: #000;
    position: relative;
    margin: 0;
    padding: 1.5em .25em;
  }
 
  .able-player {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #262626;
  }
 
  .able-audio {
    padding-top: 1em;
  }
 
  .able-offscreen {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
 
  .able-media-container audio {
    display: none !important;
  }
 
  .able-controller {
    position: relative;
    border-bottom: 1px solid #4c4c4c;
    background-color: #464646;
    min-height: 38px;
    padding: 0;
  }
 
  .able-poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: auto !important;
  }
 
  .able .able-vidcap-container {
    overflow: visible;
  }
 
  .able-media-container iframe,
  .able .able-vidcap-container video {
    max-width: 100%;
  }
 
  .able-big-play-button {
    position: absolute;
    font-size: 8em;
    color: #fdfdfd;
    background-color: transparent;
    border: none;
    outline: none;
    left: 0;
    top: 0;
    padding: 0;
    z-index: 6500;
    opacity: .75;
    filter: alpha(opacity=75);
  }
 
  .able-big-play-button:focus,
  .able-big-play-button:hover {
    opacity: 1;
    filter: alpha(opacity=100);
  }
 
  .able-big-play-button .icon-play,
  .able-big-play-button svg {
    background-color: #000;
    padding: 16px 32px;
    padding: 1rem 2rem;
  }
 
  .able-big-play-button:hover .icon-play,
  .able-big-play-button:hover svg {
    outline-style: solid;
    outline-width: medium;
    outline-color: #8ab839 !important;
  }
 
  .able-big-play-button:focus .icon-play,
  .able-big-play-button:focus svg {
    outline-style: solid;
    outline-width: medium;
    outline-color: #ffbb37 !important;
  }
 
  .able-left-controls,
  .able-right-controls {
    overflow: visible;
  }
 
  .able-left-controls div[role=button],
  .able-right-controls div[role=button] {
    vertical-align: middle;
  }
 
  .able-left-controls {
    float: left;
  }
 
  .able-right-controls {
    float: right;
  }
 
  .able-black-controls,
  .able-black-controls div[role=button],
  .able-black-controls label {
    color: #000 !important;
  }
 
  .able-black-controls .able-seekbar {
    border: 1px solid #000;
  }
 
  .able-black-controls label,
  .able-white-controls,
  .able-white-controls div[role=button] {
    color: #fff !important;
  }
 
  .able-white-controls .able-seekbar {
    border: 1px solid #fff;
  }
 
  .able-controller div[role=button] {
    background: none;
    position: relative;
    display: inline-block;
    border-style: none;
    margin: 3px;
    padding: 0;
    font-size: 20px;
    min-width: 24px;
    border: none;
    overflow: visible !important;
    z-index: 6600;
  }
 
  .able-controller div[role=button]>img,
  .able-controller div[role=button]>span {
    width: 20px;
    margin: 0 auto;
    padding: 0;
    z-index: 6700;
  }
 
  .able-controller .buttonOff {
    opacity: .5;
    filter: alpha(opacity=50);
    z-index: 6800;
  }
 
  .able-controller .able-seekbar {
    margin: 0 5px;
    z-index: 6900;
  }
 
  .able-controller div[role=button]:focus,
  .able-controller div[role=button]:hover {
    outline-style: solid;
    outline-width: medium;
  }
 
  .able-controller div[role=button]:hover {
    outline-color: #8ab839 !important;
  }
 
  .able-controller div[role=button]:focus {
    outline-color: #ffbb37 !important;
  }
 
  .able-controller button::-moz-focus-inner,
  .able-search-results button::-moz-focus-inner {
    border: 0;
  }
 
  .able-seekbar-wrapper {
    display: inline-block;
    vertical-align: middle;
  }
 
  .able-seekbar {
    position: relative;
    height: .5em;
    border: 1px solid;
    background-color: #000;
    margin: 0 3px;
    border: 2px solid #fff;
  }
 
  .able-seekbar-loaded {
    background-color: #464646;
    z-index: 5100;
  }
 
  .able-seekbar-loaded,
  .able-seekbar-played {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    height: .5em;
  }
 
  .able-seekbar-played {
    background-color: #dadada;
    z-index: 5200;
  }
 
  .able-seekbar-head {
    display: inline-block;
    position: relative;
    left: 0;
    top: -.4em;
    background-color: #fdfdfd;
    width: .8em;
    height: .8em;
    border: 1px solid;
    border-radius: .8em;
    z-index: 5500;
  }
 
  .able-volume-slider {
    width: 34px;
    height: 80px;
    background-color: #464646;
    margin: 0;
    padding: 5px 0;
    position: absolute;
    right: 0;
    bottom: 60px;
    display: block;
    z-index: 9100;
  }
 
  .able-volume-help {
    display: none;
  }
 
  .able-volume-slider input[type=range] {
    -webkit-appearance: slider-vertical;
    -moz-appearance: slider-vertical;
    appearance: slider-vertical;
    -ms-writing-mode: bt-rl;
    writing-mode: bt-rl;
    width: 28px;
    height: 100%;
    background: transparent;
  }
 
  .able-volume-slider input[type=range]::-moz-range-track {
    border: 1px solid #fff;
    width: 7px;
    cursor: pointer;
    background: #000;
  }
 
  input[type=range]::-moz-range-thumb {
    background-color: #fdfdfd;
    outline: 1px solid #333;
    height: 16px;
    width: 24px;
    z-index: 9175;
  }
 
  .able-status-bar {
    height: 1.5em;
    min-height: 1.5em;
    color: #ccc;
    font-size: .9em;
    background-color: transparent;
    padding: .5em .5em .25em;
  }
 
  .able-status-bar span.able-timer {
    text-align: left;
    float: left;
    width: 32%;
  }
 
  .able-status-bar span.able-speed {
    float: left;
    width: 33%;
    text-align: center;
  }
 
  .able-status {
    font-style: italic;
    float: right;
    width: 32%;
    text-align: right;
  }
 
  div.able-captions-wrapper {
    width: 100%;
    margin: 0;
    padding: 0;
    text-align: center;
    display: block;
    z-index: 6000;
  }
 
  div.able-captions {
    display: none;
    padding: .15em .25em;
    line-height: 1.35em;
    background-color: #000;
    font-size: 1em;
    color: #fff;
    opacity: .75;
  }
 
  div.able-vidcap-container div.able-captions-overlay {
    position: absolute;
    margin: 0;
    bottom: .5em;
  }
 
  div.able-vidcap-container div.able-captions-below {
    position: relative;
    min-height: 3.2em;
  }
 
  div.able-audcap-container.captions-off {
    display: none;
  }
 
  div.able-descriptions {
    position: relative;
    color: #ff6;
    background-color: #262626;
    min-height: 2.8em;
    border-top: 1px solid #666;
    margin: 0;
    padding: 3%;
    width: 94%;
    text-align: center;
  }
 
  div.able-now-playing {
    text-align: center;
    font-weight: 700;
    font-size: 1.1em;
    color: #fff;
    background-color: transparent;
    padding: .5em .5em 1em;
  }
 
  div.able-now-playing span {
    font-size: .9em;
  }
 
  div.able-now-playing span span {
    display: block;
  }
 
  div.able-video div.able-now-playing {
    display: none;
  }
 
  div.able-modal-dialog {
    position: absolute;
    height: auto;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    top: 5%;
    left: 0;
    right: 0;
    outline: 0 none;
    display: none;
    color: #000;
    background-color: #fafafa;
    box-sizing: content-box !important;
    z-index: 10000;
    max-height: 90%;
    overflow: scroll;
  }
 
  @supports (transform:translate(-50%, -50%)) {
    div.able-modal-dialog {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) !important
    };
  }
 
  div.able-modal-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .5;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    display: none;
    z-index: 9500;
  }
 
  button.modalCloseButton {
    position: absolute;
    top: 5px;
    right: 5px;
  }
 
  button.modal-button {
    margin-right: 5px;
  }
 
  div.able-modal-dialog button:focus,
  div.able-modal-dialog button:hover,
  div.able-modal-dialog input:focus,
  div.able-modal-dialog input:hover {
    outline-style: solid;
    outline-width: 2px;
  }
 
  div.able-modal-dialog button:hover,
  div.able-modal-dialog input:hover {
    outline-color: #8ab839;
  }
 
  div.able-modal-dialog button:focus,
  div.able-modal-dialog input:focus {
    outline-color: #ffbb37;
  }
 
  div.able-modal-dialog h1 {
    font-weight: 700;
    font-size: 1.8em;
    line-height: 1.2em;
    margin: .75em 0;
    color: #000;
    text-align: center;
  }
 
  .able-help-div,
  .able-prefs-form,
  .able-resize-form {
    background-color: #f5f5f5;
    border: medium solid #ccc;
    padding: .5em 1em;
    margin: 0 0 0 1em;
    width: 25em;
    display: none;
  }
 
  .able-prefs-form div[role=group] {
    margin: 1em 0;
    padding: 0;
    border: none;
  }
 
  .able-prefs-form h2 {
    color: #000;
    font-weight: 700;
  }
 
  .able-prefs-form div[role=group]>div {
    display: table;
    margin-left: 1em;
  }
 
  .able-prefs-form div[role=group]>div>input {
    display: table-cell;
    width: 1em;
    vertical-align: middle;
  }
 
  .able-prefs-form div[role=group]>div>label {
    display: table-cell;
    padding-left: .5em;
  }
 
  .able-desc-pref-prompt {
    font-weight: 700;
    font-style: italic;
    margin-left: 1em !important;
  }
 
  .able-prefDescFormat>div {
    margin-left: 1.5em;
  }
 
  .able-prefs-captions label,
  .able-prefs-captions select {
    display: block;
    float: left;
    margin-bottom: .25em;
  }
 
  .able-prefs-captions label {
    width: 6em;
    text-align: right;
    padding-right: 1em;
  }
 
  .able-prefs-captions select {
    width: 10em;
    font-size: .9em;
    border-radius: none;
  }
 
  .able-prefs-descriptions>div.able-prefs-select {
    margin: .5em 1em;
  }
 
  .able-prefs-descriptions>div.able-prefs-select>label,
  .able-prefs-descriptions>div.able-prefs-slider>label {
    width: 6em;
    text-align: right;
    padding-right: 1em;
  }
 
  .able-prefs-descriptions>div.able-prefs-select>select,
  .able-prefs-descriptions>div.able-prefs-slider>select {
    width: 10em;
    font-size: .9em;
    border-radius: none;
  }
 
  div.able-prefDescPause {
    margin-top: 1em;
  }
 
  .able-prefs-form div.able-captions-sample {
    padding: .5em;
    text-align: center;
  }
 
  .able-prefs-form div.able-desc-sample {
    padding: .5em;
    text-align: center;
    color: #fff;
    background-color: #000;
  }
 
  .able-prefs-form h2 {
    margin-top: 0;
    margin-bottom: .5em;
    font-size: 1.1em;
  }
 
  .able-prefs-form ul {
    margin-top: 0;
  }
 
  able-prefs-form-keyboard ul {
    list-style-type: none;
  }
 
  span.able-modkey-alt,
  span.able-modkey-ctrl,
  span.able-modkey-shift {
    color: #666;
    font-style: italic;
  }
 
  span.able-modkey {
    font-weight: 700;
    color: #000;
    font-size: 1.1em;
  }
 
  .able-resize-form h1 {
    font-size: 1.15em;
  }
 
  .able-resize-form div div {
    margin: 1em;
  }
 
  .able-resize-form label {
    padding-right: .5em;
    font-weight: 700;
  }
 
  .able-resize-form input[type=text] {
    font-size: 1em;
  }
 
  .able-resize-form input[readonly] {
    color: #aaa;
  }
 
  .able-window-toolbar {
    background-color: #464646;
    min-height: 15px;
    padding: 10px;
    border-style: solid;
    border-width: 0 0 1px;
  }
 
  .able-draggable:hover {
    cursor: move;
  }
 
  .able-window-toolbar .able-button-handler-preferences {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.5em;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    z-index: 9300;
  }
 
  .able-window-toolbar .able-button-handler-preferences:focus,
  .able-window-toolbar .able-button-handler-preferences:hover {
    outline-style: solid;
    outline-width: medium;
  }
 
  .able-window-toolbar .able-button-handler-preferences:hover {
    outline-color: #8ab839 !important;
  }
 
  .able-window-toolbar .able-button-handler-preferences:focus {
    outline-color: #ffbb37 !important;
  }
 
  .able-window-toolbar .able-popup {
    position: absolute;
    cursor: default;
    right: 0;
    top: 0;
    display: block;
  }
 
  .able-drag {
    border: 2px dashed #f90;
    cursor: move;
  }
 
  .able-resizable {
    position: absolute;
    width: 20px;
    height: 20px;
    padding: 5px 2px;
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
  }
 
  .able-resizable svg line {
    stroke: #595959;
    stroke-width: 2px;
  }
 
  .able-sign-window {
    position: relative;
    margin: 1em;
    z-index: 8000;
  }
 
  .able-sign-window video {
    width: 100%;
  }
 
  .able-sign-window:focus {
    outline: none;
  }
 
  div.able-chapters-div {
    padding: 0;
  }
 
  div.able-chapters-div .able-chapters-heading {
    margin: 1em .75em;
    font-size: 1.1em;
    font-weight: 700;
  }
 
  div.able-chapters-div ul {
    list-style-type: none;
    padding-left: 0;
  }
 
  div.able-chapters-div ul li {
    max-width: 100%;
    padding: 0;
    height: 2em;
  }
 
  div.able-chapters-div button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    color: #000;
    font-size: 1em;
    text-align: left;
    padding: .15em 1em;
  }
 
  div.able-chapters-div li.able-current-chapter {
    background-color: #000 !important;
  }
 
  div.able-chapters-div li.able-current-chapter button {
    color: #fff !important;
  }
 
  div.able-chapters-div li.able-focus {
    background-color: #4c4c4c;
  }
 
  div.able-chapters-div button::-moz-focus-inner,
  div.able-chapters-div button:focus,
  div.able-chapters-div button:hover {
    border: 0;
    outline: none;
    color: #fff !important;
  }
 
  div.able-wrapper.fullscreen {
    margin: 0 !important;
    position: fixed !important;
    top: 0 !important;
    background: none !important;
  }
 
  .able-alert,
  .able-tooltip {
    position: absolute;
    padding: 5px 10px;
    border-color: #000;
    border-width: 1px;
    color: #000 !important;
    background-color: #ccc;
    border-radius: 5px;
    display: block;
  }
 
  .able-alert {
    background-color: #ffc;
    box-shadow: 0 0 16px #262626;
    z-index: 9400;
    position: absolute;
    top: 1em;
  }
 
  .able-popup {
    z-index: 9200;
  }
 
  .able-tooltip {
    z-index: 9000;
  }
 
  .able-popup {
    position: absolute;
    margin: 0;
    padding: 0;
    border-color: #000;
    border-width: 1px;
    background-color: #000;
    opacity: .85;
    border-radius: 5px;
    display: block;
    cursor: default;
  }
 
  ul.able-popup {
    list-style-type: none;
  }
 
  .able-popup li {
    padding: .25em 1em .25em .25em;
    margin: 1px;
    width: auto;
    color: #fff;
  }
 
  .able-popup li.able-focus {
    background-color: #ccc;
    color: #000;
  }
 
  .able-popup-captions li {
    padding-left: 1em;
  }
 
  .able-popup-captions li[aria-checked=true] {
    padding-left: 0;
  }
 
  .able-popup-captions li[aria-checked=true]:before {
    content: "\\2713";
  }
 
  .able-transcript-area {
    border-width: 1px;
    border-style: solid;
    height: 400px;
    z-index: 7000;
    outline: none;
    padding-bottom: 25px;
    background-color: #fff;
  }
 
  .able-transcript {
    position: relative;
    overflow-y: scroll;
    padding-left: 5%;
    padding-right: 5%;
    background-color: #fff;
    height: 350px;
  }
 
  .able-transcript div {
    margin: 1em 0;
  }
 
  .able-transcript-heading {
    font-size: 1.4em;
    font-weight: 700;
    margin: 1em 0;
    padding: 0;
  }
 
  .able-transcript-chapter-heading {
    font-size: 1.2em;
    font-weight: 700;
    margin: 0;
    padding: 0;
  }
 
  .able-transcript div.able-transcript-desc {
    background-color: #fee;
    border: thin solid #336;
    font-style: italic;
    padding: 1em;
  }
 
  .able-transcript .able-unspoken {
    font-weight: 700;
  }
 
  .able-transcript .able-hidden {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
  }
 
  .able-highlight,
  .able-highlight span:active,
  .able-highlight span:focus,
  .able-highlight span:hover {
    background-color: #000 !important;
    color: #fff !important;
    padding: .25em .1em;
    border: none;
    outline: none;
  }
 
  .able-previous {
    background: #000 !important;
    font-style: italic;
  }
 
  .able-transcript span:active,
  .able-transcript span:focus,
  .able-transcript span:hover {
    background: #ffc;
    color: #000;
    border: none;
    outline: none;
    border-bottom: 1px solid #000;
    cursor: pointer;
  }
 
  .able-window-toolbar label {
    display: inline;
    margin-right: 10px;
    color: #fff;
  }
 
  .able-controller div[role=button]:focus,
  .able-controller div[role=button]:hover,
  .able-controller input:focus,
  .able-controller input:hover,
  .able-seekbar-head:focus,
  .able-seekbar-head:hover,
  .able-window-toolbar input:focus,
  .able-window-toolbar input:hover,
  .able-window-toolbar select:focus,
  .able-window-toolbar select:hover {
    outline-style: solid;
    outline-width: 2px;
  }
 
  .able-controller div[role=button]:focus,
  .able-controller input:focus,
  .able-seekbar-head:focus,
  .able-window-toolbar input:focus,
  .able-window-toolbar select:focus {
    outline-color: #ffbb37;
  }
 
  .able-controller div[role=button]:hover,
  .able-controller input:hover,
  .able-seekbar-head:hover,
  .able-window-toolbar input:hover,
  .able-window-toolbar select:hover {
    outline-color: #8ab839;
  }
 
  .able-window-toolbar .transcript-language-select-wrapper {
    float: right;
    padding-right: 30px;
  }
 
  .able-playlist {
    list-style-type: none;
    margin: 0;
    background-color: #fff;
    padding: 5px 0;
  }
 
  .able-playlist li {
    background-color: #ddd;
    margin: 5px;
    padding: 0;
    border: 2px solid #aaa;
    border-radius: 5px;
    width: auto;
    max-width: 100%;
  }
 
  .able-playlist li button {
    border: none;
    color: #000;
    background-color: transparent;
    font-size: 1em;
    width: 100%;
    padding: 5px 10px;
    text-align: left;
  }
 
  .able-playlist li button:active,
  .able-playlist li button:focus,
  .able-playlist li button:hover {
    background-color: #ffeeb3;
    color: #000;
    text-decoration: none;
    outline: none;
  }
 
  .able-playlist li button::-moz-focus-inner {
    border: 0;
  }
 
  .able-playlist li button img {
    width: 100px;
    float: left;
    margin-right: 10px;
  }
 
  .able-playlist li.able-current {
    background-color: #340449;
    border-color: #230330;
  }
 
  .able-playlist li.able-current button {
    color: #fff;
    font-weight: 700;
    text-decoration: none;
    outline: none;
  }
 
  .able-playlist li.able-current button:active,
  .able-playlist li.able-current button:focus,
  .able-playlist li.able-current button:hover {
    color: #000;
  }
 
  #able-search-term-echo {
    font-weight: 700;
    font-style: italic;
  }
 
  .able-search-results ul li {
    font-size: 1.1em;
    margin-bottom: 1em;
  }
 
  button.able-search-results-time {
    font-size: 1em;
    font-weight: 700;
    cursor: pointer;
  }
 
  button.able-search-results-time:active,
  button.able-search-results-time:focus,
  button.able-search-results-time:hover {
    color: #fff;
    background-color: #000;
  }
 
  .able-search-results-text {
    padding-left: 1em;
  }
 
  .able-search-term {
    background-color: #ffc;
    font-weight: 700;
  }
 
  #search-term {
    font-weight: 700;
    font-style: italic;
  }
 
  #able-vts-instructions {
    margin-bottom: 1.5em;
    padding: 1em;
    border: 1px solid #999;
    width: 720px;
    max-width: 90%;
  }
 
  #able-vts fieldset {
    margin: 1em;
    border: none;
  }
 
  #able-vts fieldset legend {
    color: #000;
    font-weight: 700;
  }
 
  #able-vts fieldset div {
    float: left;
    padding-right: 1em;
  }
 
  #able-vts table {
    clear: left;
  }
 
  #able-vts table,
  #able-vts table td,
  #able-vts table th {
    border: 1px solid #000;
    border-collapse: collapse;
    padding: .5em .75em;
  }
 
  #able-vts table th.actions {
    min-width: 140px;
  }
 
  #able-vts table td button {
    width: auto;
    padding: 0;
    margin: 2px;
  }
 
  #able-vts table td button svg {
    width: 16px;
    height: 16px;
  }
 
  #able-vts table button:hover svg {
    fill: #c00;
  }
 
  tr.kind-chapters,
  tr.kind-subtitles {
    background-color: #fff;
  }
 
  tr.kind-descriptions {
    background-color: #fee;
  }
 
  tr.kind-chapters {
    background-color: #e6ffe6;
  }
 
  .able-vts-dragging {
    background-color: #ffc;
  }
 
  div#able-vts-icon-credit {
    margin: 1em;
  }
 
  div#able-vts-alert {
    display: none;
    position: fixed;
    top: 5px;
    left: 5px;
    border: 2px solid #666;
    background-color: #ffc;
    padding: 1em;
    font-weight: 700;
    z-index: 9400;
  }
 
  button#able-vts-save {
    font-size: 1em;
    padding: .25em;
    border-radius: 5px;
    margin-bottom: 1em;
    font-weight: 700;
  }
 
  button#able-vts-save:focus,
  button#able-vts-save:hover {
    color: #fff;
    background-color: #060;
  }
 
  #able-vts textarea,
  .able-vts-output-instructions {
    width: 720px;
    max-width: 90%;
  }
 
  #able-vts textarea {
    height: 200px;
  }
 
  .able-clipped,
  .able-screenreader-alert {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
  }
 
  .able-error {
    display: block;
    background: #ffc;
    border: 2px solid #000;
    color: red;
    margin: .75em;
    padding: .5em;
  }
 
  .able-fallback {
    display: block;
    text-align: center;
    border: 2px solid #335;
    background-color: #eee;
    color: #000;
    font-weight: 700;
    font-size: 1.1em;
    padding: 1em;
    margin-bottom: 1em;
    max-width: 500px;
    width: 95%;
  }
 
  .able-fallback div,
  .able-fallback p,
  .able-fallback ul {
    text-align: left;
  }
 
  .able-fallback li {
    font-weight: 400;
  }
 
  .able-fallback img {
    width: 90%;
    margin: 1em auto;
    opacity: .3;
  }
 
  .able-fallback img.able-poster {
    position: relative;
  }
 
  .able-modal-dialog button svg,
  .able-modal-dialog div[role=button] svg,
  .able-wrapper button svg,
  .able-wrapper div[role=button] svg {
    display: inline-block;
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
 
  div.able-skin-2020 div.able-seekbar-wrapper {
    width: 99%;
    margin: 10px 3px;
  }
 
  @font-face {
    font-family: able;
    src: url(../button-icons/fonts/able.eot?dqripi);
    src: url(../button-icons/fonts/able.eot?dqripi#iefix) format("embedded-opentype"), url(../button-icons/fonts/able.ttf?dqripi) format("truetype"), url(../button-icons/fonts/able.woff?dqripi) format("woff"), url(../button-icons/fonts/able.svg?dqripi#able) format("svg");
    font-weight: 400;
    font-style: normal;
  }
 
  .able-wrapper [class*=" icon-"],
  .able-wrapper [class^=icon-] {
    font-family: able !important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    -webkit-font-feature-settings: normal;
    font-feature-settings: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
 
  .icon-play:before {
    content: "\\f04b";
  }
 
  .icon-pause:before {
    content: "\\f04c";
  }
 
  .icon-stop:before {
    content: "\\f04d";
  }
 
  .icon-restart:before {
    content: "\\e900";
  }
 
  .icon-rewind:before {
    content: "\\e603";
  }
 
  .icon-forward:before {
    content: "\\e604";
  }
 
  .icon-previous:before {
    content: "\\e901";
  }
 
  .icon-next:before {
    content: "\\e902";
  }
 
  .icon-slower:before {
    content: "\\f0dd";
  }
 
  .icon-faster:before {
    content: "\\f0de";
  }
 
  .icon-turtle:before {
    content: "\\e904";
  }
 
  .icon-rabbit:before {
    content: "\\e905";
  }
 
  .icon-ellipsis:before {
    content: "\\e903";
  }
 
  .icon-pipe:before {
    content: "\\e600";
  }
 
  .icon-captions:before {
    content: "\\e601";
  }
 
  .icon-descriptions:before {
    content: "\\e602";
  }
 
  .icon-sign:before {
    content: "\\e60a";
  }
 
  .icon-volume-mute:before {
    content: "\\e606";
  }
 
  .icon-volume-soft:before {
    content: "\\e60c";
  }
 
  .icon-volume-medium:before {
    content: "\\e605";
  }
 
  .icon-volume-loud:before {
    content: "\\e60b";
  }
 
  .icon-volume-up:before {
    content: "\\e607";
  }
 
  .icon-volume-down:before {
    content: "\\e608";
  }
 
  .icon-chapters:before {
    content: "\\e609";
  }
 
  .icon-transcript:before {
    content: "\\f15c";
  }
 
  .icon-preferences:before {
    content: "\\e60d";
  }
 
  .icon-close:before {
    content: "\\f00d";
  }
 
  .icon-fullscreen-expand:before {
    content: "\\f065";
  }
 
  .icon-fullscreen-collapse:before {
    content: "\\f066";
  }
 
  .icon-help:before {
    content: "\\f128";
  }
 
  .your-report {
    grid-column: 8/span 2;
    grid-row-start: 2;
    align-self: start;
    justify-self: end;
    padding: 1em 0;
    border: 1px solid transparent;
    outline: none;
  }
 
  .your-report--expanded {
    background: #efefef;
    background: var(--footer-grey);
    box-shadow: 0 2px 8px -7px #000;
    border-color: #ddd;
    border-color: var(--line-grey);
    margin-bottom: 2em;
    padding: 1em;
  }
 
  .your-report__heading {
    font-weight: 700;
    font-size: 1em;
    margin: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
 
  .your-report__heading-pre {
    display: block;
    font-weight: 400;
    color: #091832;
    color: var(--dk-blue);
  }
 
  .your-report__import:focus+.your-report__import-label {
    outline-offset: 2px;
    outline: 2px solid transparent;
    transition: outline-offset .2s linear;
    border-color: #036;
    border-color: var(--w3c-blue);
    outline-color: #036;
    outline-color: var(--w3c-blue);
  }
 
  .your-report__progress-by-principle {
    columns: 2;
    column-gap: 1.5em;
    margin: 2.25em 0 1.75em;
    padding: 0;
  }
 
  .your-report__description {
    margin-bottom: .5em;
  }
 
  .your-report__showhide {
    border-width: 1px;
    border-color: #ddd;
    border-color: var(--line-grey);
    font-weight: 400;
    background-color: transparent;
    color: #1d1d1d;
    color: var(--off-black);
    padding: 0 6px;
    display: -ms-flexbox;
    display: flex;
    margin-left: auto;
    margin-bottom: 2px;
    margin-top: 2px;
  }
 
  .your-report__showhide:hover {
    border-color: currentColor;
  }
 
  .your-report__showhide svg {
    fill: transparent;
  }
 
  .your-report__showhide svg:first-child {
    margin: 0 .25em 0 -.25em;
  }
 
  .your-report__showhide svg:last-child {
    margin: 0 -.25em 0 .25em;
  }
 
  .your-report .progress {
    margin-bottom: 1em;
    list-style: none;
  }
 
  .your-report .principle__name {
    color: #1d1d1d;
    color: var(--off-black);
    font-weight: 700;
    text-decoration: none;
  }
 
  .your-report .principle__name:hover span {
    text-decoration: underline;
  }
 
  .your-report .progress__principle {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: .125em;
  }
 
  .your-report .progress__part {
    font-size: .65em;
    margin-left: auto;
  }
 
  pre {
    white-space: pre-wrap;
  }
 
  .highlight {
    font-size: 16px;
    font-size: 1rem;
    color: #036;
    color: var(--w3c-blue);
    -moz-tab-size: 2;
    -o-tab-size: 2;
    tab-size: 2;
    -webkit-font-feature-settings: "liga", "clig off";
    font-feature-settings: "liga", "clig off";
    -webkit-font-variant-ligatures: no-common-ligatures;
    font-variant-ligatures: no-common-ligatures;
  }
 
  .highlight .c {
    color: #3b3b3b;
    color: var(--dk-grey);
  }
 
  .highlight .err,
  .highlight .g {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .k {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .l,
  .highlight .n {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .o {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .x {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .highlight .p {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .cm {
    color: #3b3b3b;
    color: var(--dk-grey);
  }
 
  .highlight .cp {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .c1 {
    color: #3b3b3b;
    color: var(--dk-grey);
  }
 
  .highlight .cs,
  .highlight .gd {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .ge {
    color: #036;
    color: var(--w3c-blue);
    font-weight: 700;
  }
 
  .highlight .gh,
  .highlight .gr {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .highlight .gi {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .go,
  .highlight .gp,
  .highlight .gs {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .gs {
    font-weight: 700;
  }
 
  .highlight .gu {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .highlight .gt {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .kc {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .highlight .kd {
    color: #005a9c;
    color: var(--w3c-classic);
  }
 
  .highlight .kn,
  .highlight .kp {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .kr {
    color: #005a9c;
    color: var(--w3c-classic);
  }
 
  .highlight .kt {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .highlight .ld {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .m,
  .highlight .s {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .na {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .nb {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .highlight .nc {
    color: #005a9c;
    color: var(--w3c-classic);
  }
 
  .highlight .no {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .highlight .nd {
    color: #005a9c;
    color: var(--w3c-classic);
  }
 
  .highlight .ne,
  .highlight .ni {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .highlight .nf {
    color: #005a9c;
    color: var(--w3c-classic);
  }
 
  .highlight .nl,
  .highlight .nn,
  .highlight .nx,
  .highlight .py {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .nt,
  .highlight .nv {
    color: #005a9c;
    color: var(--w3c-classic);
  }
 
  .highlight .ow {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .w {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .mf,
  .highlight .mh,
  .highlight .mi,
  .highlight .mo {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .sb {
    color: #3b3b3b;
    color: var(--dk-grey);
  }
 
  .highlight .sc {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .sd {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .s2 {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .se {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .highlight .sh {
    color: #036;
    color: var(--w3c-blue);
  }
 
  .highlight .si,
  .highlight .sx {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .sr {
    color: #c0272d;
    color: var(--faded-red);
  }
 
  .highlight .s1,
  .highlight .ss {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  .highlight .bp,
  .highlight .vc,
  .highlight .vg,
  .highlight .vi {
    color: #005a9c;
    color: var(--w3c-classic);
  }
 
  .highlight .il {
    color: #005a6a;
    color: var(--wai-green);
  }
 
  :not(.highlight) code {
    -webkit-font-feature-settings: "liga", "clig off";
    font-feature-settings: "liga", "clig off";
    -webkit-font-variant-ligatures: no-common-ligatures;
    font-variant-ligatures: no-common-ligatures;
    color: #036;
    color: var(--w3c-blue);
  }
 
  .AddOther__Inputs>*:not(:last-child) {
    margin: 0 0 1em;
  }
 
  .AddOther__Inputs>*:last-child {
    margin-bottom: 0;
  }
 
  .Criterion__Result.svelte {
    display: block;
    border: none;
    margin: 1em 0 0;
  }
 
  .Criterion__Subject.svelte {
    padding: 0;
    font-size: 1em;
    overflow-wrap: anywhere;
  }
 
  .Criterion__Fields.svelte {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
 
  .view-in-report.svelte {
    order: -1;
    text-align: right;
  }
 
  .Criterion__Fields :last-child {
    flex: 2;
  }
 
  div.Criterion__Fields .Field:last-child label {
    order: -2;
  }
 
  div.Criterion__Fields div.Field.Criterion__Observation {
    flex-direction: row;
    flex-wrap: wrap;
  }
 
  @media(min-width: 60em) {
    .Criterion__Fields.svelte {
      flex-direction: row;
      gap: 2rem
    };
  }
 
  .Editable__Control--delete.svelte {
    font-size: 1em;
    float: right;
    margin-left: 1em;
    margin-top: .25em;
    padding: 0;
    border: 0;
    background-color: transparent;
    color: currentColor;
    width: 1em;
    display: inline-block;
  }
 
  .Editable.svelte {
    background: var(--trans-line-grey);
    padding: 1em;
  }
 
  .Editable .Editable__Contents .sample-input .Field {
    margin-bottom: .5em;
  }
 
  .Editable legend {
    font-size: 1em;
    padding: 0;
    margin-bottom: .25em;
  }
 
  .Editable fieldset {
    margin-bottom: 0;
  }
 
  div.svelte.svelte {
    display: inline-block;
  }
 
  .svelte:focus+.File__label.svelte {
    color: #fff;
    background-color: #036;
    border-color: #036;
  }
 
  .File__label.svelte.svelte {
    display: block;
    text-align: center;
  }
 
  .File__label-hint.svelte.svelte {
    display: block;
    font-weight: 400;
  }
 
  input.svelte {
    max-width: 40em;
  }
 
  .MultipleChoice__option__label.svelte,
  .MultipleChoice__option__input.svelte {
    display: inline-block;
    cursor: pointer;
  }
 
  .MultipleChoice__option__input.svelte {
    flex-grow: 0;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }
 
  .MultipleChoice__option__label.svelte {
    margin-left: 0.5em;
    flex-grow: 0;
    flex-shrink: 1;
    word-break: break-word;
  }
 
  .MultipleChoice__option__input.svelte:focus,
  .MultipleChoice__option__input.svelte:hover {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
 
  .MultipleChoice__options.svelte,
  .MultipleChoice__options--columns.svelte {
    margin: 0;
    padding: 0;
    list-style: none;
  }
 
  .MultipleChoice__options--columns.svelte {
    columns: 4 10em;
    column-gap: 2em;
  }
 
  .MultipleChoice__option.svelte {
    break-inside: avoid-column;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
 
  ol.svelte.svelte {
    padding: 0;
  }
 
  ol.svelte li.svelte {
    list-style: none;
  }
 
  .SampleInput__helptext.svelte.svelte {
    font-size: 1rem;
    font-weight: normal;
    margin: 1em 0;
    border: solid 1px #069;
    padding: 1em;
    background-color: #d0e1f1;
  }
 
  textarea.svelte {
    display: block;
    width: 100%;
    max-width: 40em;
  }
 
  .criterion textarea {
    max-width: none;
  }
 
  .add-tech.svelte.svelte {
    background: var(--trans-line-grey);
    padding: 1em;
  }
 
  .add-tech.svelte legend.svelte {
    font-size: 1em;
    padding: 0;
    margin-bottom: .25em;
  }
 
  @media(min-width: 40em) {
    .tech-input.svelte.svelte {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 1em
    };
  }
 
  .site-header.svelte .tool-header.svelte {
    grid-column: 2 / 10;
    width: 100%;
    display: flex;
    align-items: center;
  }
 
  .Controls.svelte.svelte {
    font-size: 0.8125em;
  }
 
  @media(min-width: 60em) {}
 
  .getting-started__intro.svelte {
    font-size: 130%;
    max-width: 42em;
    margin: 0;
  }
 
  .getting-started__buttons.svelte {
    text-align: center;
    padding: 1em;
  }
 
  .getting-started__buttons .Button,
  .getting-started__buttons .File {
    margin: .25em;
  }
 
  .getting-started+.excol-all {
    margin: 3em 0 -1em 0;
  }
 
  @media(min-width: 45em) {
    .getting-started.svelte {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2em
    }
 
    .getting-started__buttons.svelte {
      padding: 0;
      align-self: center
    };
  }
 
  .Auditor.svelte {
    clear: both;
  }
 
  .Auditor__Assertions.svelte {
    grid-column: 2 / 8;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
 
  .Auditor__Assertions details:first-of-type h2:first-of-type {
    margin-top: 0;
  }
 
  .Auditor__Assertions>*:not(:last-child) {
    margin-bottom: 1rem;
  }
 
  .Auditor__Assertions details details {
    padding-left: 0;
  }
 
  .Auditor__Assertions details details details {
    padding-left: 32px;
  }
 
  @media(min-width: 60rem) {
    .Auditor.svelte {
      display: grid;
      grid-template-columns: [left-start] minmax(auto, 12.5em) [left-end content-start] 1.25fr [content-end];
      grid-gap: 32px
    };
  }
 
  a.more-info.svelte.svelte,
  a.more-info.svelte.svelte:visited {
    color: var(--light-blue);
    margin-left: .25em;
    font-size: .8rem;
  }
 
  a.more-info.svelte.svelte:hover {
    color: var(--ocean);
  }
 
  .more-info__icon.svelte.svelte {
    display: inline-block;
    vertical-align: middle;
  }
 
  .more-info__icon.svelte svg.svelte {
    height: 1.5em;
  }
 
  .AuditorImport.svelte.svelte {
    margin: 1em 0 1em;
    border: 1px solid var(--line-grey);
    padding: 1em;
    font-size: 90%;
    position: relative;
  }
 
  .AuditorImport.svelte p.svelte:first-child {
    margin-top: 0;
  }
 
  .AuditorImport__beta.svelte.svelte {
    background-color: var(--cloudy);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: .25em .5em;
    position: absolute;
    top: -1em;
    left: 1em;
    transform: rotate(-1deg);
    font-size: 90%;
    display: inline-block;
  }
 
  @media(min-width: 47.5em) {
    .AuditorImport.svelte.svelte {
      float: right;
      margin: 0 0 1em 2em;
      padding: 1em;
      text-align: center;
      max-width: 10em
    };
  }
 
  .Button.svelte {
    box-sizing: border-box;
    min-width: 1.5rem;
  }
 
  .LanguageSelect.svelte.svelte {
    grid-column: 2 / 10;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
 
  .LanguageSelect.svelte>.svelte:not(:first-child) {
    margin-left: 0.5rem;
    padding-left: 0.5rem;
    border-left: solid 1px var(--w3c-classic);
  }
 
  .Nav.svelte {
    background-color: #d0e1f1;
    background-color: var(--cloudy-subtle);
  }
 
  .Nav__Itemcontainer.svelte {
    grid-column: 2 / 10;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow-x: auto;
  }
 
  .nav__item.current.svelte {
    background-color: #fff;
  }
 
  @media(min-width: 40.1em) {
    .Nav__Itemcontainer.svelte {
      flex-direction: row
    };
  }
 
  .page-content.svelte {
    padding: 2em 0;
  }
 
  .main-with-panel.svelte {
    grid-column: 2 / 8;
  }
 
  .main-without-panel.svelte {
    grid-column: 2 / 10;
  }
 
  main>*:not(:last-child) {
    margin-bottom: 1em;
  }
 
  .Pager.svelte {
    grid-column: 2 / 10;
  }
 
  .app-container .pager--item {
    max-width: none;
  }
 
  .your-report.svelte.svelte {
    position: sticky;
    top: 1em;
    grid-row-start: 1;
  }
 
  #report-findings .your-report {
    position: static;
  }
 
  .your-report__heading-pre.svelte.svelte {
    font-size: smaller;
    display: block;
  }
 
  .your-report__showhide[aria-expanded="false"].svelte svg.svelte {
    margin-right: .25em;
    margin-left: 0;
  }
 
  .your-report--collapsed.svelte.svelte {
    float: right;
    position: static;
  }
 
  dt.svelte {
    grid-column: 1 / 2;
    margin-top: 0;
    font-weight: normal;
  }

  .card dt.svelte {
    font-weight: bold;
  }
 
  dt.svelte:after {
    content: ":";
  }
 
  dd.svelte {
    font-weight: bold;
    margin-left: 0;
    margin-bottom: 1em;
    grid-column: 2 / 3;
  }
 
  @media(min-width: 40em) {
    dl.svelte {
      display: grid;
      grid-template-columns: minmax(auto, 1fr) 3fr;
      gap: 0.5em 1em
    }
 
    dd.svelte {
      margin-bottom: 0
    };
  }
 
  .no-result.svelte {
    font-weight: normal;
    font-style: italic;
    margin-bottom: 1em;
    display: block;
  }
 
  .Auditor__ResultsTable.svelte.svelte {
    width: 100%;
  }
 
  h5.svelte.svelte {
    color: var(--wai-green);
    margin: 1.5em 0 1em;
  }
 
  .Auditor__ResultsTable.svelte th.svelte {
    width: 30%;
    position: absolute;
    left: -9999em;
    top: -9999em;
  }
 
  .Auditor__ResultsTable.svelte th.svelte:nth-child(2) {
    width: 25%;
  }
 
  .Auditor__ResultsTable.svelte th.svelte:nth-child(3) {
    width: 60%;
  }
 
  .Auditor__ResultsTableHeader.svelte.svelte {
    position: sticky;
    top: 0;
  }
 
  .Auditor__Assertion.svelte.svelte {
    margin-bottom: 1em;
    border-bottom: 1px solid var(--cloudy);
  }
 
  .Auditor__Assertion-SC.svelte.svelte {
    font-weight: bold;
    color: inherit;
    background-color: inherit;
  }
 
  .Auditor__ResultsTable.svelte td.svelte {
    display: block;
    position: relative;
    border-style: none;
  }
 
  @media(min-width: 60em) {
    .Auditor__Assertion.svelte.svelte {
      border-bottom: 0
    }
 
    .Auditor__Assertion-SC.svelte.svelte {
      font-weight: normal
    }
 
    .Auditor__ResultsTable.svelte td.svelte {
      display: table-cell;
      border: 1px solid var(--cloudy)
    }
 
    .Auditor__ResultsTable.svelte th.svelte {
      position: static
    }
 
    .results-label-mobile.svelte.svelte {
      display: none
    };
  }
 
  .no-result.svelte {
    font-weight: normal;
    font-style: italic;
  }
 
  .no-result.svelte {
    font-weight: normal;
    font-style: italic;
    margin-bottom: 1em;
  }
 
  textarea.svelte {
    margin-bottom: 1em;
  }
 
  ul.svelte {
    margin: 0;
    padding: 0;
  }
 
  .result-cards.svelte {
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    background-color: var(--off-white);
    border-radius: 0.5em;
  }
 
  @media(min-width: 60em) {
    .result-missing.svelte {
      column-count: 2
    };
  }
 
  .link-to-guidance.svelte.svelte {
    border-width: 1px;
    font-weight: normal;
    color: var(--dk-grey);
    border-color: var(--line-grey);
    vertical-align: middle;
    margin: 2px 0;
  }
 
  .link-to-guidance.svelte.svelte:hover,
  .link-to-guidance.svelte.svelte:focus {
    color: var(--off-black);
    background-color: var(--off-white);
  }
 
  .link-to-guidance.svelte svg.svelte {
    margin-right: 0.25em;
  }
 
  .link-to-guidance+form {
    margin-top: 2em;
  }
 
  .your-report__progress-by-principle.svelte {
    columns: 1;
  }
 
  .your-report .button+.File,
  .your-report .button+.button {
    margin-top: 4px;
  }
 
  .AddOther__Inputs>*:not(:last-child) {
    margin: 0 0 1em;
  }
 
  .AddOther__Inputs>*:last-child {
    margin-bottom: 0;
  }
 
  .Field.svelte.svelte {
    padding: 0;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
 
  .Field.svelte label.svelte {
    display: block;
  }
 
  .Field.svelte label.svelte,
  .Field .HelpText {
    order: -1;
  }
 
  .Field input {
    width: 100%;
  }
 
  .Field>*:not(:last-child) {
    margin-bottom: 0.25em;
  }
 
  .Fieldset.svelte.svelte {
    padding: 0;
  }
 
  .Fieldset.svelte legend.svelte {
    font-size: 1rem;
  }
 
  .Fieldset__helptext.svelte.svelte {
    font-size: 1rem;
    font-weight: normal;
    margin: 1em 0;
    border: solid 1px #069;
    padding: 1em;
    background-color: #d0e1f1;
  }
 
  .Fieldset__elements>*:not(:last-child) {
    margin-bottom: 2rem;
  }
 
  div.svelte.svelte {
    display: inline-block;
  }
 
  .svelte:focus+.File__label.svelte {
    color: #fff;
    background-color: #036;
    border-color: #036;
  }
 
  .File__label.svelte.svelte {
    display: block;
    text-align: center;
  }
 
  .File__label-hint.svelte.svelte {
    display: block;
    font-weight: 400;
  }
 
  .HelpText.svelte {
    padding: 0;
  }
 
  .HelpText__label label {
    display: inline-block;
  }
 
  .HelpText__body.svelte {
    margin: 1em 0;
    border: solid 1px #069;
    padding: 1em;
    background-color: #d0e1f1;
  }
 
  .HelpText__body>*:not(:last-child) {
    margin: 0 0 1em;
  }
 
  .HelpText__body>*:last-child {
    margin: 0;
  }
 
  input.svelte {
    max-width: 40em;
  }
 
  .MultipleChoice__option__label.svelte,
  .MultipleChoice__option__input.svelte {
    display: inline-block;
    cursor: pointer;
  }
 
  .MultipleChoice__option__input.svelte {
    flex-grow: 0;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }
 
  .MultipleChoice__option__label.svelte {
    margin-left: 0.5em;
    flex-grow: 0;
    flex-shrink: 1;
    word-break: break-word;
  }
 
  .MultipleChoice__option__input.svelte:focus,
  .MultipleChoice__option__input.svelte:hover {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
 
  .MultipleChoice__options.svelte,
  .MultipleChoice__options--columns.svelte {
    margin: 0;
    padding: 0;
    list-style: none;
  }
 
  .MultipleChoice__options--columns.svelte {
    columns: 4 10em;
    column-gap: 2em;
  }
 
  .MultipleChoice__option.svelte {
    break-inside: avoid-column;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
 
  @media(min-width: 40em) {
    .sample-input.svelte {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 1em
    };
  }
 
  .Auditor__Filter.svelte {
    grid-column: 1 / 2;
  }
 
  .AuditorSamples__list.svelte.svelte {
    padding: 0;
    margin: 0;
  }
 
  .AuditorSamples__item.svelte.svelte {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    align-items: start;
  }
 
  .AuditorSamples__item.svelte label.svelte {
    margin-left: .5em;
    overflow-wrap: anywhere;
  }
 
  .AuditorSamples__item.svelte input.svelte {
    width: 1em;
    height: 1em;
    flex: none;
  }
 
  .AuditorSamples__select-all.svelte.svelte {
    margin-top: 1em;
  }
 
  .AuditorSamples__link.svelte.svelte {
    vertical-align: middle;
    margin-left: .25em;
  }
 
  legend.svelte.svelte {
    font-size: 1rem;
  }
 
  .criterion.svelte {
    margin-bottom: 1em;
  }
 
  .criterion:target {
    outline: 2px solid var(--gold);
  }
 
  .criterion__resource-links.svelte {
    margin: .5em 0;
  }
 
  ul.svelte {
    margin: 0;
    padding: 0;
  }
 
  .result-cards.svelte {
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    background-color: var(--off-white);
    border-radius: 0.5em;
  }
 
  @media(min-width: 60em) {
    .result-missing.svelte {
      column-count: 2
    };
  }
 
  .result-card.svelte {
    list-style: none;
    display: inline-block;
    margin: 1em;
    text-align: center;
  }
 
  .result-card__number.svelte {
    font-size: 1.5em;
    display: block;
    margin-bottom: 0.125em;
    line-height: 1;
    color: var(--ocean);
  }
 
  @media(min-width: 60em) {
    .result-card__number.svelte {
      font-size: 3em
    };
  }
 
  .result-card__label.svelte {
    font-size: 1.125em;
  }
 
  /*# sourceMappingURL=main.css.map */
  th:nth-of-type(4),
  td:last-of-type {
    display: none !important;
  }
 
  a,
  span {
    word-break: break-all;
  }
 
  .Auditor__ResultsTableHeader {
    z-index: 1;
  }
 
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.5;
    font-size: 1.25rem;
  }
 
  h6 {
    line-height: 1.5;
    font-size: 1rem;
    color: var(--w3c-blue) !important;
  }
 
  @media (max-width: 960px) {
    tbody {
      width: 100%;
      display: inline-table;
    }
 
    .Auditor__ResultsTable {
      position: relative;
      width: auto;
      display: block;
    }
 
    .Auditor__ResultsTableHeader {
      display: none;
    }
 
    .Auditor__Assertion th {
      width: auto !important;
      position: relative !important;
      left: 0 !important;
      top: 0 !important;
      display: block;
      border: 0;
      border-bottom: 1px solid var(--cloudy);
      color: var(--wai-green) !important;
    }
 
    .Auditor__Assertion td:first-of-type {
      background-color: #f2f2f2;
    }
 
    h6 {
      border-bottom: 1px solid var(--cloudy);
      padding-bottom: 0.66rem;
    }
 
    .results-label-mobile {
      line-height: 1.5;
      font-size: 1rem;
      font-weight: 700;
      color: var(--w3c-classic) !important;
    };
  }
  `);
  styleEl.appendChild(styleElContents);
  htmlDocument.head.append(styleEl);

  file = new Blob(
    [`<!doctype HTML>${htmlDocument.documentElement.outerHTML}`],
    {
      type: "text/html",
    }
  );

  _a.href = URL.createObjectURL(file);

  _a.download = name;

  _a.click();
}

export function downloadFileJSON({ contents, name = 'download.txt', type = 'text/plain' }) {
  const _a = document.createElement('a');
  const file = new Blob([contents], { type });

  _a.href = URL.createObjectURL(file);
  _a.download = name;

  _a.click();
}
