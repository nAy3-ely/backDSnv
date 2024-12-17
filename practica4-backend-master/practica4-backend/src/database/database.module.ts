import { Module } from '@nestjs/common';
import { databaseProvider } from './database.providers';
import { ConfigService } from 'src/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(config: ConfigService)=>({
                
                    type:'postgres',
                    host:config.get('HOST') ||'localhost',
                    port: +config.get('PORT')|| 5434,
                    username: config.get('USERNAME')||'root',
                    password: config.get('PASSWORD')|| 'prueba',
                    database: config.get('DATABASE') ||'backend_proyecto',
                    entities: [
                        __dirname + '/../**/*.entity{.ts,.js}',
                    ],
                    synchronize: true,
            }),
        }),
    ],
    providers:[...databaseProvider, ConfigService],
    exports:[...databaseProvider]
})
export class DatabaseModule {

}