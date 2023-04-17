// Project Type
export enum ProjectStatus {
	Active,
	Finished,
}

export default class Project {
	constructor(
		public id: number | string,
		public title: string,
		public description: string,
		public numOfPeople: number,
		public status: ProjectStatus
	) {}
}
