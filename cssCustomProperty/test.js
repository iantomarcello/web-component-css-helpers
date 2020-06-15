/**
 *  Test using node.
 */
console.time("runtime");

import { cssCustomProperty } from './cssCustomProperty.js';
import puppeteer from 'puppeteer';

const test = "cssCustomProperty";

/*  Variable */
const colour = "rgb(255, 0, 0)";

/*  Hypothesis */
let html = `
<head>
  <base href="/">
  <style>
    :root {
      --red: ${colour};
    }

    #makeMeRed {
      color: rgb(0, 128, 0); /* to be changed by JS */
    }
  </style>
</head>
<body>
  <span id="makeMeRed">Ich bin grün.</span>
  <script type="module">
    document.getElementById('makeMeRed').textContent = "Ich bin jetzt rot!!!";

    /*
    Crappy way of getting the JS to work.
    The function uses browser 'window' object, which doesn't work in puppeteer's
    exposeFunction in Node's context.
    This will have to do.
    */
    let cssCustomProperty = prop =>
       window.getComputedStyle(document.body).getPropertyValue(prop);

    // import { cssCustomProperty } from './cssCustomProperty.js';
    document.getElementById('makeMeRed').style.color = cssCustomProperty('--red');
  </script>
</body>

`;

/* Procedure */
(async () => {
  // Make a headless browser.
  const browser = await puppeteer.launch();

  // Set up a large screen.
  const page = await browser.newPage();
  await page.setViewport({
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
  });

  // Test.
  await page.setContent(html, {waitUntil: "domcontentloaded"});
  const result = await page.evaluate(async () => {
    const element = document.querySelector('#makeMeRed');
    return window.getComputedStyle(element).getPropertyValue("color");
  });

  await browser.close();

  /* Analyze and conclude */
  if ( result === colour ) {
    return console.log('\x1b[32m%s\x1b[0m', `${test} successful`);
  } else {
    return console.log('\x1b[31m%s\x1b[0m', `${test} failed`);;
  }
  console.timeEnd("runtime");
})();

/**
    Fail attempts in making the test more dynamic instead copy pasting:
    1) goto() the example pages, no actual server to host the JS.
    2) exposeFunction() doesn't expose 'window' object.
    3) import() in evaluate() doesn't work.
 */
