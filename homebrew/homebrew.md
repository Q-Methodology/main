If you know how to write code, you can consult the following pages to construct your own experiment. 
Provide links with the necessary information. 
https://softdev.ppls.ed.ac.uk/online_experiments/data.html
https://softdev.ppls.ed.ac.uk/online_experiments/jspsych.html


In order to create your own Q-methodology grid, you will need to include the following options

```
  var trial = {
    type: "grid", //the type of plugin
    key: 'ESCAPE' //The key to finish the experiment
    size: 32, //the grid size 
    images: ['001.jpg','003.jpg','004.jpg'], // an array with the image filenames
    width: 88, //the width of the images
    height: 31, //the height of images
    headtitle: '', //A title on top of the grid.
    instructions: '', //a line of instructions for the grid
  }
  
  timeline.push(trial);
```

<pre>
**Grid size**
must be one of the following
[15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 34, 35, 36, 38, 40, 42, 44, 45, 46, 48, 50, 52, 54, 55, 56, 58, 60, 62, 64]

**images array**
Include the image filenames under _/images/_ folder, if omitted, the plugin expects to find files from 001 to 0xx for the size of the grid. 

**width and height**
Depending on the size of your grid, you might want to limit these for the grid to fit in the display
<\pre>


  ```

  The files you should have (at minimum) are: 
   [jquery-3.6.0.min.js](../source/jquery-3.6.0.min.js)
   [jspsych-grid.css](../source/jspsych-grid.css)
   [jspsych-draggable.js](../source/jspsych-draggable.js)
   [jspsych-grid.js](../source/jspsych-grid.js)

  ```

---
[Back to the homepage](/Q-methodology/)
