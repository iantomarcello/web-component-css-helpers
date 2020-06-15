export let absC = (orientation:string|null = null) => {
  let properties:string;
  switch (orientation) {
    case "x":
    case "X":
      properties = `
        left: 50%;
        transform: translateX(-50%);
      `;
      break;
    case "x":
    case "X":
      properties = `
        top: 50%;
        transform: translateY(-50%);
      `;
      break;
    case null:
    default:
      properties = `
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `;
  }
  return `
    position: absolute;
    ${properties}
  `;
}
