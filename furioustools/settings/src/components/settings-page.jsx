import { Button, Card, CardBody, CardHeader, CheckboxControl, Snackbar, __experimentalSpacer as Spacer, __experimentalText as Text, TextControl, TextareaControl, __experimentalVStack as VStack, __experimentalHStack as HStack } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { Notices } from './notices';
import { useSettings } from '../hooks';

const SaveButton = ( { onClick } ) => (
	<Button variant="primary" type="submit" onClick={ onClick } __next40pxDefaultSize>
		Save Settings
	</Button>
);

const SettingsPage = () => {
	const {
		cleanupWpCrud,
		setCleanupWpCrud,
		addCustomCrud,
		setAddCustomCrud,
		customCrud,
		setCustomCrud,
		latestJquery,
		setLatestJquery,
		removeJqueryMigrate,
		setRemoveJqueryMigrate,
		trackUserLastLogin,
		setTrackUserLastLogin,
		searchSlug,
		setSearchSlug,
		customReadmore,
		setCustomReadmore,
		customReadmoreText,
		setCustomReadmoreText,
		bypassHttpValidateUrl,
		setBypassHttpValidateUrl,
		removeAttWidth,
		setRemoveAttWidth,
		styleOutboundLinks,
		setStyleOutboundLinks,
		styleOutboundLinksOnlyInContent,
		setStyleOutboundLinksOnlyInContent,
		snapScrolling,
		setSnapScrolling,
		snapScrollingForceFullPages,
		setSnapScrollingForceFullPages,
		smoothScrolling,
		setSmoothScrolling,
		skipHomepageEnabled,
		setSkipHomepageEnabled,
		skipHomepageShowonce,
		setSkipHomepageShowonce,
		skipHomepageTarget,
		setSkipHomepageTarget,
		redirectOnLogin,
		setRedirectOnLogin,
		redirectOnLoginTarget,
		setRedirectOnLoginTarget,
		hideLoginForm,
		setHideLoginForm,
		saveSettings,
		isDirty
	} = useSettings();
	
	useEffect(() => {
        const handler = (e) => {
            if (!isDirty) return;
            const message = 'You have unsaved changes. Are you sure you want to leave?';
            e.preventDefault();
            e.returnValue = message;
            return message;
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [isDirty]);

	return (
		<div>
			<h1>Furious Tools Settings</h1>
			<VStack gap={ 4 }>
				<Card>
					<CardHeader>Headers and Libraries</CardHeader>
					<CardBody>
						<CheckboxControl
							label="Cleanup WP crud"
							checked={ cleanupWpCrud }
							onChange={ ( value ) => setCleanupWpCrud( value ) }
							help="This option removes some unnecessary things from the wp_head() function."
							__nextHasNoMarginBottom
						/>
						<CheckboxControl
							label="Add custom crud"
							checked={ addCustomCrud }
							onChange={ ( value ) => setAddCustomCrud( value ) }
							help="Add your own data to the <code>&lt;head&gt;</code> section. Useful for like Graph metadata or other things your theme doesn't provide. Use with caution!"
							__nextHasNoMarginBottom
						/>
						{ addCustomCrud && (
							<TextareaControl
								label="Custom crud to add"
								value={ customCrud }
								onChange={ ( value ) => setCustomCrud( value ) }
								help="This text will be inserted directly into the <code>&lt;head&gt;</code> section of every page. Don't break nuffin'"
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								className='left-indent'
							/>
						) }
						<CheckboxControl
							label="Use Latest jQuery"
							checked={ latestJquery }
							onChange={ ( value ) => setLatestJquery( value ) }
							help="Unloads the default version of jQuery included in WordPress and replace it with the latest version (currently 3.7.1)"
							__nextHasNoMarginBottom
						/>
						<CheckboxControl
							label="Remove jQuery Migrate"
							checked={ removeJqueryMigrate }
							onChange={ ( value ) => setRemoveJqueryMigrate( value ) }
							help="Removes the jQuery Migrate script that is included with WordPress by default."
							__nextHasNoMarginBottom
						/>
					</CardBody>
				</Card>
				<Card>
					<CardHeader>Miscellaneous Settings</CardHeader>
					<CardBody>
						<CheckboxControl
							label="Track User Last Login"
							checked={ trackUserLastLogin }
							onChange={ ( value ) => setTrackUserLastLogin( value ) }
							help="Enable this option to track the last time a user logged in. This information is displayed in the Users list, and can also be accessed using `get_user_meta($user_id, 'last_login', true)`"
							__nextHasNoMarginBottom
						/>
						<CheckboxControl
							label="Hide Login Form"
							checked={ hideLoginForm }
							onChange={ ( value ) => setHideLoginForm( value ) }
							help="Hides the default WordPress login form located at /wp-login.php. Useful if you are using a custom login page or plugin. When enabled, can be overridden by appending '?showloginform' to the wp-login.php URL."
							__nextHasNoMarginBottom
						/>
						<CheckboxControl
							label="Include /search slug in search URLs"
							checked={ searchSlug }
							onChange={ ( value ) => setSearchSlug( value ) }
							help="If enabled, search URLs will include '/search' slug (e.g., example.com/search/query). If disabled, it will be example.com/?s=query."
							__nextHasNoMarginBottom
						/>
						<CheckboxControl
							label="Custom 'Read more' Text"
							checked={ customReadmore }
							onChange={ ( value ) => setCustomReadmore( value ) }
							help="Enable this option to replace the default 'Read more..' text at the end of excerpts with your own custom text."
							__nextHasNoMarginBottom
						/>
						{ customReadmore && (
							<TextControl
								label="Custom Readmore Text"
								value={ customReadmoreText }
								onChange={ ( value ) => setCustomReadmoreText( value ) }
								help="Replace the 'Read more..' at the end of excerpts with the custom text you provide. Leave blank to use the default text."
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								className='left-indent'
							/>
						) }
						<CheckboxControl
							label="Bypass HTTP URL Validation"
							checked={ bypassHttpValidateUrl }
							onChange={ ( value ) => setBypassHttpValidateUrl( value ) }
							help="Disables the built-in check that a request is not coming from the localhost. This is a useful security feature and should only be temporarily bypassed for specific situations, such as same-host site import/export."
							__nextHasNoMarginBottom
						/>
						<CheckboxControl
							label="Remove Image Width/Height Attributes"
							checked={ removeAttWidth }
							onChange={ ( value ) => setRemoveAttWidth( value ) }
							help="For images and other blocks added in the editor, WordPress automatically sets a fixed-with value on the item in the DOM. This will remove that value."
							__nextHasNoMarginBottom
						/>
						</CardBody>
				</Card>
				<Card>
					<CardHeader>Frontend Enhancements</CardHeader>
					<CardBody>
						<CheckboxControl
							label="Redirect on Login"
							checked={ redirectOnLogin }
							onChange={ ( value ) => setRedirectOnLogin( value ) }
							help="Redirect users to a specific URL after they log in."
							__nextHasNoMarginBottom
						/>
						{ redirectOnLogin && (
							<TextControl
								label="Redirect on Login Target URL"
								value={ redirectOnLoginTarget }
								onChange={ ( value ) => setRedirectOnLoginTarget( value ) }
								help="The URL to which users will be redirected after logging in."
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								className='left-indent'
							/>
						) }
						<CheckboxControl
							label="Style Outbound Links"
							checked={ styleOutboundLinks }
							onChange={ ( value ) => setStyleOutboundLinks( value ) }
							help="If a link (&lt;a&gt;) has an <em>href</em> value that links to an external website, apply specific styling to it."
							__nextHasNoMarginBottom
						/>
						{ styleOutboundLinks && (
							<CheckboxControl
								label="Only Style Outbound Links in Content"
								checked={ styleOutboundLinksOnlyInContent }
								onChange={ ( value ) => setStyleOutboundLinksOnlyInContent( value ) }
								help="If enabled, only links within the post/page content will be styled as outbound links. Links in widgets, menus, and other areas will not be affected."
								__nextHasNoMarginBottom
								className='left-indent'
							/>
						) }
						<CheckboxControl
							label="Enable Snap Scrolling"
							checked={ snapScrolling }
							onChange={ ( value ) => setSnapScrolling( value ) }
							help="(Coming soon) Enables snap scrolling behavior, where the viewport snaps to the nearest section when scrolling."
							disabled
							__nextHasNoMarginBottom
						/>
						{ snapScrolling && (
							<CheckboxControl
								label="Force Full Page Snaps"
								checked={ snapScrollingForceFullPages }
								onChange={ ( value ) => setSnapScrollingForceFullPages( value ) }
								help="When enabled, the snap scrolling will always snap to full page sections, even if the content is shorter than the viewport height."
								__nextHasNoMarginBottom
								className='left-indent'
							/>
						) }
						<CheckboxControl
							label="Enable Smooth Scrolling"
							checked={ smoothScrolling }
							onChange={ ( value ) => setSmoothScrolling( value ) }
							help="Enables smooth scrolling behavior for anchor links and general page scrolling."
							__nextHasNoMarginBottom
						/>
						</CardBody>
				</Card>
				<Card>
					<CardHeader>Skip Homepage Settings</CardHeader>
					<CardBody>
						<CheckboxControl
							label="Enable Skip Homepage"
							checked={ skipHomepageEnabled }
							onChange={ ( value ) => setSkipHomepageEnabled( value ) }
							help="Uses a small cookie and Javascript to skip the home page and automatically redirect the visitor to a different page"
							__nextHasNoMarginBottom
						/>
						{ skipHomepageEnabled && (
							<>
								<CheckboxControl
									label="Show Homepage Only Once"
									checked={ skipHomepageShowonce }
									onChange={ ( value ) => setSkipHomepageShowonce( value ) }
									help="Enabling this will show the front page once, then skip on subsequent visits. If this setting is disabled, the front page will never be shown. This setting uses a client-side cookie; if the user has disabled cookies or clears their browser cache, the front page will be shown again."
									__nextHasNoMarginBottom
									className='left-indent'
									/>
								<TextControl
									label="Skip Homepage Target URL"
									value={ skipHomepageTarget }
									onChange={ ( value ) => setSkipHomepageTarget( value ) }
									help="The URL to which visitors will be redirected when skipping the homepage."
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									className='left-indent'
								/>
							</>
						) }
					</CardBody>
				</Card>
			</VStack>
			<Spacer />
			<SaveButton onClick={ saveSettings } />
			<Spacer />
			<Notices />
		</div>
	);
};

export { SettingsPage };