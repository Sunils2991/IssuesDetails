/*
	This script is to handle rest api of the server
*/

var express = require('express'),
	express = require('express'),
	fs = require('fs'),
	request = require('request'),
	cheerio = require('cheerio'),
	router = express.Router();


	/*-----GET home page----*/
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});


	/*----Post request----  */
router.post('/issuesDetails', function(req, res){
	/*getting json data from post request*/
	var jsonBody = req.body;

	/*----Declaring varaibles required in the further process----*/
	var url = jsonBody.url;				//github project issue url
				var openIssues = 0, 	//total number of issues
				openIssues24 = 0, 		// issues in a day
				openIssues24_7 = 0, 	//issues in a week
				openIssuesGt24_7 = 0,	//issues above in a week
				noOfPages; 				//Number of pages
				
    var issueDetails = { openIssues : "", openIssues24 : "", openIssues24_7 : "", openIssuesGt24_7: "" };	//Json data to be sent with issue details
	
	var totalIssues = []; 				//
	var i = 1;							//first page
	
	/*----- requesting the github project issues page ---*/
    request(url, function(error, response, html){
		//Checking for the errors in the requested url
		if(error){
			return error;
		}else if(response.statusCode == 404){
				res.status(404).send("error");
		}else{
			//cheerio library on the returned html which will essentially give us jQuery functionality
			var $ = cheerio.load(html);
			//class table-list-header-toggle gives the total number of open issues for the project
			$('.table-list-header-toggle').each(function() {
					var data = $(this);
					totalopenIssues1 = data.children().first().text();
					
					totalopenIssues2 = totalopenIssues1.replace(/(\r\n|\n|\r)/gm,"");
					totalopenIssues = totalopenIssues2.replace(/  +/g, ' ');
					
					var openIssuesResult = totalopenIssues.split(" ");
					openIssues = openIssuesResult[1]; // storing the total number of issues
					console.log(openIssues);
					if(1)			//in the "first table-list-header-toggle" class, open issues are found. So breaking the loop 
						return false;
			});
			
			// One page contains 25 issues. If issues are more than 25, request must be made to all pages to get issues date
			if(openIssues){
				noOfPages = Math.ceil(openIssues/25);
				console.log(noOfPages);
			}
			
			//sending response
			
			function sendResponse() {
				for(var k = 0; k < totalIssues.length; k++){			// for finding number of issues according to day difference 
										if (totalIssues[k] < 1 ){ 
											openIssues24 = openIssues24 + 1 ;
										}
										else if (totalIssues[k] < 7 ){
											openIssues24_7 = openIssues24_7 + 1;
										}
										else 
										openIssuesGt24_7 = openIssuesGt24_7 + 1;
				}							
				issueDetails.openIssues = openIssues;				//forming JSON data
				issueDetails.openIssues24 = openIssues24;
				issueDetails.openIssues24_7 = openIssues24_7;
				issueDetails.openIssuesGt24_7 = openIssuesGt24_7;
				console.log(issueDetails);
				res.status(200).json(issueDetails);	
			}
			//loop to get all issues date
			for (i = 1; i <= noOfPages; i++) {
				var changedUrl = url+"?page="+i+"&q=is%3Aissue+is%3Aopen";			//URL for requesting all the pages individually	
					request(changedUrl, function(error, response, html){				//requesting thee web page
						if(error){
							return console.log(error);
						}
						else{
							var $ = cheerio.load(html);
							$('.issue-meta').each(function(){
								var dataLoop = $(this);
								issues = dataLoop.children().first().text();				//fetching data from the class
								issues = issues.replace(/(\r\n|\n|\r)/gm,"");				// formatting the data
								issues = issues.replace(/  +/g, ' ');						// formatting the data
								issues= issues.split(" ");									// formatting the data
								issuesDateString= issues[3]+" "+ issues[4] + " " +issues[5];// Taking Date of issue
								issuesTimestamp = Date.parse(issuesDateString);				//converting to  timestamp	
							
								issuesDate = new Date(issuesTimestamp);						//Human readable date
								console.log(issuesDate);
								var today = new Date();									
								var _MS_PER_DAY = 1000 * 60 * 60 * 24;						// for converting milliseconds to day
								var utc1 = Date.UTC(issuesDate.getFullYear(), issuesDate.getMonth(), issuesDate.getDate()); //universal time
								var utc2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());				//universal time

								diffDays = Math.floor((utc2 - utc1) / _MS_PER_DAY);			//finding difference in days
					
								totalIssues.push(diffDays);									//pushing difference in days data to array
			
								if(totalIssues.length==openIssues){		// for last request sending response
									sendResponse();		
								}								
							});
						}
					});	
			}
		}
	});
			
});

module.exports = router;
