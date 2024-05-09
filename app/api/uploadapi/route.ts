import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { RequestHandler, Request, Response } from 'express';

type NextApiRequestWithFormData = NextApiRequest &
  Request & {
    files: any[];
  };
  type NextApiResponseCustom = NextApiResponse & Response;

// Set up storage destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/upload'); // Destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  }
});

// Initialize multer middleware
const upload = multer({ storage });

export const config = {
    api: {
      bodyParser: false // Disable body parser to allow reading files
    }
  };

// Handle POST requests
const uploadHandler = async(req: NextApiRequestWithFormData, res: NextApiResponseCustom) =>{
  // Use multer middleware to handle file upload
  upload.single('image')(req, res, (err: any) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong!' });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded!' });
    }
    // Access uploaded file details
    const { path: filePath, filename } = file;

    // Example of saving file locally
    fs.renameSync(filePath, path.join('public/upload', filename));

    res.status(200).json({ success: true, filename });
  });
}

export default uploadHandler;