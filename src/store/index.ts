import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store<any>({
	state: {
		todos: [],
	},
	getters: {
		getToDos(state) {
			return state.todos;
		},
	},
	mutations: {
		AddToDo(state, todo: any) {
			state.todos = todo;
		},
	},
	actions: {
		addToDo({ commit }, todo: any) {
			const todos = this.state.todos;
			todos.push(todo);
			commit('AddToTodo', todos);
		},
	},
	modules: {},
});
