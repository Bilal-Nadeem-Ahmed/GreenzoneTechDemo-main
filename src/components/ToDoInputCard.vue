<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-text-field
			v-model="Title"
			:counter="100"
			:rules="titleRules"
			label="Title"
			required
		></v-text-field>
		<v-text-field
			v-model="Description"
			:rules="descriptionRules"
			label="Description"
			required
		></v-text-field>
		<v-text-field v-model="ImageUrl" label="Image Url"></v-text-field>
		<v-btn :disabled="!valid" color="success" class="mr-4" @click="addToDo">
			addToDo
		</v-btn>
		<v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
	</v-form>
</template>

<script lang="ts">
import store, { Todo } from '@/store';
import { Vue, Prop, Component } from 'vue-property-decorator';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

@Component({
	components: {
		ValidationProvider,
		ValidationObserver,
	},
})
export default class ToDoInputCard extends Vue {
	// variables for the v-model which will be used to create a new todo
	Title = '';
	Description = '';
	ImageUrl = '';
	valid = false;
	reset(): void {
		(this.$refs.form as Vue & { reset: () => boolean }).reset();
	}
	addToDo(): void {
		let todo: Todo = {
			// would ideally use a uuid here
			id: new Date().getTime(),
			title: this.Title,
			description: this.Description,
			// this will default to false as its a new todo
			isCompleted: false,
			imageUrl: this.ImageUrl,
		};

		store.dispatch('addToDo', todo);
		this.reset();
	}
	titleRules = [
		(v: string) => !!v || 'Title is required',
		(v: string) => v.length <= 100 || 'Title must be less than 100 characters',
		(v: string) => v.length >= 10 || 'Title must be more than 10 characters',
	];
	descriptionRules = [
		(v: string) => !!v || 'Description is required',
		(v: string) =>
			v.length <= 1000 || 'Title must be less than 1000 characters',
		(v: string) => v.length >= 10 || 'Title must be more than 10 characters',
	];
}
</script>

<style lang="scss"></style>
