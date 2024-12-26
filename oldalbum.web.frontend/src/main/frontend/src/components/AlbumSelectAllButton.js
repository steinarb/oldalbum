import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import { ALBUM_SELECT_ALL } from '../reduxactions';

export default function AlbumSelectAllButton(props) {
    const { album } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const dispatch = useDispatch();

    return(
        <div className={props.className}>
            <span onClick={() => dispatch(ALBUM_SELECT_ALL(album))}>{text.selectall}</span>
        </div>
    );
}
