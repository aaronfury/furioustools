<?php
namespace FuriousTools;

use WP_REST_Request;

class Migrator {
	private $old_options;
	private $new_options;
	private $options_map = [
		'furious_add_custom_crud' => 'add_custom_crud',
		'furious_bypass_http_validate_url' => 'bypass_http_validate_url',
		'furious_cleanup_wp_crud' => 'cleanup_wp_crud',
		'furious_custom_crud' => 'custom_crud',
		'furious_custom_readmore_text' => 'custom_readmore_text',
		'furious_custom_readmore_enabled' => 'custom_readmore',
		'furious_hide_admin_bar' => 'hide_admin_bar',
		'furious_hide_login_form' => 'hide_login_form',
		'furious_latest_jquery' => 'latest_jquery',
		'furious_random_tagline_enabled' => 'random_tagline',
		'furious_random_tagline_list' => 'random_tagline_list',
		'furious_redirect_login_target' => 'redirect_login_target',
		'furious_redirect_on_login' => 'redirect_on_login',
		'furious_remove_att_width' => 'remove_att_width',
		'furious_remove_jquery_migrate' => 'remove_jquery_migrate',
		'furious_search_slug' => 'search_slug',
		'furious_skip_homepage_enabled' => 'skip_homepage',
		'furious_skip_homepage_showonce' => 'skip_homepage_showonce',
		'furious_skip_homepage_target' => 'skip_homepage_target',
		'furious_style_outbound_links' => 'style_outbound_links',
		'furious_track_user_last_login' => 'track_user_last_login',
	];

	function __construct() {
		$this->old_options = get_options([
			'furious_add_custom_crud',
			'furious_bypass_http_validate_url',
			'furious_cleanup_wp_crud',
			'furious_custom_crud',
			'furious_custom_readmore_text',
			'furious_custom_readmore_enabled',
			'furious_hide_admin_bar',
			'furious_hide_login_form',
			'furious_latest_jquery',
			'furious_random_tagline_enabled',
			'furious_random_tagline_list',
			'furious_redirect_login_target',
			'furious_redirect_on_login',
			'furious_remove_att_width',
			'furious_remove_jquery_migrate',
			'furious_search_slug',
			'furious_skip_homepage_enabled',
			'furious_skip_homepage_showonce',
			'furious_skip_homepage_target',
			'furious_style_outbound_links',
			'furious_track_user_last_login',
		]);

		$this->new_options = Settings::$defaults;

		add_action('init', [$this, 'migrate_options']);
	}

	public function migrate_options() {
		foreach ($this->options_map as $old_key => $new_key) {
			if (isset($this->old_options[$old_key]) && (!empty($this->old_options[$old_key]))) {
				$this->new_options[$new_key] = $this->old_options[$old_key];
			}
		}

		update_option('furious_tools', $this->new_options);

		$this->cleanup_old_options();
	}

	private function cleanup_old_options() {
		foreach (array_keys($this->options_map) as $old_key) {
			delete_option($old_key);
		}
	}
}

?>