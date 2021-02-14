import { CharacterSummary, TrackService } from '../../../../lib/services/track.service';
import { CharacterView } from '../../../../components/CharacterView';
import { parseTreeData } from '../../../../lib/parse-tree-data';
import { InternalPassiveTree } from '../../../../components/models';
import { QueryClient, QueryClientProvider } from 'react-query';

export interface CharacterViewPageProps {
	summary: CharacterSummary;
	treeData: InternalPassiveTree.Data;
}

const queryClient = new QueryClient();

const CharacterViewPage = (props: CharacterViewPageProps) => {
	return (

		<QueryClientProvider client={queryClient}>
			<CharacterView summary={props.summary} treeData={props.treeData}/>

			{/*<ReactQueryDevtools initialIsOpen={true} />*/}
		</QueryClientProvider>
	)
}

CharacterViewPage.getInitialProps = async (ctx) => {
	const { accountName, characterName } = ctx.query;

	const service = new TrackService();
	const data = await service.getCharacterSummary(accountName, characterName);

	const treeData = parseTreeData();

	return { summary: data, treeData };
};

export default CharacterViewPage;
