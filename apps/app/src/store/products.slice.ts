import {
	createAsyncThunk,
	createDraftSafeSelector,
	createEntityAdapter,
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { NullablePartial } from '../utils/types'
import { ProductsDto } from './api'
import { RootState } from './store'

export const PRODUCTS_FEATURE_KEY = 'products'

export type Category = NullablePartial<Pick<ProductsDto, 'category'>>
export type Status = NullablePartial<Pick<ProductsDto, 'status'>>

export type ProductsState = {
	queryString?: string | null
} & Category &
	Status

export const initialProductsState: ProductsState = {
	queryString: null,
	category: null,
	status: null,
}

export const productsSlice = createSlice({
	name: PRODUCTS_FEATURE_KEY,
	initialState: initialProductsState,
	reducers: {
		setQuery(state, action: PayloadAction<string>) {
			state.queryString = action.payload
		},
		setCategory(state, action: PayloadAction<Category>) {
			state.category = action.payload.category
		},
		setStatuses(state, action: PayloadAction<Status>) {
			state.status = action.payload.status
		},
		resetCategory(state) {
			state.category = null
		},
		resetStatuses(state) {
			state.status = null
		},
	},
})

export const productsReducer = productsSlice.reducer
export const productsActions = productsSlice.actions

export const getProductsState = (rootState: RootState): ProductsState =>
	rootState[PRODUCTS_FEATURE_KEY]
