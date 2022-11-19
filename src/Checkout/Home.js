import React, { useEffect, useState } from 'react'
import { ClimbingBoxLoader, ClipLoader } from 'react-spinners';
import axios from 'axios';
import CommonMethods from '../Common/CommonMethods';
import './style.css';
import ApiServices from '../Common/ApiServices';
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert';

const Home = () => {
    const MOB_MAX_NUM = 12;
    const [mobileSectionDiv, setMobileSectionDiv] = useState(true);
    const [otpSectionDiv, setOtpSectionDiv] = useState(false);
    const [addressSectionDiv, setAddressSectionDiv] = useState(false);
    const [addressListSectionDiv, setaddressListSectionDiv] = useState(false);

    const [addressStepActive, setAddressStepActive] = useState(false);
    const [paymentStepActive, setPaymentStepActive] = useState(false);
    const [modalShow, setmodalShow] = useState(false);

    const [mobNextbtn, setMobNextbtn] = useState(true);
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [statelist, setStatelist] = useState([]);
    const [addresslist, setAddresslist] = useState([]);
    const [cartInfo, setCartInfo] = useState([]);
    const [cartItem, setCartItem] = useState([]);
    const [couponlist, setCouponlist] = useState([]);
    const [cliploader, setCliploader] = useState(false);
    const [cartloader, setcartLoader] = useState(true);
    const [couponloader, setCouponLoader] = useState(true);
    const [cartProductIds, setCartProductId] = useState([]);
    const [cartVariantIds, setCartVariantId] = useState([]);
    

    useEffect(() => {
        cartDetails();
        //couponDetails();
    },[]);

    const cartDetails = async () => {
        const urlString = window.location.href; 
        const url = new URL(urlString);
        const cartDetails = JSON.parse(url.searchParams.get("carturi"));
        
        // const cartRequest =
        // {
        //     "pincode": "751010",
        //     "vendorId": "62f1e95815f7885d3abbd760",
        //     "cartItems": [
        //         {
        //             "productId": 6800847077428,
        //             "quantity": 1,
        //             "selectedOptions": [
        //                 {
        //                     "name": "Size",
        //                     "value": "S"
        //                 },
        //                 {
        //                     "name": "Color",
        //                     "value": "Black"
        //                 }
        //             ]
        //         },
        //         {
        //             "productId": 6800847077428,
        //             "quantity": 2,
        //             "selectedOptions": [
        //                 {
        //                     "name": "Size",
        //                     "value": "M"
        //                 },
        //                 {
        //                     "name": "Color",
        //                     "value": "Black"
        //                 }
        //             ]
        //         },
        //         // {
        //         //     "productId": 6880080920628,
        //         //     "quantity": 2,
        //         //     "selectedOptions": []
        //         // }
        //     ]
        // }

        // const cartUri = encodeURIComponent(JSON.stringify(cartRequest));
        // console.log(cartUri);

        //order summary
        const cartDetailsResponse = await ApiServices.manageCart(cartDetails);
        try {
            if(cartDetailsResponse && cartDetailsResponse.data.data){
                //console.log(cartDetailsResponse);
                setcartLoader(false);
                if(cartDetailsResponse.status === 200 && cartDetailsResponse.data.status === "success"){
                   let cartData = cartDetailsResponse.data.data;
                    const lineCartItems = cartData.lineItems;
                    //console.log(lineCartItems);
                    let cartProductId = [];
                    let cartVariantId = [];
                    lineCartItems.map((item) => {
                        cartProductId.push(item.productId);
                        cartVariantId.push(item.productVariantId);
                        
                    });

                    

                    setCartProductId(...cartProductIds,cartProductId);
                    setCartVariantId(...cartVariantIds,cartVariantId);

                    //console.log('cartProductIds',cartProductIds);
                    //console.log('cartVariantIds',cartVariantIds);

                    setCartItem(lineCartItems);
                    let cartInfoDetails = {};
                    cartInfoDetails["subtotalAmount"] = cartData.subtotalAmount.amount;
                    cartInfoDetails["taxAmount"] = cartData.totalTaxAmount.amount;
                    cartInfoDetails["totalAmount"] = cartData.totalAmount.amount;
                    cartInfoDetails["cartId"] = cartData.cartId;
                    setCartInfo(cartInfoDetails);                    
                } else if(cartDetailsResponse.data.status === "false"){
                    setcartLoader(true);
                    console.log("error1");
                }        
            } else {
                console.log("error2")
            }
        } catch(error) {
            console.log("error3", error);
        };

        // ApiServices.manageCart(cartDetails).then(response => {
        //     if(response && response.data.data){
        //         //console.log(response);
        //         setcartLoader(false);
        //         if(response.status === 200 && response.data.status === "success"){
                    

        //             const lineCartItems = response.data.data.lineItems;
        //             //console.log(lineCartItems);
        //             let cartProductIds = [];
        //             let cartVariantIds = [];
        //             lineCartItems.map((item) => {
        //                 cartProductIds.push(item.productId);
        //                 cartVariantIds.push(item.productVariantId);
                        
        //             });
        //             setCartProductId(cartProductIds);
        //             setCartVariantId(cartVariantIds);

        //             setCartItem(lineCartItems);
        //             let cartInfoDetails = {};
        //             cartInfoDetails["subtotalAmount"] = response.data.data.subtotalAmount.amount;
        //             cartInfoDetails["taxAmount"] = response.data.data.totalTaxAmount.amount;
        //             cartInfoDetails["totalAmount"] = response.data.data.totalAmount.amount;
        //             cartInfoDetails["cartId"] = response.data.data.cartId;
        //             setCartInfo(cartInfoDetails);

                    
        //         } else if(response.data.status === "false"){
        //             setcartLoader(true);
        //             console.log("error1");
        //         }        
        //     } else {
        //         console.log("error2")
        //     }
        // }).catch(error => {
        //     console.log("error3", error);
        // });


        // const request =
        // {
        //     "vendorId": cartDetails.vendorId
        // }
        
        //coupon Details
        console.log('cartProductIds',cartProductIds);
        console.log('cartVariantIds',cartVariantIds);

        const couponDetailsResponse = await ApiServices.manageCoupon(cartDetails);
        try {
            if(couponDetailsResponse && couponDetailsResponse.data){
                setCouponLoader(false);
                if(couponDetailsResponse.status === 200 && couponDetailsResponse.data.status === "success"){
                    const couponData = couponDetailsResponse.data.data;
                    couponData.map((coupon) => {
                        if(coupon.target_selection === 'entitled') {
                            if(coupon.entitled_product_ids.length > 0){
                                cartProductIds.map((singlePid) => {
                                    if(!coupon.entitled_product_ids.includes(singlePid)) {
                                        coupon.isDisabled = true;
                                    } else {
                                        coupon.isDisabled = false;
                                    }   
                                });
                            } else if(coupon.entitled_variant_ids.length > 0){
                                cartVariantIds.map((singleVid) => {
                                    if(!coupon.entitled_variant_ids.includes(singleVid)) {
                                        coupon.isDisabled = true;
                                    } else {
                                        coupon.isDisabled = false;
                                    }   
                                });
                            } else {
                                coupon.isDisabled = false;
                            }
                        } else {
                            coupon.isDisabled = false;
                        }
                    })
                    
                    console.log(couponData);
                    setCouponlist(couponData);
                } else if(couponDetailsResponse.data.status === "false"){
                    setCouponLoader(true);
                    console.log("error1");
                }        
            } else {
                console.log("error2")
            }
        } catch(error) {
            console.log("error4", error);
        };
    }

    // const couponDetails = async () => {
    //     const url_string = window.location.href; 
    //     const url = new URL(url_string);
    //     const cartDetails = JSON.parse(url.searchParams.get("carturi"));
        
        

    //     ApiServices.manageCoupon(request).then(response => {
    //         if(response && response.data){
    //             setCouponLoader(false);
    //             if(response.status === 200 && response.data.status === "success"){
    //                 const couponDetails = response.data.data;
    //                 //console.log(couponDetails);
                    
    //                 setCouponlist(couponDetails);

    //             } else if(response.data.status === "false"){
    //                 setCouponLoader(true);
    //                 console.log("error1");
    //             }        
    //         } else {
    //             console.log("error2")
    //         }
    //     }).catch(error => {
    //         console.log("error3", error);
    //     });
    // }

    const handleFormFieldsChange = (event) => {
        setFields(fields => ({
            ...fields,
            [event.target.name]: event.target.value
        }));
    }
    
    const MobileNextbtn = (event) => {
        event.preventDefault();
        setMobileSectionDiv(false);
        setTimeout(() => {
            setOtpSectionDiv(true);
        }, "300");
    }

    const mobileInputHandler = (event) => {
        CommonMethods.phoneMasking(event);
        if (event.target.value.length != event.target.maxLength && event.target.value.length != MOB_MAX_NUM) {
            setMobNextbtn(true);
            document.querySelector('#mobile-next-btn').classList.remove('active-btn');
            document.querySelector('#mobile').classList.remove('active-border');
            document.querySelectorAll('.green-check')[0].style.display = "none";
            document.querySelectorAll('.red-alert')[0].style.display = "block";

        } else {
            setMobNextbtn(false);
            document.querySelector('#mobile').blur();
            document.querySelector('#mobile-next-btn').classList.add('active-btn');
            document.querySelector('#mobile').classList.add('active-border');
            document.querySelectorAll('.green-check')[0].style.display = "block";   
            document.querySelectorAll('.red-alert')[0].style.display = "none";
        }
    }

    
    const otpInputHandler = (event) => {
        if (event.target.value.length == 1 && event.target.value.length == event.target.maxLength) {
            event.target.classList.add('active-border');
            if (event.target.name == 'otp1' || event.target.name == 'otp2' || event.target.name == 'otp3') {
                event.target.nextSibling.focus();
            }
        } else {
            event.target.classList.remove('active-border');
        }
    }

    const otp4InputHandler = () => {
        if (fields['otp1'] === '1' && fields['otp2'] === '2' && fields['otp3'] === '3' && fields['otp4'] === '4') {
            // setTimeout(() => {
            // document.getElementById('otp-info').style.display = "block";
            // document.getElementById('otp-info').innerHTML = 'Verifying OTP';
            // }, "500");
            // setOtpSectionDiv(false);
            setAddressStepActive(true);

            //check existing user
            let vendorId = '62f9d325591adcd5e44e18ecs';
            let mobile = CommonMethods.unmask(fields['mobile']);
            const formData = {
                "collection": "customers_"+vendorId,
                "data": {
                    "mobile": "" + mobile + ""
                }
            };

            ApiServices.CheckExistingCustomer(formData).then(response => {           
                if (response.status === 200 && response.data.status == 'success' && response.data.isNewCustomer == true ) {
                    setTimeout(() => {
                        setCliploader(true);
                        document.getElementById('otp-info').style.display = "block";
                        document.getElementById('otp-info').innerHTML = 'Verifying OTP';
                    }, "1000");
                    setTimeout(() => {
                        setOtpSectionDiv(false);
                        setAddressSectionDiv(true);
                    }, "5000");
                } else if(response.status === 200 && response.data.status == 'success' && response.data.isNewCustomer == false){
                    setAddresslist(response.data);
                    setTimeout(() => {
                        setCliploader(true);
                        document.getElementById('otp-info').style.display = "block";
                        document.getElementById('otp-info').innerHTML = 'Verifying OTP';
                    }, "1000");
                    setTimeout(() => {
                        setOtpSectionDiv(false);
                        setaddressListSectionDiv(true);
                    }, "5000");
                }
            }).catch(error => {
                console.log(error);
            }); 
        }
    }

    const editMobileLink = event => {
        event.preventDefault();
        setOtpSectionDiv(false);
        setMobileSectionDiv(true);
        setCliploader(false);
    }

    const resendOTP = event => {
        event.preventDefault();
        document.querySelectorAll('.otp-value')[0].value = '';
        document.querySelectorAll('.otp-value')[1].value = '';
        document.querySelectorAll('.otp-value')[2].value = '';
        document.querySelectorAll('.otp-value')[3].value = '';

        // const otpValues = document.querySelectorAll('otp-value'); 
        // otpValues.forEach(i => {
        //      i.value = '';
        // });
        setTimeout(() => {
            setCliploader(true);
            document.getElementById('otp-info').style.display = "block";
            document.getElementById('otp-info').innerHTML = 'OTP Sent Again';
        }, "1000");
    }

    const addressBackBtnHandler = e => {
        setAddressStepActive(false);
        setAddressSectionDiv(false);
        setMobileSectionDiv(true);
        setFields({ fields: " " });
        setCliploader(false);
    }

    function formValidate(){
        let errors = {};
        let formIsValid = true;

        //Full Name
        if (!fields["fullName"]) {
          formIsValid = false;
          errors["fullName"] = "Full Name Cannot be empty";
        }
    
        //Email
        if (!fields["email"]) {
          formIsValid = false;
          errors["email"] = "Email Cannot be empty";
        }  else if (!CommonMethods.emailValidator(fields["email"])) {
          formIsValid = false;
          errors["email"] = "Please enter valid email.";
        } 
 
        //Address
        if (!fields["address"]) {
          formIsValid = false;
          errors["address"] = "Address Cannot be empty";
        }  
    
        //Landmark
        if (!fields["landmark"]) {
          formIsValid = false;
          errors["landmark"] = "Landmark Cannot be empty";
        }  
    
         //City
         if (!fields["city"]) {
          formIsValid = false;
          errors["city"] = "City Cannot be empty";
        }    
    
        //Pincode
        if (!fields["pincode"]) {
          formIsValid = false;
          errors["pincode"] = "Pincode Cannot be empty";
        } else if (fields["pincode"].length != 6) {
          formIsValid = false;
          errors["pincode"] = "Pincode should be 6 digits";
        }

        //State
        let cstate = document.querySelector('#state');
        let stateValue = cstate.options.selectedIndex;
        if (stateValue === 0) {
            formIsValid = false;
            errors["state"] = 'Please Select State';
        }
    
    
        setErrors(errors);
        console.log(errors);
        return formIsValid;
      }

    const addressNextBtnHandler = e => {
        e.preventDefault();
        if (formValidate()) {
            let vendorId = '62f9d325591adcd5e44e18ecs';
            let { fullName, email, address, landmark, city, pincode, state, addressType } = fields;
            let mobile = CommonMethods.unmask(fields['mobile']);
            const formData = {
                "collection": "customers_"+vendorId,
                "data": {
                    "name": fullName,
                    "email": email,
                    "mobile": mobile,
                    "address": [
                        {
                            "addressType": addressType,
                            "address": address,
                            "landmark": landmark,
                            "city": city,
                            "pincode": pincode,
                            "state": state
                        }
                    ]
                }
            };
            ApiServices.AddRecord(formData).then(response => {
                console.log(response);
                // if (response.status == 200 && response.data.status == 'success') {
                //     setaddressListSectionDiv(true);
                // } else if (response.data.status == 'failed' && response.data.message == 'UNIQUE KEY CONSTRAINT') {
                    
                // }
            }).catch(error => {
                console.log(error);
            });;
        } else {
            console.log("Form Validation Error");
        }
    }

    const pincodeInputHandler = e => {
        if(!CommonMethods.numberValidation(e)){
            setErrors({ ...errors, pincode : "Please enter Only Numbers (Max 6)" });
          } else {
            setErrors({ ...errors, pincode : ""  });
          }
    }

    const removeCartItem = (event, cartId, cartItemId) => {
        swal({
            // title: "Are you sure?",
            text: "Product in huge demand <br> might run out of stock. <br>Are you sure want to cancel payment.",
            // icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
                const cartItemRemoveRequest = {
                    cartId: cartId,
                    cartItemId: cartItemId,
                    quantity: 0
                };

                //let currentLineItems = productlist[0].lineItems;
                ApiServices.removeCart(cartItemRemoveRequest).then((response) => {
                    if (response.status === 200 && response.data.status === "success") {
                        let newCartItems = [...cartItem];
                        var index = newCartItems.map(item => item.cartItemId).indexOf(cartItemId);
                        newCartItems.splice(index, 1);
                        setCartItem(newCartItems);
                        console.log(response);
                        let cartInfoDetails = {};
                        cartInfoDetails["subtotalAmount"] = response.data.data.subtotalAmount.amount;
                        cartInfoDetails["taxAmount"] = response.data.data.totalTaxAmount.amount;
                        cartInfoDetails["totalAmount"] = response.data.data.totalAmount.amount;
                        cartInfoDetails["cartId"] = response.data.data.cartId;
                        //console.log(cartInfoDetails);
                        setCartInfo(cartInfoDetails);
                    }
                }).catch((error) => {
                    console.log("error", error);
                });
            }
          });
    }

    //console.log(cartItem);
    //console.log(cartInfo);
    return (     
        <>            
            <div className="modal-body row">
                <div className="checkout-container-left">
                    <span className="trianle"></span>
                    <div className="verticalbanner">
                        <img src="./img/logo.png" width="60px" height="45px" alt="Logo" />
                    </div>
                    <div className="cart">
                        <img id="cart_img" src="./img/cart.png" width="100px" height="100px" alt="Cart-icon" />
                    </div>


                    <div className="checkout-header">
                        <div className='me-3 active-step'>
                            <img src="./img/followers-active.png" className='me-2' />
                            <span>Verify</span>
                        </div>
                        <div className={`me-3 ${addressStepActive ? 'active-step' : 'disabled-step'}`}>
                            <img src={addressStepActive ? './img/address-active.png' : './img/address.png'} className='me-2' />
                            <span>Address</span>
                        </div>
                        <div className={`me-3 ${paymentStepActive ? 'active-step' : 'disabled-step'}`}>
                            <img src={paymentStepActive ? '' : './img/payment-method.png'} className='me-2' />
                            <span>Payment</span>
                        </div>
                    </div>


                    {mobileSectionDiv ?
                        <div className="mobile-section">
                            <h6 className="mb-5 text-muted welcome">Welcome</h6>
                            <h4 className="mb-3 enter-mobile">Please enter your mobile number</h4>
                            <div className="input-group">
                                <span className="country-code" id="mob-code">+91</span>
                                <input type="text" name="mobile" id='mobile' className="form-control mobile" maxLength={MOB_MAX_NUM}
                                    placeholder="999 888 0000" onInput={mobileInputHandler}
                                    onChange={handleFormFieldsChange} value={fields['mobile'] || ''} />
                                <span className="green-check"><i className="bi bi-check-circle-fill"></i></span>
                                <span className="red-alert" data-bs-toggle="pass_tooltip" data-bs-placement="top" 
                                    title={`Give only 10 digit mobile number`}><i className="bi bi-info-circle-fill"></i>
                                </span>
                            </div>
                            <div className="text-muted ms-1 mt-2" style={{ fontSize: 12 + 'px' }}>A 4 digit OTP will be sent via
                                SMS to verify your mobile number!</div>
                            <button onClick={MobileNextbtn} id="mobile-next-btn" className="mobile-next-btn form-control mt-5" disabled={mobNextbtn}>Get
                                OTP</button>
                        </div>
                        : ''}

                    {otpSectionDiv ?
                        <div className="otp-section">
                            <h6 className="mb-5 text-muted verification">Verification</h6>
                            <h6 className="mb-3 enter-otp">OTP is sent to
                                <span className='me-2'>
                                    {' ' + fields['mobile']}
                                    <sup>
                                        <i className="bi bi-pencil-square edit-icon ms-2" onClick={editMobileLink}></i>
                                    </sup>
                                </span>
                            </h6>
                            <div className="input-group mb-2">
                                <input type="text" name="otp1" className="form-control otp-value"
                                    maxLength="1" onInput={otpInputHandler} onChange={handleFormFieldsChange} />
                                <input type="text" name="otp2" className="form-control otp-value"
                                    maxLength="1" onInput={otpInputHandler} onChange={handleFormFieldsChange} />
                                <input type="text" name="otp3" className="form-control otp-value"
                                    maxLength="1" onInput={otpInputHandler} onChange={handleFormFieldsChange} />
                                <input type="text" name="otp4" className="form-control otp-value"
                                    maxLength="1" onKeyUp={otp4InputHandler} onChange={handleFormFieldsChange} />
                            </div>
                            <span><ClipLoader size={16} color="#35bd35" loading={cliploader} /></span>
                            <span className='otp-info' id='otp-info'></span>
                            <div className="text-muted ms-1 mt-5 otp-not-received">Didn't get the OTP? 
                                <span className="resend-otp" onClick={resendOTP}>Resend a new code</span>
                            </div>
                        </div>
                        : ''}


                    {addressSectionDiv ?
                        <div className="address-section">
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <input type="text" name="fullName" className="form-control addressTextBox"
                                        placeholder="Full Name*" onChange={handleFormFieldsChange} />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" name="email" className="form-control addressTextBox"
                                        placeholder="Email Address*" onChange={handleFormFieldsChange} />
                                </div>
                            </div>
                            <div className="currentLocation">
                                <a href=""><i className="bi bi-circle bi-geo-alt"></i></a> Use current
                                location
                            </div>
                            <div className="mb-2">
                                <input type="text" name="address" className="form-control addressTextBox"
                                    placeholder="Address(Area and street)*" onChange={handleFormFieldsChange} />
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input type="text" name="landmark" className="form-control mb-2 addressTextBox"
                                        placeholder="Landmark*" onChange={handleFormFieldsChange} />
                                    <input type="text" name="city" className="form-control addressTextBox"
                                        placeholder="City/District/Town*" onChange={handleFormFieldsChange} />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" name="pincode" className="form-control mb-2 addressTextBox"
                            placeholder="Pincode*" maxLength="6" onInput={pincodeInputHandler} onChange={handleFormFieldsChange} />
                                    <select name="state" id="state" className="form-control addressTextBox" onChange={handleFormFieldsChange}>
                                    {/* {statelist ? statelist.map((item) =>
                                            <option value={item}>{item}</option>
                                        ) : " "
                                    } */}
                                            <option value="0">--Select State--</option>
                                            <option value="Odisha">Odisha</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-2">
                                <h6>Address Type*</h6>
                            </div>
                            <div className="addressTypeRadio">
                                <div className="form-check col-md-4">
                                    <input className="form-check-input" type="radio" name="addressType" id="home"
                                        value="Home" defaultChecked onChange={handleFormFieldsChange} />
                                    <label className="form-check-label" htmlFor="home">Home <br /> <span
                                        style={{ fontSize: 10 + 'px' }}>(All day delivery)</span></label>
                                </div>
                                <div className="form-check col-md-4">
                                    <input className="form-check-input" type="radio" name="addressType" id="work"
                                        value="Work" onChange={handleFormFieldsChange} />
                                    <label className="form-check-label" htmlFor="work">Work <br /> <span
                                        style={{ fontSize: 10 + 'px' }}>(Between 10 AM-5 PM)</span></label>
                                </div>
                                <div className="form-check col-md-4 d-flex">
                                    <input className="form-check-input me-2" type="radio" name="addressType" id="other"
                                        value={fields['add_type_other']} onChange={handleFormFieldsChange} />
                                    <label className="form-check-label me-2" htmlFor={fields['add_type_other']}>{fields['add_type_other']}</label>
                                    <input type="text" id="add_type_other" className="add_type_other" onChange={handleFormFieldsChange} value={fields['add_type_other']}/>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between">
                                <input type="button" className="address-back-btn form-control" value="&larr;"
                                    onClick={addressBackBtnHandler} />
                                <input type="button" className="address-next-btn form-control" value="Next"
                                    onClick={addressNextBtnHandler} />
                            </div>

                        </div>
                        : ''}

                    {addressListSectionDiv ?
                        <div className="address-list-section">
                            <div className="address-list">

                                {addresslist ? addresslist.map((item, i) =>
                                    <ul style={{ listStyleType: "none", paddingLeft: 0 }} key={item._id}>
                                        <li>
                                            <div className="address-card active-address">
                                                <div className="mb-2">
                                                    <span className="add_list_round"><i className="bi bi-house-heart-fill"></i></span> <b
                                                        style={{ fontSize: 'small' }}>{item.addressType}</b>
                                                    <span className="edit-address-btn"><i className="bi bi-pencil-square"></i></span>
                                                </div>
                                                <div>
                                                    <input type="radio" className="form-check-input custom-align-radio me-2"
                                                        name="shipping_address" defaultChecked />
                                                    <label className="address-label"><span className="me-4">{'  '}{item.fullName}</span>
                                                        <span>{item.address + ', ' + item.city + ', ' + item.state}</span></label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                ) : "Data Not Found"
                                }

                                {/* <div className="address-card active-address">
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
                    </div> */}

                            </div>
                            <div className="add-new-address" id="add-new-address">
                                <i className="bi bi-plus-circle-fill"></i> Add address
                            </div>

                            <button className="pay-nxt-btn">Next</button>
                        </div>
                        : ''}


                </div>

                <div className="checkout-container-right">
                    {/* <div className="close-btn" data-bs-dismiss="modal"><i className="bi bi-x-lg"></i></div> */}

                    <div className="top-section">
                        <span><strong>Order Summary</strong></span>
                    </div>

                    {/* order summary */}
                    <div className="cart-section">                       
                        <div className={`cart-list ${!cartItem.length ? 'text-center' : '' }`}>
                            <ul>                                
                            
                            { cartItem && cartItem.length ? cartItem.map((item, index) =>
                                    <li className='cart-list-item' key={item.productVariantId}>
                                        
                                        <div className="cart-list-item row" key={item.productVariantId}>
                                            <div className="col-md-3 cart-img">
                                                <img src={item.image} alt="Cart 1" />
                                            </div>
                                            <div className="col-md-9">
                                                
                                                <div className="product-name">{item.itemName}</div>
                                                <div className="variant">
                                                    {item.itemOptions && item.itemOptions.length > 0 ? item.itemOptions.map((result,index) =>
                                                    <>
                                                    {result.name} : 
                                                    <span className="variant-option" key={index}> &nbsp; {result.value}</span>
                                                    </>) : ''
                                                    }
                                                </div>
                                                <div className="product-price">Rs.&nbsp;&nbsp;{item.price} * {item.itemQuantity}</div>
                                                { cartItem.length > 1 ? 
                                                <div className="remove-cart">
                                                    <a className="remove" onClick={(event) => removeCartItem(event, cartInfo.cartId, item.cartItemId)}><i className="bi bi-trash-fill"></i> Remove </a>
                                                </div> : ''}
                                            </div>
                                        </div>
                                    </li> 
                                ) : 
                                    <span><ClipLoader size={20} color="#000" loading={cartloader} /></span>                            
                                }
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="price">Subtotal</div>
                                <div className="discount">Coupon Discount</div>
                                <div className="discount">Tax</div>
                                <div className="shipping">Shipping</div>
                            </div>
                            <div className="col-md-4 text-end">
                                <div className="amount">&#8377; {cartInfo.subtotalAmount}</div>
                                <div className="amount">&#8377; {cartInfo.taxAmount}</div>
                                <div className="amount">&#8377; 0.00</div>
                            </div>

                            <div className="col-md-6">
                                <div><strong>To Pay</strong></div>
                            </div>
                            <div className="col-md-6 text-end">
                                <div><strong>&#8377; {cartInfo.totalAmount}</strong></div>
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
                                {couponlist && couponlist.length ? couponlist.map((item) =>
                                    <div className="coupon-details">
                                        <label className="form-check-label">
                                            <div className="c-list">
                                                <div className="coupon fw-bold">{item.code}</div>
                                                <div className="coupon-desc">Get upto {Math.trunc(item.value * -1)}% discount on your purchase</div>
                                                <div className="apply-code"><a href=""> Apply Now </a></div>
                                            </div>
                                        </label>
                                    </div>
                                        ): <span><ClipLoader size={20} color="#000" loading={couponloader} /></span> 
                                        }
                                {/* <div className="coupon-details">
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
                                </div> */}
                            </div>

                        </div>
                    </div>

                </div>
            </div>            
        </>
    )
}

export default Home