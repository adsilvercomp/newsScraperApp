var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var request = require("request");
//cheerio is a scraping tool
var cheerio = require("cheerio");


// Require all models
var db = require("./models");

var PORT = 3500;

// Initialize Express
var app = express();


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public/"));


// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/ScraperHw", {
    useMongoClient: true
});




//create a route for the home screen

// app.get("/", function (error, response, html) {
//     router.get("/", function (req, res) {
//         articles.all(function (data) {
//             var hbsObject = {
//                 articles: data
//             };
//             console.log(hbsObject);
//             res.render("index", hbsObject);
//         });
//     });

// });




















//create a route for scraping articles from new york times website

app.get("/scrape", function (req, res) {

    // Make a request for the news section of new york times
    request("https://www.nytimes.com/section/world?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=World&WT.nav=page", function (error, response, html) {
        console.log("this is the scraping route");
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        // For each element with a "title" class
        $(".story-body").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Save the text and href of each link enclosed in the current element
            //** for your assignment, you need the headline, summary, and url 
            result.link = $(this).find("a").attr("href");
            result.headline = $(this).children("h2").text();
            result.summary = $(this).children("p").text().split("\n")[0];
            console.log(result);

            ////////////////////////////////

            // Create a new Article using the `result` object built from scraping

            if (result.link && result.headline && result.summary) {
                db.Article
                    .create(result)
                    .then(function (dbArticle) {
                        // If we were able to successfully scrape and save an Article, send a message to the client
                       // console.log(" THIS IS DB ARTICLE " + dbArticle);

                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        res.json(err);
                        console.log(error);
                    });
            }

        });
        res.send("Scrape Complete");
    });
});


// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article
        .find({})
        .then(function (dbArticles) {
            // If we were able to successfully find Articles, send them back to the client
            console.log(dbArticles);

            var hbsObject = {
                articles: dbArticles
            };
            console.log(hbsObject);
            res.render("index", hbsObject);
            

        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);

        });
});



// Create all our routes and set up logic within those routes where required.
app.get("/", function (req, res) {
    res.render("index");
    // console.log("hello");
    // console.log("hi");
    // db.find({}, function (err, docs) {
    //     var obj = dbArticle
    //     res.render('index', obj);
    //});

    // db.Article
    //     .find({})
    //     .then(function (dbArticle) {
    //         // If we were able to successfully find Articles, send them back to the client
    //         res.render(dbArticle);
    //     })


});




// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    
    console.log("correct:" + req.body);
    db.Note
      .create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        console.log(err);
        res.json(err);
        
      });
  });
  
  // Start the server
  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });










//create a route for saving articles


//create a route for saving notes to articles

//** Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.










//figure out how to make the handlebars files render the necessary routes
//figure out how to hook your database up to your handlbars files