<template>
	<v-card class="mx-auto my-12" max-width="254">
		<template slot="progress">
			<v-progress-linear
				color="deep-purple"
				height="10"
				indeterminate
			></v-progress-linear>
		</template>
		<v-img height="250" :src="todo.imageUrl"></v-img>
		<v-card-title>{{ todo.title }}</v-card-title>
		<v-divider class="mx-4"></v-divider>
		<v-card-title> {{ todo.description }}</v-card-title>
		<v-card-actions>
			<v-btn color="deep-purple lighten-2 " text @click="toggleStatus">
				{{ toggleMessage() }}
			</v-btn>
			<v-icon @click="deleteTodo" color="#dc143c">mdi-delete</v-icon>
			<v-icon color="#1e90ff">mdi-pencil</v-icon>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import store, { Todo } from '@/store';
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component({})
export default class ToDoItemCard extends Vue {
	@Prop() todo!: Todo;
	toggleStatus(): void {
		store.dispatch('toggleIsComplete', this.todo);
	}
	deleteTodo(): void {
		store.dispatch('deleteTodo', this.todo);
	}
	toggleMessage(): string {
		if (this.todo.isCompleted === true) {
			return 'Set As Incomplete';
		}
		return 'Set as Complete';
	}
}
</script>
// added styles cant seem to get them to work so using inline
<style lang="scss">
.delete {
	color: #dc143c;
	:hover {
		color: #ff0000;
	}
}
.edit {
	color: #1e90ff;
	:hover {
		color: #0000ff;
	}
}
</style>
