// TODO: setup function that will take dbType param 'json' | 'mongo'
// and return RepositoryDef object

import { RepositoryDef } from './repository-def';
import { RepositoryJson } from './repository-json';

let repo: RepositoryDef;

export const repository = (): RepositoryDef => {
	if (!repo) {
		repo = process.env.DB_TYPE === 'json' ? new RepositoryJson() : new RepositoryJson();
	}
	return repo;
};
