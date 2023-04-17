// Project State Management
export type Listener<T> = (items: T[]) => void;

export default class State<T> {
	protected listeners: Listener<T>[] = [];

	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn);
	}
}
