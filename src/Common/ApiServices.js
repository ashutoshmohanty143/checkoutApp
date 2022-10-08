import axios from 'axios';
const API_BASE_URL_CHECK_EXISTING_CUSTOMER = "http://localhost:5000/api/curd/store/customer/type";
const API_BASE_URL = "http://localhost:5000/api/curd/store/doc";
//const API_BASE_URL = "https://thinkfast.in:5000/api/curd/doc";

class ApiServices {
    
    CheckExistingCustomer(formData){
        return axios.post(API_BASE_URL_CHECK_EXISTING_CUSTOMER, formData);
    }

    AddRecord(formData){
        return axios.post(API_BASE_URL, formData);
    }  

    GetAllRecords(collectionName){
        return axios.get(API_BASE_URL+"/?collection="+collectionName);
    }

    GetSingleRecordById(id,collectionName){
      return axios.get(API_BASE_URL+"/"+id+"/?collection="+collectionName);
    }

    DeleteRecord(id, collectionName){
        return axios.delete(API_BASE_URL+"/"+id+"/?collection="+collectionName);
    }

    UpdateRecord(formData){
        return axios.put(API_BASE_URL,formData);
    }

}

export default new ApiServices();