import axios from "axios";

const formData = {
    getData: () => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/api/form').then((result: any) => {
                resolve(result);
            }).catch((error: any) => {
                reject(error);
            });
        });
    },
    submit: (data: any) => {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:5000/api/form', data).then((result: any) => {
                resolve(result);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
}

export default formData;