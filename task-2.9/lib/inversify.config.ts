import { Container } from 'inversify';
import { TodoRepositoryJson } from './repository/todo-repository-json';
import { TodoRepositoryMongo } from './repository/todo-repository-mongo';
import { RepositoryDef } from './repository/repository-def';
import { DI_TYPES } from './di-types';

const DI = new Container();
DI.bind<RepositoryDef>(DI_TYPES.json).to(TodoRepositoryJson);
DI.bind<RepositoryDef>(DI_TYPES.mongo).to(TodoRepositoryMongo);

export { DI };
