import axios from "axios"
import {config} from "../config"


//get all projects 
export function displayDevelopers() {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/developer/all`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}



//get one project
export function displayOneDeveloper(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/developer/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}

// add one project
export function addOneDeveloper(datas) {
    const token = window.localStorage.getItem('websig-token')
    return axios.post(`${config.api_url}/api/developer/save`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// update one project
export function updateOneDeveloper(datas, id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.put(`${config.api_url}/api/developer/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// delete one project
export function deleteOneDeveloper(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.delete(`${config.api_url}/api/developer/delete/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}





