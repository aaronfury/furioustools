document.addEventListener( 'DOMContentLoaded', function () {

	const activeClass = 'active-nav-link';
	const navLinks = document.querySelectorAll( 'nav a[href*="#"], .wp-block-navigation a[href*="#"]' );
	const targets = new Map(); // target element => nav links pointing at it
	const visible = new Map();

	navLinks.forEach( ( link ) => {
		const url = new URL( link.href, window.location.href );

		// Only anchors pointing at an element on the current page
		if ( ! url.hash || url.pathname !== window.location.pathname ) {
			return;
		}

		const target = document.getElementById( decodeURIComponent( url.hash.slice( 1 ) ) );
		if ( ! target ) {
			return;
		}

		if ( ! targets.has( target ) ) {
			targets.set( target, [] );
		}
		targets.get( target ).push( link );
	} );

	if ( targets.size === 0 ) {
		return;
	}

	// Sort into document order so the topmost visible target wins
	const orderedTargets = [ ...targets.keys() ].sort( ( a, b ) => ( a.compareDocumentPosition( b ) & Node.DOCUMENT_POSITION_FOLLOWING ) ? -1 : 1 );

	const setActive = ( active ) => {
		targets.forEach( ( links, target ) => {
			links.forEach( ( link ) => link.classList.toggle( activeClass, target === active ) );
		} );
	};

	let lockedTarget = null;
	let unlockTimer;

	const unlock = () => {
		lockedTarget = null;
		clearTimeout( unlockTimer );
	};

	// Hold the class on the clicked link instead of flashing it on every section a smooth scroll passes over
	targets.forEach( ( links, target ) => {
		links.forEach( ( link ) => link.addEventListener( 'click', () => {
			lockedTarget = target;
			setActive( target );

			clearTimeout( unlockTimer );
			unlockTimer = setTimeout( unlock, 2000 ); // Backstop in case the target never reaches the band, or nothing scrolls at all
		} ) );
	} );

	const observer = new IntersectionObserver( ( entries ) => {
		entries.forEach( ( entry ) => visible.set( entry.target, entry.isIntersecting ) );

		// Release the lock once the clicked target arrives; its link already has the class
		if ( lockedTarget ) {
			if ( visible.get( lockedTarget ) ) {
				unlock();
			}
			return;
		}

		setActive( orderedTargets.find( ( target ) => visible.get( target ) ) );
	}, { rootMargin: '-45% 0px -45% 0px' } ); // Treat a narrow band across the middle of the viewport as "being viewed"

	orderedTargets.forEach( ( target ) => observer.observe( target ) );

} );
