/*
Script to control the html page
*/


var gitHubApp = angular.module('gitHubApp',[])

.controller('gitHubCtrl',  ['$scope','request', function($scope, request) {	
	//Search function defination	
	$scope.err=true;										//Initialize err to hide table.
	$scope.search = function(url){
			$scope.info = "";								//making error info null for every search
			$scope.err = true;								//everytime clearing table when searching for url
			var gitHubUrl = url+"/issues"; 					// attaching /issues to get issues html pages
			var requestUrl = request.getIssues(gitHubUrl); 	// requesting for issues details from services request
			requestUrl.then(
			function(issueData){
				$scope.err = false;								//for showing table
				$scope.openIssues = issueData.openIssues;
				$scope.openIssues24 = issueData.openIssues24;
				$scope.openIssues24_7 = issueData.openIssues24_7;
				$scope.openIssuesGt24_7 = issueData.openIssuesGt24_7;
			}, 
			function(err){
				$scope.err = true;													//hiding table
				$scope.info = "Page not found. Please make sure URL is correct"; 	// error mesxage
			});	
		}
}])


	