<?php
namespace FuriousTools;

use WP_REST_Request;

class Plugin {
	private $custom_readmore_text;
	private $_in_body = false;
	private $options;

	public function __construct() {
		add_shortcode('nonce', [$this, 'return_nonce']);
		add_shortcode('childposts', [$this, 'get_child_posts']);

		$this->options = get_option( 'furious_tools', Settings::$defaults );

		// Add custom <head> content
		if ($this->options['add_custom_crud']) {
			add_action('wp_head', [$this, 'add_head_content']);
		}

		if ($this->options['search_slug']) add_action('template_redirect', [$this, 'search_url_rewrite_rule']);

		if ($this->options['custom_readmore']) {
			$this->custom_readmore_text = $this->options['custom_readmore_text'] ?? '&ellip;';
			add_filter('excerpt_more', [$this, 'new_excerpt_more']);
		}

		// Enqueue the actions on the home page only
		if ($this->options['skip_homepage']) {
			add_action('parse_query', [$this, 'load_skiphomepage']);
		}

		if ($this->options['style_outbound_links']) add_action('wp_head', [$this, 'style_outbound_links']);
		// TODO: Add conditional for only styling links in content

		if ($this->options['hide_admin_bar']) {
			add_action('after_setup_theme', [$this, 'hide_admin_bar']);
		}
		
		if ($this->options['bypass_http_validate_url']) { // No callback really needed for this setting, we'll just set it directly
			add_filter('http_request_host_is_external', '__return_true');
		}

		if ($this->options['latest_jquery']) {
			add_action('wp_enqueue_scripts', [$this, 'update_jquery']);
		}
		
		if ($this->options['remove_jquery_migrate']) {
			add_action('wp_default_scripts', [$this, 'remove_jquery_migrate']);
		}

		if ($this->options['track_user_last_login']) {
			new TrackLogins();
		}

		if ($this->options['remove_att_width']) {
			add_filter('img_caption_shortcode_width', [$this, 'img_caption_shortcode_width'], 10, 3);
		}

		if ($this->options['random_tagline']) {
			add_action('wp_head', [ $this, 'action_wp_head_finished'], PHP_INT_MAX);
			add_action('wp_footer', [ $this, 'action_wp_footer_started'], 0);
			add_filter('bloginfo', [$this, 'get_random_tagline'], 10, 2);
		}

		if ($this->options['redirect_on_login']) {
			add_filter('login_redirect', [$this, 'custom_login_redirect']);
		}

		if (is_login() && $this->options['hide_login_form']) {
			add_action('login_enqueue_scripts', [$this, 'hide_login_form']);
		}

		if ( $this->options['smooth_scrolling'] ) {
			add_action( 'wp_enqueue_scripts', function() {
				wp_enqueue_style( 'furioustools-smooth-scrolling', plugins_url( '../../css/smooth-scrolling.css', __FILE__ ) );
			} );
		}

		if ( $this->options['snap_scrolling'] ) {
			add_action( 'wp_enqueue_scripts', function() {
				wp_enqueue_script( 'furioustools-snap-scrolling', plugins_url( '../../js/snap-scrolling.js', __FILE__ ), [], null, true );
				wp_localize_script( 'furioustools-snap-scrolling', 'furiousToolsSettings', [
					"snapScrollingForceFullPages" => ( $this->options['snap_scrolling_force_full_pages'] ? true : false )
				]);
				wp_enqueue_style( 'furioustools-snap-scrolling', plugins_url( '../../css/snap-scrolling.css', __FILE__ ) );
			} );
		}
	}

	function action_wp_head_finished() {
		$this->_in_body = true;
	}
	function action_wp_footer_started() {
		$this->_in_body = false;
	}

	function get_random_tagline($name, $show = null) {
		//TODO: Make this work and set a conditional for block themes, where wp_head and wp_footer don't really exist
		//if ('description' == $show && $this->_in_body) {
			$taglines = explode(PHP_EOL, $this->options['random_tagline_list']);
			return $taglines[array_rand($taglines)];
		//} else {
			return $name;
		//}
	}

	function custom_login_redirect() {
		$target = $this->options['redirect_on_login_target'];
		if ($target) {
			return $target;
		} else {
			return home_url();
		}
	}

	function hide_login_form() {
		if (!isset($_GET["showloginform"])) {  // Override hiding the login form by including the 'showloginform' parameter in the request
?>
		<style type="text/css">
			#loginform h3.galogin-or, #loginform p:not(.galogin), #loginform div.user-pass-wrap, #login p#nav {
				display: none;
			}
		</style>
<?php
		}
	}

	function hide_admin_bar() {
		$user = wp_get_current_user();
		if (array_intersect($user->roles,$this->options['hide_admin_bar']) && !is_admin()) {
			add_filter( 'show_admin_bar', '__return_false' );
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
		if (!($this->options['skip_homepage_showonce']) || isset($_COOKIE['skiphomepage']) && $_COOKIE['skiphomepage']) :
			$redirectpage = get_page_link($this->options['skip_homepage_target']);
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

	function add_head_content() {
		$head_content = $this->options['custom_crud'];
		if ($head_content) {
			echo "\r" . $head_content;
		}
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

	// Style outbound links by echoing the custom style in the <head> of each page
	function style_outbound_links() {
?>
		<style type="text/css">
			<?= $this->options['style_outbound_links_only_in_content'] ? '.entry-content ' : null ?> a[href]:not(:where(
				[href^="#"],
				[href^="javascript:"],  
				[href^="/"]:not([href^="//"]),
				[href*="<?= site_url();?>"],
			))::after {
				content: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgODAwIj48ZyBpZD0iYiI+PHBhdGggZD0iTTUyNi44LDY2Ni43aC0yNTMuNWMtNDEuMiwwLTYzLjksMC04NS4zLTEwLjktMTguOS05LjYtMzQtMjQuOC00My43LTQzLjctMTAuOS0yMS40LTEwLjktNDQuMS0xMC45LTg1LjR2LTI1My4zYzAtNDEuMywwLTY0LDEwLjktODUuNCw5LjYtMTguOSwyNC44LTM0LDQzLjctNDMuNywyMS40LTEwLjksNDQuMS0xMC45LDg1LjQtMTAuOWg2MGMxOC40LDAsMzMuMywxNC45LDMzLjMsMzMuM3MtMTQuOSwzMy4zLTMzLjMsMzMuM2gtNjBjLTI4LjksMC00OCwwLTU1LjEsMy42LTYuMywzLjItMTEuMyw4LjItMTQuNiwxNC42LTMuNiw3LjEtMy42LDI2LjItMy42LDU1LjF2MjUzLjNjMCwyOC45LDAsNDgsMy42LDU1LjEsMy4yLDYuMyw4LjMsMTEuNCwxNC42LDE0LjYsNy4xLDMuNiwyNi4yLDMuNiw1NSwzLjZoMjUzLjVjMjguOCwwLDQ3LjksMCw1NS0zLjYsNi4yLTMuMiwxMS40LTguNCwxNC42LTE0LjYsMy42LTcuMSwzLjYtMjYuMiwzLjYtNTV2LTYwLjFjMC0xOC40LDE0LjktMzMuMywzMy4zLTMzLjNzMzMuMywxNC45LDMzLjMsMzMuM3Y2MC4xYzAsNDEuMiwwLDYzLjktMTAuOSw4NS4zLTkuNywxOC45LTI0LjgsMzQuMS00My43LDQzLjctMjEuNCwxMC45LTQ0LjEsMTAuOS04NS4zLDEwLjlsLjEuMVpNMzk5LjksNDMzLjNjLTguNSwwLTE3LjEtMy4zLTIzLjYtOS44LTEzLTEzLTEzLTM0LjEsMC00Ny4xbDE3Ni40LTE3Ni40aC04NS41Yy0xOCwwLTMzLjYtMTQuNy0zNC0zMi42LS40LTE4LjcsMTQuNy0zNCwzMy4zLTM0aDE4My4xYzkuNCwwLDE3LDcuNywxNywxNy4xdjE4Mi4zYzAsMTgtMTQuNywzMy42LTMyLjYsMzRzLTM0LTE0LjctMzQtMzMuM3YtODYuMmwtMTc2LjQsMTc2LjRjLTYuNSw2LjUtMTUsOS44LTIzLjYsOS44bC0uMS0uMloiLz48L2c+PC9zdmc+');
				display: inline-block;
				width: 0.75em;
				padding-left: 0.1em;
			}
		</style>
<?php
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
					$pub_date = $child->post_date;
					$author = get_user_by('id', $child->author);

					$return .= '<div class="childpage"><div><span class="title"><a href="' . $link . '">' . $title . '</a></span></div><div class="byline">' . $pub_date . '</div><div class="subheading">' . $author->display_name . '</div></div>';
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

				$return .= '<div class="childpage"><div><span class="title"><a href="' . $link . '">' . $title . '</a></div><div class="byline">' . $child->post_date . '</div>' . ($subheading ? '<div class="subheading">' . $subheading . '</div>' : '') . '</div>';
			endforeach;

			$return .= '</div>';

			return $return;
		endif;
	}
}
?>