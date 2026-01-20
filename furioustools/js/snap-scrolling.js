document.addEventListener( 'DOMContentLoaded', function () {

	const snapScrollingForceFullPages = furiousTools.settings.snapScrollingForceFullPages;
	const snapScrollingCssMethod = furiousTools.settings.snapScrollingCssMethod;
	console.log("Snap Scrolling CSS Method:", snapScrollingCssMethod);
	let snapContainer;
	let snapSections;
	
	if ( snapScrollingCssMethod ) {
		snapSections = document.querySelectorAll( '.snap-section' );
		snapContainer = document.querySelector( '.snap-container' ) ?? snapSections[0]?.parentElement;
		console.log("Ass burger", snapContainer);
		if ( ! snapContainer ) {
			return;
		}
		
		snapContainer.classList.add( 'snap-container' ); // Ensure snap-container class is present
	} else {
		snapSections = document.querySelectorAll( 'section' );
		if ( snapSections.length === 0 ) {
			return;
		}
		// Append snap-container class to the parent object
		snapContainer = snapSections[0].parentElement;
		snapContainer.classList.add( 'snap-container' );

		// Append snap-section class to each section
		snapSections.forEach( ( section ) => {
			section.classList.add( 'snap-section' );
		});
	}

	const snapOffsetElement = snapContainer.querySelector( '.is-position-sticky, .snap-offset' );

	if ( snapScrollingForceFullPages ) {
		snapContainer.style.height = '100vh';
	}

	// Make the last section a minimum height of the container so that it can snap fully into view, only if there is an explicit parent container
	if (!snapContainer.classList.contains( 'wp-site-blocks' ) ) {
		snapSections[ snapSections.length - 1 ].style.minHeight = snapContainer.offsetHeight + 'px';
	}
	
	// Calculate offset height from sticky elements or explicitly tagged offset elements, only if they are inside the snap container
	if ( snapOffsetElement ) {
		snapContainer.style.scrollPaddingTop = snapOffsetElement.offsetHeight + 'px';
	} else {
		Array.from(snapContainer.children).forEach( ( child ) => {
			child.classList.add( 'snap-section' ); // Make sure all children are snap sections if there's no sticky header (otherwise it doesn't get displayed)
		} );
	}

	// Set height of snap sections based on force full pages setting
	if ( snapScrollingForceFullPages ) {
		snapSections.forEach( ( section ) => {
			section.style.minHeight = '100vh';
			section.style.height = 'auto';
		});	
	}

} );