<template>
	<div class="about">
		<v-app-bar color="deep-purple" dark>
			<v-app-bar-title> Todo List </v-app-bar-title>
		</v-app-bar>
		<p>{{ $store.state.todos }}</p>
		<ToDoItemCard></ToDoItemCard>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
// renames for correct import
import ToDoItemCard from '../components/ToDoItemCard.vue';
import store, { Todo } from '@/store';
import Services from '../Services/index';
// adds component

@Component({ components: { ToDoItemCard } })
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
	// adds method to get random todos with image
	public async getToDos(): Promise<void> {
		const Service = new Services();
		let loaded = false;
		console.log(loaded);
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
	public mounted() {
		this.getToDos();
	}
}
</script>

<style lang="scss"></style>
