const express = require("express");
const monk = require("monk");

const router = express.Router();
const db = monk("localhost:27017/Redigg");

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

module.exports = router;
