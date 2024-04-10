import { ToDo } from '../models/ToDo';

export interface RepositoryDef {
	getAll: () => ToDo[];
	getById: (id: string) => ToDo | null;
	create: (todo: ToDo) => ToDo;
	update: (todo: ToDo) => ToDo;
	delete: (id: string) => boolean;
}
