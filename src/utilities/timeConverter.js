const timeConverter = ((seconds) => {
	seconds = Number(seconds);
	let d = Math.floor(seconds / (3600 * 24));
	let h = Math.floor(seconds % (3600 * 24) / 3600);
	let m = Math.floor(seconds % 3600 / 60);
	let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
	let hDisplay = h > 0 ? h + (h === 1 ? " hr, " : " hrs, ") : "";
	let mDisplay = m > 0 ? m + (m === 1 ? " min, " : " mins ") : "";
	return dDisplay + hDisplay + mDisplay;
})

export default timeConverter;