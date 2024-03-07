/**
 * Slices a given text string to a maximum length, appending ellipsis if necessary.
 *
 * @param {string} txt - The text string to slice.
 * @param {number} [max=50] - The maximum length of the sliced text. Defaults to 50.
 * @returns {string} The sliced text, followed by ellipsis if the original text exceeds the maximum length.
 */
export function txtSlicer(txt: string, max: number = 50) {
  return txt.length >= max ? `${txt.slice(0, max)} ...` : txt;
}
