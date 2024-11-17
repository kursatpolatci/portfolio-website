import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "application/pdf")
      cb(null, path.join(__dirname, "../../uploads"));
    else if (file.mimetype.startsWith("image/"))
      cb(null, path.join(__dirname, "../../uploads"));
    else cb(new Error("Invalid file type"), null);
  },
  filename: (req, file, cb) => {
    if (file.mimetype === "application/pdf" && file.fieldname === "resume")
      cb(null, `resume.pdf`);
    else if (file.mimetype.startsWith("image/") && file.fieldname === "image")
      cb(null, `image.jpg`);
    else cb(new Error(`Unsupported file type`), null);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error(`Only PDF and Image files are allowed`));
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

export { upload };
