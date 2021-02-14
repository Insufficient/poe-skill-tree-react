import { TrackService } from '../lib/services/track.service';
import { InternalPassiveTree } from './models';
import { PassiveTree } from './PassiveTree';
import { useQuery } from 'react-query';

export interface CharacterInfoViewProps {
	accountName: string;
	characterName: string;
	timestamp: string;
	treeData: InternalPassiveTree.Data;
}

export const CharacterInfoView = (props: CharacterInfoViewProps) => {
	const { accountName, characterName, timestamp, treeData } = props;
	const { isLoading, error, data } = useQuery(
		`character-info-${accountName}-${characterName}-${timestamp}`,
		async () => {
			const service = new TrackService();

			return service.getCharacterInfo(accountName, characterName, timestamp);
		},
		{
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 5,
		}
	);

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>An error has occurred</p>

	return (
		<>
			<PassiveTree data={treeData} selectedNodes={data.allocatedPassives}/>
		</>
	)
}