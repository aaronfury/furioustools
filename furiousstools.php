<?php
	/*
	Plugin Name:  Furious Tools
	Plugin URI:   https://github.com/aaronfury/furiouswptools
	Description:  This plugin does some stuff to make WordPress behave the way Furious Studios prefers.
	Version:      1.0.20200809
	Author:       Aaron Firouz
	License:      Creative Commons Zero
	License URI:  https://creativecommons.org/publicdomain/zero/1.0/
	Text Domain:  furioustools
	*/
	
	// Enqueue the CSS and JS files for this plugin on the front-end
	if ( ! is_admin() ) :
		cleanup_wp_crud();
	endif;
	
	function cleanup_wp_crud() {
		// Remove the WP Emoji stuff
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); 
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' ); 
		remove_action( 'wp_print_styles', 'print_emoji_styles' ); 
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		// Additional header cleanup
		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'wlwmanifest_link');
		remove_action('wp_head', 'wp_generator');
		remove_action('wp_head', 'wp_shortlink_wp_head');
		remove_action('wp_head', 'feed_links', 2 );
		remove_action('wp_head', 'feed_links_extra', 3 );
	}

	// Update jQuery
	function update_jquery() {
		wp_deregister_script('jquery');
		wp_register_script( 'jquery', "//code.jquery.com/jquery-3.5.1.min.js" );
		wp_enqueue_script( 'jquery' );
	}
	add_action( 'wp_enqueue_scripts', 'update_jquery' );


	// Makes the search results show under a "Search" slug
	function search_url_rewrite_rule() {
		if ( is_search() && !empty($_GET['s']) ) :
			wp_redirect( home_url("/search/") . urlencode( get_query_var('s') ) );
			exit();
		endif;
	}
	add_action( 'template_redirect', 'search_url_rewrite_rule' );

	// Change the "Read More" behavior on excerpts
	function new_excerpt_more( $more ) {
		return '&hellip;';
	}
	add_filter( 'excerpt_more', 'new_excerpt_more' );

	// For content (announcements, statements, etc.) that may be very short (less than 200 words), echoes " shortpost ". Useful to call this when populating the CSS class of the parent container and styling it appropriately.
	function style_short_posts() {
		global $post;
		$content = get_post_field('post_content', $post->ID);
		$wordcount = str_word_count( strip_tags( $content ) );
		if ( $wordcount <= 200 ) :
			echo " shortpost ";
		endif;
	}

	// Remove the hard-coded width on attachment containers
	function my_img_caption_shortcode_width($width, $atts, $content) {
		return 0;
	}
	add_filter('img_caption_shortcode_width', 'my_img_caption_shortcode_width', 10, 3);

	// Create a shortcode to list the Ajax URL. Useful to more easily pass in the URL to JS functions.
	function return_ajax_url() {
		return admin_url('admin-ajax.php');
	}
	add_shortcode('ajax_url', 'return_ajax_url');

	// Create a shortcode to create a nonce
	function return_nonce( $atts ) {
		$atts = shortcode_atts(
			[
				'name' => 'default',
				'action' => 'default_nonce',
			],
			$atts
		);
		return wp_nonce_field( $atts['action'], $atts['name'] );
	}
	add_shortcode('nonce', 'return_nonce');

	// Create a shortcode to list child pages (or CPTs)
	function get_child_posts( $atts = [] ) {
		global $post;

		// normalize attribute keys, lowercase
		$atts = array_change_key_case( (array)$atts, CASE_LOWER );

		if ( array_key_exists('pagename', $atts) ) :
			$parentpage = get_page_by_title( $atts['pagename'] );
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
		$atts['showheader'] = filter_var( $atts['showheader'], FILTER_VALIDATE_BOOLEAN );
		$atts['wrapinul'] = filter_var( $atts['wrapinul'], FILTER_VALIDATE_BOOLEAN );
		if ( $atts['exclude'] && !is_array($atts['exclude']) ) :
			$atts['exclude'] = [ $atts['exclude'] ];
		endif;
		
		$return = '';

		if ( $atts['posttype'] == 'page' ) :

			if ( $atts['showauthor'] ) :
				$qrychildren = get_pages( [
					'child_of' => $atts['postid'],
					'sort_column' => 'menu_order',
					'exclude' => $atts['exclude']
				]);

				if (! $atts['render'] ) :
					return ( $qrychildren ? true : false );
				endif;

				$return .= '<div class="childpages">';

				if ( $atts['showparent'] ) :
					$return .= '<div class="parentpage"><div><span class="title"><a href="' . get_the_permalink( $atts['postid'] ) . '">' . get_the_title( $atts['postid'] ) . '</a></div></div>';
				endif;

				foreach ( $qrychildren as $child ) :
					$link = get_page_link( $child->ID );
					$title = $child->post_title;
					$subheading = get_post_meta($child->ID, '_content_subheading', true);

					$return .= '<div class="childpage"><div><span class="title"><a href="' . $link . '">' . $title . '</a></span>' . (get_post_meta( $child->ID, '_web_exclusive', true) ? '<span class="webonly">Online Exclusive</span>' : '') . '</div><div class="byline">' . get_the_byline( $child->ID ) . '</div>' . ( $subheading ? '<div class="subheading">' . $subheading . '</div>' : '' ) . '</div>';
				endforeach;

				$return .= '</div>';

				return $return;
			else :
				$qrychildren = wp_list_pages( array(
					'child_of' => $atts['postid'],
					'echo' => false,
					'title_li' => ( $atts['showheader'] ? $atts['headername'] : '' )
				));

				return ( $atts['wrapinul'] ? '<ul>' : '') . ( $atts['showparent'] ? '<li><a href="' . get_the_permalink( $atts['postid'] ) . '">' . get_the_title( $atts['postid'] ) . '</a>' : '' ) . $qrychildren . ( $atts['wrapinul'] ? '</ul>' : '');
			endif;
		else :
			$qrychildren = get_posts( [
				'post_parent' => $atts['postid'],
				'post_type' => $atts['posttype'],
				'order' => 'ASC',
				'orderby' => 'menu_order',
				'post__not_in' => $atts['exclude'],
				'posts_per_page' => -1
			]);

			if (! $atts['render'] ) :
				return ( $qrychildren ? true : false );
			endif;

			$return .= '<div class="childpages">';

			if ( $atts['showparent'] ) :
				$return .= '<div class="parentpage"><div><span class="title"><a href="' . get_the_permalink( $atts['postid'] ) . '">' . get_the_title( $atts['postid'] ) . '</a></div></div>';
			endif;

			foreach ( $qrychildren as $child ) :
				$link = get_page_link( $child->ID );
				$title = $child->post_title;
				$subheading = get_post_meta($child->ID, '_content_subheading', true);

				$return .= '<div class="childpage"><div><span class="title"><a href="' . $link . '">' . $title . '</a></span>' . (get_post_meta( $child->ID, '_web_exclusive', true) ? '<span class="webonly">Online Exclusive</span>' : '') . '</div><div class="byline">' . get_the_byline( $child->ID ) . '</div>' . ( $subheading ? '<div class="subheading">' . $subheading . '</div>' : '' ) . '</div>';
			endforeach;

			$return .= '</div>';

			return $return;
		endif;
	}
	add_shortcode('childposts', 'get_child_posts');

	// Call the code for the settings page
	include( plugin_dir_path( __FILE__ ) . 'options.php');
?>