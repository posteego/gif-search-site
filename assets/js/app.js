///////////////////////////////////////////////////////////////////////////////
//////////////////////////// GifTastic Site ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
/*                               Variables                                   */
///////////////////////////////////////////////////////////////////////////////

// giphy api key + url
giphy_key = "gmUoQcltu2OqZuLZ9RXHRKoT7hR8CHrk";
giphy_url = "https://api.giphy.com/v1/gifs/search?api_key=" + giphy_key + "&";

// starting topics
var topics = [];

// ease-of-access vars
var div = $("<div>"),
  img = $("<img>");

///////////////////////////////////////////////////////////////////////////////
/*                                Utility                                    */
///////////////////////////////////////////////////////////////////////////////

// load foundation
$(document).foundation();

function makeCard(src) {
// create and append card 
/*
  <div class="card">
    <img src="http://fillmurray.com/500/300">
    <div class="card-section">
      <h4>This is a card.</h4>
      <p>It has an easy to override visual style, and is appropriately subdued.</p>
    </div>
  </div>
*/
  
  // create card div
  div.attr({
    class: 'card'
  });

  // put img src in img element
  img.attr({
    src: src
  });

  div.append(img);  // append img to card

  // create card-section div (where non img stuff goes)
  let innerDiv = $("<div>");
  innerDiv.attr({
    class: 'card-section'
  });

  // append card-section (innerDiv) to card (div)
  div.append(innerDiv);
};

}


///////////////////////////////////////////////////////////////////////////////
/*                               Functions                                   */
///////////////////////////////////////////////////////////////////////////////