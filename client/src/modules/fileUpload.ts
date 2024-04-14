import axios from "axios";

const fileUpload = {
    upload: (data: any) => {
        return new Promise((resolve, reject) => {
            console.log("AXIOS data", data);
            axios.post('http://localhost:5002/api/uploads', data).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

export default fileUpload;