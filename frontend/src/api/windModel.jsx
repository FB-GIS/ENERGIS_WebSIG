import axios from "axios"
import {config} from "../config"


//get all projects 
export function displayWindModel() {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/windmodels`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}



//get one project
export function displayOneWindModel(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/windmodel/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}

// add one project
export function addOneWindModel(datas) {
    const token = window.localStorage.getItem('websig-token')
    return axios.post(`${config.api_url}/api/windmodel/save`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// update one project
export function updateOneWindModel(datas, id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.put(`${config.api_url}/api/windmodel/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// delete one project
export function deleteOneWindModel(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.delete(`${config.api_url}/api/windmodel/delete/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}





