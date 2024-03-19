import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Course } from "../models/course";
import { CoursesService } from "src/services/courses.service";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { CreateCourseInput } from "../inputs/create-couse-input";
import { AuthUser, CurrentUser } from "src/http/auth/current-user";
import { EnrollmentsService } from "src/services/enrollments.service";
import { StudentsService } from "src/services/students.service";
import { UnauthorizedError } from "express-jwt";

@Resolver(() => Course)
export class CousesResolver {
    constructor(
        private coursesService: CoursesService,
        private enrollmentsService: EnrollmentsService,
        private studentsService: StudentsService
    ) { }

    @Query(() => [Course])
    @UseGuards(AuthorizationGuard)
    courses() {
        return this.coursesService.listAllCourses();
    }

    @Query(() => Course)
    @UseGuards(AuthorizationGuard)
    async course(
        @Args('id') id: string,
        @CurrentUser() user: AuthUser
    ) {
        const student = await this.studentsService.getStudentByAuthUser(user.sub);

        if (!student) {
            throw new Error('Student not found')
        }

        const enrollment = await this.enrollmentsService.getByCourseAndStudentId(
            {
                courseId: id, studentId: student.id
            });

        if (!enrollment) {
            throw new UnauthorizedException('Student does not have access to this course')
        }

        return this.coursesService.getCourseById(id);
    }

    @Mutation(() => Course)
    @UseGuards(AuthorizationGuard)
    createCourse(
        @Args('data') data: CreateCourseInput,
    ) {
        return this.coursesService.createCourse(data)
    }
}