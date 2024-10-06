import { faker } from "@faker-js/faker";
import { Project, RoleProject } from "../interfaces/project.interface";


export function mockProject(iteration: number): Project[]{
    const project: Project[] = [];
    for(let i = 0; i < iteration; i++){
        project.push(
            {
                userId: faker.number.int({ min: 1, max: 100 }),
                userName: faker.person.fullName(),
                projectId: faker.number.int({ min: 1, max: 100 }),
                projectName: faker.company.name(),
                projectDescription: faker.company.buzzPhrase(),
                startDate: faker.date.anytime(),
                endDate: faker.date.anytime(),
                roleProject: RoleProject.PROJECT_ADMIN,
                outstanding: faker.datatype.boolean()
            }
        )
    }

    return project;
}