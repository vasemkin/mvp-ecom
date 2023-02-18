import { ApiProperty } from '@nestjs/swagger'
import { Category, Status } from 'libs/products/src'

export class ProductsDto {
	@ApiProperty({
		example: 'SC3000',
		description: 'Product display name',
	})
	readonly name: string

	@ApiProperty({
		example: 'An amazing product with unique features',
		description: 'Product display description',
	})
	readonly description: string

	@ApiProperty({
		example: '40',
		description: 'Product price in USD',
	})
	readonly price: number

	@ApiProperty({
		example: 'https://ima.ge/product.png',
		description: 'Product thumbnail',
	})
	readonly image: string

	@ApiProperty({
		example: '5',
		description: 'USD discount amount',
	})
	readonly discount?: string

	@ApiProperty({
		example: Object.values(Status),
		description: 'Status array',
		enum: Status,
		isArray: true,
	})
	readonly status?: Status[]

	@ApiProperty({
		example: Object.values(Category)[0],
		description: 'Product category',
		type: 'enum',
		enum: Category,
	})
	readonly category: Category
}

export class FileUploadDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	file: any
}
