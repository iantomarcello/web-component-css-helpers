Returns a CSS snippets that position element absolutely to the centre,
to a relative parent. <br>
Essentially, by default, returns these properties:
``` css
#your-element {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

Parameters
---
`orientation` strings `"x"` or `"y"` which centers the element horizontally or
vertically respectively. By default, its `null` which, centers the element both
horizontally and vertically.

Example
---
``` javascript
import { absC } from './absC.js';

let style = `
  aside {
    ${absC()};
  }
`;

console.log(style);
/*
Outputs:
  aside {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
*/
```
