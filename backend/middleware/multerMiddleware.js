
import multer from 'multer';

const storage = multer.diskStorage({
    destination: "frontend/public/userImages",
    filename: (req, file, callback) => {
        const filename = file.originalname;
        callback(null, filename);
    }
});
export const uploadProfile = multer({ storage: storage }).single('imgUrl');
