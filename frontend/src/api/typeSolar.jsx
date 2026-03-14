import axios from "axios"
import {config} from "../config"


//get all projects 
export function displayTypeSolar() {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/typessolar/all`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}



//get one project
export function displayOneTypeSolar(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/typesolar/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}

// add one project
export function addOneTypeSolar(datas) {
    const token = window.localStorage.getItem('websig-token')
    return axios.post(`${config.api_url}/api/typesolar/save`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// update one project
export function updateOneTypeSolar(datas, id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.put(`${config.api_url}/api/typesolar/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// delete one project
export function deleteOneTypeSolar(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.delete(`${config.api_url}/api/typesolar/delete/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}





