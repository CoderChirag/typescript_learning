import Project, { ProjectStatus } from '../Models/Project';
import State from './State';

class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {
		super();
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new ProjectState();
		}
		return this.instance;
	}

	addProject(
		title: string,
		description: string,
		numOfPeople: number,
		status: ProjectStatus
	) {
		const newProject = new Project(
			Math.random().toString(),
			title,
			description,
			numOfPeople,
			status
		);
		this.projects.push(newProject);
		this.updateListeners();
	}

	moveProject(projectId: number | string, newStatus: ProjectStatus) {
		const project = this.projects.find(project => project.id === projectId);
		if (project && project.status !== newStatus) {
			project.status = newStatus;
			this.updateListeners();
		}
	}

	private updateListeners() {
		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice());
		}
	}
}

const projectState = ProjectState.getInstance();

export default projectState;
