document.addEventListener( "DOMContentLoaded", function() {
	Cookies.set(
		'skiphomepage',
		true,
		{
			expires: 30,
			sameSite: 'strict',
			secure: true
		} );
});

jQuery('a[href="' + siteurl + '"]').click( function() {
	Cookies.remove( 'skiphomepage' );
})