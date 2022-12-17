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
				id: 1,
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
	},
	//corrects reference string
	actions: {
		addToDo({ commit }, todo: any) {
			commit('AddToDo', todo);
		},
	},
	modules: {},
});
