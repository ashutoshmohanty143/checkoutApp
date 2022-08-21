import React, { useState } from 'react'
import CommonMethods from '../Common/CommonMethods';
import './style.css'


const Home = () => {
        const [ mobileSectionDiv, setMobileSectionDiv ] = useState(true);
        const [ otpSectionDiv, setOtpSectionDiv ] = useState(false);
        const [ addressSectionDiv, setAddressSectionDiv ] = useState(false);
        const [ addressListSectionDiv, setaddressListSectionDiv ] = useState(false);

        const [addressStepActive, setAddressStepActive] = useState(false);
        const [paymentStepActive, setPaymentStepActive] = useState(false);

        const [mobNextbtn, setMobNextbtn] = useState(true);
        const [fields, setFields] = useState({});
        const [errors, setErrors] = useState({});

        const MOB_MAX_NUM = 12;

        const handleFormFieldsChange = event => {
            fields[event.target.name] = event.target.value;
            setFields(fields); 
          }

        const MobileNextbtn = (event) => {
            event.preventDefault();
            setMobileSectionDiv(false);
            setTimeout(() => {
                setOtpSectionDiv(true);
            }, "300");
        }

        const mobileInputHandler = event => {
            CommonMethods.phoneMasking(event);
            if(event.target.value.length != event.target.maxLength && event.target.value.length != MOB_MAX_NUM){
                setMobNextbtn(true);
                document.querySelector('#mobile-next-btn').classList.remove('active-btn');
                //
                document.querySelector('#mobile').classList.remove('active-border');
                document.querySelector('#mobile').classList.add('danger-border');
                document.querySelectorAll('.green-check')[0].style.display = "none";
                // document.querySelector('#mobile').blur();
            } else {
                

                setMobNextbtn(false);
                document.querySelector('#mobile').blur();
                document.querySelector('#mobile-next-btn').classList.add('active-btn');
                document.querySelector('#mobile').classList.remove('danger-border');
                document.querySelector('#mobile').classList.add('active-border');
                document.querySelectorAll('.green-check')[0].style.display = "block";
            }
        }

  return (
    <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#checkoutModal">
            Checkout
        </button>

        <div className="modal fade" id="checkoutModal" tabIndex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
                <div className="modal-body row">
                    <div className="checkout-container-left">
                        <span className="trianle"></span>
                        <div className="verticalbanner">
                            <img src="../../img/logo.png" width="60px" height="45px" alt="Logo" />
                        </div>
                        <div className="cart">
                            <img id="cart_img" src="../../img/cart.png" width="100px" height="100px" alt="Cart-icon" />
                        </div>
                        
                        
                        <div className="checkout-header">
                            <div className='me-3 active-step'>
                                        <img src="../../img/followers-active.png" className='me-2'/>
                                <span>Verify</span>
                            </div>
                            <div className={`me-3 ${ addressStepActive ? 'active-step' : 'disabled-step'}`}>
                                <img src={ addressStepActive ? '../../img/address-active.png' : '../../img/address.png' } className='me-2'/>
                                <span>Address</span>
                            </div>
                            <div className={`me-3 ${ paymentStepActive ? 'active-step' : 'disabled-step'}`}>
                                <img src={ paymentStepActive ? '' : '../../img/payment-method.png' } className='me-2'/>
                                <span>Payment</span>
                            </div>
                        </div>
                        

                        { mobileSectionDiv ?
                        <div className="mobile-section">
                            <h6 className="mb-5 text-muted welcome">Welcome</h6>
                            <h4 className="mb-3 enter-mobile">Please enter your mobile number</h4>
                            <div className="input-group">
                                <span className="country-code" id="mob-code">+91</span>
                                <input type="text" name="mobile" id='mobile' className="form-control mobile" maxLength={MOB_MAX_NUM}
                                    placeholder="999 888 0000" onInput={mobileInputHandler} 
                                     onChange={handleFormFieldsChange} />
                                <span className="green-check"><i className="bi bi-check-circle-fill"></i></span>
                            </div>
                            <div className="text-muted ms-1 mt-2" style={{fontSize: 12+'px'}}>A 4 digit OTP will be sent via
                                SMS to verify your mobile number!</div>
                            <button onClick={MobileNextbtn} id="mobile-next-btn" className="mobile-next-btn form-control mt-5" disabled={mobNextbtn}>Get
                                OTP</button>
                        </div>
                        : ''}

                        { otpSectionDiv ? 
                        <div className="otp-section">
                            <h6 className="mb-5 text-muted verification">Verification</h6>
                            <h6 className="mb-3 enter-otp">OTP is sent to <span id="mob-num">+999 888 0000<sup><i
                                            className="bi bi-pencil-square edit-icon ms-1"
                                            id="edit-phone-link"></i></sup></span></h6>
                            <div className="input-group">
                                <input type="text" name="otp2" className="form-control otp-value" maxLength="1" />
                                <input type="text" name="otp1" className="form-control otp-value" maxLength="1" />
                                <input type="text" name="otp3" className="form-control otp-value" maxLength="1" />
                                <input type="text" name="otp4" className="form-control otp-value" maxLength="1" />
                            </div>
                            <div className="text-muted ms-1 mt-5 otp-not-received">Didn't get the OTP <span
                                    className="resend-otp">Resend a new code</span></div>
                        </div>
                        : ''}


                        { addressSectionDiv ?
                        <div className="address-section">
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <input type="text" name="fullName" className="form-control addressTextBox"
                                        placeholder="Full Name*" />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" name="email" className="form-control addressTextBox"
                                        placeholder="Email Address*" />
                                </div>
                            </div>
                            <div className="currentLocation">
                                <a href=""><i className="bi bi-circle bi-geo-alt"></i></a> Use current
                                location
                            </div>
                            <div className="mb-2">
                                <input type="text" name="address" className="form-control addressTextBox"
                                    placeholder="Address(Area and street)*" />
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input type="text" name="landmark" className="form-control mb-2 addressTextBox"
                                        placeholder="Landmark*" />
                                    <input type="text" name="city" className="form-control addressTextBox"
                                        placeholder="City/District/Town*" />
                                </div>
                                <div className="col-md-6">
                                    {/* <input type="text" name="pincode" className="form-control mb-2 addressTextBox"
                                        placeholder="Pincode*" maxLength="6"
                                        onInput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /> */}
                                    <select name="state" id="state" className="form-control addressTextBox">
                                        {/* <option value="mumbai">Mumbai</option>
                                        <option value="bangalore">Bangalore</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-2">
                                <h6>Address Type*</h6>
                            </div>
                            <div className="addressTypeRadio">
                                <div className="form-check col-md-4">
                                    <input className="form-check-input" type="radio" name="addressType" id="home"
                                        value="home" defaultChecked />
                                    <label className="form-check-label" htmlFor="home">Home <br/> <span
                                            style={{fontSize: 10+'px'}}>(All day delivery)</span></label>
                                </div>
                                <div className="form-check col-md-4">
                                    <input className="form-check-input" type="radio" name="addressType" id="work"
                                        value="work" />
                                    <label className="form-check-label" htmlFor="work">Work <br/> <span
                                            style={{fontSize: 10+'px'}}>(Between 10 AM-5 PM)</span></label>
                                </div>
                                <div className="form-check col-md-4 d-flex">
                                    <input className="form-check-input me-2" type="radio" name="addressType" id="other"
                                        value="other" />
                                    <label className="form-check-label me-2" htmlFor="other">Other</label>
                                    <input type="text" id="add_type_other" className="add_type_other" />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between">
                                <input type="button" id="address-back-btn" className="address-back-btn form-control"
                                    value="&larr;" />
                                <input type="button" id="address-next-btn" className="address-next-btn form-control"
                                    value="Next" />
                            </div>

                        </div>
                        : ''}

                        { addressListSectionDiv ?
                        <div className="address-list-section">
                            <div className="address-list">

                                <div className="address-card active-address">
                                    <div className="mb-2">
                                        <span className="add_list_round"><i className="bi bi-house-heart-fill"></i></span> <b
                                            style={{fontSize: 'small'}}>Home</b>
                                        <span className="edit-address-btn"><i className="bi bi-pencil-square"></i></span>
                                    </div>
                                    <div>
                                        <input type="radio" className="form-check-input custom-align-radio"
                                            name="shipping_address" defaultChecked />
                                        <label className="address-label"><span className="me-4">Vikas Kumar</span><span>Bolck C,
                                                Sector - 8, Chandigarh</span></label>
                                    </div>
                                </div>

                                <div className="address-card">
                                    <div className="mb-2">
                                        <span className="add_list_round"><i className="bi bi-house-heart-fill"></i></span> <b
                                            style={{fontSize: 'small'}}>Work</b>
                                        <span className="delete-address-btn"><i className="bi bi-trash"></i></span>
                                        <span className="edit-address-btn"><i className="bi bi-pencil-square"></i></span>
                                    </div>
                                    <div>
                                        <input type="radio" className="form-check-input custom-align-radio"
                                            name="shipping_address" />
                                        <label className="address-label"><span className="me-4">Vikas Kumar</span><span>Bolck C,
                                                Sector - 8, Chandigarh</span></label>
                                    </div>
                                    <span className="make-default-address">Make as default</span>
                                </div>

                                <div className="address-card">
                                    <div className="mb-2">
                                        <span className="add_list_round"><i className="bi bi-house-heart-fill"></i></span> <b
                                            style={{fontSize: 'small'}}>Friend</b>
                                        <span className="delete-address-btn"><i className="bi bi-trash"></i></span>
                                        <span className="edit-address-btn"><i className="bi bi-pencil-square"></i></span>
                                    </div>
                                    <div>
                                        <input type="radio" className="form-check-input custom-align-radio"
                                            name="shipping_address" />
                                        <label className="address-label"><span className="me-4">Vikas Kumar</span><span>Bolck C,
                                                Sector - 8, Chandigarh</span></label>
                                    </div>
                                    <span className="make-default-address">Make as default</span>
                                </div>

                            </div>
                            <div className="add-new-address" id="add-new-address">
                                <i className="bi bi-plus-circle-fill"></i> Add address
                            </div>

                            <button className="pay-nxt-btn">Next</button>
                        </div>
                        : ''}


                    </div>

                    <div className="checkout-container-right">
                        <div className="close-btn" data-bs-dismiss="modal"><i className="bi bi-x-lg"></i></div>
                        
                        <div className="top-section">            
                            <span><strong>Order Summary</strong></span>
                        </div>

                        <div className="cart-section">
                            <div className="cart-list">
                                <div className="cart-list-item row">
                                    <div className="col-md-3 cart-img"  style={{paddingRight: 0}}>
                                        <img src="../../img/adidas.png" alt="Cart 1" />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="product-name">Adidas Style Sneakers</div>
                                        <div className="variant">Size&nbsp;&nbsp;<span className="size">XL</span>
                                            Color&nbsp;&nbsp;<span className="color">Blue</span></div>
                                        <div className="product-price">Rs. 1685.00 * 01</div>
                                        <div className="remove-cart"><a className="remove" href="#."><i
                                                    className="bi bi-trash-fill"></i> Remove </a></div>
                                    </div>
                                </div>
                                <div className="cart-list-item row">
                                    <div className="col-md-3 cart-img" style={{paddingRight: 0}}>
                                        <img src="../../img/sneaker.png" alt="Cart 1" />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="product-name">Adidas Style Sneakers</div>
                                        <div className="variant">Size&nbsp;&nbsp;<span className="size">XL</span>
                                            Color&nbsp;&nbsp;<span className="color">Blue</span></div>
                                        <div className="product-price">Rs. 1685.00 * 01</div>
                                        <div className="remove-cart"><a href="#."><i className="bi bi-trash-fill"></i> Remove
                                            </a></div>
                                    </div>
                                </div>
                                <div className="cart-list-item row">
                                    <div className="col-md-3 cart-img" style={{paddingRight: 0}}>
                                        <img src="../../img/sneaker.png" alt="Cart 1" />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="product-name">Adidas Style Sneakers</div>
                                        <div className="variant">Size&nbsp;&nbsp;<span className="size">XL</span>
                                            Color&nbsp;&nbsp;<span className="color">Blue</span></div>
                                        <div className="product-price">Rs. 1685.00 * 01</div>
                                        <div className="remove-cart"><a href="#."><i className="bi bi-trash-fill"></i> Remove
                                            </a></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8">
                                    <div className="price">Subtotal</div>
                                    <div className="discount">Coupon Discount</div>
                                    <div className="shipping">Shipping</div>
                                </div>
                                <div className="col-md-4 text-end">
                                    <div className="amount">&#8377; 3299.00</div>
                                    <div className="amount">&#8377; 659.80</div>
                                    <div className="amount">&#8377; 0.00</div>
                                </div>
                                
                                <div className="col-md-6">
                                    <div><strong>To Pay</strong></div>
                                </div>
                                <div className="col-md-6 text-end">
                                    <div><strong>&#8377; 2639.00</strong></div>
                                </div>
                            </div>
                        </div>

                        <div className="coupon-section">
                            <span><strong>Coupon Details</strong></span>
                            <div className="coupon-box">
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <input type="text" className="form-control coupon_text" id="cpnTextbox"
                                        placeholder="Promocode" />
                                </div>
                                <div className="col-md-4">
                                    <button className="coupon_apply_btn">Apply</button>
                                </div>
                            </div>
                            <div className="coupon-list">
                                <div className="coupon-details">
                                    <label className="form-check-label">
                                        <div className="c-list">
                                            <div className="coupon fw-bold">CC20</div>
                                            <div className="coupon-desc">Get upto 20% discount on your purchase</div>
                                            <div className="apply-code"><a href=""> Apply Now </a></div>
                                        </div>
                                    </label>
                                </div>
                                <div className="coupon-details">
                                    <label className="form-check-label">
                                        <div className="c-list">
                                            <div className="coupon fw-bold">CC20</div>
                                            <div className="coupon-desc">Get upto 20% discount on your purchase</div>
                                            <div className="apply-code"><a href=""> Apply Now </a></div>
                                        </div>
                                    </label>
                                </div>
                                <div className="coupon-details">
                                    <label className="form-check-label">
                                        <div className="c-list">
                                            <div className="coupon fw-bold">CC20</div>
                                            <div className="coupon-desc">Get upto 20% discount on your purchase</div>
                                            <div className="apply-code"><a href=""> Apply Now </a></div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                        </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home