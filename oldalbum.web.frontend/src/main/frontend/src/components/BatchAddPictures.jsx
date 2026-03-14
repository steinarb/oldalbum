import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    usePostBatchAddPicturesMutation,
} from '../api';
import { setParent, setUrl, setImportYear, setDefaultTitle, setSortByDate } from '../reducers/batchAddSlice';

export default function BatchAddPictures(props) {
    const { item, className='' } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const showEditControls = useSelector(state => state.showEditControls);
    const batchAdd = useSelector(state => state.batchAdd);
    const importYear = batchAdd.importYear ? batchAdd.importYear.toString() : '';
    const dispatch = useDispatch();
    const [ postBatchAddPictures ] = usePostBatchAddPicturesMutation();
    const onBatchAddClicked = async () => await postBatchAddPictures(batchAdd);

    useEffect(() => {
        dispatch(setParent(item));
    }, [item]);

    if (!showEditControls) {
        return null;
    }

    return(
        <div className={className + ' d-none d-lg-block'}>
            <div className="container rounded border border-primary pt-2">
                <div className="form-group row">
                    <label htmlFor="batchAddUrl" className="col-form-label col-1">URL</label>
                    <div className="col-4">
                        <input
                            id="batchAddUrl"
                            className="form-control"
                            type="text"
                            value={batchAdd.batchAddUrl}
                            onChange={e => dispatch(setUrl(e.target.value))}/>
                    </div>
                    <label htmlFor="importYear" className="col-form-label col-1">{text.year}</label>
                    <div className="col-2">
                        <input
                            id="importYear"
                            className="form-control"
                            type="text"
                            value={importYear}
                            onChange={e => dispatch(setImportYear(e.target.value))}/>
                    </div>
                    <label htmlFor="defaultTitle" className="col-form-label col-1">{text.title}</label>
                    <div className="col-2">
                        <input
                            id="defaultTitle"
                            className="form-control"
                            type="text"
                            value={batchAdd.defaultTitle}
                            onChange={e => dispatch(setDefaultTitle(e.target.value))}/>
                    </div>
                    <div className="form-group">
                        <input
                            id="sort-by-date"
                            className="form-check-1"
                            type="checkbox"
                            checked={batchAdd.sortByDate}
                            onChange={e => dispatch(setSortByDate(e.target.checked))} />
                        <label htmlFor="sort-by-date" className="sort-bydate-label">{text.sortbydate}</label>
                    </div>
                    <button className="btn btn-light col-4" type="button" onClick={onBatchAddClicked}>{text.batchaddpictures}</button>
                </div>
            </div>
        </div>
    );
}
