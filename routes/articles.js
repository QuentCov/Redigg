var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Redigg');

// get all articles
router.get("/", (req, res) => {
    const collection = db.get("articles");
    collection.find(
        {},
        (err, articles) => {
            if (err) throw err;
            res.json(articles);
    });
});

// add new article
router.post("/", (req, res) => {
    const article = {
        title: req.body.title,
        URL: req.body.URL,
        votes: req.body.votes,
        user: req.body.user,
        comments: req.body.comments
    };
    const collection = db.get("articles");
    collection.insert(
        article,
        (err, dbArticle) => {
            if (err) throw err;
            res.json(dbArticle)
    })
});

// get article by id
router.get("/:articleid", (req, res) => {
    const collection = db.get("articles");
    collection.find(
        {_id: req.params.articleid},
        (err, article) => {
            if (err) throw err;
            res.json(article[0]);
    });
});

// add comment to article by article id
router.post("/:articleid", (req, res) => {
    const collection = db.get("articles");
    // get article
    collection.find(
        {_id: req.params.articleid},
        (err, article) => {
            if (err) throw err;
            // increment count of comments in article to get new id
            const newCommentId = article[0].comments.length++;
            // create payload and perform update
            const comment = {
                commentid: newCommentId,
                body: req.body.body,
                date: req.body.date,
                user: req.body.user,
                votes: 0
            };
            collection.update(
                {_id: req.params.articleid},
                {$push: {comments: comment}},
                (err, article) => {
                    if (err) throw err;
                    res.json(article);
            });
    })
});

// delete article
router.delete("/:articleid", (req, res) => {
    const collection = db.get("articles");
    collection.remove(
        {_id: req.params.articleid},
        (err, article) => {
            if (err) throw err;
            res.json(article);
    });
});

// increment or decrement article votes
router.put("/:articleid", (req, res) => {
    const collection = db.get("articles");
    if(req.body.vote == true) {
        //upvote
        collection.update(
            {_id: req.params.articleid},
            {$inc: {votes: 1}},
            (err, result) => {
                if (err) throw err;
                res.json(result);
        });
    } else {
        //downvote
        collection.update(
            {_id: req.params.articleid},
            {$inc: {votes: -1}},
            (err, result) => {
                if (err) throw err;
                res.json(result);
        });
    }
});

// delete comment on article
router.delete('/:articleid/:commentid', function(req, res) {
	var collection = db.get('articles');
	collection.update(
        { _id: req.params.articleid },
        { "$pull": { 'comments': { commentid: parseInt(req.params.commentid) } } },
        function(err, response) {
    		if (err) throw err;
    		res.json(response);
	});
});


// get comment by article and comment id's
router.get("/:articleid/:commentid", (req, res) => {
    const collection = db.get("articles");
    collection.find(
        {_id: req.params.articleid},
        (err, article) => {
            if (err) throw err;
            res.json(article[0].comments[req.params.commentid]);
    });
});

// increment or decrement comment votes
router.put('/:articleid/:commentid', function(req, res) {
	var collection = db.get('articles');
	if(req.body.vote == true) {
		//Upvote
		collection.update(
            {_id: req.params.articleid, "comments.commentid" : parseInt(req.params.commentid)},
			{"$inc": {"comments.$.votes": 1}},
            function(err, response) {
    			if (err) throw err;
    			res.json(response);
		});
	} else {
		//Downvote
		collection.update(
            {_id: req.params.articleid, "comments.commentid" : parseInt(req.params.commentid)},
			{"$inc": {"comments.$.votes": -1}},
            function(err, response) {
    			if (err) throw err;
    			res.json(response);
		});
	}
});

module.exports = router;
