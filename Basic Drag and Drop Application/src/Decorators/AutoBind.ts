export default function AutoBind(
	_target: any,
	_methodName: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	const newDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			const boundFunction = originalMethod.bind(this);
			return boundFunction;
		},
	};
	return newDescriptor;
}
