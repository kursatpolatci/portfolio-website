import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype.startsWith("image/"))
      cb(null, path.join(__dirname, "../../uploads"));
    else cb(new Error("Invalid file type"), "");
  },
  filename: (req, file, cb) => {
    if (file.mimetype === "application/pdf" && file.fieldname === "resume") cb(null, 'resume.pdf');
    else if (file.mimetype.startsWith("image/") && file.fieldname === "image") cb(null, 'profile.jpg');
    else cb(new Error(`Unsupported file type`), "");
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error(`Only PDF and Image files are allowed`));
  },
  limits: { fileSize: 1024 * 1024 * 5, files: 2 },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

export { upload };
