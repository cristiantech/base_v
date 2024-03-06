import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from '../config';

@Global()
@Module({
  imports:[
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {database,host,pass,port,user} = configService.database;
        return {
          type: 'postgres',
          database,
          host,
          port,
          username: user,
          password: pass,
        }
      },
      inject: [config.KEY]
    }),
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}

