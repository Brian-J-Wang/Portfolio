import { useState } from "react";

const UseList = <T>(initial: T[]) => {
	const [list, setList] = useState<T[]>(initial);

	const push = (value: T) => {
		setList([...list, value]);
	};

	const pop = () => {
		setList(list.slice(0, -1));
	};

	const shift = () => {
		setList(list.slice(1));
	};

	const unshift = (value: T) => {
		setList([value, ...list]);
	};

	const toggle = (value: T) => {
		if (list.includes(value)) {
			setList(list.filter((item) => item !== value));
		} else {
			setList([...list, value]);
		}
	};

	const clear = () => {
		setList([]);
	};

	return { list, setList, push, pop, shift, unshift, toggle, clear };
};

export default UseList;
