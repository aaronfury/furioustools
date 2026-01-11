document.addEventListener( "DOMContentLoaded", function() {
	// If an explicit link is clicked to the homepage, clear the cookie so that the auto-redirect doesn't kick in.
	jQuery('a[href="' + siteurl + '"], a[href="' + siteurl + '/"]').click( function() {
		Cookies.remove( 'skiphomepage' );
	})
});