
// This version pulls text & that's it.  There were other versions that attempted to pull images.

// Blank Namespace
var listenL = {};

listenL.init = function() {
// What happens when you submit the form?
	$('.search').on('submit',function(e){
		// Prevent the default
		e.preventDefault();
		//Take info from input and store it in variable
		var loc = $('.location').val();
		listenL.getOrigin(loc);
	});
} // end .init

var allSpotifyIds = [];
listenL.artist = "http://developer.echonest.com/api/v4/artist/search"
listenL.key = "SYCKX8J3AYFH7SQ61" 
// listenL.artistS = "https://api.spotify.com/v1/artists"
// listenL.keyS = "f0c3addabe11476c9d2ff4ba8369b252"

// Function that will go get & get the origin from the API
listenL.getOrigin = function(loc){
		$.ajax({
			url : listenL.artist,
			type : "GET",
			format : "json",
			data : {
				api_key : listenL.key,
				results: 5,
				// to access Spotify catalog
				bucket: 'id:spotify',
				artist_location : loc
			},
			success : function(response) {
				listenL.displayOrigin(response);
		}
	}); // end ajax

}// end listenL.getOrigin

// Function used to display origin in html
listenL.displayOrigin = function(response) {
	console.log("Ready to display the pieces with this data: ",response);
	var artistText = response.response.artists;

	// Gets Rid of Previous Search Response
	$(".artistList").html('');

	// Loop through each goal to display
	for (var i = 0; i < artistText.length; i++) {
		var artist = artistText[i].name;
		var spotifyID = artistText[i].foreign_ids[0].foreign_id
		spotifyID = spotifyID.split(':');
		// Creates new li and adds artist name
		var newLi = $('<li>').text(artist);
		$(".artistList").append(newLi);

		// Lists spotify ID without prefix
		allSpotifyIds.push(spotifyID[2]);
	} // end for loop
	console.log(allSpotifyIds);
	// listenL.makeImageCalls();

}; // end listenL.displayOrigin

// Document Ready statement
$(function() {
	listenL.init();
});
