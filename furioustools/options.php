<?php

class Furious_Tools_Settings {
	public function __construct() {
		add_action('admin_init', [$this, 'furious_tools_page_init']);
		add_action('admin_menu', [$this, 'furious_tools_add_plugin_page']);

		if (get_option('furious_track_user_last_login')) {
			add_filter('manage_users_columns', [$this, 'add_last_login_column']);
			add_filter('manage_users_sortable_columns', [$this, 'add_last_login_sortable_column']);
			add_filter('manage_users_custom_column', [$this, 'add_custom_last_login_column'], 10, 3);
			add_action('pre_get_users', [$this, 'sort_by_last_login']);
		}
	}

	public function furious_tools_add_plugin_page() {
		add_menu_page(
			'Furious Tools', // page_title
			'Furious Tools', // menu_title
			'manage_options', // capability
			'furious-tools', // menu_slug
			array($this, 'furious_tools_create_admin_page'), // function
			'dashicons-lightbulb' // icon_url
		);
	}

	public function furious_tools_create_admin_page() {
?>
		<div class="wrap">
			<h2>Furious Tools</h2>
			<?php settings_errors(); ?>
			<form method="POST" action="options.php">
				<?php
					settings_fields('furious-tools');
					do_settings_sections('furious-tools');
					submit_button();
				?>
			</form>
		</div>
<?php
	}

	public function furious_tools_page_init() {
		$plugin_settings = array(
			// setting_id, setting_type, setting_name, section
			[ 'cleanup_wp_crud', 'boolean', 'Cleanup WordPress crud', 'head' ],
			[ 'add_custom_crud', 'boolean', 'Add custom crud', 'head' ],
			[ 'custom_crud', 'string', 'Custom crud to add', 'head' ],
			[ 'latest_jquery', 'boolean', 'Force latest jQuery version', 'misc' ],
			[ 'remove_jquery_migrate', 'boolean', 'Remove jQuery Migrate', 'misc' ],
			[ 'track_user_last_login', 'boolean', 'Track User Last Login', 'misc' ],
			[ 'search_slug', 'boolean', 'Show search results under "/search" slug', 'misc' ],
			[ 'custom_readmore_enabled', 'boolean', 'Custom "Read more ..." text', 'misc' ],
			[ 'custom_readmore_text', 'string', 'Replace "Read more ..." with', 'misc' ],
			[ 'bypass_http_validate_url', 'boolean', 'Bypass URL IP validation', 'misc' ],
			[ 'remove_att_width', 'boolean', 'Remove hard-coded width on attachment containers in posts', 'styling' ],
			[ 'style_outbound_links', 'boolean', 'Style outbound links with an icon', 'styling' ],
			[ 'style_outbound_links_only_in_content', 'boolean', 'Style outbound links with an icon only in the content section', 'styling' ],
			[ 'enable_snap_scrolling', 'boolean', 'Enable snap scrolling', 'styling' ],
			[ 'enable_smooth_scrolling', 'boolean', 'Enable smooth scrolling', 'styling' ],
			[ 'skip_homepage_enabled', 'boolean', 'Skip the home page', 'skip_homepage' ],
			[ 'skip_homepage_showonce', 'boolean', 'Show the home page once', 'skip_homepage' ],
			[ 'skip_homepage_target', 'string', 'Redirect to this page when homepage is skipped', 'skip_homepage' ],
			[ 'redirect_on_login', 'boolean', 'Redirect users to a page other than the WP Admin console when they log in', 'redirect_on_login' ],
			[ 'redirect_on_login_target', 'string', 'Redirect to this page', 'redirect_on_login' ],
			[ 'hide_login_form', 'boolean', 'Hide the WordPress username/password login', 'hide_login_form' ],
			[ 'hide_admin_bar', 'array', 'Hide the WP Admin Bar for the following roles', 'hide_admin_bar' ],
			[ 'random_tagline_enabled', 'boolean', 'Pick a random tagline each time a page is loaded', 'random_tagline' ],
			[ 'random_tagline_list', 'array', 'List of random taglines', 'random_tagline' ]
		);
		
		add_settings_section(
			'furious_tools_skip_homepage_section', // id
			'Skip Home Page', // title
			null, // callback
			'furious-tools' // page
		);
		add_settings_section(
			'furious_tools_redirect_on_login_section', // id
			'Redirect on Login', // title
			null, // callback
			'furious-tools' // page
		);
		add_settings_section(
			'furious_tools_hide_login_form_section', // id
			'Hide Login Form', // title
			null, // callback
			'furious-tools' // page
		);
		add_settings_section(
			'furious_tools_hide_admin_bar_section', // id
			'Hide Admin Bar', // title
			null, // callback
			'furious-tools' // page
		);
		add_settings_section(
			'furious_tools_random_tagline_section', // id
			'Tagline Randomizer', // title
			null, // callback
			'furious-tools' // page
		);
		add_settings_section(
			'furious_tools_head_section', // id
			'Page Head Setings', // title
			null, // callback
			'furious-tools' // page
		);
		add_settings_section(
			'furious_tools_styling_section', // id
			'Styling Settings', // title
			null, // callback
			'furious-tools' // page
		);
		add_settings_section(
			'furious_tools_misc_section', // id
			'Miscellaneous Settings', // title
			null, // callback
			'furious-tools' // page
		);
		
		foreach ($plugin_settings as $setting) {
			register_setting(
				'furious-tools', // option_group
				'furious_' . $setting[0], // option_name
				[
					'type' => $setting[1],
				]
			);

			add_settings_field(
				'furious_' . $setting[0], // id
				$setting[2], // title
				array($this, $setting[0] . '_callback'), // callback
				'furious-tools', // page
				'furious_tools_' . $setting[3] . '_section' // section
			);
		}
	}

	function add_last_login_column($columns) {
		$columns['last_login'] = 'Last Login';
		return $columns;
	}

	function add_last_login_sortable_column($columns) {
		$columns['last_login'] = 'last_login';
		return $columns;
	}

	function add_custom_last_login_column($value, $column_name, $user_id) {
		if ('last_login' == $column_name) {
			$last_login = get_user_meta($user_id, 'last_login', true);
			if ($last_login) {
				$value = date('Y-m-d H:i:s', $last_login) . '<br /><em>' . human_time_diff($last_login) . ' ago</em>';
			} else {
				$value = 'Never';
			}
		}
		return $value;
	}

	function sort_by_last_login($query) {
		if (!is_admin()) return;

		if ('last_login' == $query->get('orderby')) {
			$query->set('meta_key', 'last_login');
			$query->set('meta_type', 'DATETIME');
			$query->set('orderby', 'meta_value');
		}
	}

	function furious_tools_sanitize($input) {
		return $input;
	}

	function furious_tools_section_info() {
		
	}

	function cleanup_wp_crud_callback() {
?>
		<input type="checkbox" name="furious_cleanup_wp_crud" id="furious_cleanup_wp_crud" value="1" <?php checked(get_option('furious_cleanup_wp_crud')); ?> > <label for="furious_cleanup_wp_crud">This option removes some unnecessary things from the wp_head() function.</label>
<?php
	}

	function add_custom_crud_callback() {
?>
		<input type="checkbox" name="furious_add_custom_crud" id="furious_add_custom_crud" value="1" <?php checked(get_option('furious_add_custom_crud')); ?> > <label for="furious_add_custom_crud">Add your own data to the <code>&lt;head&gt;</code> section. Useful for like Graph metadata or other things your theme doesn't provide.</label>
<?php
	}

	function custom_crud_callback() {
?>
		<label for="furious_custom_crud">The text below will be inserted directly into the <code>&lt;head&gt;</code> section of every page. Don't break nuffin'.</label><br />
		<?php wp_editor(get_option('furious_custom_crud'),"furious_custom_crud", [
			"wpautop" => false,
			"media_buttons" => false,
			"tinymce" => false,
			"quicktags" => false,
			"teeny" => true,
			"textarea_rows" => 10
		]); ?>
<?php
	}

	function latest_jquery_callback() {
?>
		<input type="checkbox" name="furious_latest_jquery" id="furious_latest_jquery" value="1" <?php checked(get_option('furious_latest_jquery')); ?> > <label for="furious_latest_jquery">Enable this option to unload the default version of jQuery included in WordPress and replace it with the latest version (currently 3.7.1).</label>
<?php
	}

	function remove_jquery_migrate_callback() {
?>
		<input type="checkbox" name="furious_remove_jquery_migrate" id="furious_remove_jquery_migrate" value="1" <?php checked(get_option('furious_remove_jquery_migrate')); ?> > <label for="furious_remove_jquery_migrate">Enable this option to prevent loading jQuery Migrate, which is a shim to support (very) old versions of jQuery.</label>
<?php
	}

	function track_user_last_login_callback() {
?>
		<input type="checkbox" name="furious_track_user_last_login" id="furious_track_user_last_login" value="1" <?php checked(get_option('furious_track_user_last_login')); ?> > <label for="furious_track_user_last_login">Enable this option to track the last time a user logged in. This information is displayed in the Users list, and can also be accessed using <code>get_user_meta($user_id, 'last_login', true)</code>.</label>
<?php
	}

	function search_slug_callback() {
?>
		<input type="checkbox" name="furious_search_slug" id="furious_search_slug" value="1" <?php checked(get_option('furious_search_slug')); ?> > <label for="furious_search_slug">This option rewrites the search results page to look like "<em><?php site_url(); ?><strong>/search/</strong>search+query</em>"</label>
<?php
	}
	
	function custom_readmore_enabled_callback() {
?>
		<input type="checkbox" name="furious_custom_readmore_enabled" id="furious_custom_readmore_enabled" value="1" <?php checked(get_option('furious_custom_readmore_enabled')); ?> > <label for="furious_replace_readmore_text">Enable this option to replace the "Read more..." at the end of excerpts with the custom text you provide below.</label>
<?php
	}
	
	function custom_readmore_text_callback() {
		?>
		<input class="regular-text" type="text" name="furious_custom_readmore_text" id="furious_custom_readmore_text" value="<?= get_option('furious_custom_readmore_text', '&hellip;'); ?>" placeholder="The default is &amp;hellip; (&hellip;)">
<?php
	}
	
	function bypass_http_validate_url_callback() {
?>
		<input type="checkbox" name="furious_bypass_http_validate_url" id="furious_bypass_http_validate_url" value="1" <?php checked(get_option('furious_bypass_http_validate_url')); ?> > <label for="furious_bypass_http_validate_url">Disables the built-in check that a request is not coming from the localhost. This is a useful security feature and should only be temporarily bypassed for specific situations, such as same-host site import/export.</label>
<?php
	}

	function remove_att_width_callback() {
?>
		<input type="checkbox" name="furious_remove_att_width" id="furious_remove_att_width" value="1" <?php checked(get_option('furious_remove_att_width')); ?> > <label for="furious_remove_att_width">For images and other blocks added in the editor, WordPress automatically sets a fixed-with value on the item in the DOM. This will remove that value.</label>
<?php
	}

	function style_outbound_links_callback() {
?>
		<input type="checkbox" name="furious_style_outbound_links" id="furious_style_outbound_links" value="1" <?php checked(get_option('furious_style_outbound_links')); ?> > <label for="furious_style_outbound_links">If a link (&lt;a&gt;) has an <em>href</em> value that links to an external website, apply specific styling to it.</label>
		<p><cite>This option adds a simple trailing icon to external links. To customize your styling, use the "Additional CSS" feature of your theme instead.</cite></p>
<?php
	}

	function style_outbound_links_only_in_content_callback() {
?>
		<input type="checkbox" name="furious_style_outbound_links_only_in_content" id="furious_style_outbound_links_only_in_content" value="1" <?php checked(get_option('furious_style_outbound_links_only_in_content')); ?> > <label for="furious_style_outbound_links_only_in_content">Only add the external link icon to links in the post/page content.</label>
		<p><cite>If this setting is enabled, external links in your header, footer, or theme templates won't be styled.</cite></p>
<?php
	}

	function enable_snap_scrolling_callback() {
?>
		<input type="checkbox" name="furious_enable_snap_scrolling" id="furious_enable_snap_scrolling" value="1" <?php checked(get_option('furious_enable_snap_scrolling')); ?> > <label for="furious_enable_snap_scrolling">Enable "snap" scrolling</label>
		<p><cite>If this setting is enabled, external links in your header, footer, or theme templates won't be styled.</cite></p>
<?php
	}

	function skip_homepage_enabled_callback() {
?>
		<input type="checkbox" name="furious_skip_homepage_enabled" id="furious_skip_homepage_enabled" value="1" <?php checked(get_option('furious_skip_homepage_enabled')); ?> > <label for="furious_skip_homepage_enabled">Uses a small cookie and Javascript to skip the home page and automatically redirect the visitor to a different page</label>
<?php
	}
	
	function skip_homepage_showonce_callback() {
?>
		<input type="checkbox" name="furious_skip_homepage_showonce" id="furious_skip_homepage_showonce" value="1" <?php checked(get_option('furious_skip_homepage_showonce')); ?> > <label for="furious_skip_homepage_showonce">If "Skip homepage" is enabled, enabling this will show the front page once, then skip on subsequent visits. If this setting is disabled, the front page will never be shown. This setting uses a client-side cookie; if the user has disabled cookies or clears their browser cache, the front page will be shown again.</label>
<?php
	}

	function skip_homepage_target_callback() {
		wp_dropdown_pages(
			array(
				'selected' => get_option('furious_skip_homepage_target'),
				'id' => 'furious_skip_homepage_target',
				'name' => 'furious_skip_homepage_target'
			)
		);
	}

	function redirect_on_login_callback() {
?>
		<input type="checkbox" name="furious_redirect_on_login" id="furious_redirect_on_login" value="1" <?php checked(get_option('furious_redirect_on_login')); ?> > <label for="furious_redirect_on_login">When users log in, redirect them to a page other than the WordPress Admin Dashboard</label>
<?php
	}

	function redirect_on_login_target_callback() {
?>
		<input class="regular-text" type="text" name="furious_redirect_on_login_target" id="furious_redirect_on_login_target" value="<?= get_option('furious_redirect_on_login_target', ''); ?>" placeholder="Leave blank to redirect to the homepage">
		<p><cite>Relative URLs are accepted (e.g. "/blog"). Leave blank to redirect to the homepage.</cite></p>
<?php
	}

	function hide_admin_bar_callback() {
		global $wp_roles;
		$roles = $wp_roles->get_names();

		$hide_bar_for_roles = wp_parse_args(get_option('furious_hide_admin_bar', []));
		foreach ($roles as $role=>$name) {
?>
		<div>
			<label>
				<input type="checkbox" name="furious_hide_admin_bar[]" id="<?= $role; ?>" value="<?= $role; ?>" <?php checked(in_array($role, $hide_bar_for_roles)); ?>>
				<?= $name; ?>
			</label>
		</div>
<?php
		}
	}

	function hide_login_form_callback() {
?>
		<input type="checkbox" name="furious_hide_login_form" id="furious_hide_login_form" value="1" <?php checked(get_option('furious_hide_login_form')); ?> > <label for="furious_hide_login_form">Hide the standard username/password form on the WordPress login page. Useful if you want to enforce SSO via a different plugin.</label>
		<p><cite>To override this setting and show the form, load your wp-login URL with the "showloginform" paramater (e.g. "<?= wp_login_url();?>?showloginform")</cite></p>
<?php
	}

	function random_tagline_enabled_callback() {
?>
		<input type="checkbox" name="furious_random_tagline_enabled" id="furious_random_tagline_enabled" value="1" <?php checked(get_option('furious_random_tagline_enabled')); ?> > <label for="furious_random_tagline_enabled">Each time a page is loaded, the <code>get_bloginfo('description')</code> code will return one of the values specified below.</label>
<?php
	}

	function random_tagline_list_callback() {
?>
		<label for="furious_random_tagline_list">Separate taglines with a line break (ENTER or RETURN key)</label><br />
		<?php wp_editor(get_option('furious_random_tagline_list'),"furious_random_tagline_list", [
			"wpautop" => false,
			"media_buttons" => false,
			"tinymce" => false,
			"quicktags" => false,
			"teeny" => true,
			"textarea_rows" => 5
		]); ?>
<?php
	}
}

new Furious_Tools_Settings();

?>