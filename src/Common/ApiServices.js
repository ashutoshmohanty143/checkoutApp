import axios from 'axios';
const API_BASE_URL = "http://localhost:5000/api/curd";
// const API_BASE_URL = "https://thinkfast.in:5000/api/curd";

class ApiServices {
    
    CheckExistingCustomer(formData){
        return axios.post(API_BASE_URL+"/store/customer/type", formData);
    }

    async manageCart(formData){
        const response = await axios.post(API_BASE_URL+"/cart", formData);
        return response;
    }

    removeCart(formData){
        return axios.post(API_BASE_URL+"/edit-cart", formData);
    }

    manageCoupon(formData){
        return axios.post(API_BASE_URL+"/discount-code", formData);
    }
    
    applyCoupon(formData){
        return axios.post(API_BASE_URL+"/cart-discount", formData);
    }

    // GetAllRecords(collectionName){
    //     return axios.get(API_BASE_URL+"/doc/?collection="+collectionName);
    // }

    // GetSingleRecordById(id,collectionName){
    //   return axios.get(API_BASE_URL+"/doc/"+id+"/?collection="+collectionName);
    // }

    // DeleteRecord(id, collectionName){
    //     return axios.delete(API_BASE_URL+"/doc/"+id+"/?collection="+collectionName);
    // }

    // UpdateRecord(formData){
    //     return axios.put(API_BASE_URL+"/doc", formData);
    // }

}

export default new ApiServices();