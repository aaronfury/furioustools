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
	const snapScrollingCssMethod = furiousToolsSettings.snapScrollingCssMethod;
	
	if ( snapScrollingCssMethod ) {
		const snapContainer = document.querySelector( '.snap-container' );
		if ( ! snapContainer ) {
			return;
		}
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
	snapContainer.style.scrollPaddingTop = offsetHeight + 'px';

	if ( snapScrollingCssMethod ) {
		const snapSections = document.querySelectorAll( '.snap-section' );
	} else {
		const snapSections = document.querySelectorAll( '<section>' );
		// Append snap-container class to the parent object
		const parentElement = snapSections[0].parentElement;
		parentElement.classList.add( 'snap-container' );

		// Append snap-section class to each section
		snapSections.forEach( ( section ) => {
			section.classList.add( 'snap-section' );
		});
	}

	// Set height of snap sections based on force full pages setting
	if ( snapScrollingForceFullPages ) {
		snapSections.forEach( ( section ) => {
			section.style.minHeight = '100vh';
			section.style.height = 'auto';
		});	
	}

} );