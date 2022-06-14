import React from 'react';

const CallToAction = () => {

    return (
        <div className="col-lg-4">
            <div className="product-right product-form-box">
                <h4>
                    <del>$459.00</del>
                    <span>55% off</span></h4>
                <h3>$32.96</h3>
                <ul className="color-variant">
                    <li className="bg-light0 active"></li>
                    <li className="bg-light1"></li>
                    <li className="bg-light2"></li>
                </ul>
                <div id="selectSize" className="addeffect-section product-description border-product">
                    <h6 className="product-title">select size</h6>
                    <div className="size-box">
                        <ul>
                            <li><a href="#!">s</a></li>
                            <li><a href="#!">m</a></li>
                            <li><a href="#!">l</a></li>
                            <li><a href="#!">xl</a></li>
                        </ul>
                    </div>
                    <h6 className="product-title">quantity</h6>
                    <div className="qty-box">
                        <div className="input-group">
                                            <span className="input-group-prepend">
                                                <button
                                                    type="button"
                                                    className="btn quantity-left-minus"
                                                    data-type="minus">
                                                    <i className="ti-angle-left" />
                                                </button>
                                            </span>
                            <input type="text" name="quantity" className="form-control input-number"
                                   value="1" />
                            <span className="input-group-prepend">
                                                <button
                                                    type="button"
                                                    className="btn quantity-right-plus"
                                                    data-type="plus">
                                                    <i className="ti-angle-right" />
                                                </button>
                                            </span>
                        </div>
                    </div>
                </div>
                <div className="product-buttons">
                    <a href="#!" className="btn btn-solid hover-solid btn-animation">add to cart</a>
                    <a href="#" className="btn btn-solid">wishlist</a>
                </div>
            </div>
        </div>
    )
}
export default CallToAction;