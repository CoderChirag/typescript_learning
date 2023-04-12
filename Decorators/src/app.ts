function Logger(logString: string) {
	console.log('LOGGER FACTORY');
	return function (constructor: Function) {
		console.log(logString);
		console.log(constructor);
	};
}

function WithTemplate(template: string, hookId: string) {
	console.log('Template Factory');
	return function <T extends new (..._: any[]) => Person>(
		originalConstructor: T
	) {
		return class extends originalConstructor {
			constructor(..._: any[]) {
				super();
				console.log('Rendering template');
				const hookEl = document.getElementById(hookId);
				if (hookEl) {
					hookEl.innerHTML = template;
					hookEl.querySelector('h1')!.textContent = this.name;
				}
			}
		};
	};
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
	public name = 'Max';

	constructor() {
		console.log('Creating person object...');
	}
}

function Log(constructor: Function) {
	console.log('Class Decorator');
	console.log(constructor);
}

function Log1(target: any, propertyName: string | Symbol) {
	console.log('Property Decorator');
	console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log('Accessor Decorator');
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

function Log3(
	target: any,
	name: string | Symbol,
	descriptor: PropertyDescriptor
) {
	console.log('Method Decorator');
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
	console.log('Parameter Decorator');
	console.log(target);
	console.log(name);
	console.log(position);
}

@Log
class Product {
	@Log1
	public title: string;
	private _price: number;

	constructor(title: string, price: number) {
		this.title = title;
		this._price = price;
	}

	@Log2
	set price(val: number) {
		if (val > 0) {
			this._price = val;
		} else {
			throw new Error('Invalid price - should be positive!');
		}
	}

	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this._price * (1 + tax);
	}
}

// let person = new Person();    // Creating person object => Will render a template as soon as the object instantitated
// console.log(person);
