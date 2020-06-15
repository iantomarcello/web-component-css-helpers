/**
 *  Test using node.
 */
console.time("runtime");

import { cssFluid } from './cssFluid.js';
import puppeteer from 'puppeteer';

const test = "cssFluid";

/* Variables */
const fontLarge = 36;
const fontSmall = 25;
const viewportLarge = { w: 1920, h: 1080 };
const viewportSmall = { w: 325, h: 578 };

/*  Hypothesis */
let html = `
<style>
  h1 {
    font-size: ${cssFluid(fontLarge, fontSmall, viewportLarge.w, viewportSmall.w)};
  }
</style>
<h1>Wanna test my size? 😉</h1>
`;

/* Procedure */
(async () => {
  // Make a headless browser.
  const browser = await puppeteer.launch();

  // Set up a large screen.
  const largePage = await browser.newPage();
  await largePage.setViewport({
    width: viewportLarge.w,
    height: viewportLarge.h,
    deviceScaleFactor: 1,
  });

  // Test run on large screens.
  await largePage.setContent(html, {waitUntil: "domcontentloaded"});
  const largeFontSize = await largePage.evaluate(() => {
    const element = document.body.querySelector('h1');
    return window.getComputedStyle(element).getPropertyValue("font-size");
  });

  // Set up a small screen.
  const smallPage = await browser.newPage();
  await smallPage.setViewport({
    width: viewportSmall.w,
    height: viewportSmall.h,
    deviceScaleFactor: 1,
  });

  // Test run on large screens.
  await smallPage.setContent(html, {waitUntil: "domcontentloaded"});
  const smallFontSize = await smallPage.evaluate(() => {
    const element = document.body.querySelector('h1');
    return window.getComputedStyle(element).getPropertyValue("font-size");
  });

  await browser.close();

  /* Analyze and conclude */
  if ( parseFloat(largeFontSize) === fontLarge && parseFloat(smallFontSize) === fontSmall ) {
    return console.log('\x1b[32m%s\x1b[0m', `${test} successful`);
  } else {
    return console.log('\x1b[31m%s\x1b[0m', `${test} failed`);;
  }
  console.timeEnd("runtime");
})();
