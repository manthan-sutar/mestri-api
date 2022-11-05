const mime = require('mime');
const fs = require('fs');

class FileHelper {
    async uploadBase64Img({ base64String, path }) {
        if (base64String == null) throw new Error('Base 64 string is null');
        var decodedImg = this.decodeBase64Image(base64String);
        var imageBuffer = decodedImg.data;
        var type = decodedImg.type;
        var extension = mime.getExtension(type);
        var fileName = Date.now() + "_image." + extension;
        var storage = path == null ? "storage/" + fileName : "storage/" + path + fileName;
        try {
            fs.writeFileSync(storage + fileName, imageBuffer, 'utf8');
            return storage;
        }
        catch (err) {
            console.error(err)
            return null;
        }
    }
    
    decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
        return response;
    }
}

module.exports = FileHelper