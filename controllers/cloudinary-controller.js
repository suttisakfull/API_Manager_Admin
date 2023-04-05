const cloudinary = require("cloudinary")
// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

exports.create_cloudinary = async (req,res) =>{
    try{
        //  res.send("create cloudinary ok:")
        const result = await cloudinary.uploader.upload(req.body.image,{
            public_id: Date.now(),
            resource_type: "auto",
        });
        res.send(result);      
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
   
};

exports.remove_cloudinary = async (req,res) =>{
    try{
        // res.send("remove cloudinary ok:")
        let image_id = req.body.public_id
        cloudinary.uploader.destroy(image_id,(result)=>{
            res.send(result)
        })
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    } 
};