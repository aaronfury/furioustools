document.addEventListener( 'DOMContentLoaded', function () {

	const fillOffset = 100; // Scroll distance past an item that fills it in, unless the item itself is taller than this

	const elements = document.querySelectorAll( '.fill-on-scroll' );
	if ( elements.length === 0 ) {
		return;
	}

	const items = [ ...elements ].map( ( element ) => {
		element.classList.add( 'fill-on-scroll-item' ); // Carries the transition once .fill-on-scroll comes back off
		return { element, top: element.getBoundingClientRect().top + window.scrollY };
	} );

	const update = () => {
		const scrolled = window.scrollY;

		items.forEach( ( item ) => {
			// Nothing is displaced at the top of the page, so the natural position can be taken again
			if ( scrolled === 0 ) {
				item.top = item.element.getBoundingClientRect().top;
			}

			const filled = scrolled > item.top + Math.max( item.element.offsetHeight, fillOffset );
			item.element.classList.toggle( 'fill-on-scroll', ! filled );
		} );
	};

	let queued = false;
	const onScroll = () => {
		if ( queued ) {
			return;
		}
		queued = true;
		requestAnimationFrame( () => {
			queued = false;
			update();
		} );
	};

	window.addEventListener( 'scroll', onScroll, { passive: true } );
	window.addEventListener( 'resize', onScroll, { passive: true } );

	// A page can arrive already scrolled, from an anchor link or from the browser restoring the previous position
	[ 'load', 'pageshow' ].forEach( ( event ) => window.addEventListener( event, onScroll ) );
	update();

} );
