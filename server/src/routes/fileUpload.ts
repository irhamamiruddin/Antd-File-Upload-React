import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();

// Define the storage for the uploaded files and create the folder if not exists
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../file_uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Add date to the file name to avoid duplicates
        const date = new Date().toISOString().replace(/:/g, '-');
        cb(null, `${date}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.post('/', upload.array('attachments'), (req, res) => {  // Set array limit to 10 or desired number
    try {
        const files = req.files as Express.Multer.File[];
        const attachments = files.map(file => {
            const file_name = file.filename;
            const file_path = path.join(__dirname, file.path);
            const upload_date = new Date().toISOString();
            return { upload_date, file_name, file_path };
        });

        res.status(200).json(attachments);
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default app;