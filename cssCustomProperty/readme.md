Returns the given [CSS custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) in JavaScript.

Parameters
---
`prop` the said CSS custom property.

Example 1
---
In style.css:
``` css
:root {
  --red: #f00;
}

#makeMeRed {
  color: green; /* to be changed by JS */
}
```
In the HTML:
``` html
<!--  Updates document with the custom property.  -->
<link rel="stylesheet" href="style.css">

<!--  Target.  -->
<span id="makeMeRed">Ich bin grün.</span>

<!--  Get it workin'.  -->
<script type="module">
  import { cssCustomProperty } from '../cssCustomProperty.js';

  document.getElementById('makeMeRed').style.color = cssCustomProperty('--red');
  document.getElementById('makeMeRed').textContent = "Ich bin jetzt rot!!!";
</script>
```

Example 2
---
In style.css:
``` css
:root {
  --awesomeness: 🌈;
}
```
In the HTML:
``` html
<!--  Updates document with the custom property.  -->
<link rel="stylesheet" href="style.css">

<!--  Target.  -->
<span id="giveMeAwesomeness"></span>

<!--  Get it workin'.  -->
<script type="module">
  import { cssCustomProperty } from './cssCustomProperty.js';

  let style = document.createElement("style");
  style.textContent =
  `
    #giveMeAwesomeness::after {
      content: ${cssCustomProperty('--awesomeness')};
    }
  `
  document.body.appendChild(style);
</script>
```
