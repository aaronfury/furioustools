# Furious Tools
A WordPress Plugin to add some light functionality and customization to WordPress. NOTE: This is a personal project and not intended for public consumption. Code may be terrible, nonfunctional, or downright malicious. Use at your own risk.

> **__IMPORTANT__**: I believe that newer is always better. Therefore, this plugin utilizes some functions and syntax that may only be compatible with PHP 7.2 or newer. Or even newer, I don't know because I am always __running the latest version__.

## Features
* __Style external links__ - Option to append a small icon after text that is linked to another site/domain, so users know they are leaving your site.
* __Skip the home page__ - Options to show the home page only once (or never), and redirect to a different page on subsequent visits. Requires Javascript to work best (i.e. if the user clicks a link to the homepage somewhere on the site, JS removes the cookie so that they won't automatically be redirected on that click.)
* __Redirect on login__ - Option to redirect users to a page other than the WordPress Dashboard upon login
* __Hide login form__ - Hide the username/password fields on the WordPress login page to reduce confusion when using a third-party SSO plugin. When enabled, can be overridden by appending '?showloginform' to the wp-login.php URL.
* __Hide admin bar__ - Hide the WordPress Admin Bar for specific roles.
* __Randomized tagline__ - Specify a list of taglines, and a random one will be displayed each time `get_bloginfo('description')` is called
* __Cleanup WordPress Page Header__ - Remove some irrelevant `<head>` content from most pages, like wp-emoji styling. But also removes RSS feed info, sooooo...
* __Add Custom Page Header__ - Ability to add `<head>` content to all pages
* __Track Last User Login__ - Record the last login timestamp for each user and display it in the Users list
* __Use latest jQuery version__ - Loads the latest jQuery version (currently 3.7.1) instead of the one included with WordPress
* __Show search results under a slug__ - The search results page will be shown at "site.com/_search_/terms
* __Custom text for "Read more..." link__ - Specify custom content to display at the end of excerpts for linking to the full post
* __Bypass HTTP URL Validation__ - Disables the built-in check that HTTP requests are not originating from the local server.
* __Remove hard-coded max width on images__ - Allow images in the post body to be displayed at the full width of the page/container
* __Additional shortcodes__:
	* `[nonce]` creates a verification nonce for form submissions
	* `[childposts]` prints or return a list of child posts for the current post or a specific post
* __Smooth Scrolling__ - Enables CSS smooth scrolling so that clicking on a link to a an achor on the page (like #Heading1) will scroll the page instead of jumping directly to it

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

## Snap Scrolling
Snap scrolling uses native CSS tools with a small Javascript to create a simple snapping effect; as the user scrolls the page, the scrolling will automatically advance to the next "snap" point. In some cases, this feature works well; other times, it's very finicky. Some advanced themes like Elementor offer more robust implementations of this. This plugin also only supports vertical snap scrolling, not horizontal.

The feature offers two modes:
- Snap to `<section>` tags
- Snap to `.snap-section` classed objects inside a `.snap-container` object

If you choose `<section>` tags, you can create top-level Group blocks in the Gutenberg editor and set them to use `<section>` tags in their advanced settings. These blocks should be contiguous, with nothing else in between them, so:
- Group (as `<section>`)
	- Heading
	- Paragraph
- Group (as `<section>`)
	- Heading
	- Other blocks
- Etc.

If you choose the CSS class-based approach, you can (theoretically) assign the classes to any parent/child objects, like a `<ul>` and `<li>`, or a parent Group block and child Group blocks. So:
- Group (with extra class `.snap-container`)
	- Group (with extra class `.snap-section`)
		- Additional content
	- Group (with extra class `.snap-section`)
	- Etc.

**The `<section>` method generally works better**, and it works best when there is no parent block. You can still have a sticky header, but everything should be at the root of the page template:
- Group (optional, sticky header)
- Group (as `<section>`)
- Group (as `<section>`)
- Group (optional, footer)

### Snap offset
The plugin will automatically attempt to compensate for sticky headers that block the top of the browser viewport. If that doesn't work or you have some other object, you can assign the `.snap-offset` class to it, and the Javascript will attempt to calculate its height and set the snap offset accordingly.