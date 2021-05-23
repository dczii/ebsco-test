(function ($, Drupal) {
  Drupal.behaviors.books = {
    attach: function (context, settings) {
      $(".search-input").keypress(function (e) {
        if (e.which == 13) {
          $("#search-button").click();
        }
      });

      $("#search-button").click(function () {
        $(".card-item").remove();
        loadData();
      });

      // Load initial Data
      async function loadData() {
        var query = $(".search-input").val();
        var url = "https://www.googleapis.com/books/v1/volumes?q=" + query;

        const fetchData = await fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            console.log(item);
            var item = json.items.slice(0, 8);
            item.forEach((item) => {
              $(
                '<div class="card-item">' +
                  '<img alt="book-cover" class="thumbnail" src="' +
                  item.volumeInfo.imageLinks.thumbnail +
                  '">' +
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
