const parser = new DOMParser();

export async function createComponent<D>(template: string, component: new (view: any) => Component<D>) {
	// TODO: change to current server url
	const res = await fetch(`http://localhost:5173/src/components/${template}`);
	const viewAsString = await res.text();
	const view = parser.parseFromString(viewAsString, 'text/html').querySelector('nav')!;
	console.log(view.childNodes);
	return new component(view);
}

// export async function createComponentElement(template: string, component: new (view: any) => Component<D>) {

// }

export abstract class Component<D> {
	constructor(protected view: HTMLElement) {}

	public abstract onInit(params: D): void;
	public abstract addTo(parent: HTMLElement): void;
}
