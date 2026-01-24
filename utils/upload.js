

import multer from "multer";
import path from "path";
import crypto from "crypto";

const profileStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fn = crypto.randomUUID() + ext;
    cb(null, fn);
  },
});

const upload = multer({ storage: profileStorage });

export default upload;
