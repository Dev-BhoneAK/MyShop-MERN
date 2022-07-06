import React,{useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {createProduct, updateProduct} from './productSlice';
import {fetchCategories} from "../category/categorySlice";
import {getProductById} from "../product/productSlice";
import {formatFormData} from '../../utility/helpers';

const CreateEditForm = (props) => {

    const [initialValues, setInitialValues] = useState({
        name: '', sku: '', category: '',
        images: [], description: '', model: '',
        brand: '', basePrice: '', totalStockCount: ''
    });

    const dispatch = useDispatch();
    const productState = useSelector(state=> state.product);
    useEffect(() => {
        dispatch(fetchCategories());
        if (props.id && props.id !== 0) {
            console.log('product state ', productState);
            console.log('product id ', props.id);

            const product = getProductById(productState, props.id);
            // dispatch(getProductById(props.id));
            console.log('product iis ', product);

            const objKeys = Object.keys(initialValues).reduce((obj, char, index) => {
                obj[char] = product[char];
                return obj;
            }, {});
            console.log('objKeys ', objKeys);
            // setInitialValues(prevState => (Object.keys(initialValues).map((key) => ({ ...prevState, [key]: category[key] }))));
            // setInitialValues(Object.keys(initialValues).map((key, prevState) =>
            //     ({ ...prevState, [key]: category[key] })));
            // setInitialValues(prevState => ({
            //     ...prevState,
            //     ...objKeys
            // }))
        }
    }, [productState]);
    
    const [productImages, setProductImages] = useState([]);
    const fileGenerator = (acceptedFiles) => {
        const files = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
            key: productImages.length + acceptedFiles.length
        }))
        return files;
    }

    const removeImage = (key) => {
        console.log('key ', key);
        productImages.length > 0 && setProductImages(productImages.filter(image => image.key !== key));
    }

    const [statusMessage, setStatusMessage] = useState({
        status: '',
        message: ''
    });


    // For Datatable Component Rendering
    const category = useSelector((state) => state.category);
    const categoryItems = category.categoryItems;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Product Name is required'),
        // sku: Yup.string()
        //     .required('Product SKU is required'),
        // category: Yup.string()
        //     .required('Product Category is required'),
        // images: Yup.string()
        //     .required('Product image is required'),
        // description: Yup.string()
        //     .required('Product description is required'),
        // basePrice: Yup.string()
        //     .required('Product Price is required'),
        // totalStockCount: Yup.string()
        //     .required('Total Stock Count is required'),
    });

    const onSubmit = async (productFields, {resetForm, setSubmitting}) => {
        console.log('onSubmit ', productFields);
        const formData = formatFormData(productFields, productImages);

         try {
            let message = '';
            // if (id === 0) {
                await dispatch(createProduct(formData)).unwrap();
                message = 'Product Created Successfully!';
            // }else {
            //     await dispatch(updateProduct({id, productFields})).unwrap();
            //     message = 'Product Updated Successfully!';
            // }
            setStatusMessage(prevState => ({
                ...prevState,
                status : 'success',
                message: message
            }));
            resetForm();
        } catch (err) {
            console.error('Failed to save the post: ', err);
            setStatusMessage(prevState => ({
                ...prevState,
                status : 'error',
                message: err.name +': ' + err.message
            }));
            setSubmitting(false);
        } finally {
            setTimeout(() => {
                setStatusMessage({
                    name: '',
                    parent: ''
                })
            }, 2000);
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
            {function Render({ errors, touched, isSubmitting, setFieldValue }) {

                useEffect(() => {
                    {
                        setFieldValue('images', productImages);
                    }
                }, [productImages]);
                return (
                    <Form encType="multipart/form-data">
                        <div className="row product-adding">
                            <div className="col-xl-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Product Info</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="digital-add needs-validation">
                                            <div className="form-group">
                                                <label htmlFor="validationCustom01"
                                                       className="col-form-label pt-0"><span>*</span>
                                                    Name</label>
                                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="validationCustomtitle"
                                                       className="col-form-label pt-0"><span>*</span> SKU</label>
                                                <Field name="sku" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="sku" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label categories-basic"><span>*</span>
                                                    Category</label>
                                                <Field name="category" as="select" className={'form-control' + (errors.parent && touched.parent ? ' is-invalid' : '')}>
                                                    <option value="/">--Select--</option>
                                                    {
                                                        categoryItems.map(category => (
                                                            <option value={category.path} key={category._id}>{category.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <ErrorMessage name="category" component="div" className="invalid-feedback" />
                                            </div>
                                            <label className="col-form-label pt-0"> Image Upload</label>
                                            <Dropzone onDrop={(acceptedFiles) => {
                                                setProductImages(prevState => [...prevState, ...fileGenerator(acceptedFiles)]);
                                            }} name="images" accept={{'image/*': []}} multiple={true} >
                                                {({getRootProps, getInputProps}) => (
                                                    <div {...getRootProps({className: 'custom-dropzone'})}>
                                                        <div className="dz-message needsclick">
                                                            <input {...getInputProps()} />
                                                            <i className="fa fa-cloud-upload"></i>
                                                            <h4 className="mb-0 f-w-600">Drop files here or click to upload.</h4>
                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            <ErrorMessage name="images" component="div" className="invalid-feedback" />
                                            <div className="form-group show-images">
                                                {
                                                    productImages.length > 0 && productImages.map((image, index) => (
                                                        <div className="image-area">
                                                            <img className="show-image" src={image?.preview} alt="Product Image" key={index}/>
                                                            <a className="remove-image" onClick={() => removeImage(image.key)}>&#215;</a>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Product Detail</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="digital-add needs-validation">
                                            <div className="form-group">
                                                <label className="col-form-label pt-0"> Description</label>
                                                <div className="description-sm">
                                                    <CKEditor
                                                        editor={ ClassicEditor }
                                                        data="<p>Hello from CKEditor 5!</p>"
                                                        onReady={ editor => {
                                                            console.log( 'Editor is ready to use!', editor );
                                                        } }
                                                        onChange={ ( event, editor ) => {
                                                            setFieldValue("description", editor.getData());
                                                        } }
                                                        onBlur={ ( event, editor ) => {
                                                            console.log( 'Blur.', editor );
                                                        } }
                                                        onFocus={ ( event, editor ) => {
                                                            console.log( 'Focus.', editor );
                                                        } }
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="validationCustomtitle"
                                                       className="col-form-label pt-0"> Model</label>
                                                <Field name="model" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="model" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label categories-basic">Brand</label>
                                                <Field name="brand" as="select" className={'form-control' + (errors.parent && touched.parent ? ' is-invalid' : '')}>
                                                    <option value="/">--Select--</option>
                                                    {
                                                        categoryItems.map(category => (
                                                            <option value={category.path} key={category._id}>{category.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <ErrorMessage name="brand" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Product Statistics</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="digital-add needs-validation">
                                            <div className="form-group">
                                                <label htmlFor="validationCustom02" className="col-form-label"><span>*</span>
                                                    Product Price</label>
                                                <Field name="basePrice" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="basePrice" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="validationCustom05" className="col-form-label pt-0"> Total Stock Count</label>
                                                <Field name="totalStockCount" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="totalStockCount" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group mb-0">
                                                    <button type="submit" className="btn btn-primary">
                                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> }
                                                        {statusMessage?.status === 'success' && <i className="fa fa-check" aria-hidden="true" /> }
                                                        Save
                                                    </button>
                                                    <button className="btn btn-secondary" type="button" style={{marginLeft: '20px'}}>Discard</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}
export default CreateEditForm;