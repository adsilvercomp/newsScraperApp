


// Whenever someone clicks a p tag
$(document).on("click", "h1", function () {
    // Empty the notes from the note section
    $("#articles").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .done(function (data) {
            console.log(data);
            // The headline of the article
            // $("#articles").append("<ul>" + data.headline + "</ul>");
            // // The link to the article
            // $("#articles").append("<ul>" + data.link + "</ul>");
            // $("#articles").append("<ul>" + data.summary+ "</ul>");
            // $("#articles").append("<input id='titleinput' name='title' >");
            // // A textarea to add a new note body
            // $("#articles").append("<textarea id='bodyinput' name='body'></textarea>");
            // // A button to submit a new note, with the id of the article saved to it
            // $("#articles").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // // If there's a note in the article
            // if (data.note) {
            //     // Place the title of the note in the title input
            //     $("#titleinput").val(data.note.title);
            //     // Place the body of the note in the body textarea
            //     $("#bodyinput").val(data.note.body);
          //  }
        });
});