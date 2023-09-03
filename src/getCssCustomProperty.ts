/**
 * Gets the value of a custom CSS property.
 * @param property the CSS custom property to get.
 * @param target the element to get the property from. Defaults to `document.body`
 * @returns string
 */
export function getCssCustomProperty(property: string, target: HTMLElement = document.body) {
  return window.getComputedStyle(target).getPropertyValue(property);
}
