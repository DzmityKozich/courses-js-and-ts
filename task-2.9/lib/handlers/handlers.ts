import { RequestHandler } from 'express';
import { RepositoryJson } from '../repository/repository-json';

export const getAllHandler: RequestHandler = (req, res, next) => {
	const repo = new RepositoryJson();
	res.status(200).send(repo.getAll());
};
