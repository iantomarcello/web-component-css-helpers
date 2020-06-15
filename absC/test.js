/**
 *  Test using node.
 */
console.time("runtime");

import { absC } from './absC.js';
import puppeteer from 'puppeteer';

const test = "absC";

/*  Variable */
const size = 100;

/*  Hypothesis */
let html = `
<style>
  section {
    width: ${size}px;
    height: ${size}px;
    position: relative;
    background: green;
  }

  section + section {
    margin-top: 15px;
  }

  div {
    width: 2px;
    height: 2px;
    background-color: red;
  }

  #centre {
    ${absC()}
  }

  #horizontal {
    ${absC("x")}
  }

  #vertical {
    ${absC('y')}
  }
</style>
<section><div id="centre"></div></section>
<section><div id="horizontal"></div></section>
<section><div id="vertical"></div></section>
`;

/* Procedure */
(async () => {
  // Make a headless browser.
  const browser = await puppeteer.launch();

  // Set up a large screen.
  const page = await browser.newPage();
  await page.setViewport({
    width: size + 15,
    height: 500,
    deviceScaleFactor: 1,
  });

  await page.setJavaScriptEnabled(true);
  // page.on("pageerror", console.log);
  // page.on('error', console.log);
  // page.on('console', msg => console.log(msg.text()));

  // Test.
  await page.setContent(html, {waitUntil: "domcontentloaded"});
  const selectors = ['centre', 'horizontal', 'vertical'];
  const result = await page.evaluate(async (selectors) => {
    const data = {};

    selectors.forEach(sel => {
      if ( data[sel] == null ) {
        data[sel] = {};
      }
      data[sel].left = document.querySelector('#' + sel).offsetLeft;
      data[sel].top = document.querySelector('#' + sel).offsetTop;
    })
    return data;
  }, selectors);

  await browser.close();

  /* Analyze */
  let cases = [];
  let testingFunction = (orientation, checks) => {
    if ( !result[orientation].left === checks[0] ) {
      return orientation + " failed for " + checks[0];
    }
    if ( !result[orientation].top === checks[1] ) {
      return orientation + " failed for " + checks[1];
    }
    return true;
  }
  cases[0] = testingFunction("centre", [size / 2, size / 2]);
  cases[1] = testingFunction("horizontal", [size / 2, 0]);
  cases[2] = testingFunction("vertical", [0, size / 2]);

  /* Conclude */
  let trueCases = 0;
  cases.forEach(c => {
    if ( c === true ) {
      trueCases++;
    } else {
      console.log('\x1b[31m%s\x1b[0m', `${test} failed at: ${c}`);
    }
  });
  if ( trueCases === 3 ) {
    return console.log('\x1b[32m%s\x1b[0m', `${test} successful`);
  }

  console.timeEnd("runtime");
})();
