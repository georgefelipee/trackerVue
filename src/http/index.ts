import axios from "axios";

const clientHttp = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 15000,
    headers: {
    "content-type": "application/json",
    accept: "application/json",
    },
})
    export default clientHttp;