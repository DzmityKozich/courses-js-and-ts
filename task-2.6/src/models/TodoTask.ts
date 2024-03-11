export class TodoTask {
	public readonly timestamp = Date.now();

	constructor(public text: string, public isComplete: boolean) {}
}
