import { Request, Response } from "express";
import * as tasksService from "./tasks.service";
import { NotFoundException } from "../commons/errors";
import {
	CreateTaskSchema,
	ProjectTaskParamsSchema,
	UpdateTaskSchema
} from "./schemas";
import { ZodError } from "zod";
import { ProjectIdParamsSchema } from "./schemas";

export async function findAll(request: Request, response: Response) {
	try {
		const tasks = await tasksService.findAllTasks();
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
		const projectIdParams = ProjectIdParamsSchema.parse(request.params);

		const tasks = await tasksService.findAllTasksByProject(
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
		const projectTaskParams = ProjectTaskParamsSchema.parse(request.params);

		const task = await tasksService.findTaskById(
			projectTaskParams.projectId,
			projectTaskParams.taskId
		);
		if (!task)
			throw new NotFoundException(
				`Task with id ${projectTaskParams.taskId} not found in project ${projectTaskParams.projectId}`
			);

		return response.status(200).json({ data: task });
	} catch (error) {
		if (error instanceof NotFoundException)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function create(request: Request, response: Response) {
	try {
		const projectIdParams = ProjectIdParamsSchema.parse(request.params);
		const taskSchema = CreateTaskSchema.parse(request.body);

		const task = await tasksService.creteTask(
			projectIdParams.projectId,
			taskSchema
		);

		return response.status(200).json({ data: task });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		return response.status(400).json({ error });
	}
}

export async function update(request: Request, response: Response) {
	try {
		const params = ProjectTaskParamsSchema.parse(request.params);
		const updateTaskSchema = UpdateTaskSchema.parse(request.body);

		const task = await tasksService.updateTask(
			params.projectId,
			params.taskId,
			updateTaskSchema
		);
		if (!task)
			throw new NotFoundException(
				`Task with id ${params.taskId} not found in project ${params.projectId}`
			);

		return response.status(200).json({ data: task });
	} catch (error) {}
}

export async function remove(request: Request, response: Response) {
	try {
		const params = ProjectTaskParamsSchema.parse(request.params);

		const task = tasksService.removeTask(params.projectId, params.taskId);
		if (!task)
			throw new NotFoundException(
				`Task with id ${params.taskId} not found in project ${params.projectId}`
			);

		return response.status(200).json({ data: task });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		if (error instanceof NotFoundException)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}
