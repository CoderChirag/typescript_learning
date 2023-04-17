import Component from './BaseComponent.js';
import Validatable from '../Utils/Validatable.js';
import { validate } from '../Utils/validation.js';
import AutoBind from '../Decorators/AutoBind.js';
import projectState from '../State/ProjectState.js';
import { ProjectStatus } from '../Models/Project.js';

export default class ProjectInput extends Component<
	HTMLDivElement,
	HTMLFormElement
> {
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLTextAreaElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		super('project-input', 'app', true, 'user-input');

		this.titleInputElement = this.element.querySelector('#title')!;
		this.descriptionInputElement =
			this.element.querySelector('#description')!;
		this.peopleInputElement = this.element.querySelector('#people')!;

		this.renderContent();
		this.configure();
	}

	configure() {
		this.element.addEventListener('submit', this.submitHandler);
	}

	renderContent() {}

	private gatherInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		const titleValidatable: Validatable = {
			value: enteredTitle,
			required: true,
		};

		const descriptionValidatable: Validatable = {
			value: enteredDescription,
			required: true,
			minLength: 5,
		};

		const peopleValidatable: Validatable = {
			value: +enteredPeople,
			required: true,
			min: 1,
			max: 5,
		};

		if (
			!validate(titleValidatable) ||
			!validate(descriptionValidatable) ||
			!validate(peopleValidatable)
		) {
			alert('Invalid input, please try again!');
			return;
		}

		return [enteredTitle, enteredDescription, +enteredPeople];
	}

	private clearInputs() {
		this.titleInputElement.value = '';
		this.descriptionInputElement.value = '';
		this.peopleInputElement.value = '';
	}

	@AutoBind
	private submitHandler(event: Event) {
		event.preventDefault();
		const userInput = this.gatherInput();

		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;
			projectState.addProject(
				title,
				description,
				people,
				ProjectStatus.Active
			);
			this.clearInputs();
		}
	}
}
