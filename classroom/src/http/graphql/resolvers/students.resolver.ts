import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Student } from "../models/student";
import { StudentsService } from "src/services/students.service";
import { UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { EnrollmentsService } from "src/services/enrollments.service";
import { AuthUser, CurrentUser } from "src/http/auth/current-user";

@Resolver(() => Student)
export class StudentsResolver {
    constructor(
        private studentsService: StudentsService,
        private enrollmentsService: EnrollmentsService
    ) { }

    @Query(() => Student)
    @UseGuards(AuthorizationGuard)
    me(
        @CurrentUser() user: AuthUser
    ) {
        return this.studentsService.getStudentByAuthUser(user.sub);
    }

    @Query(() => [Student])
    @UseGuards(AuthorizationGuard)
    students() {
        return this.studentsService.listAllStudents();
    }

    @ResolveField()
    enrollments(
        @Parent() student: Student
    ) {
        return this.enrollmentsService.listEnrollmentsByStudent(student.id);
    }
}