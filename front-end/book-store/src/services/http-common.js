import axios from "axios";

const http=axios.create({
    baseURL:"http://localhost:8899",
    headers:{"content-type":"application/json"}//tout les donnees seront envoyer sous format json
})

export default http