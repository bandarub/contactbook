let printAlphabets = () => {
	const i = 65;
	const j = 91;
	let arrayAlphabets = [];

	//loop through the values from i to j
	for (let k = i; k < j; k++) {
		//convert the char code to string (Alphabets)
		var str = String.fromCharCode(k);
		arrayAlphabets.push(str);
	}
	return arrayAlphabets;
};

export default printAlphabets;
