const { MediaFile } = require("../../db");
const getMediaFile = require("./getMediaFile");

const uploadMedia = async (req,res,next) =>{
    const {title} = req.body;
    const {buffer} = req.file;
    if(buffer && title){
        await MediaFile.create({
            title,
            image:buffer
        });
        await getMediaFile(req,res,next);
  
    }
    else{        
        res.status(400).json({
            status:false,
            message:'something went wrong',
            error:null
        });
    }

}
module.exports = uploadMedia;