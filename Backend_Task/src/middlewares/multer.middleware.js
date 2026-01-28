import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        // console.log("📁 Multer destination called")
        cb(null, "./public/temp")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueName = `${uniqueSuffix}-${file.originalname}`
        console.log("📝 Multer processing file:", uniqueName);
        cb(null, uniqueName);
    }
})

export const upload = multer({ 
  storage, 
})