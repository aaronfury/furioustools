/*
	* Handle offsetting based on calculated height of an objects like admin bar
	* and any fixed headers.
	*
	* Option to toggle between full-screen snapping (100vh)

	.snap-container
	.is-position-sticky or .snap-offset - calculate height and set it as scroll-padding-top on .snap-container
*/

document.addEventListener( 'DOMContentLoaded', function () {

	const snapScrollingForceFullPages = furiousToolsSettings.snapScrollingForceFullPages;
	const snapContainer = document.querySelector( '.snap-container' );
	if ( ! snapContainer ) {
		return;
	}

	if ( snapScrollingForceFullPages ) {
		snapContainer.style.height = '100vh';
	}
	
	// Calculate offset height from sticky elements or explicitly tagged offset elements
	const snapOffsetElement = document.querySelector( '.is-position-sticky, .snap-offset' );
	let offsetHeight = 0;
	if ( snapOffsetElement ) {
		offsetHeight = snapOffsetElement.offsetHeight;
	}
	//snapContainer.style.scrollPaddingTop = offsetHeight + 'px';

	// Set height of snap sections based on force full pages setting
	const snapSections = document.querySelectorAll( '.snap-section' );
	snapSections.forEach( ( section ) => {
		if ( snapScrollingForceFullPages ) {
			section.style.minHeight = '100vh';
		} else {
			section.style.height = 'auto';
		}
	} );
} );