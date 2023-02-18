import { emptySplitApi as api } from './emptyApi'
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		productsControllerPopulate: build.mutation<
			ProductsControllerPopulateApiResponse,
			ProductsControllerPopulateApiArg
		>({
			query: () => ({ url: `/api/products/populate`, method: 'POST' }),
		}),
		productsControllerCreate: build.mutation<
			ProductsControllerCreateApiResponse,
			ProductsControllerCreateApiArg
		>({
			query: (queryArg) => ({
				url: `/api/products`,
				method: 'POST',
				body: queryArg.productsDto,
			}),
		}),
		productsControllerGetAll: build.query<
			ProductsControllerGetAllApiResponse,
			ProductsControllerGetAllApiArg
		>({
			query: (queryArg) => ({
				url: `/api/products`,
				params: {
					query: queryArg.query,
					status: queryArg.status,
					category: queryArg.category,
				},
			}),
		}),
		productsControllerUpdate: build.mutation<
			ProductsControllerUpdateApiResponse,
			ProductsControllerUpdateApiArg
		>({
			query: (queryArg) => ({
				url: `/api/products`,
				method: 'PUT',
				body: queryArg.productsDto,
			}),
		}),
		productsControllerDeleteAll: build.mutation<
			ProductsControllerDeleteAllApiResponse,
			ProductsControllerDeleteAllApiArg
		>({
			query: () => ({ url: `/api/products`, method: 'DELETE' }),
		}),
		productsControllerGetOne: build.query<
			ProductsControllerGetOneApiResponse,
			ProductsControllerGetOneApiArg
		>({
			query: (queryArg) => ({ url: `/api/products/${queryArg.id}` }),
		}),
		productsControllerDelete: build.mutation<
			ProductsControllerDeleteApiResponse,
			ProductsControllerDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/api/products/${queryArg.id}`,
				method: 'DELETE',
			}),
		}),
		productsControllerUpload: build.mutation<
			ProductsControllerUploadApiResponse,
			ProductsControllerUploadApiArg
		>({
			query: (queryArg) => ({
				url: `/api/products/${queryArg.id}/image`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
	}),
	overrideExisting: false,
})
export { injectedRtkApi as api }
export type ProductsControllerPopulateApiResponse = unknown
export type ProductsControllerPopulateApiArg = void
export type ProductsControllerCreateApiResponse = /** status 200  */ ProductsDto
export type ProductsControllerCreateApiArg = {
	productsDto: ProductsDto
}
export type ProductsControllerGetAllApiResponse =
	/** status 200  */ ProductsDto[]
export type ProductsControllerGetAllApiArg = {
	/** FTS query text */
	query?: string
	/** Products statuses separated by comma. Allowed values: Limited,New */
	status?: string
	/** Product category. Allowed values: Canola,Corn,Oats,Wheat,Soybeans,Barley */
	category?: string
}
export type ProductsControllerUpdateApiResponse = unknown
export type ProductsControllerUpdateApiArg = {
	productsDto: ProductsDto
}
export type ProductsControllerDeleteAllApiResponse = unknown
export type ProductsControllerDeleteAllApiArg = void
export type ProductsControllerGetOneApiResponse = /** status 200  */ ProductsDto
export type ProductsControllerGetOneApiArg = {
	id: string
}
export type ProductsControllerDeleteApiResponse = unknown
export type ProductsControllerDeleteApiArg = {
	id: string
}
export type ProductsControllerUploadApiResponse = /** status 200  */ ProductsDto
export type ProductsControllerUploadApiArg = {
	id: string
	body: {
		file?: Blob
	}
}
export type ProductsDto = {
	name: string
	description: string
	price: number
	image: string
	discount: string
	status: ('Limited' | 'New')[]
	category: 'Canola' | 'Corn' | 'Oats' | 'Wheat' | 'Soybeans' | 'Barley'
}
export const {
	useProductsControllerPopulateMutation,
	useProductsControllerCreateMutation,
	useProductsControllerGetAllQuery,
	useProductsControllerUpdateMutation,
	useProductsControllerDeleteAllMutation,
	useProductsControllerGetOneQuery,
	useProductsControllerDeleteMutation,
	useProductsControllerUploadMutation,
} = injectedRtkApi
