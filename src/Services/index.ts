export default class Services {
	// the below methods get todos and images from external apis

	async getTodo(number: number): Promise<unknown> {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/todos/${number}`
		).then((response) => response.json());
		return response;
	}
	// the correct url has been added for a random image
	async getImage(): Promise<unknown> {
		const response = await fetch('https://picsum.photos/200/300');
		return response;
	}
}
