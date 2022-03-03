import axios from 'axios'


const instance = axios.create({
    // withCredentials: true, //отправить вместе с запросом cookie
    baseURL: 'http://localhost:8080/',
    headers:{
        'Content-Type':'application/json'      
        }
})

export const sendData = (data) => {
    let response = instance.post('sendData', data).then(res => res.data)

    response.then(resp => console.log(resp))
}