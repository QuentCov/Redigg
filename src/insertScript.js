
use Redigg;

db.articles.drop();

var r = {
        "title": "The Guy Made of Bees",
        "URL": "http://kol.coldfront.net/thekolwiki/index.php/Guy_Made_Of_Bees",
        "votes": 6,
        "user": "Pie_Prime",
        "comments":
        [
            {
                "commentid": 0,
                "user": "Pie_Prime",
                "date": "04/15/2018",
                "votes": 0,
                "body": "We are bees; we hate you."
            }
        ]
    };

db.articles.insert(r);

var r = {
        "title": "Eleven",
        "URL": "http://kol.coldfront.net/thekolwiki/index.php/Eleven",
        "votes": 11,
        "user": "Original Pie",
        "comments":
        [
                {
                        "commentid": 0,
                        "user": "Pie_Prime",
                        "date": "04/15/2018",
                        "votes": 3,
                        "body": "That's just ridiculous, that's not even funny."
                }
        ]
    };

db.articles.insert(r);

var r = {
        "title": "Ed the Undying",
        "URL": "http://kol.coldfront.net/thekolwiki/index.php/Ed_the_Undying",
        "votes": 30,
        "user": "Pie_Prime",
        "comments":
        [
                {
                        "commentid": 0,
                        "user": "Pie_Prime",
                        "date": "04/15/2018",
                        "votes": 8,
                        "body": "Come on man, you're litterally just a pile of limbs on the floor"
                },

                {
                        "commentid": 1,
                        "user": "Ed the Undying",
                        "date": "04/15/2018",
                        "votes": 4,
                        "body": "UNDYING!"
                }
        ]
    };

db.articles.insert(r);

var r = {
        "title": "Lime",
        "URL": "http://kol.coldfront.net/thekolwiki/index.php/Lime",
        "votes": -300,
        "user": "Pie_Prime",
        "comments": []
    };

db.articles.insert(r);

var r = {
        "title": "The Cat with the Kind and Reassuring Face",
        "URL": "http://busket.tumblr.com/post/164661140228/bennettflynt-busket-where-is-that-cat-with",
        "votes": 1,
        "user": "Quentin",
        "comments":
        [
            {
                "commentid": 0,
                "user": "Quentin",
                "date": "04/15/2018",
                "votes": 0,
                "body": "You thought I couldn't find a place for this. You were wrong."
            }
        ]
    };

db.articles.insert(r);
