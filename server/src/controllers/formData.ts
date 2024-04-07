import formDataModel from '../models/formData';
const formDataController = {
    submit: async (req: any, res: any) => {
        return new Promise((resolve, reject) => {
            formDataModel.create(req.body).then((result: any) => {
                res.status(201).send(result);
                resolve(result);
            }).catch((error: any) => {
                res.status(500).send
                reject(error);
            });
        });
    },

    getData: async (req: any, res: any) => {
        return new Promise((resolve, reject) => {
            formDataModel.find().then((result: any) => {
                res.status(200).send(result);
                resolve(result);
            }).catch((error: any) => {
                res.status(500).send(error);
                reject(error);
            });
        });
    }
};

export default formDataController;