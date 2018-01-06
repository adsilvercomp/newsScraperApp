// Now make an ajax call for the Article
$(document).ready(function () {
  
  //you need to add click events to initiate these ajax calls
  // $(".comment").on("click", function (event) {
  //   alert("Handler for .click() called.");
  // });

  // });
  // $.ajax({
  //   //making a get request from the articles route
  //   method: "GET",
  //   url: "/articles/" + thisId
  // })
  //   // With that done, add the note information to the page
  //   .done(function (data) {
  //     console.log(data);
  //     // The title of the article
  //     $("#notes").append("<h2>" + data.title + "</h2>");
  //     // An input to enter a new title
  //     $("#notes").append("<input id='titleinput' name='title' >");
  //     // A textarea to add a new note body
  //     $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
  //     // A button to submit a new note, with the id of the article saved to it
  //     $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

  //     // If there's a note in the article
  //     if (data.note) {
  //       // Place the title of the note in the title input
  //       $("#titleinput").val(data.note.title);
  //       // Place the body of the note in the body textarea
  //       $("#bodyinput").val(data.note.body);
  //     }
  //   });
  // Grab the articles as a json
  alert("so far so good");
$.getJSON("/articles", function(data) {
  console.log(data);
 
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articleId").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});


  // When you click the savenote button
  $(document).on("click", ".comment", function () {
    alert("so far so good");
    // Grab the id associated with the article from the submit button
    var thisId = $("#titleinput").attr("data-id");
    console.log( $("#titleinput").val());

    let data = {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }

//    Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      type: "POST",
      url: "/articles/" + thisId,
      data: data
      })
      // With that done
      .done(function (data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
});
