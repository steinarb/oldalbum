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
        getTogglepasswordprotection: builder.mutation({
            query: (id) => ({url: '/togglepasswordprotection/' + id.toString(), method: 'GET' }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterPasswordToggle } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes', undefined, () => allroutesAfterPasswordToggle));
                    dispatch(SUCCESSFULL_CHANGE_OF_PASSWORD_REQUIREMENT(id));
                } catch {}
            },
        }),
        postModifyalbum: builder.mutation({
            query: (body) => ({url: '/modifyalbum', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterModifyAlbum } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterModifyAlbum));
                } catch {}
            },
        }),
        postAddalbum: builder.mutation({
            query: (body) => ({url: '/addalbum', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterAddAlbum } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterAddAlbum));
                } catch {}
            },
        }),
        postBatchAddPictures: builder.mutation({
            query: (body) => ({url: '/batchaddpictures', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterBatchAddPictures } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterBatchAddPictures));
                } catch {}
            },
        }),
        postModifypicture: builder.mutation({
            query: (body) => ({url: '/modifypicture', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterModifyPicture } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterModifyPicture));
                } catch {}
            },
        }),
        postAddpicture: builder.mutation({
            query: (body) => ({url: '/addpicture', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterAddPicture } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterAddPicture));
                } catch {}
            },
        }),
        postImageMetadata: builder.mutation({ query: (url) => ({url: '/image/metadata', method: 'POST', body: { url } }) }),
        postDeleteentry: builder.mutation({
            query: (body) => ({url: '/deleteentry', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterDeleteentry } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterDeleteentry));
                } catch {}
            },
        }),
        postDeleteselection: builder.mutation({
            query: (body) => ({url: '/deleteselection', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterDeleteselection } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterDeleteselection));
                } catch {}
            },
        }),
        postSortalbumbydate: builder.mutation({
            query: (body) => ({url: '/sortalbumbydate', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterSortalbumbydate } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterSortalbumbydate));
                } catch {}
            },
        }),
        postMovealbumentryup: builder.mutation({
            query: (body) => ({url: '/movealbumentryup', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterMovealbumentryup } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterMovealbumentryup));
                } catch {}
            },
        }),
        postMovealbumentrydown: builder.mutation({
            query: (body) => ({url: '/movealbumentrydown', method: 'POST', body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data: allroutesAfterMovealbumentrydown } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getAllroutes',  undefined, () => allroutesAfterMovealbumentrydown));
                } catch {}
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
