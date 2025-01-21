import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import { setAlbum, unsetAlbum } from '../reducers/albumGroupByYearSlice';

export default function AlbumGroupByYearButton(props) {
    const { album } = props;
    const { id } = album;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const albumGroupByYear = useSelector(state => state.albumGroupByYear[id] === undefined ? true : state.albumGroupByYear[id]);
    const dispatch = useDispatch();

    if (albumGroupByYear) {
        return (
            <div className={props.className}>
                <span onClick={() => dispatch(unsetAlbum(id))}>{text.albumdontgroupbyyear}</span>
            </div>
        );
    }

    return(
        <div className={props.className}>
            <span onClick={() => dispatch(setAlbum(id))}>{text.albumgroupbyyear}</span>
        </div>
    );
}
