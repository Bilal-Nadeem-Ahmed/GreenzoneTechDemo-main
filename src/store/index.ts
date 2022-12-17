import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface Todo {
	title: string;
	description: string;
	id: number;
	isCompleted: boolean;
	imageUrl: string;
}
interface State {
	todos: Todo[];
}

export default new Vuex.Store<State>({
	state: {
		todos: [
			{
				id: 0,
				title:
					'laboriosam mollitia et enim quasi adipisci quia provident illum',
				description: 'ghjg',
				isCompleted: false,
				imageUrl: 'gjhkg',
			},
		],
	},
	getters: {
		getToDos(state) {
			return state.todos;
		},
	},
	mutations: {
		AddToDo(state, todo: Todo) {
			state.todos.push(todo);
		},
		// This methods toggles the value of is complete of a todo
		ToggleIsComplete(state, todo: Todo) {
			const id = state.todos.filter((x) => x.id === todo.id);
			const toDoToRemove = state.todos.indexOf(todo);
			state.todos.splice(toDoToRemove, 1);
			id[0].isCompleted = !id[0].isCompleted;
			state.todos.push(id[0]);
		},
	},
	//corrects reference string
	actions: {
		addToDo({ commit }, todo: Todo) {
			commit('AddToDo', todo);
		},
		toggleIsComplete({ commit }, todo: Todo) {
			commit('ToggleIsComplete', todo);
		},
	},
	modules: {},
});
