<template>
	<div class="about">
		<v-app-bar color="deep-purple" dark>
			<v-app-bar-title> Todo List </v-app-bar-title>
		</v-app-bar>
		<h1 class="text-center">My To Do List</h1>
		<ToDoEditCard
			v-if="shouldDisplayEdit"
			@reset="toggleShouldDisplayEdit"
			:toDo="toDoToEdit"
		></ToDoEditCard>
		<ToDoInputCard v-if="!shouldDisplayEdit"></ToDoInputCard>
		<br />
		<h2>Complete ToDos</h2>
		<v-container class="d-flex justify-space-around flex-wrap">
			<div v-for="todo in isCompleted" v-bind:key="todo.id">
				<to-do-item-card
					@editToDo="editToDo"
					v-bind:todo="todo"
				></to-do-item-card>
			</div>
		</v-container>
		<h2>InComplete ToDos</h2>
		<v-container class="d-flex justify-space-around flex-wrap">
			<div v-for="todo in isIncompleted" v-bind:key="todo.id">
				<to-do-item-card
					@editToDo="editToDo"
					v-bind:todo="todo"
				></to-do-item-card>
			</div>
		</v-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
// imports components
import ToDoItemCard from '../components/ToDoItemCard.vue';
import ToDoInputCard from '../components/ToDoInputCard.vue';
import ToDoEditCard from '../components/ToDoEditCard.vue';
import store, { Todo } from '@/store';
import Services from '../Services/index';

// adds components
@Component({ components: { ToDoItemCard, ToDoInputCard, ToDoEditCard } })
export default class HomeView extends Vue {
	public todoToAdd: Todo = {
		title: '',
		description: '',
		id: 0,
		isCompleted: false,
		imageUrl: '',
	};

	isFormValid = false;

	public addToDoItem(): void {
		if (!this.isFormValid) {
			return;
		}
	}
	shouldDisplayEdit = false;
	toDoToEdit: Todo;
	//gets the filtered complete messages
	get isCompleted() {
		return this.$store.getters.getCompleteToDos;
	}
	//gets the filtered incomplete messages
	get isIncompleted() {
		return this.$store.getters.getIncompleteToDos;
	}
	toggleShouldDisplayEdit(): void {
		this.shouldDisplayEdit = !this.shouldDisplayEdit;
	}
	//event listener assigns the todo to edit which is passed as a prop
	public editToDo(id: string) {
		this.toDoToEdit = this.$store.getters.getToDos.filter(
			(todo) => todo.id === id
		)[0];
		this.shouldDisplayEdit = true;
	}
	//gets initial todos and images
	public async getToDos(): Promise<void> {
		const Service = new Services();
		// loaded below would be used for a loading animation
		let loaded = false;
		for (let i = 1; i < 5; i++) {
			let todo = await Service.getTodo(i);
			let image = await Service.getImage();
			let newToDo = {
				title: todo.title,
				description: 'This ToDo is random',
				id: new Date().getTime(),
				isCompleted: todo.completed,
				imageUrl: image.url,
			};
			store.dispatch('addToDo', newToDo);
		}
		loaded = true;
	}
	//calls the method to get initial commits on load, would ideally have a loader/spinner aswell
	public mounted() {
		this.getToDos();
	}
}
</script>

<style lang="scss"></style>
