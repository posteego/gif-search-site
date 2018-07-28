///////////////////////////////////////////////////////////////////////////////
//////////////////////////// GifTastic Site ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/*
  possible APIs to combine with:
  -- https://docs.sheetsu.com/#introduction
  -- https://developer.wordnik.com

*/


/* 
  needs work (using rel line #s):
  -- makeCard() rel 30, 35
*/

// load foundation
$(document).foundation();


///////////////////////////////////////////////////////////////////////////////
/*                               Variables                                   */
///////////////////////////////////////////////////////////////////////////////

// giphy api key + url
giphy_key = "gmUoQcltu2OqZuLZ9RXHRKoT7hR8CHrk";
giphy_url = `https://api.giphy.com/v1/gifs/search?api_key=${giphy_key}&limit=10&`;

// starting topics
var topics = ['Spiderman', 'Superman', 'Batman',
  'Captain America', 'Iron Man'];

// ease-of-access vars
var p = $("<p>"),
  log = console.log;

var giflist = $(".gifs");

// does the last row have 3 gifs?
var row = 1; // 10 gifs at a time, 1 gif in last row in beginning


///////////////////////////////////////////////////////////////////////////////
/*                                  Run                                      */
///////////////////////////////////////////////////////////////////////////////

renderButtons();


///////////////////////////////////////////////////////////////////////////////
/*                                Utility                                    */
///////////////////////////////////////////////////////////////////////////////

function renderButtons() {
  // render buttons in topics array
  /* <button class="button hollow">Topic 1</button> */
    // append to .buttons-view

  for (let i = 0; i < topics.length; i++) {
    // create button for each topic
    let button = $("<button>");
    // add classes to button
    button.attr({
      class: 'topic button black hollow'
    });
    // add text to button
    button.text(topics[i]);
    // append to .buttons-view
    $(".buttons-view").append(button);
  }
}

function makeCard(src, rating) {
  // create and append card 
  /*
    <div class="cell card">
      <img src="http://fillmurray.com/300/200">
      <div class="card-section">
        <h4>This is a card.</h4>
        <p>It has an easy to override visual style, and is appropriately subdued.</p>
      </div>
    </div>
  */
  // make divs, img, p
  let div = $("<div>"),
    img = $("<img>"),
    p = $("<p>"),
    innerDiv = $("<div>");
  
  // create card div
  div.attr({
    class: 'cell card'
  });

  // put img src in img element
  img.attr({
    src: src
  });

  div.append(img);  // append img to card

  // create card-section div (where non img stuff goes)
  innerDiv.attr({
    class: 'card-section'
  });

  // add rating to innerDiv
  p.attr({
    class: "rating"
  }).text(
    "Rating: " + rating
  );

  innerDiv.append(p);


  // append card-section (innerDiv) to card (div)
  div.append(innerDiv);

  // add card (div) to page
  giflist.append(div);
}


///////////////////////////////////////////////////////////////////////////////
/*                               Functions                                   */
///////////////////////////////////////////////////////////////////////////////

$(".topic").on('click', function () {
  let choice = $(this).text();
  
  $.ajax({
    url: giphy_url + `q=${choice}`,
    method: 'GET'
  }).then(function(response) {
    log(response);
    for (let i = 0; i < response.data.length; i++) {
      let src = response.data[i].images.fixed_height_still.url;
      let rating = response.data[i].rating.toUpperCase();
      makeCard(src, rating);
    }
  });
});