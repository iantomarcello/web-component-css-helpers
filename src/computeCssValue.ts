/**
 * Calculates and returns a CSS declaration values like `calc()`.
 *
 * Some libraries like GSAP expects a value, and not functions like `calc()`
 * @param value
 * @param unit [CSS values and units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)
 * @return string
 */
export function computeCssValue(value: string, unit: 'percentage' | 'number' | 'length' = 'percentage') : string {
  const d: HTMLDivElement = <HTMLDivElement>document.createElement('div');
  let property: string;
  let computed: any;
  switch (unit) {
    case 'percentage':
    case 'number':
      property = 'opacity';
      d.style.setProperty(property, value);
      computed = d.style.getPropertyValue(property);
      if (unit === 'percentage') {
        computed = (parseFloat(computed) * 100).toString();
        computed += '%';
      }
      break;

      // TODO: colors, if possible? https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#color
      // TODO: colors?

    default:
      return '';
  }
  d.remove();
  return computed;
}