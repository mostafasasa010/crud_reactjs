/**
 * Validates the properties of a product object.
 *
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The URL of the product image.
 * @param {string} product.price - The price of the product.
 * @returns {Object} - An object containing error messages for invalid properties.
 */
export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}): {
  title: string;
  description: string;
  imageURL: string;
  price: string;
} => {
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Title must be between 10 and 80 characters!";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = "Description must be between 10 and 900 characters!";
  }

  if (!product.imageURL.trim() || !urlRegex) {
    errors.imageURL = "Invalid Image URL!";
  }

  if (
    !product.price.trim() ||
    isNaN(Number(product.price)) ||
    Number(product.price) <= 0
  ) {
    errors.price = "Price must be a valid number greater than 0!";
  }

  return errors;
};
