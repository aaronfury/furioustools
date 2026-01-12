import { store as noticesStore } from '@wordpress/notices';
import { useDispatch, useSelect } from '@wordpress/data';
import { SnackbarList } from '@wordpress/components';
import { NoticeList } from '@wordpress/components';

const Notices = () => {
	const { removeNotice } = useDispatch( noticesStore );
	const notices = useSelect( ( select ) =>
		select( noticesStore ).getNotices()
	);

	if ( notices.length === 0 ) {
		return null;
	}

	const snackbarNotices = notices.filter( ( notice ) => notice.type === 'snackbar' );

    return <SnackbarList notices={snackbarNotices} onRemove={removeNotice} />
};

const ErrorList = () => {
	const { removeNotice } = useDispatch( noticesStore );
	const notices = useSelect( ( select ) =>
		select( noticesStore ).getNotices()
	).filter( ( notice ) => notice.status === 'error' );

	if ( notices.length === 0 ) {
		return null;
	}

	return <NoticeList notices={notices} onRemove={removeNotice} />;
}

export { Notices, ErrorList };