import { Projects } from "./projects.model";
import type { CreateProject } from "./schemas/create-project.schema";
import type { UpdateProject } from "./schemas/update-project.schema";

export async function findAllProjects(userId: string) {
	const projects = await Projects.findAll({
		where: { userId, isActive: true }
	});
	if (projects.length === 0) return;
	return projects;
}

export async function findProjectById(userId: string, projectId: string) {
	const project = await Projects.findOne({
		where: { id: projectId, userId, isActive: true }
	});
	if (!project) return;

	return project;
}

export async function createProject(
	userId: string,
	createProject: CreateProject
) {
	const project = await Projects.create({ ...createProject, userId });
	return project;
}

export async function updateProject(
	userId: string,
	projectId: string,
	updateProject: UpdateProject
) {
	const project = await findProjectById(userId, projectId);
	if (!project) return;

	await Projects.update(updateProject, {
		where: { id: projectId, userId }
	});

	return await findProjectById(userId, projectId);
}

export async function removeProject(userId: string, projectId: string) {
	const project = await findProjectById(userId, projectId);
	if (!project) return false;

	await Projects.update(
		{ isActive: false },
		{ where: { id: projectId, userId } }
	);
	return true;
}
