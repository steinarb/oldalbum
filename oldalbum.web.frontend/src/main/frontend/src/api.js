import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SUCCESSFULL_CHANGE_OF_PASSWORD_REQUIREMENT } from './reduxactions';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: (...args) => {
        const api = args[1];
        const basename = api.getState().basename;
        return fetchBaseQuery({ baseUrl: basename + '/api' })(...args);
    },
    endpoints: (builder) => ({
        getLogin: builder.query({ query: () => '/login' }),
        getAllroutes: builder.query({ query: () => '/allroutes' }),
        getDefaultlocale: builder.query({ query: () => '/defaultlocale' }),
        getAvailablelocales: builder.query({ query: () => '/availablelocales' }),
        getDisplaytexts: builder.query({ query: (locale) => '/displaytexts?locale=' + locale }),
        getLogout: builder.mutation({ query: () => ({url: '/logout', method: 'GET' }) }),
        getLogoutUnauthorized: builder.mutation({ query: () => ({url: '/logout', method: 'GET' }) }),
        getReloadshiroconfig: builder.mutation({ query: () => ({url: '/reloadshiroconfig', method: 'GET', responseHandler: 'text' }) }),
        getTouchpicturetimestamp: builder.mutation({
            query: (id) => ({url: '/touchpicturetimestamp/' + id.toString(), method: 'GET' }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterTouchPictureTimestamp } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterTouchPictureTimestamp));
                } catch {
                    // Skip and continue
                }
            },
        }),
        getTogglepasswordprotection: builder.mutation({
            query: (id) => ({url: '/togglepasswordprotection/' + id.toString(), method: 'GET' }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterPasswordToggle } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes', undefined, () => allroutesAfterPasswordToggle));
                    dispatch(SUCCESSFULL_CHANGE_OF_PASSWORD_REQUIREMENT(id));
                } catch {
                    // Skip and continue
                }
            },
        }),
        postModifyalbum: builder.mutation({
            query: (body) => ({url: '/modifyalbum', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterModifyAlbum } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterModifyAlbum));
                } catch {
                    // Skip and continue
                }
            },
        }),
        postAddalbum: builder.mutation({
            query: (body) => ({url: '/addalbum', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterAddAlbum } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterAddAlbum));
                } catch {
                    // Skip and continue
                }
            },
        }),
        postBatchAddPictures: builder.mutation({
            query: (body) => ({url: '/batchaddpictures', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterBatchAddPictures } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterBatchAddPictures));
                } catch {
                    // Skip and continue
                }
            },
        }),
        postModifypicture: builder.mutation({
            query: (body) => ({url: '/modifypicture', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterModifyPicture } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterModifyPicture));
                } catch {
                    // Skip and continue
                }
            },
        }),
        postAddpicture: builder.mutation({
            query: (body) => ({url: '/addpicture', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterAddPicture } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterAddPicture));
                } catch {
                    // Skip and continue
                }
            },
        }),
        postImageMetadata: builder.mutation({ query: (url) => ({url: '/image/metadata', method: 'POST', body: { url } }) }),
        postDeleteentry: builder.mutation({
            query: (body) => ({url: '/deleteentry', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterDeleteentry } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterDeleteentry));
                } catch {
                    // Skip and continue
                }
            },
        }),
        postDeleteselection: builder.mutation({
            query: (body) => ({url: '/deleteselection', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterDeleteselection } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterDeleteselection));
                } catch {
                    // Skip and continue
                }
            },
        }),
        postSortalbumbydate: builder.mutation({
            query: (body) => ({url: '/sortalbumbydate', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterSortalbumbydate } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterSortalbumbydate));
                } catch {
                    // Skip and continue
                }
            },
        }),
        postMovealbumentryup: builder.mutation({
            query: (body) => ({url: '/movealbumentryup', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterMovealbumentryup } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterMovealbumentryup));
                } catch {
                    // Skip and continue
                }
            },
        }),
        postMovealbumentrydown: builder.mutation({
            query: (body) => ({url: '/movealbumentrydown', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterMovealbumentrydown } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterMovealbumentrydown));
                } catch {
                    // Skip and continue
                }
            },
        }),
    }),
});

console.log(api);

export const {
    useGetLoginQuery,
    useGetAllroutesQuery,
    useGetDefaultlocaleQuery,
    useGetAvailablelocalesQuery,
    useGetDisplaytextsQuery,
    useGetLogoutMutation,
    useGetLogoutUnauthorizedMutation,
    useGetReloadshiroconfigMutation,
    useGetTouchpicturetimestampMutation,
    useGetTogglepasswordprotectionMutation,
    usePostModifyalbumMutation,
    usePostAddalbumMutation,
    usePostBatchAddPicturesMutation,
    usePostModifypictureMutation,
    usePostAddpictureMutation,
    usePostImageMetadataMutation,
    usePostDeleteentryMutation,
    usePostDeleteselectionMutation,
    usePostSortalbumbydateMutation,
    usePostMovealbumentryupMutation,
    usePostMovealbumentrydownMutation,
} = api;
