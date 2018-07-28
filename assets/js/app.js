///////////////////////////////////////////////////////////////////////////////
//////////////////////////// GifTastic Site ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/*
  possible APIs to combine with:
  -- https://docs.sheetsu.com/#introduction
  -- https://developer.wordnik.com

*/

// load foundation
$(document).foundation();
$(".load-more").hide();
$("#credits").hide();
$(".hr").hide();
$(".favorites").hide();
$(".toggle-favs").hide();


///////////////////////////////////////////////////////////////////////////////
/*                               Variables                                   */
///////////////////////////////////////////////////////////////////////////////

// giphy api key + url
giphy_key = "gmUoQcltu2OqZuLZ9RXHRKoT7hR8CHrk";
giphy_url = `https://api.giphy.com/v1/gifs/search?api_key=${giphy_key}&limit=10&`;

// ease-of-access vars
var p = $("<p>"),
  log = console.log;

var buttonsview = $(".buttons-view"),
  giflist = $(".gifs"),
  title = $(".topic-title"),
  loadBtn = $(".load-more"),
  search = $(".search-btn"),
  topic = ".topic";

// other vars
// starting topics
var topics = ['Spiderman', 'Superman', 'Batman',
  'Captain America', 'Iron Man'];
var offset = 0; // offset for loading more gifs of the same topic


///////////////////////////////////////////////////////////////////////////////
/*                                  Run                                      */
///////////////////////////////////////////////////////////////////////////////

renderButtons();


///////////////////////////////////////////////////////////////////////////////
/*                                Utility                                    */
///////////////////////////////////////////////////////////////////////////////

// taken from stack overflow
function toTitleCase(str) {
  return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
    function (firstLetter) {
      return firstLetter.toUpperCase();
    });
}


function renderButtons() {
  // render buttons in topics array
  /* <button class="button hollow">Topic 1</button> */
  // append to .buttons-view

  buttonsview.empty();

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
    buttonsview.append(button);
  }
}

function makeCard(still, animated, dl, rating, title, liked) {
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

  // create HTML elements
  let card = $("<div>"),
    gif = $("<img>"),
    pTitle = $("<p>"),
    pRating = $("<h6>"),
    innerDiv = $("<div>"),
    btnDiv = $("<div>"),
    likeBtn = $("<button>"),
    dlLink = $("<a>"),
    dlBtn = $("<button>");

  // set element classes and values
  // card div
  card.attr({
    class: 'cell card'
  });
  // img element
  gif.attr({
    src: still,
    class: 'gif',
    'data-still': still,
    'data-animated': animated,
    'data-state': 'still'
  });
  // non-gif card section
  innerDiv.attr({
    class: 'card-section'
  });
  // gif title
  pTitle.attr({
    class: 'gif-title h5',
  }).text(title);
  // p element (rating)
  pRating.attr({
    class: 'rating subheader'
  }).text(
    "Rated: " + rating
  );

  btnDiv.attr({
    class: 'button-div text-center'
  });

  dlBtn.attr({
    class: 'button black',
  }).text("Download");

  dlLink.attr({
    href: dl,
    target: '_blank',
    download: ''
  }).append(dlBtn);

  btnDiv.append(dlLink);

  // append elements
  card.append(gif);  // gif still -> card div
  innerDiv.append(pTitle); // gif-title -> non-gif div
  innerDiv.append(pRating); // rating -> non-gif div
  if (liked === false) {
    // make the like button if it isn't already liked
    likeBtn.attr({
      class: 'like button black hollow',
      'data-still': still,
      'data-animated': animated,
      'data-state': false
    }).text("Like");
    btnDiv.append(likeBtn);
  }
  card.append(innerDiv); // non-gif div -> card div
  card.append(btnDiv);
  return card;
}


///////////////////////////////////////////////////////////////////////////////
/*                               Functions                                   */
///////////////////////////////////////////////////////////////////////////////

// show gifs
function renderGifs(choice) {
  // empty the previous search
  giflist.empty();
  // show .load-more button
  loadBtn.show();
  // show credits for search icon
  $("#credits").show();
  // show hr
  $(".hr").show();
  // reset offset
  offset = 0;

  // put topic in .topic-title
  title.html(choice);

  // api call
  $.ajax({
    url: giphy_url + `q=${choice}`,
    method: 'GET'
  }).then(function (response) {
    log(response);
    // make cards for the page for each gif
    for (let i = 0; i < response.data.length; i++) {
      let still = response.data[i].images.fixed_height_still.url,
        animated = response.data[i].images.fixed_height.url,
        dl = response.data[i].images.original.url,
        rating = response.data[i].rating.toUpperCase(),
        title = response.data[i].title;
      let card = makeCard(still, animated, dl, rating, title, false);
      // add card to page
      giflist.append(card);
    }
  });
}

// button up top is clicked
$(document).on('click', topic, function () {

  // get text from button
  let choice = $(this).text();
  // show gifs
  renderGifs(choice);
});

// topic is added
search.on('click', function (event) {
  // prevent page from refreshing
  event.preventDefault();
  // get new topic text
  let newTopic = $(".field").val().trim();
  // clear text field
  $(".field").val('');
  // do nothing if empty string
  if (newTopic === '')
    return;
  
  // capitalize first letter of each word string
  newTopic = toTitleCase(newTopic);
  //newTopic = newTopic.charAt(0).toUpperCase() + newTopic.slice(1);

  topics.push(newTopic); // add newTopic to topics array
  renderButtons();  // render new buttons

  // show gifs
  renderGifs(newTopic);

});

// certain gif is clicked
$(document).on('click', '.gif', function () {
  let state = $(this).attr('data-state');

  if (state === 'still') {
    $(this).attr({
      src: $(this).attr('data-animated'),
      'data-state': 'animated'
    });
  } else {
    $(this).attr({
      src: $(this).attr('data-still'),
      'data-state': 'still'
    });
  }
});

// .load-more button is clicked
loadBtn.on('click', function () {
  offset += 10; // increase the offset so we don't repeat gifs
  let current_topic = title.text(); // get relevant topic from .topic-title

  $.ajax({
    // query url with offset value
    url: giphy_url + `q=${current_topic}&offset=${offset}`,
    method: 'GET'
  }).then(function (response) {
    // make cards for each gif
    for (let i = 0; i < response.data.length; i++) {
      let still = response.data[i].images.fixed_height_still.url,
        animated = response.data[i].images.fixed_height.url,
        rating = response.data[i].rating.toUpperCase(),
        dl = response.data[i].images.original.url,
        title = response.data[i].title;
      let card = makeCard(still, animated, dl, rating, title, false);
      // add card to page
      giflist.append(card);
    }
  });
});