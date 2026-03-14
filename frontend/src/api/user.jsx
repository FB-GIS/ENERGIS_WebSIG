import axios from "axios"
import {config} from "../config"

//get all users
export function displayUsers() {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/users`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


//get one user by ID
export function displayOneUser(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/user/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


//save one user
export function addOneUser(datas) {
    return axios.post(`${config.api_url}/api/user/save`, datas)
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


//login one user
export function loginUser(datas) {
    return axios.post(`${config.api_url}/api/user/login`, datas)
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


//update one user
export function updateUser(datas, id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.put(`${config.api_url}/api/user/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}



//delete one user
export function deleteUser(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.delete(`${config.api_url}/api/user/delete/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}



//user verification and reconnection function
export function checkMyToken() {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/user/checkToken`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}