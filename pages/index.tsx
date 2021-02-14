import { InternalPassiveTree } from '../components/models';
import { parseTreeData } from '../lib/parse-tree-data';
import { PassiveTree } from '../components/PassiveTree';
import styles from '../styles/PassiveTreePage.module.css';

export interface PassiveTreePageProps {
	data: InternalPassiveTree.Data,
	selectedNodes: string[]
}

const passives = [
	367,
	2521,
	3452,
	4432,
	5456,
	5935,
	6538,
	6799,
	7388,
	7444,
	7594,
	7960,
	8948,
	9392,
	10099,
	10153,
	10490,
	11430,
	12143,
	12250,
	13322,
	14182,
	14211,
	15435,
	18033,
	18767,
	18769,
	18865,
	20987,
	21033,
	21678,
	21974,
	21984,
	22473,
	22551,
	22618,
	23659,
	23690,
	24496,
	25831,
	27659,
	27929,
	28574,
	28859,
	30919,
	32210,
	32710,
	32932,
	33545,
	33864,
	33989,
	35706,
	35754,
	36634,
	36678,
	36858,
	37671,
	38701,
	39085,
	39841,
	39861,
	41263,
	41534,
	42731,
	42760,
	42795,
	44941,
	46092,
	47251,
	48298,
	48778,
	49605,
	49978,
	50029,
	51782,
	51786,
	51923,
	52502,
	55247,
	55571,
	56722,
	57226,
	57736,
	58029,
	58103,
	60090,
	60398,
	60440,
	61320,
	61653,
	62162,
	63194,
	63425,
	63447,
	63799,
	64210,
	64265,
	65097
];

function PassiveTreePage({ data, selectedNodes }: PassiveTreePageProps) {
	const dataAdjusted = {
		...data,
	};

	// make viewport tighter
	dataAdjusted.constants.minX += 2000;
	dataAdjusted.constants.minY += 400;

	if (!selectedNodes) {
		selectedNodes = passives.map((nodeId) => nodeId.toString());
	}

	return (
		<div className={styles.container}>
			<h1>Path of Exile Static Passive Tree (React)</h1>
			<div className={styles.box}>
				<PassiveTree data={data} selectedNodes={selectedNodes}/>
			</div>
		</div>
	)
}

export default PassiveTreePage;

export async function getStaticProps() {
	const data = parseTreeData();

	return {
		props: { data }
	}
}
