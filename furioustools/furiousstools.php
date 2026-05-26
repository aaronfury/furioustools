<?php
	/*
	Plugin Name:  Furious Tools
	Plugin URI:   https://github.com/aaronfury/furioustools
	Description:  This plugin offers an assortment of lightweight customization options for user experience and site functionality.
	Version:      1.0.20260526
	Requires at least: 6.2
	Tested up to: 7.0
	Requires PHP: 7.2
	Author:       Aaron Eff
	License:      CC0-1.0
	License URI:  https://creativecommons.org/publicdomain/zero/1.0/
	Text Domain:  furioustools
	*/

if (!defined('ABSPATH')) {exit;}

spl_autoload_register('furioustools_autoloader');

function furioustools_autoloader($class_name) {
	if (false !== strpos($class_name, 'FuriousTools')) {
		$classes_dir = realpath(plugin_dir_path( __FILE__ )) . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR;
		$class_file = str_replace('\\', DIRECTORY_SEPARATOR, $class_name) . '.php';
		require_once $classes_dir . $class_file;
	}
}

add_action('plugins_loaded', 'furioustools_init');

function furioustools_init() {
	new FuriousTools\Settings(); // The Settings class registers the options, so it should be loaded first
	new FuriousTools\Plugin();
	if ( !empty( furioustools_preg_grep_keys( '/^furious_(?!tools)/',wp_load_alloptions() ) ) ) {
		new FuriousTools\Migrator();
	}

	add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'furioustools_add_settings_link');
}

function furioustools_preg_grep_keys($pattern, $input, $flags = 0) {
    return array_intersect_key($input, array_flip(preg_grep($pattern, array_keys($input), $flags)));
}

function furioustools_add_settings_link($links) {
	$settings_link = '<a href="' . admin_url('options-general.php?page=furious-tools') . '">Settings</a>';
	array_unshift($links, $settings_link);
	return $links;
}

?>