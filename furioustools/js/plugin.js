document.addEventListener( "DOMContentLoaded", function() {
	// If an explicit link is clicked to the homepage, clear the cookie so that the auto-redirect doesn't kick in.
	document.querySelectorAll( 'a[href="' + siteurl + '"], a[href="' + siteurl + '/"]' ).forEach( function( link ) {
		link.addEventListener( 'click', function() {
			Cookies.remove( 'skiphomepage' );
		});
	});
});