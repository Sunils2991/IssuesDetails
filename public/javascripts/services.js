gitHubApp.factory('request', function($q, $http){
	return {
		getIssues: function(body) {
			var deferred = $q.defer();	
			$http.post('/issuesDetails', {url:body})		//requests the server for sending issue details
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function(err){
					deferred.reject(err);
				})
			return deferred.promise
		}
	}
})