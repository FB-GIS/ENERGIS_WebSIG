import axios from "axios"
import {config} from "../config"


//get all project areas 
export function displayAllProjectAreas() {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/projectareas/all`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}

//get all project areas filtered by user ID
export function displayProjectAreas() {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/projectareas`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}

//get one project areas filtered by user ID
export function displayOneProjectArea(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/projectarea/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// add one project area
export function addOneProjectArea(datas) {
    const token = window.localStorage.getItem('websig-token')
    return axios.post(`${config.api_url}/api/projectarea/save`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}

// update one project area
export function updateOneProjectArea(datas, id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.put(`${config.api_url}/api/projectarea/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// delete one project area
export function deleteOneProjectArea(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.delete(`${config.api_url}/api/projectarea/delete/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}