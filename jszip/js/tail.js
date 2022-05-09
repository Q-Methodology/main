//define $ as your function
window.$ = document.getElementById.bind(document)


function yesnoCheck(el, id) {
    if ($(el).checked) {
        //console.log ('checked')
        $(id).parentNode.style.display = 'block';
    } else {
        //console.log ('un-checked')
        $(id).parentNode.style.display = 'none';
    } //end if
}




/*
 * Create the content of the file to save. 
 * trick is to pass the text in decoding and then encoding. in the absence of a better solution.
 */
function constructContent() {
	
	var output = '';
   
   var suppresor = `
   on_finish: function(data) {
     raw_data = jsPsych.data.get().values();  
     raw_data.pop();
   },
   `;

    //clear the outcome
    output= `    
    /* Create timeline var */
    var timeline = [];
    var questions; //used to store the questionnaire
    `;

    // collect images
    var imageArray = "[";
    var list = document.getElementsByTagName('img')
    for (i = 0; i < list.length; i++) {
        imageArray += "'" + list[i].getAttribute('alt') + "',"
    }
    imageArray += "]";
    /* create preload */
    output+= `
    /*
    * preload all images (if needed)
    * Add all filenames, making sure you have as many as declared in the grid-size below.
    */
    var preload = {
    type: 'preload',
    images: ${imageArray},
    /*auto_preload: true,*/
    ${suppresor}
    }
    timeline.push(preload);
    `;

    if ($('wantwelcome').checked) {
        /* create welcome */
        var welcome = $("welcome").value;
        output+= `
    /*
    * define welcome message trial
    * Add a welcome message for the users
    */
    var welcome = {
    type: "html-keyboard-response",
    stimulus: "${welcome}",
    ${suppresor}
    };
    timeline.push(welcome);
    `;
    }


    if ($('wantinstructions').checked) {
        /* create welcome */
        var instructions = $("instructions").value;
        output+= `
    /*
    * define instructions
    * Add instructions for the user to explain the experiment
    */
    var instructions = {
    type: "html-keyboard-response",
    stimulus: "${instructions}",
    ${suppresor}
    };
    timeline.push(instructions);
    `;
    }


    if ($('wantquestionnaire').checked) {

        output+= ` `;
        output+= ` 
    
      /*
      * Gender, age, nationality, handiness
      * A list of questions for the user's statistics.
      */
      var questionnaire = {
      type: "survey-html-form",
      html: \`
      `;

        if ($('wantidField').checked) {
            var idLabel = $('idLabel').value;
            var idPlaceholder = $('idPlaceholder').value;
            output+= `<label for='id'>${idLabel}</label>  <input type='text' name='id' id='id' value='' placeholder='${idPlaceholder}' /> <br /> `;
        }

        /* should add extra labels for each choice */
        if ($('wantgenderField').checked) {
            var genderLabel = $('genderLabel').value;
            var maleLabel = $('maleLabel').value;
            var femaleLabel = $('femaleLabel').value;
            var otherLabel = $('otherLabel').value;
            output+= `
            <label for='gender'>Gender:</label>
            <input type='radio' name='gender' id='Male' value='${maleLabel}' /> ${maleLabel}
            <input type='radio' name='gender' id='Female' value='${femaleLabel}' /> ${maleLabel}
            <input type='radio' name='gender' id='Other' value='${otherLabel}' /> ${otherLabel} <br />
          `;
        }

        if ($('wantageField').checked) {

            var ageLabel = $('ageLabel').value;
            var agePlaceholder = $('agePlaceholder').value;
            output+= ` 
              <label for='age'>${ageLabel}:</label>
              <input type='number' name='age' id='age' value='' placeholder='${agePlaceholder}' /><br />
          `;
        }

        if ($('wantnationalityField').checked) {
            var nationalityLabel = $('nationalityLabel').value;
            var nationalityPlaceholder = $('nationalityPlaceholder').value;
            output+= ` 
            <label for='nationality'>${nationalityLabel}</label>
            <input type='text' name='nationality' id='nationality' value='${nationalityPlaceholder}' /><br />
          `
        }

        /* should add extra labels for each choice */
        if ($('wanthandinessField').checked) {
            var handinessLabel = $('handinessLabel').value;
            var leftLabel = $('leftLabel').value;
            var rightLabel = $('rightLabel').value;
            output+= ` 
          <label for='handiness'>${handinessLabel}</label>
          <input type='radio' name='handiness' id='left' value='${leftLabel}' /> ${leftLabel}
          <input type='radio' name='handiness' id='right' value='${rightLabel}' /> ${rightLabel} <br />  
        `;
        }

        var preamble = $('preamble').value;
        /* close the HTML of the object */
        output+= ` \`, 
      preamble: "<h3>${preamble}</h3>",
      dataAsArray: false,
      autofocus : 'id',
      autocomplete: false,
      ${suppresor}
      };

      timeline.push(questionnaire);
`
    }

    /* Create the grid */
    var grid = $("grid").value
    var width = $("width").value
    var height = $("height").value
    var gridInstructions = $("gridInstructions").value
    var gridHeader = $("gridHeader").value
  
  output+= `
  /*
  * define the grid
  * Define the files, the size, and the dimensions of each photo below the grid. 
  */
  var grid = {
    type: "grid",
    images: ${imageArray},
    size: ${grid},
    width: ${width},
    height: ${height},
    instructions: "${gridInstructions}",
    header: "${gridHeader}",
    on_finish: function(data){
    `;
    //Include the function for data manipulation.
    output+= `  
    /* https://stackoverflow.com/questions/2559318/how-to-check-for-an-undefined-or-null-variable-in-javascript */ 
    if(questions){ 
        //parse questions into variables 
         Object.entries(questions).forEach(([key, value]) => { data[key]=value });
    }//end if
    `;
  
  //close the grid.
  output+= `  }
  };
  timeline.push(grid);
  `

    /* Final touch */
    output+=
        `
      /*
      * declare saveData function 
      * Use with a PHP server to save data on a file. 
      */
      function saveData(data){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({filename: getFilename(), filedata: data}));
      }/*end function*/    
        
    /* start the experiment */
    jsPsych.init({
      timeline: timeline,
      
     on_finish: function(){

        // call the saveData function after the experiment is over
        saveData(jsPsych.data.get().csv());

        jsPsych.data.get().localSave('csv','mydata.csv');
        
        /*
        * if you don't want to use it with a PHP server, use another display method from the ones below
        */
        
        jsPsych.data.get().uniqueNames();
        console.log(jsPsych.data.get().uniqueNames());
        //displayData();
        //jsPsych.data.displayData('csv');
        
      }, /*end function*/
     
      
    });
    
      /* 
   * function to create the filename
   * Will add the date and time of the experiment as a filename.
   */
    function getFilename(){
        
      var filename = []
      var d = new Date();

      d.getDate();
      filename.push(d.getFullYear());
      filename.push(d.getMonth());
      filename.push(d.getDate());
      filename.push('_');
      filename.push(padTime(d.getHours()));
      filename.push(padTime(d.getMinutes()));
      filename.push(padTime(d.getSeconds()));
      filename.push("-experiment_data");
      filename.join('')

      return filename.join('');
    }/*end function*/

    /*
    * function to pad time
    */
    function padTime (whatFraction){
      if (whatFraction < 10) { whatFraction = "0" + whatFraction; }
      return whatFraction;
    }/*end if*/
    
    `;
	
	//$('cognition').innerHTML = output;
	return output
}


/*
* define async functions and await to get the promise completed before going to the next step
https://stackoverflow.com/questions/41775517/web-fetch-api-waiting-the-fetch-to-complete-and-then-executed-the-next-instruct

* https://stackoverflow.com/questions/62680847/how-to-wait-for-fetch-to-complete-before-running-another-function
* https://officialrajdeepsingh.dev/read-locally-txt-file-use-fetch-method-in-javascript/
*

*/

async function createExperimentFile(){
		//fetch 
		var fileData=[]
		fileData[0]= await getFile();
        //console.log(fileData[0])
		//get the result
		fileData[1]= constructContent();
		//console.log(fileData[1])
		//close file data
		fileData[2] = `
						</script>
					</html>`;
	//console.log(fileData.join(''));
	return fileData.join('');;
}

async function getFile(){
	var fileData
	//return await fetch('http://localhost/jszip/start.txt')
	return await fetch('start.txt')
		  .then(response => response.text())
.then(data => {return data})
		//  .then(fileData => {return fileData})
}//end function

/* 
 * copy code to clipboard
 * https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 */
 /*
var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

copyTextareaBtn.addEventListener('click', function(event) {
    var copyTextarea = document.querySelector('.js-copytextarea');
    copyTextarea.focus();
    copyTextarea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
});
*/
