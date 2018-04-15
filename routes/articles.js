var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/articles');

router.delete('/:articleid/:commentid', function(req, res) {
	var collection = db.get('articles');
	collection.update({ _id: req.params.articleid }, { $pull: { 'comments': { commentid: req.params.commentid } } }, function() {
		if (err) throw err;
	});
});

router.put('/:articleid/:commentid', function(req, res) {
	var collection = db.get('articles');
	if(req.body.vote == true) {
		//Upvote
		collection.update({_id: req.params.articleid, "comments.commentid" : req.params.commentid}, {$inc: {comments.$.votes: 1}}, function() {
			if (err) throw err;
		});
	} else {
		//Downvote
		collection.update({_id: req.params.articleid, "comments.commentid" : req.params.commentid}, {$inc: {comments.$.votes: -1}}, function() {
			if (err) throw err;
		});
	}

});

module.exports = router;