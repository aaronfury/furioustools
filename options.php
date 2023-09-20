<?php

class Furious_Features_Settings {
	public function __construct() {
		add_action( 'admin_init', array( $this, 'furious_features_page_init' ) );
		add_action( 'admin_menu', array( $this, 'furious_features_add_plugin_page' ) );
	}

	public function furious_features_add_plugin_page() {
		add_menu_page(
			'Furious Features', // page_title
			'Furious Features', // menu_title
			'manage_options', // capability
			'furious-features', // menu_slug
			array( $this, 'furious_features_create_admin_page' ), // function
			'dashicons-lightbulb' // icon_url
		);
	}

	public function furious_features_create_admin_page() {
?>
		<div class="wrap">
			<h2>Furious Features</h2>
			<?php settings_errors(); ?>

			<form method="POST" action="options.php">
				<?php
					settings_fields( 'furious-features' );
					do_settings_sections( 'furious-features' );
					submit_button();
				?>
			</form>
		</div>
<?php
	}

	public function furious_features_page_init() {
		$plugin_settings = array(
			// setting_id, setting_name, section
			[ 'cleanup_wp_crud', 'boolean', 'Cleanup WordPress crud', 'misc' ],
			[ 'remove_wp_emoji', 'boolean', 'Remove wp_emoji completely', 'misc' ],
			[ 'latest_jquery', 'boolean', 'Force latest jQuery version', 'misc' ],
			[ 'search_slug', 'boolean', 'Show search results under "/search" slug', 'misc' ],
			[ 'custom_readmore_enabled', 'boolean', 'Custom "Read more ..." text', 'misc' ],
			[ 'custom_readmore_text', 'string', 'Replace "Read more ..." with', 'misc' ],
			[ 'bypass_http_validate_url', 'boolean', 'Bypass URL IP validation', 'misc' ],
			[ 'remove_att_width', 'boolean', 'Remove hard-coded width on attachment containers in posts', 'misc' ],
			[ 'skip_homepage_enabled', 'boolean', 'Skip the home page', 'skip_homepage' ],
			[ 'skip_homepage_showonce', 'boolean', 'Show the home page once', 'skip_homepage' ],
			[ 'skip_homepage_target', 'string', 'Redirect to this page when homepage is skipped', 'skip_homepage' ],
			[ 'random_tagline_enabled', 'boolean', 'Pick a random tagline each time a page is loaded', 'random_tagline' ],
			[ 'random_tagline_list', 'array', 'List of random taglines', 'random_tagline' ]
		);
		
		add_settings_section(
			'furious_features_skip_homepage_section', // id
			'Skip Home Page', // title
			$null, // callback
			'furious-features' // page
		);
		add_settings_section(
			'furious_features_random_tagline_section', // id
			'Tagline Randomizer', // title
			$null, // callback
			'furious-features' // page
		);
		add_settings_section(
			'furious_features_misc_section', // id
			'Miscellaneous Settings', // title
			$null, // callback
			'furious-features' // page
		);
		
		foreach ( $plugin_settings as $setting ) {
			register_setting(
				'furious-features', // option_group
				'furious_' . $setting[0], // option_name
				array(
					'type' => $setting[1],
				)
			);
			add_settings_field(
				'furious_' . $setting[0], // id
				$setting[2], // title
				array( $this, $setting[0] . '_callback' ), // callback
				'furious-features', // page
				'furious_features_' . $setting[3] . '_section' // section
			);
		}
	}

	public function furious_features_sanitize($input) {
		return $input;
	}

	public function furious_features_section_info() {
		
	}

	public function cleanup_wp_crud_callback() {
?>
		<input type="checkbox" name="furious_cleanup_wp_crud" id="furious_cleanup_wp_crud" value="1" <?php checked( get_option('furious_cleanup_wp_crud') ); ?> > <label for="furious_cleanup_wp_crud">This option removes some unnecessary things from the wp_head() function.</label>
<?php
	}

	public function remove_wp_emoji_callback() {
?>
		<input type="checkbox" name="furious_remove_wp_emoji" id="furious_remove_wp_emoji" value="1" <?php checked( get_option('furious_remove_wp_emoji') ); ?> > <label for="furious_remove_wp_emoji">This option disabled WP Emoji support.</label>
<?php
	}

	public function latest_jquery_callback() {
?>
		<input type="checkbox" name="furious_latest_jquery" id="furious_latest_jquery" value="1" <?php checked( get_option('furious_latest_jquery') ); ?> > <label for="furious_latest_jquery">Enable this option to unload the default version of jQuery included in WordPress and replace it with the latest version.</label>
<?php
	}
	
	public function search_slug_callback() {
?>
		<input type="checkbox" name="furious_search_slug" id="furious_search_slug" value="1" <?php checked( get_option('furious_search_slug') ); ?> > <label for="furious_search_slug">This option rewrites the search results page to look like "<em><?php site_url(); ?><strong>/search/</strong>search+query</em>"</label>
<?php
	}
	
	public function custom_readmore_enabled_callback() {
?>
		<input type="checkbox" name="furious_custom_readmore_enabled" id="furious_custom_readmore_enabled" value="1" <?php checked( get_option('furious_custom_readmore_enabled') ); ?> > <label for="furious_replace_readmore_text">Enable this option to replace the "Read more..." at the end of excerpts with the custom text you provide below.</label>
<?php
	}
	
	public function custom_readmore_text_callback() {
		?>
		<input class="regular-text" type="text" name="furious_custom_readmore_text" id="furious_custom_readmore_text" value="<?= get_option('furious_custom_readmore_text', '&hellip;'); ?>" placeholder="The default is &amp;hellip; (&hellip;)">
<?php
	}
	
	public function bypass_http_validate_url_callback() {
?>
		<input type="checkbox" name="furious_bypass_http_validate_url" id="furious_bypass_http_validate_url" value="1" <?php checked( get_option('furious_bypass_http_validate_url') ); ?> > <label for="furious_bypass_http_validate_url">Disables the built-in check that a request is not coming from the localhost. This is a useful security feature and should only be temporarily bypassed for specific situations, such as same-host site import/export.</label>
<?php
	}

	public function remove_att_width_callback() {
?>
			<input type="checkbox" name="furious_remove_att_width" id="furious_remove_att_width" value="1" <?php checked( get_option('furious_remove_att_width') ); ?> > <label for="furious_remove_att_width">For images and other blocks added in the editor, WordPress automatically sets a fixed-with value on the item in the DOM. This will remove that value.</label>
<?php
	}

	public function skip_homepage_enabled_callback() {
?>
		<input type="checkbox" name="furious_skip_homepage_enabled" id="furious_skip_homepage_enabled" value="1" <?php checked( get_option('furious_skip_homepage_enabled') ); ?> > <label for="furious_skip_homepage_enabled">Uses a small cookie and Javascript to skip the home page and automatically redirect the visitor to a different page</label>
<?php
	}
	
	public function skip_homepage_showonce_callback() {
?>
		<input type="checkbox" name="furious_skip_homepage_showonce" id="furious_skip_homepage_showonce" value="1" <?php checked( get_option('furious_skip_homepage_showonce') ); ?> > <label for="furious_skip_homepage_showonce">If "Skip homepage" is enabled, enabling this will show the front page once, then skip on subsequent visits. If this setting is disabled, the front page will never be shown. This setting uses a client-side cookie; if the user has disabled cookies or clears their browser cache, the front page will be shown again.</label>
<?php
	}

	public function skip_homepage_target_callback() {
		wp_dropdown_pages(
			array(
				'selected' => get_option( 'furious_skip_homepage_target' ),
				'id' => 'furious_skip_homepage_target',
				'name' => 'furious_skip_homepage_target'
			)
		);
	}

	public function random_tagline_enabled_callback() {
?>
		<input type="checkbox" name="furious_random_tagline_enabled" id="furious_random_tagline_enabled" value="1" <?php checked( get_option('furious_random_tagline_enabled') ); ?> > <label for="furious_random_tagline_enabled">Each time a page is loaded, the <pre>get_bloginfo('description')</pre> code will return one of the values specified below.</label>
<?php
	}

	public function random_tagline_list_callback() {
?>
		<label for="furious_random_tagline_list">Separate taglines with a line break (ENTER or RETURN key)</label><br />
		<textarea name="furious_random_tagline_list" id="furious_random_tagline_list"><?= get_option('furious_random_tagline_list',''); ?></textarea>
<?php
	}

}
if ( is_admin() )
	new Furious_Features_Settings();
?>