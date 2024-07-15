import { Projects } from "../projects/projects.model";
import { CreateTask, UpdateTask } from "./schemas";
import { Tasks } from "./tasks.model";

export async function findAllTasks(userId: string) {
	const tasks = await Tasks.findAll({
		include: [
			{
				model: Projects,
				where: { isActive: true, userId },
				required: true
			}
		]
	});
	if (tasks.length === 0) return;

	return tasks;
}

export async function findAllTasksByProject(userId: string, projectId: string) {
	const tasks = await Tasks.findAll({
		include: [
			{
				model: Projects,
				where: { isActive: true, userId },
				required: true
			}
		],
		where: { projectId }
	});
	if (tasks.length === 0) return;

	return tasks;
}

export async function findTaskById(
	userId: string,
	projectId: string,
	taskId: string
) {
	const task = await Tasks.findOne({
		include: [
			{
				model: Projects,
				where: { id: projectId, isActive: true, userId },
				required: true
			}
		],
		where: { id: taskId }
	});
	if (!task) return;

	return task;
}

export async function creteTask(projectId: string, createTask: CreateTask) {
	const taskData = { ...createTask, projectId };

	const task = await Tasks.create(taskData);

	return task;
}

export async function updateTask(
	userId: string,
	projectId: string,
	taskId: string,
	updateTask: UpdateTask
) {
	const task = await findTaskById(userId, projectId, taskId);
	if (!task) return;

	await Tasks.update(updateTask, {
		where: { id: taskId }
	});

	return await findTaskById(userId, projectId, taskId);
}

export async function removeTask(
	userId: string,
	projectId: string,
	taskId: string
) {
	const task = await findTaskById(userId, projectId, taskId);
	if (!task) return false;

	await Tasks.destroy({
		where: { id: taskId, projectId }
	});

	return true;
}
