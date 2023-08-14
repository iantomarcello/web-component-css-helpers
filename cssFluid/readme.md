## Deprecation Notice - August 2023
With CSS [min max and clamp](https://web.dev/min-max-clamp/) being support in all browsers, no reason to use a JS import for this.

---

Returns a CSS `calc` that outputs fluid dynamic value, depending on viewport width.

Adapted from [my less mixin](https://github.com/iantomarcello/webtools/blob/master/commons.less#L265), which is originally adapted from Geoff Graham's [article on CSS-Tricks](https://css-tricks.com/snippets/css/fluid-typography/), which, in turn was written for SASS, check it out if you like an explanation on how this works.

Parameters
---
`max` maximum CSS value in integer starting from maxViewportWidth. <br>
`min`, mininum CSS value in integer ending at minViewportWidth.<br>
`maxViewportWidth`, the viewport's width in integer where the fluid value starts.<br>
`minViewportWidth`, the viewport's width in integer where the fluid value ends.

###### Note
The output value will be in `px`.

Example
---
``` javascript
import { cssFluid } from './cssFluid.js';

let style = `
  h1 {
    font-size: ${cssFluid(36, 25, 1920, 325)};
  }
`;

console.log(style);
/*
Outputs:
  h1 {
    font-size: calc(25px + (32 - 25) * ((100vw - 1920px) / (1920 - 325)));
  }
*/
```
Basic explanation: <br>
Scale font-size linearly between 25px to 32px, <br>
in between viewport width of 1920px and 325px.

###### Note
This method is not a clamp, but rather a ratio and proportional calculation; the value will continue to scale beyond the given viewport widths. Use CSS `@media` queries to control beyond those instead.
