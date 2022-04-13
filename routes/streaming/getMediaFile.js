const { MediaFile } = require("../../db");

const getMediaFile = async (req,res,next) =>{
    let result = await MediaFile.findAll({
        attributes: ['id','title', 'createdAt','updatedAt']
    });
    res.status(200).json({
        status:true,
        payload:result
    })
}
module.exports = getMediaFile;