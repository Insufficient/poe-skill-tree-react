import { CharacterSummary } from '../lib/services/track.service';
import { useState } from 'react';
import { InternalPassiveTree } from './models';
import { CharacterInfoView } from './CharacterInfoView';
import { WeekView } from './WeekView';

export interface CharacterViewProps {
	summary: CharacterSummary;
	treeData: InternalPassiveTree.Data;
}

const formatTimestamp = (timeString: string) => {
	const date = new Date(timeString);

	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

export const CharacterView = (props: CharacterViewProps) => {
	const { summary, treeData } = props;
	const { accountName, characterName, infoTimestamps } = summary;
	const [selectedTimestamp, setSelectedTimestamp] = useState(null);

	const handleClick = (timestamp: string) => {
		console.log(timestamp);

		setSelectedTimestamp(timestamp);
	}

	return (
		<>
			<h1>{characterName} - {accountName}</h1>

			<WeekView startDate={'2021-01-15T20:00:00Z'} timestamps={infoTimestamps} onSelect={handleClick}/>

			{selectedTimestamp &&
				<>
					<p>Selected: {formatTimestamp(selectedTimestamp)}</p>

					<CharacterInfoView timestamp={selectedTimestamp} accountName={accountName} characterName={characterName} treeData={treeData}/>
				</>
			}
		</>
	);
}
