import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';

export const locationApi = createApi({
	reducerPath: 'locationApi',
	baseQuery: baseQuery,
	endpoints: build => ({
		searchCities: build.query<
			{
				info: {
					totalCount: number;
				};
				data: {
					Description: string;
					Ref: string;
					AreaDescription: string;
				}[];
			},
			{ query: string; page: number; limit?: number }
		>({
			query: ({ query, page = 1, limit = 20 }) => ({
				url: '',
				method: 'POST',
				body: {
					apiKey: 'apikey',
					modelName: 'AddressGeneral',
					calledMethod: 'getCities',
					methodProperties: {
						Page: page,
						Limit: limit,
						FindByString: query,
					},
				},
			}),
		}),
		getWarehouses: build.query<
			{
				info: {
					totalCount: number;
				};
				data: {
					Description: string;
				}[];
			},
			{ city: string; page: number; limit?: number }
		>({
			query: ({ city, page = 1, limit = 20 }) => ({
				url: '',
				method: 'POST',
				body: {
					apiKey: 'apikey',
					modelName: 'AddressGeneral',
					calledMethod: 'getWarehouses',
					methodProperties: {
						Page: page,
						Limit: limit,
						CityRef: city,
					},
				},
			}),
		}),
		searchStreets: build.query<
			{
				info: {
					totalCount: number;
				};
				data: {
					Description: string;
				}[];
			},
			{ city: string; page: number; limit?: number; query: string }
		>({
			query: ({ query = '', city, page = 1, limit = 20 }) => ({
				url: '',
				method: 'POST',
				body: {
					apiKey: 'apikey',
					modelName: 'AddressGeneral',
					calledMethod: 'getStreet',
					methodProperties: {
						Page: page,
						Limit: limit,
						CityRef: city,
						FindByString: query,
					},
				},
			}),
		}),
	}),
});

export const {
	useSearchCitiesQuery,
	useGetWarehousesQuery,
	useSearchStreetsQuery,
} = locationApi;
