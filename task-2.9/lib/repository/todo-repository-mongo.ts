import { Collection, MongoClient, MongoServerError, ObjectId } from 'mongodb';
import { ToDo } from '../models/ToDo';
import { RepositoryDef } from './repository-def';
import { injectable } from 'inversify';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

const url = process.env.MONGO_PATH || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'todo';
const collcetionName = process.env.MONGO_COLLECTION_NAME || 'todo';

@injectable()
export class TodoRepositoryMongo implements RepositoryDef {
	private collection!: Collection<ToDo>;

	constructor() {}

	public async init(): Promise<void> {
		const client = new MongoClient(url);
		await client.connect();
		this.collection = client.db(dbName).collection(collcetionName);
	}

	public async getAll(): Promise<ToDo[]> {
		try {
			const result = await this.collection.find({}).toArray();
			return result.map(({ id, createdAt, isComplete, text, title }) => new ToDo(id, title, text, createdAt, isComplete));
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	public async getById(id: string): Promise<ToDo | null> {
		try {
			const result = await this.collection.findOne({ id });
			if (!result) return null;
			return new ToDo(result.id, result.title, result.text, result.createdAt, result.isComplete);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public async create(todo: ToDo): Promise<ToDo> {
		const idObj = new ObjectId();
		const newTodo = new ToDo(idObj.toString(), todo.title, todo.text, Date.now(), todo.isComplete);
		try {
			await this.collection.insertOne({ _id: idObj, ...newTodo });
			return newTodo;
		} catch (error) {
			if (error instanceof MongoServerError) {
				return todo;
			}
			console.log(error);
			throw error;
		}
	}

	public async update(todo: ToDo): Promise<ToDo | null> {
		try {
			const newTodo = new ToDo(todo.id, todo.title, todo.text, todo.createdAt, todo.isComplete);
			await this.collection.updateOne({ id: todo.id }, { $set: newTodo });
			return newTodo;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public async delete(id: string): Promise<boolean> {
		try {
			await this.collection.deleteOne({ id });
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
