import type {
	CreateTask,
	ProjectIdParams,
	ProjectTaskParams,
	UpdateTask
} from "./schemas";
import { Request, Response } from "express";
import * as tasksService from "./tasks.service";
import * as projectService from "../projects/projects.service";
import {
	CustomError,
	ForbiddenException,
	NotFoundException
} from "../commons/errors";
import { UpdateTaskSchema, ProjectTaskParamsSchema } from "./schemas";
import { ZodError } from "zod";
import { Users } from "../users/users.model";
import { IdParams } from "../projects/schemas";

export async function findAll(request: Request, response: Response) {
	try {
		const user = request.user as Users;

		const tasks = await tasksService.findAllTasks(user.id);
		if (!tasks) throw new NotFoundException(`Tasks not found`);

		return response.status(200).json({ data: tasks });
	} catch (error) {
		if (error instanceof NotFoundException)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function findAllByProject(request: Request, response: Response) {
	try {
		const projectIdParams = request.params as ProjectIdParams;
		const user = request.user as Users;

		const tasks = await tasksService.findAllTasksByProject(
			user.id,
			projectIdParams.projectId
		);
		if (!tasks)
			throw new NotFoundException(
				`Tasks not found in project ${projectIdParams.projectId}`
			);

		return response.status(200).json({ data: tasks });
	} catch (error) {
		if (error instanceof NotFoundException)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function findOne(request: Request, response: Response) {
	try {
		const projectTaskParams = request.params as ProjectTaskParams;
		const user = request.user as Users;

		const task = await tasksService.findTaskById(
			user.id,
			projectTaskParams.projectId,
			projectTaskParams.taskId
		);
		if (!task)
			throw new NotFoundException(
				`Task with id ${projectTaskParams.taskId} not found in project ${projectTaskParams.projectId}`
			);

		return response.status(200).json({ data: task });
	} catch (error) {
		if (error instanceof CustomError)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function create(request: Request, response: Response) {
	try {
		const IdParams = request.params as IdParams;
		const createTask = request.body as CreateTask;
		const user = request.user as Users;

		const project = await projectService.findProjectById(
			user.id,
			IdParams.projectId
		);
		if (!project) throw new ForbiddenException(`Forbidden`);

		const task = await tasksService.creteTask(
			IdParams.projectId,
			createTask
		);

		return response.status(200).json({ data: task });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof CustomError)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function update(request: Request, response: Response) {
	try {
		const projectTaskParams = request.params as ProjectTaskParams;
		const updateTask = request.body as UpdateTask;
		const user = request.user as Users;

		const task = await tasksService.updateTask(
			user.id,
			projectTaskParams.projectId,
			projectTaskParams.taskId,
			updateTask
		);
		if (!task)
			throw new NotFoundException(
				`Task with id ${projectTaskParams.taskId} not found in project ${projectTaskParams.projectId}`
			);

		return response.status(200).json({ data: task });
	} catch (error) {}
}

export async function remove(request: Request, response: Response) {
	try {
		const projectTaskParams = request.params as ProjectTaskParams;
		const user = request.user as Users;

		const task = tasksService.removeTask(
			user.id,
			projectTaskParams.projectId,
			projectTaskParams.taskId
		);
		if (!task)
			throw new NotFoundException(
				`Task with id ${projectTaskParams.taskId} not found in project ${projectTaskParams.projectId}`
			);

		return response.status(200).json({ data: task });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof CustomError)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}
