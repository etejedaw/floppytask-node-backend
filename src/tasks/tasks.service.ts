import { CreateTask, UpdateTask } from "./schemas";
import { Tasks } from "./tasks.model";

export async function findAllTasks() {
	const tasks = await Tasks.findAll();
	if (tasks.length === 0) return;

	return tasks;
}

export async function findAllTasksByProject(projectId: string) {
	const tasks = await Tasks.findAll({
		where: { projectId }
	});
	if (tasks.length === 0) return;

	return tasks;
}

export async function findTaskById(projectId: string, taskId: string) {
	const task = await Tasks.findOne({
		where: { id: taskId, projectId }
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
	projectId: string,
	taskId: string,
	updateTask: UpdateTask
) {
	const task = await findTaskById(projectId, taskId);
	if (!task) return;

	await Tasks.update(updateTask, {
		where: { id: taskId }
	});

	return await findTaskById(projectId, taskId);
}

export async function removeTask(projectId: string, taskId: string) {
	const task = await findTaskById(projectId, taskId);
	if (!task) return false;

	await Tasks.destroy({
		where: { projectId, taskId }
	});

	return true;
}
