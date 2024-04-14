import { ToDo } from '../models/ToDo';

export interface RepositoryDef {
	init: () => Promise<void>;
	getAll: () => Promise<ToDo[]>;
	getById: (id: string) => Promise<ToDo | null>;
	create: (todo: ToDo) => Promise<ToDo>;
	update: (todo: ToDo) => Promise<ToDo | null>;
	delete: (id: string) => Promise<boolean>;
}
