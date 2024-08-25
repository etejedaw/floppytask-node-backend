import { Projects } from "../projects/projects.model";
import { CreateTask, UpdateTask } from "./schemas";
import { Tasks } from "./tasks.model";

export async function findAll(
	whereProject: Partial<Projects>,
	whereTask?: Partial<Tasks>
) {
	const tasks = await Tasks.findAll({
		where: whereTask,
		include: [{ model: Projects, where: whereProject }]
	});
	if (tasks.length === 0) return;

	return tasks;
}

export async function findOne(
	whereProject: Partial<Projects>,
	whereTask: Partial<Tasks>
) {
	const task = Tasks.findOne({
		where: whereTask,
		include: [{ model: Projects, where: whereProject }]
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
	taskId: string,
	updateTask: UpdateTask
) {
	const task = await findOne({ userId }, { id: taskId });
	if (!task) return;

	await Tasks.update(updateTask, {
		where: { id: taskId }
	});

	return await findOne({ userId }, { id: taskId });
}

export async function removeTask(userId: string, taskId: string) {
	const task = await findOne({ userId }, { id: taskId });
	if (!task) return false;

	await Tasks.destroy({ where: { id: taskId } });

	return true;
}
