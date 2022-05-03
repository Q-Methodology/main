//make sure the Filesaver is supported
try {
	var isFileSaverSupported = !!new Blob;
} catch (e) {}
		
function getZipFile(){
	
	//JSZipUtils.getBinaryContent('basis.zip', function(err, data) {
	//JSZipUtils.getBinaryContent('https://kernel52.github.io/Q-methodology/jszip/zipfile.zip', function(err, data) {
	JSZipUtils.getBinaryContent('http://localhost/jszip/zipfile.zip', function(err, data) {
		if(err) {
			throw err; // or handle err
		}//end if
		JSZip.loadAsync(data).then(function (zip) {
		
		//Create a folder with the images
		var folder = zip.folder("images");
		//add files into the folder
		  //folder.file("folder.txt", "I'm a file in a new folder");
		
		try {
			//Here we are importing the files into a folder (created above)
			myDropzone.files.forEach( element =>	zipmyImages(folder, element.name, element.dataURL) )//end foreach
		} catch (error) {
			console.error(error);
		}//end try/catch

		//add files into the zip 
		zip.file("experiment.html", createExperimentFile());
		
		//do the actual zipping, define the name and send the file to the user.
		sendZip(zip, "experiment");
		});
	});//JSZipUtils.getBinaryContent
};//end function


// get the files from dropzone and add them as files
function zipmyImages(location, filename, imgData){
/*
location can be the zip or a folder
*/
	location.file(filename, imgData.replace(/^data:image\/(.*);base64,/,""), {base64: true});
}//end zipme

function sendZip(zip, name){
	zip.generateAsync({type:"blob"})
	.then(function (content) {
		// see FileSaver.js
	    if(isFileSaverSupported) {
			saveAs(content, name+".zip");
        } else {
            window.location = URL.createObjectURL(content);
        }//end if/else
	});//end then chain
}//end sendZip