import { Request, Response } from "express";
import * as projectService from "./projects.service";
import { ParamsSchema } from "./schemas/params.schema";
import { CreateProjectSchema } from "./schemas/create-project.schema";
import { UpdateProjectSchema } from "./schemas/update-project.schema";
import { ZodError } from "zod";

export async function findAll(request: Request, response: Response) {
	try {
		const projects = await projectService.findAllProjects();
		if (!projects) throw new Error(`Projects not found`);

		return response.status(200).json({ data: projects });
	} catch (error: any) {
		if (error.message === "Projects not found")
			return response.status(404).json({ error });
		return response.status(400).json({ error });
	}
}

export async function findOne(request: Request, response: Response) {
	try {
		const params = ParamsSchema.parse(request.params);
		const project = await projectService.findProjectById(params.id);
		if (!project) throw new Error(`Project with id ${params.id} not found`);

		return response.status(200).json({ data: project });
	} catch (error: any) {
		if (error.message === `Project with id ${request.params.id} not found`)
			return response.status(404).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function create(request: Request, response: Response) {
	try {
		const projectSchema = CreateProjectSchema.parse(request.body);
		const project = await projectService.createProject(projectSchema);
		return response.status(200).json({ data: project });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		return response.status(400).json({ error });
	}
}

export async function update(request: Request, response: Response) {
	try {
		const params = ParamsSchema.parse(request.params);
		const updateProjectSchema = UpdateProjectSchema.parse(request.body);

		const project = await projectService.updateProject(
			params.id,
			updateProjectSchema
		);
		return response.status(200).json({ data: project });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		return response.status(400).json({ error });
	}
}

export async function remove(request: Request, response: Response) {
	try {
		const params = ParamsSchema.parse(request.params);
		const project = projectService.removeProject(params.id);
		return response.status(200).json({ data: project });
	} catch (error) {
		return response.status(400).json({ error });
	}
}
