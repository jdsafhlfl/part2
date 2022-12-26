import axios from "axios";

const phoneNoteUrl = "http://localhost:3001/persons"

const getPhonenote = ()=>{
    return axios.get(phoneNoteUrl)
}

const addPhonenote = (newPerson)=>{
    return axios.post(phoneNoteUrl, newPerson)
}

const deletePhonenote = (id)=>{
    return axios.delete(phoneNoteUrl+'/'+id)
}

const phoneServices = {getPhonenote, addPhonenote, deletePhonenote}

export default phoneServices