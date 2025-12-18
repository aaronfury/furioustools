import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect, useRef } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';

const useSettings = () => {
	const [cleanupWpCrud, setCleanupWpCrud] = useState(false);
	const [addCustomCrud, setAddCustomCrud] = useState(false);
	const [customCrud, setCustomCrud] = useState('');
	const [latestJquery, setLatestJquery] = useState(false);
	const [removeJqueryMigrate, setRemoveJqueryMigrate] = useState(false);
	const [trackUserLastLogin, setTrackUserLastLogin] = useState(false);
	const [searchSlug, setSearchSlug] = useState(false);
	const [customReadmore, setCustomReadmore] = useState('');
	const [customReadmoreText, setCustomReadmoreText] = useState('');
	const [bypassHttpValidateUrl, setBypassHttpValidateUrl] = useState(false);
	const [removeAttWidth, setRemoveAttWidth] = useState(false);
	const [styleOutboundLinks, setStyleOutboundLinks] = useState(false);
	const [styleOutboundLinksOnlyInContent, setStyleOutboundLinksOnlyInContent] = useState(false);
	const [snapScrolling, setSnapScrolling] = useState(false);
	const [snapScrollingForceFullPages, setSnapScrollingForceFullPages] = useState(false);
	const [smoothScrolling, setSmoothScrolling] = useState(false);
	const [skipHomepageEnabled, setSkipHomepageEnabled] = useState(false);
	const [skipHomepageShowonce, setSkipHomepageShowonce] = useState(false);
	const [skipHomepageTarget, setSkipHomepageTarget] = useState('');
	const [hideLoginForm, setHideLoginForm] = useState(false);
	const [hideAdminBar, setHideAdminBar] = useState(false);
	const [randomTaglineEnabled, setRandomTaglineEnabled] = useState(false);
	const [randomTaglineList, setRandomTaglineList] = useState('');
	const [redirectOnLogin, setRedirectOnLogin] = useState(false);
	const [redirectOnLoginTarget, setRedirectOnLoginTarget] = useState('');

	const [isDirty, setIsDirty] = useState(false);
    const initialSettingsRef = useRef(null);

	const { createSuccessNotice, createErrorNotice } = useDispatch( noticesStore );
	
	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
			setCleanupWpCrud( settings.furious_tools.cleanup_wp_crud || false );
			setAddCustomCrud( settings.furious_tools.add_custom_crud || false );
			setCustomCrud( settings.furious_tools.custom_crud || '' );
			setLatestJquery( settings.furious_tools.latest_jquery || false );
			setRemoveJqueryMigrate( settings.furious_tools.remove_jquery_migrate || false );
			setTrackUserLastLogin( settings.furious_tools.track_user_last_login || false );
			setSearchSlug( settings.furious_tools.search_slug || false );
			setCustomReadmore( settings.furious_tools.custom_readmore || false );
			setCustomReadmoreText( settings.furious_tools.custom_readmore_text || '' );
			setBypassHttpValidateUrl( settings.furious_tools.bypass_http_validate_url || false );
			setRemoveAttWidth( settings.furious_tools.remove_att_width || false );
			setStyleOutboundLinks( settings.furious_tools.style_outbound_links || false );
			setStyleOutboundLinksOnlyInContent( settings.furious_tools.style_outbound_links_only_in_content || false );
			setSnapScrolling( settings.furious_tools.snap_scrolling || false );
			setSnapScrollingForceFullPages( settings.furious_tools.snap_scrolling_force_full_pages || false );
			setSmoothScrolling( settings.furious_tools.smooth_scrolling || false );
			setSkipHomepageEnabled( settings.furious_tools.skip_homepage_enabled || false );
			setSkipHomepageShowonce( settings.furious_tools.skip_homepage_showonce || false );
			setSkipHomepageTarget( settings.furious_tools.skip_homepage_target || '' );
			setHideLoginForm( settings.furious_tools.hide_login_form || false );
			setHideAdminBar( settings.furious_tools.hide_admin_bar || false );
			setRandomTaglineEnabled( settings.furious_tools.random_tagline_enabled || false );
			setRandomTaglineList( settings.furious_tools.random_tagline_list || '' );
			setRedirectOnLogin( settings.furious_tools.redirect_on_login || false );
			setRedirectOnLoginTarget( settings.furious_tools.redirect_on_login_target || '' );

			// Capture initial loaded settings for dirty checking
			initialSettingsRef.current = {
				cleanup_wp_crud: settings.furious_tools.cleanup_wp_crud || false,
				add_custom_crud: settings.furious_tools.add_custom_crud || false,
				custom_crud: settings.furious_tools.custom_crud || '',
				latest_jquery: settings.furious_tools.latest_jquery || false,
				remove_jquery_migrate: settings.furious_tools.remove_jquery_migrate || false,
				track_user_last_login: settings.furious_tools.track_user_last_login || false,
				search_slug: settings.furious_tools.search_slug || false,
				custom_readmore: settings.furious_tools.custom_readmore || false,
				custom_readmore_text: settings.furious_tools.custom_readmore_text || '',
				bypass_http_validate_url: settings.furious_tools.bypass_http_validate_url || false,
				remove_att_width: settings.furious_tools.remove_att_width || false,
				style_outbound_links: settings.furious_tools.style_outbound_links || false,
				style_outbound_links_only_in_content: settings.furious_tools.style_outbound_links_only_in_content || false,
				snap_scrolling: settings.furious_tools.snap_scrolling || false,
				snap_scrolling_force_full_pages: settings.furious_tools.snap_scrolling_force_full_pages || false,
				smooth_scrolling: settings.furious_tools.smooth_scrolling || false,
				skip_homepage: settings.furious_tools.skip_homepage || false,
				skip_homepage_showonce: settings.furious_tools.skip_homepage_showonce || false,
				skip_homepage_target: settings.furious_tools.skip_homepage_target || '',
				hide_login_form: settings.furious_tools.hide_login_form || false,
				hide_admin_bar: settings.furious_tools.hide_admin_bar || false,
				random_tagline: settings.furious_tools.random_tagline || false,
				random_tagline_list: settings.furious_tools.random_tagline_list || '',
				redirect_on_login: settings.furious_tools.redirect_on_login || false,
				redirect_on_login_target: settings.furious_tools.redirect_on_login_target || '',
			};
		});
	}, [] );

	// mark dirty when current values differ from initial snapshot
    useEffect( () => {
        if (!initialSettingsRef.current) {
            return;
        }
        const current = {
            cleanup_wp_crud: cleanupWpCrud,
            add_custom_crud: addCustomCrud,
            custom_crud: customCrud,
            latest_jquery: latestJquery,
            remove_jquery_migrate: removeJqueryMigrate,
            track_user_last_login: trackUserLastLogin,
            search_slug: searchSlug,
            custom_readmore: customReadmore,
            custom_readmore_text: customReadmoreText,
            bypass_http_validate_url: bypassHttpValidateUrl,
            remove_att_width: removeAttWidth,
            style_outbound_links: styleOutboundLinks,
            style_outbound_links_only_in_content: styleOutboundLinksOnlyInContent,
            snap_scrolling: snapScrolling,
			snap_scrolling_force_full_pages: snapScrollingForceFullPages,
            smooth_scrolling: smoothScrolling,
            skip_homepage: skipHomepageEnabled,
            skip_homepage_showonce: skipHomepageShowonce,
            skip_homepage_target: skipHomepageTarget,
            hide_login_form: hideLoginForm,
            hide_admin_bar: hideAdminBar,
            random_tagline: randomTaglineEnabled,
            random_tagline_list: randomTaglineList,
            redirect_on_login: redirectOnLogin,
            redirect_on_login_target: redirectOnLoginTarget,
        };

        // simple shallow comparison via JSON; adequate for primitive values here
        const dirty = JSON.stringify(current) !== JSON.stringify(initialSettingsRef.current);
        setIsDirty(dirty);
    }, [
        cleanupWpCrud,
        addCustomCrud,
        customCrud,
        latestJquery,
        removeJqueryMigrate,
        trackUserLastLogin,
        searchSlug,
        customReadmore,
        customReadmoreText,
        bypassHttpValidateUrl,
        removeAttWidth,
        styleOutboundLinks,
        styleOutboundLinksOnlyInContent,
        snapScrolling,
		snapScrollingForceFullPages,
        smoothScrolling,
        skipHomepageEnabled,
        skipHomepageShowonce,
        skipHomepageTarget,
        hideLoginForm,
        hideAdminBar,
        randomTaglineEnabled,
        randomTaglineList,
        redirectOnLogin,
        redirectOnLoginTarget
    ] );

	const saveSettings = () => {
		// TODO: Add validation as needed for empty text fields when their parent setting is enabled

		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: {
				furious_tools: {
					cleanup_wp_crud: cleanupWpCrud,
					add_custom_crud: addCustomCrud,
					custom_crud: customCrud,
					latest_jquery: latestJquery,
					remove_jquery_migrate: removeJqueryMigrate,
					track_user_last_login: trackUserLastLogin,
					search_slug: searchSlug,
					custom_readmore: customReadmore,
					custom_readmore_text: customReadmoreText,
					bypass_http_validate_url: bypassHttpValidateUrl,
					remove_att_width: removeAttWidth,
					style_outbound_links: styleOutboundLinks,
					style_outbound_links_only_in_content: styleOutboundLinksOnlyInContent,
					snap_scrolling: snapScrolling,
					snap_scrolling_force_full_pages: snapScrollingForceFullPages,
					smooth_scrolling: smoothScrolling,
					skip_homepage: skipHomepageEnabled,
					skip_homepage_showonce: skipHomepageShowonce,
					skip_homepage_target: skipHomepageTarget,
					hide_login_form: hideLoginForm,
					hide_admin_bar: hideAdminBar,
					random_tagline: randomTaglineEnabled,
					random_tagline_list: randomTaglineList,
					redirect_on_login: redirectOnLogin,
					redirect_on_login_target: redirectOnLoginTarget
				}
			}
		} ).then( () => {
			if (initialSettingsRef.current) {
                initialSettingsRef.current = JSON.parse( JSON.stringify({
                    cleanup_wp_crud: cleanupWpCrud,
                    add_custom_crud: addCustomCrud,
                    custom_crud: customCrud,
                    latest_jquery: latestJquery,
                    remove_jquery_migrate: removeJqueryMigrate,
                    track_user_last_login: trackUserLastLogin,
                    search_slug: searchSlug,
                    custom_readmore: customReadmore,
                    custom_readmore_text: customReadmoreText,
                    bypass_http_validate_url: bypassHttpValidateUrl,
                    remove_att_width: removeAttWidth,
                    style_outbound_links: styleOutboundLinks,
                    style_outbound_links_only_in_content: styleOutboundLinksOnlyInContent,
                    snap_scrolling: snapScrolling,
					snap_scrolling_force_full_pages: snapScrollingForceFullPages,
                    smooth_scrolling: smoothScrolling,
                    skip_homepage: skipHomepageEnabled,
                    skip_homepage_showonce: skipHomepageShowonce,
                    skip_homepage_target: skipHomepageTarget,
                    hide_login_form: hideLoginForm,
                    hide_admin_bar: hideAdminBar,
                    random_tagline: randomTaglineEnabled,
                    random_tagline_list: randomTaglineList,
                    redirect_on_login: redirectOnLogin,
                    redirect_on_login_target: redirectOnLoginTarget,
                } ) );
            }
            setIsDirty(false);

			createSuccessNotice( 'Settings saved successfully.', { type: 'snackbar' } );
		} ).catch( () => {
			createErrorNotice( 'Error saving settings.', { type: 'snackbar' } );
		} );
	};

	return {
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
		hideAdminBar,
		setHideAdminBar,
		randomTaglineEnabled,
		setRandomTaglineEnabled,
		randomTaglineList,
		setRandomTaglineList,
		saveSettings,
		isDirty
	};
};

export default useSettings;