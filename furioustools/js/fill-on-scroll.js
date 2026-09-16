document.addEventListener( 'DOMContentLoaded', function () {

	const elements = document.querySelectorAll( '.fill-on-scroll' );
	if ( elements.length === 0 ) {
		return;
	}

	// Scale the alpha of any color format the browser reports, including oklch() and color()
	const fade = ( color, progress ) => `color-mix(in srgb, ${color} ${progress * 100}%, transparent)`;

	// Computed shadows lead with their color, e.g. "rgba(0, 0, 0, 0.15) 0px 2px 6px 0px"
	const fadeShadow = ( shadow, progress ) => shadow.split( /,(?![^(]*\))/ ).map( ( part ) => {
		const color = part.trim().match( /^\S+\([^)]*\)|^\S+/ );
		return color ? part.trim().replace( color[0], fade( color[0], progress ) ) : part;
	} ).join( ', ' );

	// Where the element would sit if nothing had scrolled past it, measured from a neighbour in the same flow so that its own sticky displacement is ignored
	const naturalTop = ( element ) => {
		const styles = getComputedStyle( element );
		const previous = element.previousElementSibling;
		const next = element.nextElementSibling;

		if ( previous ) {
			return previous.getBoundingClientRect().bottom + ( parseFloat( styles.marginTop ) || 0 );
		}

		if ( next ) {
			return next.getBoundingClientRect().top - ( parseFloat( styles.marginBottom ) || 0 ) - element.offsetHeight;
		}

		const parent = element.parentElement;
		return parent.getBoundingClientRect().top - parent.scrollTop + ( parseFloat( getComputedStyle( parent ).paddingTop ) || 0 ) + ( parseFloat( styles.marginTop ) || 0 );
	};

	// A sticky ancestor is pinned along with everything inside it, so the outermost one is what has to be measured
	const stickyAnchor = ( element ) => {
		let anchor = element;

		for ( let node = element.parentElement; node && node !== document.body; node = node.parentElement ) {
			if ( getComputedStyle( node ).position === 'sticky' ) {
				anchor = node;
			}
		}

		return anchor;
	};

	const items = [ ...elements ].map( ( element ) => {
		// Drops the stylesheet's pre-script transparency, so the values read below are the ones the theme assigned
		element.classList.add( 'fill-on-scroll-ready' );

		const styles = getComputedStyle( element );
		return {
			element,
			anchor: stickyAnchor( element ),
			background: styles.backgroundColor,
			shadow: styles.boxShadow === 'none' ? null : styles.boxShadow,
		};
	} );

	const update = () => {
		items.forEach( ( item ) => {
			// Fill over the element's own height, so the effect is the same whatever the surrounding markup looks like
			const progress = Math.min( Math.max( -naturalTop( item.anchor ) / ( item.element.offsetHeight || 1 ), 0 ), 1 );

			item.element.style.backgroundColor = fade( item.background, progress );
			if ( item.shadow ) {
				item.element.style.boxShadow = progress === 0 ? 'none' : fadeShadow( item.shadow, progress );
			}
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

	// Capturing on the window catches scrolling of the document and of any container inside it, such as a snap scrolling container
	window.addEventListener( 'scroll', onScroll, { capture: true, passive: true } );
	window.addEventListener( 'resize', onScroll, { passive: true } );

	// A page can arrive already scrolled, from an anchor link or from the browser restoring the previous position, without firing a scroll event
	[ 'load', 'pageshow' ].forEach( ( event ) => window.addEventListener( event, onScroll ) );
	update();

} );
