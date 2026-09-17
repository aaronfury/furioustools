document.addEventListener( 'DOMContentLoaded', function () {

	const fillOffset = 100; // Scroll distance past an item that fills it in, unless the item itself is taller than this

	const elements = document.querySelectorAll( '.fill-on-scroll' );
	if ( elements.length === 0 ) {
		return;
	}

	// A snap scrolling container scrolls in place of the page, so each item is measured against whichever one it sits in
	const scrollPosition = ( scroller ) => scroller ? scroller.scrollTop : window.scrollY;
	const offsetTop = ( element, scroller ) => element.getBoundingClientRect().top - ( scroller ? scroller.getBoundingClientRect().top : 0 );

	const items = [ ...elements ].map( ( element ) => {
		element.classList.add( 'fill-on-scroll-item' ); // Carries the transition once .fill-on-scroll comes back off

		// The natural position is only readable at the top of the scroller, where a sticky or fixed item is not displaced,
		// so assume the top of the content until then rather than measuring against a scroll position the page loaded at
		return { element, scroller: element.closest( '.snap-container' ), top: 0 };
	} );

	const update = () => {
		items.forEach( ( item ) => {
			const position = scrollPosition( item.scroller );

			if ( position <= 0 ) {
				item.top = offsetTop( item.element, item.scroller );
			}

			const filled = position > item.top + Math.max( item.element.offsetHeight, fillOffset );
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

	// Capturing on the window catches scrolling of the page and of any container inside it
	window.addEventListener( 'scroll', onScroll, { capture: true, passive: true } );
	window.addEventListener( 'resize', onScroll, { passive: true } );

	// A page can arrive already scrolled, from an anchor link or from the browser restoring the previous position
	[ 'load', 'pageshow' ].forEach( ( event ) => window.addEventListener( event, onScroll ) );
	update();

} );
