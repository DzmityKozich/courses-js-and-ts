import { ToDo } from '../models/ToDo';
import { RepositoryDef } from './repository-def';
import fs from 'fs';

export class RepositoryJson /*  implements RepositoryDef */ {
	public getAll(): ToDo[] {
		const todoList = fs.readFileSync('./db/db.json').toString();
		return todoList as any;
	}
	// getById: (id: string) => ToDo | null;
	// create: (todo: ToDo) => ToDo;
	// update: (todo: ToDo) => ToDo;
	// delete: (id: string) => boolean;
}
