const webp = require('webp-converter');
const path = require('path');
const fs = require('fs');
const imageExtension = '.jpg'
const folderPath = 'DownloadedImages/'
fs.readdirAsync = function(dir) {
	return new Promise(function(resolve, reject) {
		fs.readdir(dir, function(err, list) {
			if (err) {
				reject(err);
			} else {
				resolve(list);
			}
		});
	});
}

async function convertImages(dir) {
	const files = await fs.readdirAsync(dir)
	console.log('file: ', files[0])
	files.forEach(file => {
		const filename = file.split(imageExtension)[0] + imageExtension
		webp.dwebp(`./${folderPath}${file}`,`${filename}`,"-o", (status) => {
			  //if exicuted successfully status will be '100'
			  //if exicuted unsuccessfully status will be '101'
			  console.log(status);
		})
	});
	return files
}

module.exports = convertImages;