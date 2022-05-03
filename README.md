# Welcome to Q-methodology plugin for jsPsych library. 

## A few words on the jsPsych library
jsPsych is a JavaScript library for running behavioral experiments in a web browser. The library provides a flexible framework for building a wide range of laboratory-like experiments that can be run online.

To use jsPsych, you provide a description of the experiment in the form of a [timeline](https://www.jspsych.org/overview/timeline/). jsPsych handles things like determining which trial to run next, storing data, and randomization. jsPsych uses plugins to define what to do at each point on the timeline. Plugins are ready-made templates for simple experimental tasks like displaying instructions or displaying a stimulus and collecting a keyboard response. Plugins are very flexible to support a wide variety of experiments. It is easy to create your own plugin if you have experience with JavaScript programming. _([from jsPsych website](https://www.jspsych.org/))_  
  
## Why use this library
There are many advantages to be using a library. First of all, this is a live project that is on continuous development, it has a shallow learnign curve and the there are multiple plugins offered already in the library to help you construct your own experiment with the tools you need. Finally, you can find a lot of support online to help you creating your own experiment. 

## What is the Q-methodology plugin
This is a tool that works in collaboration with the jsPsych library and can help you run an experiment based on [Q-methodology](https://qmethodsoftware.com/q-methodology/) to help you study the subjectivity towards a topic, issue, or question.. 

**How to use the plugin.**

There are two ways you can use the plugin.

A) If you have the technical skills to write JavaScript code and set-up your own webserver, you can download the necessary files [here]() and build your experiment using the JsPsych library. 

B) If you know how to set-up a webserver or have someone who can help you to do so (like your IT department), but you lack the skills in JavaScript you can use our [simple constructor](./constructor2/constructor) that will help you create your project using a web form. 

<strike> A) using the website [cognition.run](https://www.cognition.run) as a platform to run your experiments or any other online platform [read JSPsych website](https://www.jspsych.org/overview/running-experiments/#hosting-the-experiment-and-saving-the-data) for more on hosting experiments

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you lack the technical skills to write Javascript code required to run experiments, we are offering you a [simple cognition constructor](./constructor/constructor) that will help you construct the code you need to use in [cognition.run](https://www.cognition.run). 


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Also, you can find written [instructions](./cognition/cognition) and a [video](https://www.youtube.com/watch?v=O628dNA7WCc) on how to use cognition.run to perform your experiments. 
 <strike>  
-or-  

C) If you have no access to a webserver or anyone to help you setup one, you can use Jatos to host your experiment. For this purpose, we have build a different tool that will create the necessary
<strike>   
B) set up your own instance, and write your own experiment using the [plugin](./homebrew/homebrew) as one of the trials. 
<strike>   
The same constructor, can also be used in your own instance _(with a bit of HTML coding to wrap around the javascript code)_. 

## What is the added value
Without technical knowledge or need to code and with a bit of effort, you can prepare an online experiment based on Q-methodology, and you can share it with your participants without them having to be physically near your lab. You need only to collect the data and analyse them afterwards. 



