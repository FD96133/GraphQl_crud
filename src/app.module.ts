import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { BookModule } from './book/book.module';

@Module({
  imports: [
GraphQLModule.forRoot({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
  definitions : {
    path : join(process.cwd(),'src/graphql.ts'), 
  }
}),
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Bhopal',
  database: 'book_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}),
BookModule
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
