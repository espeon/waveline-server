export const capitalize = (string: string) => {
	return string && process.env.AUTO_CAP? string.toLowerCase()
		.split(" ")
		.map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(" ") : string;
};
