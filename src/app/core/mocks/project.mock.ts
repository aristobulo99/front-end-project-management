import { faker } from "@faker-js/faker";
import { Project, RoleProject } from "../interfaces/project.interface";


export function mockProject(iteration: number): Project[]{
    const project: Project[] = [];
    for(let i = 0; i < iteration; i++){
        project.push(
            {
                id: faker.number.int({ min: 1, max: 100 }),
                name: faker.company.name(),
                description: faker.company.buzzPhrase(),
                startDate: faker.date.anytime(),
                endingDate: faker.date.anytime(),
                outstanding: faker.datatype.boolean(),
                projectEnable: faker.datatype.boolean(),
                featureProject: faker.datatype.boolean(),
            }
        )
    }

    return project;
}