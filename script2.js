		var width = 760,   // width of svg
            height = 300,  // height of svg
            padding = 70; // space around the chart, not including labels
            
        var data=[
        	{"date":new Date(2012,0,1), "value": 3},
            {"date":new Date(2012,0,3), "value": 2},
            {"date":new Date(2012,0,12), "value": 33},   
            {"date":new Date(2012,0,21), "value": 13},
            {"date":new Date(2012,0,30), "value": 23}];
            
            
        var x_domain = d3.extent(data, function(d) { return d.date; }),
            y_domain = d3.extent(data, function(d) { return d.value; });
        
        
        // display date format
        var  date_format = d3.time.format("%d %b");
        
        // create an svg container
        var vis = d3.select(".container").
            append("svg:svg")
                .attr("width", width)
                .attr("height", height);
                
        // define the y scale  (vertical)
        var yScale = d3.scale.linear()
	        .domain(y_domain).nice()   // make axis end in round number
		.range([height - padding, padding]);   // map these to the chart height, less padding.  In this case 300 and 100
                 //REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.
		    
            
        var xScale = d3.time.scale()
	        .domain(x_domain)    // values between for month of january
		    .range([padding, width - padding]);   // map these sides of the chart, in this case 100 and 600
		    
	
        // define the y axis
        var yAxis = d3.svg.axis()
            .orient("left")
            .scale(yScale);
        
        // define the x axis
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .scale(xScale)
            .tickFormat(date_format);
            
        // draw y axis with labels and move in from the size by the amount of padding
        vis.append("g")
        	.attr("class", "axis")
            .attr("transform", "translate("+padding+",0)")
            .call(yAxis);

        // draw x axis with labels and move to the bottom of the chart area
        vis.append("g")
            .attr("class", "xaxis axis")  // two classes, one for css formatting, one for selection below
            .attr("transform", "translate(0," + (height - padding) + ")")
            .call(xAxis);
            
        // now rotate text on x axis
        // solution based on idea here: https://groups.google.com/forum/?fromgroups#!topic/d3-js/heOBPQF3sAY
        // first move the text left so no longer centered on the tick
        // then rotate up to get 45 degrees.
        vis.selectAll(".xaxis text")  // select all the text elements for the xaxis
          .attr("transform", function(d) {
             return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
         });
    
        // now add titles to the axes
        vis.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Value");

        vis.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")")  // centre below axis
            .text("Date");