export function formatFormData(productFields, productImages, existingImages) {
  const formData = new FormData();
  const existingImageArr = [];

  Object.keys(productFields).map((fieldName) => {
    formData.append(fieldName, productFields[fieldName]);
  });

  productImages.length > 0 &&
    productImages.map((image) => {
      formData.append("images", image);
    });
  existingImages.length > 0 &&
    existingImages.map((image) => {
      existingImageArr.push(image.preview);
    });
  formData.append("existingImages", existingImageArr);

  return formData;
}

export function setInitialValuesToForm(
  initialValues,
  setInitialValues,
  formObj
) {
  const objKeys = Object.keys(initialValues).reduce((obj, char, index) => {
    obj[char] = formObj[char];
    return obj;
  }, {});
  setInitialValues((prevState) => ({
    ...prevState,
    ...objKeys,
  }));
}
