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
        console.log('Files uploaded:', req.files);
        if (!req.files) {
            return res.status(400).send('No file uploaded');
        }
        const files = req.files as Express.Multer.File[];
        const attachments = files.map(file => {
            console.log('File uploaded:', file);
            const name = file.originalname;
            const file_path = file.path; //path.join(__dirname, file.path);
            const upload_date = new Date().toISOString();
            return { upload_date, name, file_path };
        });

        res.status(200).json(attachments);
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/file_download", (req: any, res: any) => {
    const file_path = req.body.file_path;
    if (!file_path) {
        return res.status(400).send('No file path provided');
    }
    // Check if file exists
    if (!fs.existsSync(file_path)) {
        console.log('file not found')
        return res.status(404).send('File not found');
    }
    res.download(file_path, (error: any) => {
        if (error) {
            res.status(500).send(error.message);
        }
    });
});

// API for file removal
app.post("/file_remove", (req: any, res: any) => {
    const file_path = req.body.file_path;
    if (!file_path) {
        return res.status(400).send('No file path provided');
    }
    fs.unlink(file_path, (error: any) => {
        if (error) {
            console.log('error file remove', error)
            res.status(500).send(error.message);
        } else {
            res.status(200).send('File removed');
        }
    });
});

export default app;