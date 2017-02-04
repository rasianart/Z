$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  // var bodyInput = $("#body");
  const userInput = $("#username");
  const loginForm = $("#login");
  // var authorSelect = $("#author");
  // Adding an event listener for when the form is submitted
  $(loginForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!userInput.val().trim()) {
      return;
    }
    let userNameInput = userInput.val().trim();
    submitLogin(userNameInput);
  }

  function submitLogin(login) {
    $.post("/login", login, function() {
    //   window.location.href = "/gestures";
    });
  }


  //
  // function updateLogin(login) {
  //   $.ajax({
  //     method: "PUT",
  //     url: "/api/gestures",
  //     data: login
  //   })
  //   .done(function() {
  //     window.location.href = "/gestures";
  //   });
  // }
});





  //
  //
  //
  //
  // var url = window.location.search;
  // var loginId;
  // var authorId;
  // // Sets a flag for whether or not we're updating a post to be false initially
  // var updating = false;
  //
  // // If we have this section in our url, we pull out the post id from the url
  // // In '?post_id=1', loginId is 1
  // if (url.indexOf("?post_id=") !== -1) {
  //   loginId = url.split("=")[1];
  //   getLoginData(loginId, "post");
  // }
  // // // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  // // else if (url.indexOf("?author_id=") !== -1) {
  // //   authorId = url.split("=")[1];
  // // }
  //
  // // Getting the authors, and their posts
  // // getAuthors();
  //
  // // A function for handling what happens when the form to create a new post is submitted
  //
  //
  // // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  // function getLoginData(id, type) {
  //   var queryUrl;
  //   switch (type) {
  //     case "post":
  //       queryUrl = "/api/posts/" + id;
  //       break;
  //     case "author":
  //       queryUrl = "/api/authors/" + id;
  //       break;
  //     default:
  //       return;
  //   }
  //   $.get(queryUrl, function(data) {
  //     if (data) {
  //       console.log(data.AuthorId || data.id)
  //       // If this post exists, prefill our login forms with its data
  //       userInput.val(data.title);
  //       bodyInput.val(data.body);
  //       authorId = data.AuthorId || data.id;
  //       // If we have a post with this id, set a flag for us to know to update the post
  //       // when we hit submit
  //       updating = true;
  //     }
  //   });
  // }
  //
  // // A function to get Authors and then render our list of Authors
  // function getAuthors() {
  //   $.get("/api/authors", renderAuthorList);
  // }
  // // Function to either render a list of authors, or if there are none, direct the user to the page
  // // to create an author first
  // function renderAuthorList(data) {
  //   if (!data.length) {
  //     window.location.href = "/authors";
  //   }
  //   $(".hidden").removeClass("hidden");
  //   var rowsToAdd = [];
  //   for (var i = 0; i < data.length; i++) {
  //     rowsToAdd.push(createAuthorRow(data[i]));
  //   }
  //   authorSelect.empty();
  //   console.log(rowsToAdd);
  //   console.log(authorSelect);
  //   authorSelect.append(rowsToAdd);
  //   authorSelect.val(authorId);
  // }
  //
  // // Creates the author options in the dropdown
  // function createAuthorRow(author) {
  //   var listOption = $("<option>");
  //   listOption.attr("value", author.id);
  //   listOption.text(author.name);
  //   return listOption;
  // }

  // Update a given post, bring user to the blog page when done
