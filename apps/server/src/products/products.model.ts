import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ProductsInterface } from './products.interface'
import { Document } from 'mongoose'
import { Status, Category } from 'libs/products/src'

@Schema({ collection: 'products', timestamps: true })
export class ProductsModel extends Document implements ProductsInterface {
	@Prop({ required: true, text: true })
	name: string

	@Prop({ required: true })
	description: string

	@Prop({ required: true })
	price: number

	@Prop({ required: true })
	image: string

	@Prop({ required: false })
	discount?: string

	@Prop({ required: false, type: Array<Status>, enum: Object.values(Status) })
	status?: Status[]

	@Prop({ required: true, type: String, enum: Category })
	category: Category
}

export const ProductsSchema = SchemaFactory.createForClass(ProductsModel)
