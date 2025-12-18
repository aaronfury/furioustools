import { createRoot } from 'react-dom/client';
import domReady from '@wordpress/dom-ready';
import { SettingsPage } from './components';
import './index.scss';

domReady(() => {
	const rootElement = createRoot(
		document.getElementById( 'furious-tools-settings-root' )
	);

	rootElement.render( <SettingsPage /> );
});