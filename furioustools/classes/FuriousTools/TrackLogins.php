<?php
namespace FuriousTools;

class TrackLogins {
	public function __construct() {
		add_action('wp_login', [$this, 'update_last_login_timestamp'], 10, 2);
		add_action('user_register', [$this, 'set_default_last_login_timestamp']);
		add_filter('manage_users_columns', [$this, 'add_last_login_column']);
		add_filter('manage_users_sortable_columns', [$this, 'add_last_login_sortable_column']);
		add_filter('manage_users_custom_column', [$this, 'add_custom_last_login_column'], 10, 3);
		add_action('pre_get_users', [$this, 'sort_by_last_login']);
	}

	// Logs the last login time of a user
	function update_last_login_timestamp($user_login, $user) {
		update_user_meta($user->ID, 'last_login', time());
	}

	// Set the default last login time for new users. This makes sorting a little cleaner.
	function set_default_last_login_timestamp($user_id) {
		update_user_meta($user_id, 'last_login', 0 );
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
}

?>