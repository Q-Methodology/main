/*
 * Example plugin template
 */
jsPsych.plugins["grid"] = (function() {

    var plugin = {};

    plugin.info = {
        name: "grid",
        parameters: {
            choices: {
                type: jsPsych.plugins.parameterType.KEY,
                array: true,
                pretty_name: 'Choices',
                default: jsPsych.ALL_KEYS,
                description: 'The keys the subject is allowed to press to respond to the stimulus.'
            },

            key: {
                // Definition has changed 
                // https://github.com/jspsych/jsPsych/discussions/1655
                // https://stackoverflow.com/a/23377822/6403318
                type: jsPsych.plugins.parameterType.KEYCODE,
                default: 'ESCAPE' // "ENTER", "SPACE", 'SHIFT', 'TAB', 'CONTROL', 'ALT', 'END'
            },

            size: {
                type: jsPsych.plugins.parameterType.INT,
                default: 32, //call the function
                description: 'The size of the grid'
            },

            images: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Images',
                default: [],
                //array: true,
                description: ''
            },

            width: {
                type: jsPsych.plugins.parameterType.INT,
                default: 80, //call the function
                description: 'The width of the images'
            },

            height: {
                type: jsPsych.plugins.parameterType.INT,
                default: 40, //call the function
                description: 'The height of the images'
            },
            instructions: {
                type: jsPsych.plugins.parameterType.STRING,
                default: "Drag the images to the grid and place it where you want.",
                description: 'The text appearing over the grid'
            },

           headtitle: {
                type: jsPsych.plugins.parameterType.STRING,
                default: "Q-experiment",
                description: 'The header appearing over the grid'
            },         

            /*      
                  filename:{
                  type: jsPsych.plugins.parameterType.STRING,
                  default: getFilename(), //call the function
                  description: 'The filename to be saved'
                  },
            */
            /*  parameter_name: {
                type: jsPsych.plugins.parameterType.INT, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX (COMPLEX not working)
                default: undefined
              },*/

        } //end parameters
    } //end plugin.info

    function processData() {
        //Code 
        var Items = [];
        // get the gridbox
        var theGrid = document.querySelectorAll(".placement");
        //console.log(theGrid);
        //iterate throught the list
        theGrid.forEach(function(item) {
            //see if the div has anything inside
            if (item.children[0]) {
                //copy this to a new array? 
                var gridbox = {
                    //id: item.getAttribute('id'),
                    //row: item.dataset.row,
                    score: item.dataset.score,
                    img: item.children[0].childNodes[0].dataset.name,
                }
                //copyItems.push(item.children[0].children[0])    
                Items.push(gridbox)
            }
        }) //end forEach

        return Items
    } //end function

    plugin.trial = function(display_element, trial) {

        //Build the canvas
        constructHTML(trial);

        // data saving
        var trial_data = {
            //order: '',
            //rt: '',
        };

        // response times
        var rt = [];

        var order = [];

        //declare a function
        function show_stimulus() {

            //write the canvas info here
            display_element.innerHTML = plugin.canvas;

            // start the response listener
            /*     if (trial.choices != jsPsych.NO_KEYS) {
                  var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                      callback_function: after_response,
                      //valid_responses: trial.choices,
                      valid_responses: [trial.key],
                      rt_method: 'performance', //performance.now()
                      persist: false, //single key
                      allow_held_key: false //get just one key
                    });
                  }//end if
               */

            jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_response,
                valid_responses: [trial.key],
                rt_method: 'performance', //performance.now()
                persist: true, //persistent to be able to check esc until 0 elements are in place
                allow_held_key: false //get just one key
            });



        } //end show_stimulus

        function after_response(response_info) {
            var imageCount = $('#images img').length;
            //imageCount = 0; //override for testing
            if (imageCount == 0) {

                var endTime = performance.now();
                var response_time = endTime - startTime;
                rt.push('start time');
                rt.push(startTime); //response time
                rt.push('end time');
                rt.push(endTime); //response time
                rt.push('Response time');
                rt.push(response_time); //response time
                //rt.push(response_info.rt); //response time
                order = processData();
                response = processData();
                //console.log(order);
                //alert('You pressed key '+response_info.key+' after '+response_info.rt+'ms');

                //get all the images and their score in a row. 

                //put them inside the order array

                // end trial
                end_trial();
            } else {
                console.log(imageCount);
                alert('You can\'t finish the experiment');
            }

        } //end function

        // do the necessary to close the plugin.
        function end_trial() {

            display_element.innerHTML = 'Thank you'; // clear everything

            //store answers inside trial_data object to finish the trial
            //trial_data.rt = JSON.stringify(rt);

            //store also the order of the images
            //trial_data.order = JSON.stringify(order);
            trial_data.response = JSON.stringify(response);

            // end trial
            jsPsych.finishTrial(trial_data);

        } //end function

        //execution of the plugin
        show_stimulus();
        var startTime = performance.now();

    }; //end  plugin.trial = function

    // create the HTML
    function constructHTML(trial) {

        //console.log(trial.images)

        // Construct page elements
        // write the CSS to be included
        var theCSS = '<!-- moved to an external file -->';

        // Write the js to be included
        var theJS = '<!-- moved to an external file -->';

        // build the start 
        var theHTMLimages = '<div id="images" class="placement" style="border: 1px solid black; min-height:100px;" ondrop="drop(event)" ondragover="allowDrop(event)">';
        theHTMLimages += '<!-- thumbnail image wrapped in a link -->';

        var theHTMLlightbox = '<div id="lightboxes">';
        theHTMLlightbox += '<!-- lightbox container hidden with CSS -->';

        //if there are not items in the array, take the default approach
        if (trial.images.length == 0 || trial.images.length === 0) {
            // add the image related elements
            for (i = 1; i <= trial.size; i++) {
                //get a string out of the increment
                j = String(i);
                //pad to fit the 00x.jpg name convention for images.
                j = ("000" + j).slice(-3)
                // construct the two elements at once
                theHTMLimages += `<a href="#img` + String(j) + `" draggable="true" ondragstart="drag(event)" id="drag` + j + `"><img data-name="` + j + `" src="images/` + j + `.jpg"  width="88" height="31"></a>`;

                theHTMLlightbox += `<a href="#" class="lightbox" id="img` + String(j) + `"><span style="background-image: url('images/` + j + `.jpg')"></span></a>`;
            } //end for

        } else {
            // if the user provided files in an array
            for (i = 0; i < trial.images.length; i++) {
                //console.log(trial.images[i])
                fileName = trial.images[i]
                j = trial.images[i]

                theHTMLimages += `<a href="#` + String(j) + `" draggable="true" ondragstart="drag(event)" id="drag` + j + `"><img data-name="` + j + `" src="images/` + fileName + `"  width="` + trial.width + `" height="` + trial.height + `"></a>`;

                theHTMLlightbox += `<a href="#" class="lightbox" id="` + String(j) + `"><span style="background-image: url('images/` + fileName + `')"></span></a>`;
            } //end for
        } //end if

        //close the two elements
        theHTMLimages += '</div>';
        theHTMLlightbox += '</div>';

        // Construct the Grid
        var theGridHTML = theGrid(trial);

        // Rebuild the structure to be clean
        var theHTML = theGridHTML + theHTMLimages + theHTMLlightbox;

        //pass the HTML to the canvas
        plugin.canvas = theHTML;

        //plugin.canvas = '<style type="text/CSS">'+theCSS+'</style>'+'<script type="text/javascript">'+theJS+'</script>'+theHTML;

    } //end function

    // create the grid  
    function theGrid(trial) {
        var theGridHTML = "<h2>"+trial.headtitle+"</h2>";
        theGridHTML += "<p>"+trial.instructions+"</p>";
        theGridHTML += '<div id="grid-container">';

        //Define a new object grid. with all possible combinations 
        grids = {
            15: [5, 3, 3, 3, 1],
            16: [5, 3, 3, 3, 1, 1],
            18: [7, 5, 3, 1, 1, 1],
            20: [7, 5, 5, 1, 1, 1],
            21: [7, 5, 5, 3, 1],
            22: [7, 5, 5, 3, 1, 1],
            24: [7, 5, 5, 3, 3, 1],
            25: [7, 5, 5, 3, 3, 1, 1],
            26: [7, 5, 5, 5, 3, 1],
            27: [7, 5, 5, 5, 3, 1, 1],
            28: [7, 5, 5, 5, 3, 1, 1, 1],
            30: [9, 7, 5, 5, 3, 1],
            32: [11, 9, 7, 3, 1, 1],
            34: [11, 9, 7, 5, 1, 1],
            35: [11, 9, 7, 3, 3, 1, 1],
            36: [11, 9, 7, 3, 3, 1, 1, 1],
            38: [11, 9, 7, 5, 3, 1, 1, 1],
            40: [11, 9, 7, 5, 5, 1, 1, 1],
            42: [11, 9, 7, 5, 5, 3, 1, 1],
            44: [11, 9, 7, 5, 5, 3, 3, 1],
            45: [11, 9, 7, 5, 5, 3, 3, 1, 1],
            46: [11, 9, 7, 5, 5, 3, 3, 1, 1, 1],
            48: [11, 9, 7, 5, 5, 3, 3, 3, 1, 1],
            50: [11, 9, 7, 7, 5, 3, 3, 3, 1, 1],
            52: [11, 9, 7, 7, 5, 5, 3, 3, 1, 1],
            54: [11, 9, 7, 7, 5, 5, 5, 3, 1, 1],
            55: [11, 9, 7, 7, 5, 5, 5, 3, 1, 1, 1],
            56: [11, 9, 7, 7, 5, 5, 5, 3, 3, 1],
            58: [11, 9, 7, 7, 7, 5, 5, 3, 3, 1],
            60: [11, 9, 7, 7, 7, 5, 5, 3, 3, 1, 1, 1],
            62: [11, 9, 9, 7, 7, 5, 5, 3, 3, 1, 1, 1],
            64: [11, 9, 9, 7, 7, 5, 5, 3, 3, 3, 1, 1]
        }

        //Simplify your life  
        grid = grids[trial.size]; //16:[5,3,3,3,1,1],
        //grid = grids[16]; //16:[5,3,3,3,1,1],

        // count the divs
        var z = 1;

        //get the amount of rows
        var rows = grid.length
        //console.log("rows: "+rows)

        //get the radious of the row
        var rowRadius = [parseInt(grid[0]) - 1] / 2
        //console.log("rowRadius: "+rowRadius)

        //start building the output
        for (i = -1; i < rows; i++) {

            // console.log("row number: "+i)
            //How many boxes on this row
            var currentRadius = [parseInt(grid[i]) - 1] / 2;
            //set the counter of current radius
            var cr = -currentRadius
            //console.log ("cr: "+cr)

            // Headers 
            if (i == -1) {

                // create the top row 
                var html = '<!-- the header -->';

            } else {

                //start a new row
                html += '<!-- row number ' + (i + 1) + ' starting from -' + currentRadius + ' to ' + currentRadius + '  --> '

            } //end if

            //for each row do the full width
            for (rr = -rowRadius; rr <= rowRadius; rr++) {
                //console.log("rr: "+rr)
                //console.log("cr: "+cr)

                if (i == -1) {

                    // Create the top row of the triangle with score values
                    html += '<div class="score">' + rr + '</div>';

                } else {

                    // Create each of the rows.
                    if (Math.abs(rr) <= Math.abs(cr)) {
                        //console.log("Print box")
                        // we print a box
                        html += '<div id="div' + z + '" style="width:'+trial.width+'px; height:'+trial.height+'px" class="placement" ondrop="drop(event)" ondragover="allowDrop(event)" data-score="' + rr + '" data-row="' + (i + 1) + '"></div>';
                        // increment the current radius, until no bigger than the radius itself  
                        if (cr < currentRadius) {
                            cr++;
                        }
                        // increment div counter
                        z++;
                    } else {
                        // no box, print an empty div
                        html += '<div class="empty"></div>';
                        //console.log("Print empty")
                    } //end if

                } //end if

            } //end for cr

        } //end for rr

        // make sure CSS is dynamic
        html += '<style type="text/css">#grid-container {grid-template-columns:';
        for (i = -1; i < rowRadius * 2; i++) {
            html += ' auto '
        }
        html += ';';
        html += '}#grid-container > div {width: '+trial.width+'px; height: '+trial.height+'px;}';
        html += ';</style>';

        //add the output to the stream
        theGridHTML += html;

        theGridHTML += '</div>';
        return theGridHTML
    } //end function theGrid

    return plugin;
})();