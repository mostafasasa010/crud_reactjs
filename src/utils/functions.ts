/**
 * Slices a given text string to a maximum length, appending ellipsis if necessary.
 *
 * @param {string} txt - The text string to slice.
 * @param {number} [max=50] - The maximum length of the sliced text. Defaults to 50.
 * @returns {string} The sliced text, followed by ellipsis if the original text exceeds the maximum length.
 */
export function txtSlicer(txt: string, max: number = 50): string {
  return txt.length >= max ? `${txt.slice(0, max)} ...` : txt;
}

/**
 * Adds commas to a price string to format it in a human-readable format.
 *
 * @param price - The price string to format.
 * @returns The formatted price string with commas.
 */
export const addCommasToPrice = (price: string): string =>
  isNaN(parseFloat(price.replace(/,/g, "")))
    ? price
    : parseFloat(price.replace(/,/g, "")).toLocaleString("en-US");
