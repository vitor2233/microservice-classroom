import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { CousesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { CoursesService } from 'src/services/courses.service';
import { StudentsService } from 'src/services/students.service';
import { EnrollmentsService } from 'src/services/enrollments.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')
        })
    ],
    providers: [
        //Resolvers
        CousesResolver,
        EnrollmentsResolver,
        StudentsResolver,

        //Services
        CoursesService,
        StudentsService,
        EnrollmentsService
    ]
})
export class HttpModule { }
