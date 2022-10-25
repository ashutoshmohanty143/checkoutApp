import axios from 'axios';
//const API_BASE_URL = "http://localhost:5000/api/curd";
const API_BASE_URL = "http://thinkfast.in:5000/api/curd";

class ApiServices {
    
    CheckExistingCustomer(formData){
        return axios.post(API_BASE_URL+"/store/customer/type", formData);
    }

    manageCart(formData){
        return axios.post(API_BASE_URL+"/cart", formData);
    }

    // AddRecord(formData){
    //     return axios.post(API_BASE_URL+"/doc", formData);
    // }  

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