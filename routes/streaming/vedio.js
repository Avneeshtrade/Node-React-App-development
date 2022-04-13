const fs = require('fs');
// const path = require('path');
const { MediaFile } = require('../../db');
const {Buffer} = require('buffer');
var stream = require( "stream" );
const { Readable } = require('stream');


// I turn the given source Buffer into a Readable stream.
function BufferStream( source ) {

	if ( ! Buffer.isBuffer( source ) ) {

		throw( new Error( "Source must be a buffer." ) );

	}

	// Super constructor.
	stream.Readable.call( this );

	this._source = source;

	// I keep track of which portion of the source buffer is currently being pushed
	// onto the internal stream buffer during read actions.
	this._offset = 0;
	this._length = source.length;

	// When the stream has ended, try to clean up the memory references.
	//this.on( "end", this._destroy );

}

BufferStream.prototype._read = function( size ) {

	// If we haven't reached the end of the source buffer, push the next chunk onto
	// the internal stream buffer.
	if ( this._offset < this._length ) {

		this.push( this._source.slice( this._offset, ( this._offset + size ) ) );

		this._offset += size;

	}

	// If we've consumed the entire source buffer, close the readable stream.
	if ( this._offset >= this._length ) {

		this.push( null );

	}

};
BufferStream.prototype._destroy = function() {

	this._source = null;
	this._offset = null;
	this._length = null;

};
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