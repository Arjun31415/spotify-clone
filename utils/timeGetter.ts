var today = new Date();
var curHr = today.getHours();
export default function getTimeGreetings() {
	if (curHr < 12) {
		return "Good morning";
	} else if (curHr < 16) {
		return "Good afternoon";
	} else {
		return "Good evening";
	}
}
