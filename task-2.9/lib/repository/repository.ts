// TODO: setup function that will take dbType param 'json' | 'mongo'
// and return RepositoryDef object

import { RepositoryDef } from './repository-def';
import { TodoRepositoryJson } from './todo-repository-json';
import { TodoRepositoryMongo } from './todo-repository-mongo';

let repo: RepositoryDef;

export const repository = async (): Promise<RepositoryDef> => {
	if (!repo) {
		// repo = process.env.DB_TYPE === 'json' ? new RepositoryJson() : new TodoRepositoryMongo();
		if (process.env.DB_TYPE === 'json') {
			repo = new TodoRepositoryJson();
		} else {
			repo = new TodoRepositoryMongo();
		}
		await repo.init();
	}
	return repo;
};
