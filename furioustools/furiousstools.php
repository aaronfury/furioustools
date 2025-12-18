<?php
	/*
	Plugin Name:  Furious Tools
	Plugin URI:   https://github.com/aaronfury/furioustools
	Description:  This plugin offers an assortment of lightweight customization options used by Furious Studios.
	Version:      1.0.20251218
	Requires at least: 6.2
	Tested up to: 6.9
	Requires PHP: 7.2
	Author:       Aaron Firouz
	License:      Creative Commons Zero
	License URI:  https://creativecommons.org/publicdomain/zero/1.0/
	Text Domain:  furioustools
	*/

// TODO: Debugging shortcut... make sure these are commented out in the production site
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// ini_set('log_errors','Off');
// ini_set('error_log','php-errors.log');
// error_reporting(E_ALL);

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
}
?>