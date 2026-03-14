import axios from "axios"
import {config} from "../config"


//get all projects 
export function displayStatus() {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/statusprojects/all`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}



//get one project
export function displayOneStatus(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/statusproject/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}

// add one project
export function addOneStatus(datas) {
    const token = window.localStorage.getItem('websig-token')
    return axios.post(`${config.api_url}/api/statusproject/save`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// update one project
export function updateOneStatus(datas, id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.put(`${config.api_url}/api/statusproject/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// delete one project
export function deleteOneStatus(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.delete(`${config.api_url}/api/statusproject/delete/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}





