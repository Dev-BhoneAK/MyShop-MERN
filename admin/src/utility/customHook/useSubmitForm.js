import { useDispatch } from "react-redux";
import { formatFormData } from "../helpers";

const useSubmitForm = () => {
  const dispatch = useDispatch();

  const submitForm = async (formDataObj, formActionObj) => {
    const { id, fields, images, existingImages } = formDataObj;
    const { create, update } = formActionObj;
    const formData = formatFormData(fields, images, existingImages);

    let status = "";
    let message = "";
    try {
      if (id !== 0) {
        await dispatch(update({ id, formData })).unwrap();
        message = "Updated Successfully!";
      } else {
        await dispatch(create(formData)).unwrap();
        message = "Created Successfully!";
      }
      status = "success";
      return { status, message };
    } catch (err) {
      status = "failure";
      message = err.name + ": " + err.message;
      return { status, message };
    }
  };

  const updateForm = (id, resetFormObj) => {
    const { resetForm, initialValues, setInitialValues } = resetFormObj;
    if (id !== 0) {
      resetForm();
    } else {
      const objKeys = Object.keys(initialValues).reduce((obj, char) => {
        obj[char] = "";
        return obj;
      }, {});
      setInitialValues((prevState) => ({
        ...prevState,
        ...objKeys,
      }));
    }
  };

  const showMessage = (showMessageObj) => {
    const { setStatusMessage, status, message } = showMessageObj;

    setStatusMessage((prevState) => ({
      ...prevState,
      status,
      message,
    }));

    setTimeout(() => {
      setStatusMessage({
        status: "",
        message: "",
      });
    }, 3000);
  };
  return { submitForm, updateForm, showMessage };
};

export default useSubmitForm;
