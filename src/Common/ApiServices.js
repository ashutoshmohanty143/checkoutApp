import axios from 'axios';
// const API_BASE_URL_CHECK_EXISTING_CUSTOMER = "http://localhost:5000/api/curd/store/customer/type";
const API_BASE_URL = "http://localhost:5000/api/curd/store";
//const API_BASE_URL = "http://localhost:5000/api/curd/store/doc";
//const API_BASE_URL = "https://thinkfast.in:5000/api/curd/doc";

class ApiServices {
    
    CheckExistingCustomer(formData){
        return axios.post(API_BASE_URL+"/customer/type", formData);
    }

    AddRecord(formData){
        return axios.post(API_BASE_URL+"/doc", formData);
    }  

    GetAllRecords(collectionName){
        return axios.get(API_BASE_URL+"/doc/?collection="+collectionName);
    }

    GetSingleRecordById(id,collectionName){
      return axios.get(API_BASE_URL+"/doc/"+id+"/?collection="+collectionName);
    }

    DeleteRecord(id, collectionName){
        return axios.delete(API_BASE_URL+"/doc/"+id+"/?collection="+collectionName);
    }

    UpdateRecord(formData){
        return axios.put(API_BASE_URL+"/doc", formData);
    }

}

export default new ApiServices();