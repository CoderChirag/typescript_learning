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

// let person = new Person();    // Creating person object => Will render a template as soon as the object instantitated
// console.log(person);
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

function AutoBind(_target: any, _name: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const newDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return newDescriptor;
}
class Printer {
	message = 'This works!';

	@AutoBind
	showMessage() {
		console.log(this.message);
	}
}

const printer = new Printer();

const button = document.querySelector('button')!;

button.addEventListener('click', printer.showMessage);

interface ValidatorConfig {
	[property: string]: {
		[validatorProp: string]: string[]; // ['required', 'positive']
	};
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: ['required'],
	};
}

function PositiveNumber(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: ['positive'],
	};
}

function validate(obj: any) {
	const objValidatorConfig = registeredValidators[obj.constructor.name];
	if (!objValidatorConfig) {
		return true;
	}
	let isValid = true;
	for (const prop in objValidatorConfig) {
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case 'required':
					isValid = isValid && !!obj[prop];
					break;
				case 'positive':
					isValid = isValid && obj[prop] > 0;
					break;
			}
		}
	}
	return isValid;
}
class Course {
	@Required
	title: string;
	@PositiveNumber
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', e => {
	e.preventDefault();
	const titleEl = document.getElementById('title') as HTMLInputElement;
	const priceEl = document.getElementById('price') as HTMLInputElement;

	const title = titleEl.value;
	const price = +priceEl.value;

	const createdCourse = new Course(title, price);
	if (!validate(createdCourse)) {
		alert('Invalid input, please try again!');
		return;
	}
	console.log(createdCourse);
});
