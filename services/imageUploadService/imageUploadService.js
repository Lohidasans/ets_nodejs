const fs = require('fs');
const path = require('path');

const uploadImage = async (image) => {
    try
    {
        console.log("Image object:", image);

        const filename = Date.now() + '_' + image.originalname;
        const imagePath = path.join(__dirname, './uploads', filename); //path where the image will be saved
        console.log("ImagePath", imagePath);
        console.log("Buffer", image.buffer);
        //const data = Buffer.from(image.buffer)
        fs.writeFileSync(imagePath, image.buffer); // Write the image data to the file system
        return `/uploads/${filename}`; 
    }
    catch (error)
    {
        console.error("Error uploading image:", error);
        throw new Error('Failed to upload image');
    }
};

module.exports = {
    uploadImage
};
