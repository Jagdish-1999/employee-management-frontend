import { formatDate } from "../../../utils/date-formatter.js";

const TimeStamps = ({ item, accessKey }) => {
	const isoDate = formatDate(item[accessKey]);
	const [date, time] = isoDate.split(" ");
	return (
		<div className="w-fit leading-4 py-2 m-auto">
			<h4 className="text-[10px] opacity-80 w-fit">{time}</h4>
			<h4 className="text-[11px] ">{date}</h4>
		</div>
	);
};

export default TimeStamps;
