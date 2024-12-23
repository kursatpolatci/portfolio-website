import multer from 'multer';
import cloudinary from '../lib/utils/cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v4 as uuidv4 } from 'uuid';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'portfolio-website',
      resource_type: 'auto',
      public_id: `${uuidv4()}`,
    };
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'resume') {
      if (file.mimetype === 'application/pdf') cb(null, true);
      else cb(new Error(`Resume field must be a PDF File`));
    } else if (file.fieldname === 'image') {
      if (file.mimetype.startsWith('image/')) cb(null, true);
      else cb(new Error(`Image field must be an Image file`));
    } else {
      cb(new Error(`Invalid field`));
    }
  },
});

export { upload };
