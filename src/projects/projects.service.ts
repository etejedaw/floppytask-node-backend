import { Projects } from "./projects.model";
import type { CreateProject } from "./schemas/create-project.schema";
import type { UpdateProject } from "./schemas/update-project.schema";

export async function findAllProjects() {
	const projects = await Projects.findAll({
		where: { isActive: true }
	});
	if (projects.length === 0) return;
	return projects;
}

export async function findProjectById(id: string) {
	const project = await Projects.findOne({
		where: { id, isActive: true }
	});
	if (!project) return;
	return project;
}

export async function createProject(createProject: CreateProject) {
	const project = await Projects.create(createProject);
	return project;
}

export async function updateProject(id: string, updateProject: UpdateProject) {
	const project = await findProjectById(id);
	if (!project) return;

	await Projects.update(updateProject, {
		where: { id, isActive: true }
	});

	return await findProjectById(id);
}

export async function removeProject(id: string) {
	const project = await Projects.update(
		{ isActive: false },
		{ where: { id } }
	);
}
