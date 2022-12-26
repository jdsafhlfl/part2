import axios from "axios";

const phoneNoteUrl = "http://localhost:3001/persons"

const getPhonenote = ()=>{
    return axios.get(phoneNoteUrl)
}

const addPhonenote = (newPerson)=>{
    return axios.post(phoneNoteUrl, newPerson)
}

const phoneServices = {getPhonenote, addPhonenote}

export default phoneServices