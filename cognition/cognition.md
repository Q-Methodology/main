# Getting around cognition.run website.

The purpose of this website is to allow users to create and run experiments without the hassle of learning to set-up a server for their jsPsych experiments. 

## Step-by-step instructions

### 1. Go to [cognition.run website](https://www.cognition.run)
  
<img src="../images/001.jpg" height="20%" alt="create account" style="border: 1px dotted black"/>


### 2. Create an account on the website (free).
  
<img src="../images/002.PNG" height="20%" alt="signup" style="border: 1px dotted black"/> 


### 3. Login and go to your tasks. If you are not redirected, go to the [cognition.run website](https://www.cognition.run) and find the icon go to tasks on the top right. 
  
<img src="../images/006.PNG" height="20%" alt="go to" style="border: 1px dotted black"/> 

### 4. This is what we consider your back-end.   
Here is where you can manage all of your experiments, and where you have a couple of examples to play around with. 
  
<img src="../images/003.PNG" height="20%" alt="back-end" style="border: 1px dotted black"/> 

### 5. For our purposes, we will create a new Task clicking the button. 
In this form, please provide a name for your task, and save, unless you want to check the advanced settings. 
  
<img src="../images/004.PNG" height="20%" alt="tasks" style="border: 1px dotted black"/> 

Advanced settings are not needed unless some specific parameters are needed in your experiment.
  
<img src="../images/005.PNG" height="20%" alt="settings" style="border: 1px dotted black"/> 

### 6. Once you hit save, you are redirected in the control panel of the specific task.

(Here you can find the link to the experiment, that you can share with your participants, the Design block where you can modify the task and after that the data collection where all the results will be registered and finally an option to delete the task 
  
<img src="../images/007.PNG" height="20%" alt="design block" style="border: 1px dotted black"/>

### 7. Under Design, you can have Configuration (where you have the name of the experiment and the advanced settings) 
The source code where all the code will be added. 
Then you have two options about Informed concent (in case you need it for your experiments) and collaborators, if you want to share access with someone else. 

**Click on the source code and you are in front of the main panel to design your task.**
  
  <img src="../images/008.PNG" height="20%" alt="design block" style="border: 1px dotted black"/> 



### 8. Here you get the settings you need to customise. 

#### Create your own experiment. 

On the **left** you will have to choose the version of jsPsych library, [add the necessary files](#files) and the [stimuli]() (in our case, the images you want). 

In the **middle** *(black box)* you will paste the code that you have produced from the [constructor](/constructor/constructor) or you will be able to write your own code (if you know how to code in jsPsych). 

On the **right** panel you will be able to test your experiment in demo mode. If you *don't* want to see this, you can click on disable preview. 

a. You can leave the jsPsych library version as is: 6.3.1 
b. Download and add the following files on the left under External JS, CSS. These files will allow cognition to process the Q-methodology trial.
  
  ```
  The files you should have are: 
  .css 
  .js 
  
  ```

c. Under stimuli, you can upload the images that you want to use for your experiment. 
