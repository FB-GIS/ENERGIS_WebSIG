import axios from "axios"
import {config} from "../config"


//get all projects 
export function displayProjects() {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/projects`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


export function displayProjectsByEnergy(energy) {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/projects/all/${energy}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


//get one project
export function displayOneProject(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.get(`${config.api_url}/api/project/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}

// add one project
export function addOneProject(datas) {
    const token = window.localStorage.getItem('websig-token')
    return axios.post(`${config.api_url}/api/project/save`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// update one project
export function updateOneProject(datas, id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.put(`${config.api_url}/api/project/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}


// delete one project
export function deleteOneProject(id) {
    const token = window.localStorage.getItem('websig-token')
    return axios.delete(`${config.api_url}/api/project/delete/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}





