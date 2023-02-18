import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { getMongoConfig } from '../config/db-connect.config'
import { ProductsModule } from '../products/products.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'envs/.backend.env',
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		ProductsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
