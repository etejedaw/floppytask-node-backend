import type { Request, Response } from "express";
import type { IdParams, CreateProject, UpdateProject } from "./schemas";
import * as projectsService from "./projects.service";
import { ZodError } from "zod";
import { NotFoundException } from "../commons/errors";
import { Users } from "../users/users.model";

export async function findAll(request: Request, response: Response) {
	try {
		const user = request.user as Users;

		const projects = await projectsService.findAllProjects(user.id);
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
		const idParams = request.params as IdParams;
		const user = request.user as Users;

		const project = await projectsService.findProjectById(
			user.id,
			idParams.id
		);
		if (!project)
			throw new NotFoundException(
				`Project with id ${idParams.id} not found`
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
		const projectSchema = request.body as CreateProject;
		const user = request.user as Users;

		const project = await projectsService.createProject(
			user.id,
			projectSchema
		);

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
		const idParams = request.params as IdParams;
		const user = request.user as Users;
		const updateProject = request.body as UpdateProject;

		const project = await projectsService.updateProject(
			user.id,
			idParams.id,
			updateProject
		);
		if (!project)
			throw new NotFoundException(
				`Project with id ${idParams.id} not found`
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
		const idParams = request.params as IdParams;
		const user = request.user as Users;

		const project = projectsService.removeProject(user.id, idParams.id);
		if (!project)
			throw new NotFoundException(
				`Project with id ${idParams.id} not found`
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
