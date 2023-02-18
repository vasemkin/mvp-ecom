import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { api } from './api'
import { productsReducer, PRODUCTS_FEATURE_KEY } from './products.slice'

export const createStore = (
	options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
	configureStore({
		reducer: {
			[api.reducerPath]: api.reducer,
			[PRODUCTS_FEATURE_KEY]: productsReducer,
		},
		// Additional middleware can be passed to this array
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(api.middleware),
		devTools: process.env.NODE_ENV !== 'production',
		// Optional Redux store enhancers
		enhancers: [],
	})

export const store = createStore()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
