export const capitalize = (string: string) => {
	let autocap: boolean
	if(process.env.AUTO_CAP === "false") autocap = false
    	else autocap = true
	return string && autocap == false ? string.toLowerCase()
		.split(" ")
		.map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(" ") : string;
};
