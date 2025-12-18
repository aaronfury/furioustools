<?php

namespace FuriousTools;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

class Settings {
	public static $defaults = [
		'cleanup_wp_crud' => false,
		'add_custom_crud' => false,
		'custom_crud' => '',
		'latest_jquery' => false,
		'remove_jquery_migrate' => false,
		'track_user_last_login' => false,
		'search_slug' => false,
		'custom_readmore' => false,
		'custom_readmore_text' => '',
		'bypass_http_validate_url' => false,
		'remove_att_width' => false,
		'style_outbound_links' => false,
		'style_outbound_links_only_in_content' => false,
		'snap_scrolling' => false,
		'snap_scrolling_force_full_pages' => false,
		'smooth_scrolling' => false,
		'skip_homepage' => false,
		'skip_homepage_showonce' => false,
		'skip_homepage_target' => '',
		'random_tagline' => false,
		'random_tagline_list' => '',
		'hide_login_form' => false,
		'hide_admin_bar' => false,
		'redirect_on_login' => false,
		'redirect_on_login_target' => '',
	];

	public function __construct() {
		add_action('init', [$this, 'register_settings']);
		//add_action('rest_api_init', [$this, 'register_settings']);
		add_action('admin_menu', [$this, 'add_plugin_page']);
		add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
	}

	public function register_settings() {

		$schema = [
			'type' => 'object',
			'properties' => [
				'cleanup_wp_crud' => ['type' => 'boolean'],
				'add_custom_crud' => ['type' => 'boolean'],
				'custom_crud' => ['type' => 'string'],
				'latest_jquery' => ['type' => 'boolean'],
				'remove_jquery_migrate' => ['type' => 'boolean'],
				'track_user_last_login' => ['type' => 'boolean'],
				'search_slug' => ['type' => 'boolean'],
				'custom_readmore' => ['type' => 'boolean'],
				'custom_readmore_text' => ['type' => 'string'],
				'bypass_http_validate_url' => ['type' => 'boolean'],
				'remove_att_width' => ['type' => 'boolean'],
				'style_outbound_links' => ['type' => 'boolean'],
				'style_outbound_links_only_in_content' => ['type' => 'boolean'],
				'snap_scrolling' => ['type' => 'boolean'],
				'snap_scrolling_force_full_pages' => ['type' => 'boolean'],
				'smooth_scrolling' => ['type' => 'boolean'],
				'skip_homepage' => ['type' => 'boolean'],
				'skip_homepage_showonce' => ['type' => 'boolean'],
				'skip_homepage_target' => ['type' => 'string'],
				'random_tagline' => ['type' => 'boolean'],
				'random_tagline_list' => ['type' => 'string'],
				'hide_login_form' => ['type' => 'boolean'],
				'hide_admin_bar' => ['type' => 'boolean'],
				'redirect_on_login' => ['type' => 'boolean'],
				'redirect_on_login_target' => ['type' => 'string'],
			],
		];
		
		register_setting(
			'options',
			'furious_tools',
			[
				'type' => 'object',
				'default' => $this::$defaults,
				'show_in_rest' => ['schema' => $schema],
			]
		);
	}

	public function add_plugin_page() {
		add_options_page(
			'Furious Tools', // page_title
			'Furious Tools', // menu_title
			'manage_options', // capability
			'furious-tools', // menu_slug
			[$this, 'create_admin_page'], // function
			99 // position
		);
	}

	public function create_admin_page() {
		echo '<div id="furious-tools-settings-root"></div>';
	}

	public function enqueue_scripts($admin_page) {
		if ('settings_page_furious-tools' !== $admin_page) {
			return;
		}

		$asset_file = include(plugin_dir_path(__FILE__) . '../../settings/build/index.asset.php');

		wp_enqueue_script(
			'furious-tools-settings-script',
			plugins_url('../../settings/build/index.js', __FILE__),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_enqueue_style(
			'furious-tools-settings-style',
			plugins_url('../../settings/build/index.css', __FILE__),
			array_filter(
				$asset_file['dependencies'],
				function ($style) {
					return wp_style_is($style, 'registered');
				}
			),
			$asset_file['version']
		);
	}
}

?>