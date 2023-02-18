import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ProductsDto } from './products.dto'
import { ProductsModel } from './products.model'
import { Category, Status } from 'libs/products/src'
import { faker } from '@faker-js/faker'

type Nullish<T> = T | null | undefined
type QueryArg<T> = { param: Nullish<T>; query: { [key: string]: any } }

class QueryBuilder<T> {
	query: { [key: string]: any }

	constructor(...args: QueryArg<T>[]) {
		const truthy = args.filter((queryArg) => !!queryArg?.param)
		this.query = { $and: truthy.map(({ query }) => query) }
	}

	add(arg: QueryArg<T>) {
		this.query = { ...this.query, ...arg.query }
		return this.query
	}

	addIfTruthy(arg: QueryArg<T>) {
		if (!!arg.param) {
			this.query = { ...this.query, ...arg.query }
		}

		return this.query
	}

	build() {
		return this.query
	}
}

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(ProductsModel.name)
		private readonly productsModel: Model<ProductsModel>
	) {}

	async populate() {
		const preloadedImgs = [
			'barley.png',
			'canola.png',
			'corn.png',
			'oats.png',
			'soy.png',
			'wheat.png',
		]

		const createProp = (): ProductsDto => ({
			name: faker.commerce.productName(),
			description: faker.lorem.words(
				Math.floor(Math.random() * (10 - 4 + 1)) + 4
			),
			image: faker.helpers.arrayElement(preloadedImgs),
			price: parseInt(faker.random.numeric(2), 10),
			discount: faker.helpers.maybe(() => faker.random.numeric(1)),
			status: faker.helpers.maybe(() =>
				faker.helpers.arrayElements(Object.values(Status) as Status[])
			),
			category: faker.helpers.arrayElement(
				Object.values(Category) as Category[]
			),
		})

		for (let i = 0; i < 30; i++) {
			const product = createProp()
			await this.productsModel.create(product)
		}
	}

	async create(productsDto: ProductsDto) {
		return await this.productsModel.create(productsDto)
	}

	async getAll(query?: string, category?: string, status?: string[]) {
		const queryBuilder = new QueryBuilder<string | string[]>(
			{ param: category, query: { category } },
			{ param: status, query: { status: { $all: status } } }
		)

		return await this.productsModel.find(
			queryBuilder.addIfTruthy({
				param: query,
				query: { $text: { $search: query } },
			})
		)
	}

	async getOne(id: string) {
		return await this.productsModel.findById(id)
	}

	async update(body) {
		return await this.productsModel.updateOne(body).exec()
	}

	async del(id: string) {
		return await this.productsModel.deleteOne({ _id: id })
	}

	async delAll() {
		return await this.productsModel.deleteMany()
	}
}
