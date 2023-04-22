import Component from './BaseComponent';
import Draggable from '../Models/Draggable';
import Project from '../Models/Project';
import AutoBind from '../Decorators/AutoBind';

export default class ProjectItem
	extends Component<HTMLUListElement, HTMLLIElement>
	implements Draggable
{
	private project: Project;

	get numOfPeople() {
		if (this.project.numOfPeople === 1) {
			return '1 person';
		} else {
			return `${this.project.numOfPeople} persons`;
		}
	}

	constructor(hostId: string, project: Project) {
		super('single-project', hostId, false, project.id.toString());
		this.project = project;

		this.configure();
		this.renderContent();
	}

	@AutoBind
	dragStartHandler(event: DragEvent) {
		event.dataTransfer!.setData('text/plain', this.element.id);
		event.dataTransfer!.dropEffect = 'move';
	}

	@AutoBind
	dragEndHandler(_: DragEvent) {}

	configure() {
		this.element.addEventListener('dragstart', this.dragStartHandler);
		this.element.addEventListener('dragend', this.dragEndHandler);
	}

	renderContent() {
		this.element.querySelector('h2')!.textContent = this.project.title;
		this.element.querySelector(
			'h3'
		)!.textContent = `${this.numOfPeople} assigned`;
		this.element.querySelector('p')!.textContent = this.project.description;
	}
}
