(function ($, Drupal) {
  Drupal.behaviors.books = {
    attach: function (context, settings) {
      $(".search-input").keypress(function (e) {
        if (e.which == 13) {
          $("#search-button").once("books").click();
        }
      });

      $("#search-button")
        .once("books")
        .click(function () {
          $('<div class="loader"></div>').appendTo("#container");
          $(".card-item").remove();
          $(".item-blank-label").remove();
          loadData();
        });

      // Load initial Data
      async function loadData() {
        var query = $(".search-input").val();
        var url = "https://www.googleapis.com/books/v1/volumes?q=" + query;

        await fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            $(".loader").remove();
            // Check if items are returned if not. Add blank label
            if (json.items == undefined && !$(".item-blank-label")[0]) {
              $(
                '<div class="item-blank-label" aria-label="No items available">No Items are available.</div>'
              ).appendTo("#item-view");
              return;
            }

            var items = json.items.slice(0, 8);
            $(".item-blank-label").remove();

            items.forEach((item) => {
              $(
                '<div class="card-item" id=' +
                  item.id +
                  ">" +
                  '<div class="thumbnail-container"><img alt="book-cover" class="thumbnail" src="' +
                  item.volumeInfo.imageLinks.thumbnail +
                  '"></div>' +
                  '<div class="item-title" aria-labelledby="title"><span class="text-bold" id="title">Title: </span>' +
                  item.volumeInfo.title +
                  "</div>" +
                  '<div class="item-author" aria-labelledby="author"><span class="text-bold" id="author">Author: </span>' +
                  item.volumeInfo.authors +
                  "</div>" +
                  '<div class="item-description" aria-label="book description">' +
                  item.volumeInfo.description +
                  "</div>" +
                  '<div class="more-info"><a aria-label="more info link" href="' +
                  item.volumeInfo.infoLink +
                  '" target="_blank"> More Info</a>' +
                  "</div>" +
                  "</div>"
              ).appendTo("#item-view");
            });
          });
      }
    },
  };
})(jQuery, Drupal);
