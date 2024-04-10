import { RequestHandler } from 'express';
import { repository } from '../repository/repository';

export const getAllHandler: RequestHandler = async (_, res) => {
	const todoList = await repository().getAll();
	res.status(200).send(todoList);
};

export const getByIdHandler: RequestHandler<{ id: string }> = async (req, res) => {
	const todo = await repository().getById(req.params.id);
	if (todo) {
		res.status(200).send(todo);
	} else {
		res.status(404).send(`ToDo with id ${req.params.id} is not exist!`);
	}
};

export const createHandler: RequestHandler = async (req, res) => {
	try {
		const todo = await repository().create(req.body);
		res.status(200).send(todo);
	} catch (error) {
		console.log(error);
		res.status(400).send('Invalid data!');
	}
};

export const updateHandler: RequestHandler = async (req, res) => {
	try {
		const todo = await repository().update(req.body);
		res.status(200).send(todo);
	} catch (error) {
		console.log(error);
		res.status(400).send('Invalid data!');
	}
};

export const deleteHandler: RequestHandler<{ id: string }> = async (req, res) => {
	const result = await repository().delete(req.params.id);
	if (result) {
		res.status(200).send(`ToDo item with id ${req.params.id} has been removed!`);
	} else {
		res.status(404).send(`ToDo item with id ${req.params.id} not found!`);
	}
};
