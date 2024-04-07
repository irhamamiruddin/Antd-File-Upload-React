import { Router } from "express";
import formDataController from "../controllers/formData";

const app = Router();

// Get data
app.get('/', async (req: any, res: any) => {
    formDataController.getData(req, res)
});

// Add form data
app.post('/', async (req: any, res: any) => {
    formDataController.submit(req, res)
});

export default app;