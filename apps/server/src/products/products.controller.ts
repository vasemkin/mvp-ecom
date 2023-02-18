import {
	Body,
	Controller,
	Delete,
	FileTypeValidator,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	Put,
	Query,
	Res,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { FileUploadDto, ProductsDto } from './products.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import {
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { Category, Status } from 'libs/products/src'
import { FileExtender } from '../interceptors/file.extender'

@ApiTags('products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@ApiOperation({
		summary: 'Populates the DB with random values',
	})
	@Post('populate')
	async populate() {
		await this.productsService.populate()
		return 'OK'
	}

	@ApiOperation({
		summary: 'Creates a product',
	})
	@ApiResponse({
		status: 200,
		type: ProductsDto,
	})
	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() productsDto: ProductsDto) {
		return await this.productsService.create(productsDto)
	}

	@ApiOperation({
		summary: 'Get all products in the store',
	})
	@ApiResponse({
		status: 200,
		type: [ProductsDto],
	})
	@ApiQuery({
		name: 'query',
		type: String,
		description: 'FTS query text',
		required: false,
	})
	@ApiQuery({
		name: 'category',
		type: String,
		description: `Product category. Allowed values: ${Object.values(
			Category
		)}`,
		required: false,
		example: 'Barley',
	})
	@ApiQuery({
		name: 'status',
		type: String,
		description: `Products statuses separated by comma. Allowed values: ${Object.values(
			Status
		)}`,
		required: false,
		example: 'New,Limited',
	})
	@Get()
	async getAll(
		@Query('query') query?: string,
		@Query('category') category?: Category,
		@Query('status') status?: string
	) {
		return await this.productsService.getAll(
			query,
			category,
			status?.split(',') || null
		)
	}

	@ApiOperation({
		summary: 'Get a single product',
	})
	@ApiResponse({
		status: 200,
		type: ProductsDto,
	})
	@Get(':id')
	async getOne(@Param('id') id: string) {
		return await this.productsService.getOne(id)
	}

	@ApiOperation({
		summary: 'Update product info',
	})
	@ApiResponse({
		status: 200,
	})
	@UsePipes(new ValidationPipe())
	@Put()
	async update(@Body() productsDto: ProductsDto) {
		return await this.productsService.update(productsDto)
	}

	@ApiOperation({
		summary: 'Delete a product',
	})
	@ApiResponse({
		status: 200,
	})
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.productsService.del(id)
	}

	@ApiOperation({
		summary: "Upload an image to the server's disk storage",
	})
	@ApiResponse({
		status: 200,
		type: ProductsDto,
	})
	@ApiBody({
		description: 'Product image upload',
		type: FileUploadDto,
	})
	@ApiConsumes('multipart/form-data')
	@Post(':id/image')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(FileExtender)
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './public/',
				filename: function (_, file, cb) {
					cb(null, `${Date.now()}-${file.originalname}`)
				},
			}),
		})
	)
	async upload(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
					new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
				],
			})
		)
		file,
		@Param('id') id: string
	) {
		await this.productsService.update({ _id: id, image: file.filename })
		return this.productsService.getOne(id)
	}

	// for dev purposes only
	@Delete()
	async deleteAll() {
		return await this.productsService.delAll()
	}
}
