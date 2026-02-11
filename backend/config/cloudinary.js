import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


 const uploadOnCloudinary=async (filepath)=>{
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    })
    try {
        if(!filepath){
            return null;
        }
        const uploadResult=await cloudinary.uploader.upload(filepath)
        fs.unlinkSync(filepath)
        return uploadResult.secure_url
    } catch (error) {
      fs.unlinkSync(filepath)  
      console.log(error)
    }
}
export default uploadOnCloudinary;









// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (filepath) => {
//   try {
//     if (!filepath) return null;

//     const result = await cloudinary.uploader.upload(filepath, {
//       folder: "listings",
//     });

//     if (fs.existsSync(filepath)) {
//       fs.unlinkSync(filepath);
//     }

//     return result.secure_url;
//   } catch (error) {
//     if (filepath && fs.existsSync(filepath)) {
//       fs.unlinkSync(filepath);
//     }

//     console.error("Cloudinary upload error:", error.message);
//     throw error; // 🔥 important so controller knows
//   }
// };

// export default uploadOnCloudinary;












// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (filepath) => {
//   try {
//     if (!filepath) return null;

//     const uploadResult = await cloudinary.uploader.upload(filepath, {
//       folder: "listings",
//     });

//     if (fs.existsSync(filepath)) {
//       fs.unlinkSync(filepath);
//     }

//     return uploadResult.secure_url;
//   } catch (error) {
//     if (filepath && fs.existsSync(filepath)) {
//       fs.unlinkSync(filepath);
//     }
//     console.error("Cloudinary upload error:", error.message);
//     return null;
//   }
// };

// export default uploadOnCloudinary;
