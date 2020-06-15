export let cssCustomProperty = (prop: string) => {
  return window.getComputedStyle(document.body).getPropertyValue(prop);
}
