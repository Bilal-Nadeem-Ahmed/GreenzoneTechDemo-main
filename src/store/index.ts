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
		// returns complete todos
		getCompleteToDos(state) {
			return state.todos.filter((todo) => todo.isCompleted === true);
		},
		//returns incomplete todos
		getIncompleteToDos(state) {
			return state.todos.filter((todo) => todo.isCompleted === false);
		},
	},
	mutations: {
		AddToDo(state, todo: Todo) {
			state.todos.push(todo);
		},
		// This methods toggles the value of is complete of a todo
		ToggleIsComplete(state, todo: Todo) {
			const idToToggle = state.todos.filter((x) => x.id === todo.id);
			const toDoToRemove = state.todos.indexOf(todo);
			state.todos.splice(toDoToRemove, 1);
			idToToggle[0].isCompleted = !idToToggle[0].isCompleted;
			state.todos.push(idToToggle[0]);
		},
		//This method deletes todos
		DeleteTodo(state, todo: Todo) {
			const toDoToRemove = state.todos.indexOf(todo);
			state.todos.splice(toDoToRemove, 1);
		},
		EditTodo(state, todo: Todo) {
			const toDoToDelete = state.todos.filter((x) => x.id === todo.id);
			const toDoToRemove = state.todos.indexOf(toDoToDelete[0]);
			state.todos.splice(toDoToRemove, 1, todo);
			// state.todos.push(todo);
		},
	},
	actions: {
		addToDo({ commit }, todo: Todo) {
			commit('AddToDo', todo);
		},
		toggleIsComplete({ commit }, todo: Todo) {
			commit('ToggleIsComplete', todo);
		},
		deleteTodo({ commit }, todo: Todo) {
			commit('DeleteTodo', todo);
		},
		editToDo({ commit }, todo: Todo) {
			commit('EditTodo', todo);
		},
	},
	modules: {},
});
