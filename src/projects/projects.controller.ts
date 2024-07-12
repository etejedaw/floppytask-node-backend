import { Request, Response } from "express";
import * as projectsService from "./projects.service";
import {
	IdParamSchema,
	CreateProjectSchema,
	UpdateProjectSchema
} from "./schemas";
import { ZodError } from "zod";
import { NotFoundException } from "../errors";

export async function findAll(request: Request, response: Response) {
	try {
		const projects = await projectsService.findAllProjects();
		if (!projects) throw new NotFoundException(`Projects not found`);

		return response.status(200).json({ data: projects });
	} catch (error) {
		if (error instanceof NotFoundException)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function findOne(request: Request, response: Response) {
	try {
		const params = IdParamSchema.parse(request.params);
		const project = await projectsService.findProjectById(params.id);
		if (!project)
			throw new NotFoundException(
				`Project with id ${params.id} not found`
			);

		return response.status(200).json({ data: project });
	} catch (error) {
		if (error instanceof NotFoundException)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function create(request: Request, response: Response) {
	try {
		const projectSchema = CreateProjectSchema.parse(request.body);

		const project = await projectsService.createProject(projectSchema);

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
		const params = IdParamSchema.parse(request.params);
		const updateProjectSchema = UpdateProjectSchema.parse(request.body);

		const project = await projectsService.updateProject(
			params.id,
			updateProjectSchema
		);
		if (!project)
			throw new NotFoundException(
				`Project with id ${params.id} not found`
			);

		return response.status(200).json({ data: project });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		if (error instanceof NotFoundException)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function remove(request: Request, response: Response) {
	try {
		const params = IdParamSchema.parse(request.params);

		const project = projectsService.removeProject(params.id);
		if (!project)
			throw new NotFoundException(
				`Project with id ${params.id} not found`
			);

		return response.status(200).json({ data: project });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		if (error instanceof NotFoundException)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}
