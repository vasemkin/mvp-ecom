/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { writeFile } from 'fs/promises'
import { join } from 'path'

import { AppModule } from './app/app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const globalPrefix = 'api'
	app.setGlobalPrefix(globalPrefix)

	const config = new DocumentBuilder()
		.setTitle('Store API')
		.setDescription('Store REST API documentation.')
		.setVersion('v0.1')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs/', app, document)

	const path = join(__dirname, '..', '..', '..', 'public')
	console.log(path)
	app.useStaticAssets(path, {
		prefix: '/api/public',
	})

	const port = process.env.PORT || 3333
	await app.listen(port)
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
	)

	await writeFile('./common/swagger.json', JSON.stringify(document))
	Logger.log('Generated OpenAPI at common/swagger.json')
}

bootstrap()
