---
layout: post
title: "And now for some data..."
date: 2014-07-06 16:17:04 -0500
comments: true
categories: 
- Data Visualization
- D3

---
<link rel="stylesheet" type="text/css" href="/stylesheets/dataViz/barchart.css">

  <script src="http://d3js.org/d3.v3.min.js"></script>
  <script type="text/javascript" src="/javascripts/dataViz/mexAlcoholReport.js"></script>
  
Finding curated, easy-to-consume data is easier now than ever. Just take a look at [quandl](http://quandl.com) and similar projects - anything you could want is there! This makes things easier for doing inferences and linear regressions on crazy amounts on variables for whatever dataset you'd want.

However, I always like looking for some more 'raw', exotic datasets for me to practice on. Now that I'm starting to get a handle on [d3](http://d3js.org/), I'll start throwing in here some of my experiments and see what comes up.

Check this one out:
##Proportion of Alcohol-positive age ranges for roadside Alcohol Test in Hermosillo, Mexico for Dec 2013##
<div id="chartMex"></div>  
<!--more-->

[source](http://datos.codeandomexico.org/sl/dataset/prueba-de-alcohol)

This one was generated from the snapshot located in the [Codeando Mexico](http://datos.codeandomexico.org/sl/) website. It's a grassroots website for coders to help make government and urban data accessible. 

This is a big deal in Mexico, because there are still many local governments and entities that have very little in terms of making their operations and spending data open to the public. Though there has been a lot of progress lately and there is even a [federal entity](http://inicio.ifai.org.mx/_catalogs/masterpage/ifai.aspx) devoted to transparency, this website was a welcome surprise. 

The dataset is actually pretty rich, including: 

* Age
* Sex
* Car type
* Marital status
* Seatbelt on/off
* BAC

Out of all these, I decided to focus on the age range. The positive status limited me to **N = 199** out of ~2100 entries. Not expecting a lot of surprises, I saw that the age bands actually were quite more centralized than expected, especially if you look at the [national INEGI statistics](http://www.inegi.org.mx/est/contenidos/Proyectos/registros/economicas/accidentes/default.aspx) (yeah, you may need a translation for that...) Though the national statistics are from the victim standpoint for an alcohol-related incident, I was surprised to see that aglomeration in the center. 

D3 made it super easy to lay out the elements and sync in the data. If you feel like you want in on how to make your own visualizations, I suggest to read Scott Murray's awesome [Ebook](http://chimera.labs.oreilly.com/books/1230000000345) on the subject. 

Until next time!