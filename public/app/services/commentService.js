angular.module('commentService', [])

.factory('commentFactory', function($http, $resource) {

	// create the object
	var localCommentFactory = {};

	// a function to get all the stuff
	localCommentFactory.all = function(){
		return $http.get('/api/comments');
	};

	localCommentFactory.getOneComment = function(comment_id){
		return $http.get('/api/comments/' + comment_id);
	};

	//create new entry
	localCommentFactory.create = function(commentData){
		return $http.post('/api/comments', commentData);
	};

	return localCommentFactory;

});