# Furious Tools
A WordPress Plugin to add some light functionality and customization to WordPress. NOTE: This is a personal project and not intended for public consumption. Code may be terrible, nonfunctional, or downright malicious. Use at your own risk.


> **__IMPORTANT__**: I believe that newer is always better. Therefore, this plugin utilizes some functions and syntax that may only be compatible with PHP 7.2 or newer. Or even newer, I don't know because I am always __running the latest version__.

## Features
* __Skip the home page__ - Options to show the home page only once (or never), and redirect to a different page on subsequent visits
* __Redirect on login__ - Option to redirect users to a page other than the WordPress Dashboard upon login
* __Randomized tagline__ - Specify a list of taglines, and a random one will be displayed each time `get_bloginfo('description')` is called
* __Cleanup WordPress Page Header__ - Remove some irrelevant `<head>` content from most pages
* __Add Custom Page Header__ - Ability to add `<head>` content to all pages
* __Track Last User Login__ - Record the last login timestamp for each user and display it in the Users list
* __Use latest jQuery version__ - Loads the latest jQuery version (currently 3.7.0) instead of the one included with WordPress
* __Show search results under a slug__ - The search results page will be shown at "site.com/_search_/terms
* __Custom text for "Read more..." link__ - Specify custom content to display at the end of excerpts for linking to the full post
* __Bypass HTTP URL Validation__ - Disables the built-in check that HTTP requests are not originating from the local server.
* __Remove hard-coded max width on images__ - Allow images in the post body to be displayed at the full width of the page/container
* __Additional shortcodes__:
	* `[nonce]` creates a verification nonce for form submissions
	* `[childposts]` prints or return a list of child posts for the current post or a specific post

## childpost shortcode options
The `[childpost]` shortcode supports the following options:
* __showheader__ - _(true/false)_ Whether to print a header above the list. Default is _false_
* __headername__ - Text to display above the list if **showheader** is _true_. Default is _Pages_
* __showparent__ - _(true/false)_ Show the parent page (or current page) at the top of the list. Default is _false_
* __posttype__ - A post type (_post_, _page_, or custom post type) to retrieve. Default is _page_
* __wrapinul__ - _(true/false)_ Render the child objects as an unordered list (`<ul>`) rather than a list of `<div>` objects. Default is _false_
* __postid__ - A specific Post ID whose children to retrieve. Default is the current post ID where the shortcode is inserted
* __showauthor__ - Whether to show the author info. Default is _false_
* __exclude__ - An array of post IDs to exclude from the list
* __render__ - Whether to print the list to the rendered page. Why wouldn't you do this with a shortcode? Who knows! But this plugin gives you options, baby.
