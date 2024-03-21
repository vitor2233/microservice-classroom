import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

interface GetByCourseAndStudentIdParams {
    courseId: string;
    studentId: string;
}

interface CreateEnrollmentParams {
    courseId: string;
    studentId: string;
}

@Injectable()
export class EnrollmentsService {
    constructor(private prisma: PrismaService) { }

    listAllEnrollments() {
        return this.prisma.enrollment.findMany({
            where: {
                cancelledAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    getByCourseAndStudentId({ courseId, studentId }: GetByCourseAndStudentIdParams) {
        return this.prisma.enrollment.findFirst({
            where: {
                courseId,
                studentId,
                cancelledAt: null
            }
        })
    }

    listEnrollmentsByStudent(studentId: string) {
        return this.prisma.enrollment.findMany({
            where: {
                studentId,
                cancelledAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    createEnrollment({ studentId, courseId }: CreateEnrollmentParams) {
        return this.prisma.enrollment.create({
            data: {
                studentId,
                courseId
            }
        })
    }
}