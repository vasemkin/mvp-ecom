import { Category, Status } from 'libs/products/src'

export interface ProductsInterface {
	readonly name: string
	readonly description: string
	readonly price: number
	readonly image: string
	readonly discount?: string
	readonly status?: Status[]
	readonly category: Category
}
