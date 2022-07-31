const fs = require('fs');
// const path = require('path');
const { MediaFile } = require('../../db');
const {Buffer} = require('buffer');
// var stream = require( "stream" );
const { Readable } = require('stream');



const getVedioStream = async (req, res,next) => {
    const {id} = req.params;
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    let result = await MediaFile.findOne({
        where:{
            id
        }
    });
    let vedioData = result.image
    
   // const vedioPath = path.join(__dirname,"..","..","public","files","vediotest.mp4");
    const videoSize = vedioData.length;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    let buffer = Buffer.from(vedioData);
    buffer = buffer.slice(start,end+1);
    res.writeHead(206, headers);
        const videoStream = Readable.from(buffer);
        videoStream.pipe(res);

};

module.exports = getVedioStream;