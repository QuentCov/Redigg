var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Redigg');
var ObjectID = require('mongodb').ObjectID;

router.get("/", (req, res) => {
    const collection = db.get("articles");
    collection.find({}, (err, articles) => {
        if (err) throw err;
        res.json(articles);
    });
});

router.post("/", (req, res) => {
    const article = {
        title: req.body.title,
        URL: req.body.URL,
        votes: req.body.votes,
        user: req.body.user,
        comments: req.body.comments
    };
    const collection = db.get("articles");
    collection.insert(article, (err, dbArticle) => {
        if (err) throw err;
        res.json(dbArticle)
    })
});

router.delete('/:articleid/:commentid', function(req, res) {
	var collection = db.get('articles');
	collection.update({ _id: ObjectID(req.params.articleid) }, { "$pull": { 'comments': { commentid: parseInt(req.params.commentid) } } }, function(err, response) {
		if (err) throw err;
		res.json(response);
	});
});

router.put('/:articleid/:commentid', function(req, res) {
	var collection = db.get('articles');
	//TODO: Update this when we make the pages themselves. We'll need some way to differentiate.
	//if(req.body.vote == true) {
		//Upvote
		collection.update({_id: ObjectID(req.params.articleid), "comments.commentid" : parseInt(req.params.commentid)},
							 {"$inc": {"comments.$.votes": 1}}, function(err, response) {
			if (err) throw err;
			res.json(response);
		});
	/*} else {
		//Downvote
		collection.update({_id: req.params.articleid, "comments.commentid" : req.params.commentid},
							 {"$inc": {"comments.$.votes": -1}}, function(err, response) {
			if (err) throw err;
			res.json(response);
		});
	}*/

});

module.exports = router;
