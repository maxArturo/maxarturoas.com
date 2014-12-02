---
layout: post
title: "Top 1000 Stack Overflow Tags, Visualized"
date: 2014-07-11 15:42:56 -0500
comments: true
categories: 
- D3
- Data Visualization
---
<link rel="stylesheet" type="text/css" href="/stylesheets/dataViz/circleDiagram.css">

<script src="http://d3js.org/d3.v3.min.js"></script>
<script type="text/javascript" src="/javascripts/dataViz/soTagBubbles.js"></script>

###Drag, zoom in and out with your mouse/pinch for relative sizes:###

<div id="tagBubbleChart"></div>

[Source](https://data.stackexchange.com/stackoverflow/query/207593/tag-totals-grouped-by-target-tag-synonyms)
		
I was very excited when I learned about Stack Exchange's public [Data Explorer](https://data.stackexchange.com/) (how come nobody told me about this!!). It is really interesting to see the internal schema (which I assume is that same one used in production), as well as the popular queries to see how far away people are from getting a badge.

I wanted to see how popular different languages and frameworks were around the SO community, so I whipped up a query and set to work...

<!-- more -->

``` sql Stack Overflow Query
SELECT 
  TagTotals.TagName, 
  Sum(TagTotals.Count) 
  
FROM(
  SELECT 
    TagSynonyms.TargetTagName as TagName,
    Tags.Count
  FROM
    Tags 
      INNER JOIN 
    TagSynonyms ON (
      Tags.TagName = TagSynonyms.SourceTagName
    )
    
  UNION ALL

  SELECT 
    Tags.TagName,
    Tags.Count
  FROM
    Tags 
      LEFT JOIN 
    TagSynonyms ON (
      Tags.TagName = TagSynonyms.SourceTagName
    )
  WHERE
    TagSynonyms.SourceTagName IS NULL
  ) as TagTotals
  
GROUP BY TagTotals.TagName;

```

That gives you a listing of the number of times a tag has been used in a post. It rolls in tag synonyms, so you get a good idea of the tag groupings. Then I made a JSON out of it and loaded it through d3.layout.pack() to get radii and coordinates for the relative sizes of the bubbles. The text is also scaled through radii for good proportionality:


{% img /assets/images/tagCircles.jpg 'Tag Circles' %}

Hope you like it!

<i>EDIT - Someone on Reddit spotted an oopsie in my SQL... now it's fixed. Thanks!</i>