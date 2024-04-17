<?php
	/*
	Plugin Name:  Furious Tools
	Plugin URI:   https://github.com/aaronfury/furioustools
	Description:  This plugin does some stuff to make WordPress behave the way Furious Studios prefers.
	Version:      1.0.20240322
	Author:       Aaron Firouz
	License:      Creative Commons Zero
	License URI:  https://creativecommons.org/publicdomain/zero/1.0/
	Text Domain:  furioustools
	*/

	class Furious_Tools_Plugin {
		private $custom_readmore_text;
		private $_in_body = false;

		public function __construct() {
			// Enqueue the CSS and JS files for this plugin on the front-end
			if (! is_admin() && get_option('furious_cleanup_wp_crud')) :
				$this->cleanup_wp_crud();
			endif;

			if (get_option('furious_bypass_http_validate_url')) { // No callback really needed for this setting, we'll just set it directly
				add_filter('http_request_host_is_external', '__return_true');
			}

			if (get_option('furious_latest_jquery')) {
				add_action('wp_enqueue_scripts', [$this, 'update_jquery']);
			}
			
			if (get_option('furious_remove_jquery_migrate')) {
				add_action('wp_default_scripts', [$this, 'remove_jquery_migrate']);
			}

			if (get_option('furious_track_user_last_login')) {
				add_action('wp_login', [$this, 'update_last_login_timestamp'], 10, 2);
				add_action('user_register', [$this, 'set_default_last_login_timestamp']);
			}

			if (get_option('furious_search_slug')) {
				add_action('template_redirect', [$this, 'search_url_rewrite_rule']);
			}

			if (get_option('furious_custom_readmore_enabled')) {
				$this->custom_readmore_text = get_option('furious_custom_readmore_text', '&ellip;');
				add_filter('excerpt_more', [$this, 'new_excerpt_more']);
			}

			if (get_option('furious_remove_att_width')) {
				add_filter('img_caption_shortcode_width', [$this, 'img_caption_shortcode_width'], 10, 3);
			}

			if (get_option('furious_random_tagline_enabled')) {
				add_action('wp_head', [ $this, 'action_wp_head_finished'], PHP_INT_MAX);
				add_action('wp_footer', [ $this, 'action_wp_footer_started'], 0);
				add_filter('bloginfo', [$this, 'get_random_tagline'], 10, 2);
			}

			if (get_option('furious_redirect_on_login')) {
				add_filter('login_redirect', [$this, 'custom_login_redirect']);
			}
		}

		function action_wp_head_finished() {
			$this->_in_body = true;
		}
		function action_wp_footer_started() {
			$this->_in_body = false;
		}

		function get_random_tagline($name, $show = null) {
			if ('description' == $show && $this->_in_body) {
				$taglines = explode(PHP_EOL, get_option('furious_random_tagline_list', get_bloginfo('description')));
				return $taglines[array_rand($taglines)];
			} else {
				return $name;
			}
		}

		function custom_login_redirect() {
			$target = get_option('furious_redirect_on_login_target', null);
			if ($target) {
				return $target;
			} else {
				return home_url();
			}
		}

		function load_skiphomepage($query) {
			// Script must be loaded on every page because of the "override" to remove the cookie if the home page is accessed from a link
			add_action('wp_enqueue_scripts', [$this, 'load_skiphomepage_scripts']);

			// Neither is_home() nor is_front_page() seem to provide the behavior we need. So we use this condition instead.
			if (('page' == get_option('show_on_front')) && (get_option('page_on_front') == $query->query_vars['page_id'])) :
				add_action('wp_head', [$this, 'load_skiphomepage_redirect']);
			endif;
		}

		function load_skiphomepage_scripts() {
			$scriptvars = 'var siteurl="' . get_option('siteurl') . '";';

			wp_register_script('js-cookie', "//cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js", [], null, true );
			wp_enqueue_script('js-cookie');
			wp_register_script('skiphomepage', plugins_url('js/plugin.js', __FILE__), array('js-cookie'), null, true);
			wp_enqueue_script('skiphomepage');
			// Appends the homepage URL as a variable to the script, so that the script can use it for comparison
			wp_add_inline_script('skiphomepage', $scriptvars, 'before');
		}

		function load_skiphomepage_redirect() {
			if (!(get_option('furious_skip_homepage_showonce')) || isset($_COOKIE['skiphomepage']) && $_COOKIE['skiphomepage']) :
				$redirectpage = get_page_link(get_option('furious_skip_homepage_target'));
				echo '<meta http-equiv="refresh" content="0;url=' . $redirectpage . '" />';
				exit;
			endif;
		}
		
		function cleanup_wp_crud() {
			// Remove the WP Emoji stuff
			remove_action('wp_head', 'print_emoji_detection_script', 7); 
			remove_action('admin_print_scripts', 'print_emoji_detection_script'); 
			remove_action('wp_print_styles', 'print_emoji_styles'); 
			remove_action('admin_print_styles', 'print_emoji_styles');
			remove_filter('the_content_feed', 'wp_staticize_emoji');
			remove_filter('comment_text_rss', 'wp_staticize_emoji'); 
			remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
			// Additional header cleanup
			remove_action('wp_head', 'rsd_link');
			remove_action('wp_head', 'wlwmanifest_link');
			remove_action('wp_head', 'wp_generator');
			remove_action('wp_head', 'wp_shortlink_wp_head');
			remove_action('wp_head', 'feed_links', 2);
			remove_action('wp_head', 'feed_links_extra', 3);
		}

		// Update jQuery
		function update_jquery() {
			wp_deregister_script('jquery');
			wp_register_script('jquery', "//code.jquery.com/jquery-3.7.1.min.js");
			wp_enqueue_script('jquery');
		}

		// Remove jQuery Migrate
		function remove_jquery_migrate(&$scripts) {
			if (! is_admin() && isset($scripts->registered['jquery'])) {
				$script = $scripts->registered['jquery'];
				if ($script->deps) { 
					$script->deps = array_diff($script->deps, ['jquery-Migrate']);
				}
  			}
  		}

		// Logs the last login time of a user
		function update_last_login_timestamp($user_login, $user) {
			update_user_meta($user->ID, 'last_login', time());
		}

		// Set the default last login time for new users. This makes sorting a little cleaner.
		function set_default_last_login_timestamp($user_id) {
			update_user_meta($user_id, 'last_login', 0 );
		}

		// Makes the search results show under a "Search" slug
		function search_url_rewrite_rule() {
			if (is_search() && !empty($_GET['s'])) :
				wp_redirect(home_url("/search/") . urlencode(get_query_var('s')));
				exit();
			endif;
		}

		// Change the "Read More" behavior on excerpts
		function new_excerpt_more($more) {
			return $this->custom_readmore_text;
		}
		
		// Remove the hard-coded width on attachment containers
		function img_caption_shortcode_width($width, $atts, $content) {
			return 0;
		}

		// For content (announcements, statements, etc.) that may be very short (less than 200 words), echoes " shortpost ". Useful to call this when populating the CSS class of the parent container and styling it appropriately.
		function style_short_posts() {
			global $post;
			$content = get_post_field('post_content', $post->ID);
			$wordcount = str_word_count(strip_tags($content));
			if ($wordcount <= 200) :
				echo " shortpost ";
			endif;
		}

		// Create a shortcode to create a nonce
		function return_nonce($atts) {
			$atts = shortcode_atts(
				[
					'name' => 'default',
					'action' => 'default_nonce',
				],
				$atts
			);
			return wp_nonce_field($atts['action'], $atts['name']);
		}

		// Create a shortcode to list child pages (or CPTs)
		function get_child_posts($atts = []) {
			global $post;

			// normalize attribute keys, lowercase
			$atts = array_change_key_case((array)$atts, CASE_LOWER);

			if (array_key_exists('pagename', $atts)) :
				$parentpage = get_page_by_title($atts['pagename']);
				$atts['postid'] = $parentpage->ID;
			endif;

			// Use default values if parameters not passed
			$atts = shortcode_atts(
				[
					'showheader' => true,
					'showparent' => false,
					'headername' => 'Pages',
					'posttype' => 'page',
					'wrapinul' => true,
					'postid' => $post->ID,
					'showauthor' => false,
					'exclude' => null,
					'render' => true
				],
				$atts
			);
			$atts['showheader'] = filter_var($atts['showheader'], FILTER_VALIDATE_BOOLEAN);
			$atts['wrapinul'] = filter_var($atts['wrapinul'], FILTER_VALIDATE_BOOLEAN);
			if ($atts['exclude'] && !is_array($atts['exclude'])) :
				$atts['exclude'] = [ $atts['exclude'] ];
			endif;
			
			$return = '';

			if ($atts['posttype'] == 'page') :

				if ($atts['showauthor']) :
					$qrychildren = get_pages([
						'child_of' => $atts['postid'],
						'sort_column' => 'menu_order',
						'exclude' => $atts['exclude']
					]);

					if (! $atts['render']) :
						return ($qrychildren ? true : false);
					endif;

					$return .= '<div class="childpages">';

					if ($atts['showparent']) :
						$return .= '<div class="parentpage"><div><span class="title"><a href="' . get_the_permalink($atts['postid']) . '">' . get_the_title($atts['postid']) . '</a></div></div>';
					endif;

					foreach ($qrychildren as $child) :
						$link = get_page_link($child->ID);
						$title = $child->post_title;

						$return .= '<div class="childpage"><div><span class="title"><a href="' . $link . '">' . $title . '</a></span></div><div class="byline">' . get_the_byline($child->ID) . '</div><div class="subheading">' . $AUTHOR . '</div></div>';
						// TODO: actually populate the author
					endforeach;

					$return .= '</div>';

					return $return;
				else :
					$qrychildren = wp_list_pages(array(
						'child_of' => $atts['postid'],
						'echo' => false,
						'title_li' => ($atts['showheader'] ? $atts['headername'] : '')
					));

					return ($atts['wrapinul'] ? '<ul>' : '') . ($atts['showparent'] ? '<li><a href="' . get_the_permalink($atts['postid']) . '">' . get_the_title($atts['postid']) . '</a>' : '') . $qrychildren . ($atts['wrapinul'] ? '</ul>' : '');
				endif;
			else :
				$qrychildren = get_posts([
					'post_parent' => $atts['postid'],
					'post_type' => $atts['posttype'],
					'order' => 'ASC',
					'orderby' => 'menu_order',
					'post__not_in' => $atts['exclude'],
					'posts_per_page' => -1
				]);

				if (! $atts['render']) :
					return ($qrychildren ? true : false);
				endif;

				$return .= '<div class="childpages">';

				if ($atts['showparent']) :
					$return .= '<div class="parentpage"><div><span class="title"><a href="' . get_the_permalink($atts['postid']) . '">' . get_the_title($atts['postid']) . '</a></div></div>';
				endif;

				foreach ($qrychildren as $child) :
					$link = get_page_link($child->ID);
					$title = $child->post_title;
					$subheading = get_post_meta($child->ID, '_content_subheading', true);

					$return .= '<div class="childpage"><div><span class="title"><a href="' . $link . '">' . $title . '</a></div><div class="byline">' . get_the_byline($child->ID) . '</div>' . ($subheading ? '<div class="subheading">' . $subheading . '</div>' : '') . '</div>';
				endforeach;

				$return .= '</div>';

				return $return;
			endif;
		}

		public function add_head_content() {
			$head_content = get_option('furious_custom_crud');
			if ($head_content) {
				echo "\r" . $head_content;
			}
		}
	}

	$ffplugin = new Furious_Tools_Plugin();

	add_shortcode('nonce', [ $ffplugin, 'return_nonce' ]);
	add_shortcode('childposts', [ $ffplugin, 'get_child_posts' ]);
	
	if (! is_admin()) {
		// Add custom <head> content
		if (get_option('furious_add_custom_crud')) {
			add_action('wp_head', [$ffplugin, 'add_head_content']);
		}

		// Enqueue the actions on the home page only
		if (get_option('furious_skip_homepage_enabled')) {
			add_action('parse_query', [$ffplugin, 'load_skiphomepage']);
		}
	} else {
		// Call the code for the settings page
		include_once(plugin_dir_path(__FILE__) . 'options.php');
	}
?>