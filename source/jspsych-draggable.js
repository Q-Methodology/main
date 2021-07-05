
function allowDrop(ev) { 
	ev.preventDefault();
}

function drag(ev) { 
	ev.dataTransfer.setData("text", ev.target.id); 
}

// drop function to emulate the end of a image drop
function drop(ev) { 

	ev.preventDefault(); 

	//check if we drop the image into a container
	if(ev.target.className == 'placement'){
		var data = event.dataTransfer.getData('text/plain',null)
		ev.target.appendChild(document.getElementById(data)); 
	}

	//if not, is the image file we are aiming at, not what we need
	if(ev.target.className != 'placement'){
		//store the target in a temp var
		var temp = ev.target

		//we did a mistake, go 2 times up to get the container.
		var data = event.dataTransfer.getData('text/plain',null)
		ev.target.parentNode.parentNode.appendChild(document.getElementById(data)); 

		//return the old image down in the container
		document.getElementById('images').appendChild(temp.parentNode)
	}
}

//function to count the remaining images.
function calculate(){
	//create variable
	copyItems = []
	
	list = $$(".placement")
	
	list.forEach(function(item){

		//see if the div has anything inside
		if (item.children[0]){
			//copy this to a new array? 
			copyItems.push(item.children[0].children[0])  
		}

	})//end forEach

	return copyItems;
}