import { differenceInWeeks } from 'date-fns'
import { useEffect, useState } from 'react';
import styles from '../styles/WeekView.module.css';

export interface WeekViewProps {
	startDate: string;
	timestamps: string[];
	onSelect?: (string) => void;
}

const formatTimestamp = (date: Date) => {
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

interface SelectedItem {
	weekIndex: number;
	timeIndex: number;
}

export const WeekView = (props: WeekViewProps) => {
	const startDate = new Date(props.startDate);
	const { onSelect } = props;
	const [timestamps, setTimestamps] = useState({});
	const [selectedIndex, setSelectedIndex] = useState<SelectedItem | null>(null);
	const { weekIndex, timeIndex } = selectedIndex ?? {};

	useEffect(
		() => {
			const wkTimestamps = props.timestamps.reduce(
				(acc, cur) => {
					const endDate = new Date(cur);
					const diff = differenceInWeeks(endDate, startDate);

					const newEntry = {
						[diff]: acc[diff] ? [...acc[diff], endDate] : [endDate],
					};

					return {
						...acc,
						...newEntry,
					}
				},
				{ },
			);

			setTimestamps(wkTimestamps);
		},
		[props.timestamps]
	);

	const bubbleSelect = (weekIndex: string, timeIndex: string) => {
		if (onSelect) {
			const weeks = Object.keys(timestamps);
			const week = timestamps[weeks[weekIndex]];

			const timestamp = week[timeIndex].toISOString();

			onSelect(timestamp);
		}
	}

	const handleClick = (evt) => {
		const { weekIndex, timeIndex } = evt.target.dataset;

		bubbleSelect(weekIndex, timeIndex);

		setSelectedIndex({ weekIndex: parseInt(weekIndex), timeIndex: parseInt(timeIndex) });
	};

	const handleKeyPress = (evt) => {
		const weeks = Object.keys(timestamps);

		if (weekIndex === undefined || timeIndex === undefined) {
			if (weeks.length > 0 && timestamps[0].length > 0) {
				setSelectedIndex({ weekIndex: 0, timeIndex: 0 });
			} else {
				// no data

				return;
			}
		}

		let targetTimeIndex = timeIndex;
		let targetWeekIndex = weekIndex;

		switch (evt.key) {
			case "Left":
			case "ArrowLeft":
				targetTimeIndex -= 1;

				break;
			case "Right":
			case "ArrowRight":
				targetTimeIndex += 1;

				break;
		}

		if (targetTimeIndex === -1) {
			targetWeekIndex -= 1;

			if (targetWeekIndex >= 0 && targetWeekIndex < weeks.length) {
				targetTimeIndex = timestamps[weeks[targetWeekIndex]].length - 1;
			}
		} else if (targetTimeIndex === timestamps[weeks[targetWeekIndex]].length) {
			targetTimeIndex = 0;
			targetWeekIndex += 1;
		}

		if (targetWeekIndex <= -1) {
			targetWeekIndex = weeks.length - 1;

			if (targetTimeIndex <= -1) {
				targetTimeIndex = timestamps[weeks[targetWeekIndex]].length - 1;
			}
		} else if (targetWeekIndex === weeks.length) {
			targetWeekIndex = 0;
		}

		bubbleSelect(targetWeekIndex.toString(), targetTimeIndex.toString());
		setSelectedIndex({
			weekIndex: targetWeekIndex,
			timeIndex: targetTimeIndex,
		})
	};

	return (
		<ul className={styles.container}
				onKeyDown={handleKeyPress}
				tabIndex={0}>
			{Object.keys(timestamps).map((week, weekIdx) => {
				const weekPadded = week.padStart(2, '0');

				return (
					<li key={week}
							className={styles.week}>
						<h1>Week {weekPadded}</h1>
						{timestamps[week].map((timestamp, idx) => {
							const formatted = formatTimestamp(timestamp);
							const isSelected = weekIndex === weekIdx && timeIndex === idx;

							return (
								<button key={timestamp}
												className={`${styles.weekItem} ${isSelected ? styles.weekItemSelected : ''}`}
												onClick={handleClick}
												data-week-index={weekIdx}
												data-time-index={idx}
												title={formatted}>
								</button>
							);
						})}
					</li>
				);
			})}
		</ul>
	);
};