import axios from "axios";

const fileUpload = {
    upload: (data: any) => {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:5000/api/uploads', data).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

export default fileUpload;