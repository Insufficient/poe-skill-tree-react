import { InternalPassiveTree } from '../components/models';
import { parseTreeData } from '../lib/parse-tree-data';
import { PassiveTree } from '../components/PassiveTree';
import styles from '../styles/PassiveTreePage.module.css';
import { useEffect, useState } from 'react';
import { enableAllPlugins } from "immer";

enableAllPlugins();

export interface PassiveTreePageProps {
	data: InternalPassiveTree.Data,
	selectedNodes: string[]
}

const passivesOne = [
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

const passivesTwo = [
	720,
	1461,
	2094,
	2185,
	2715,
	3314,
	4481,
	4944,
	5082,
	5237,
	5443,
	6797,
	7112,
	9206,
	9373,
	9469,
	12412,
	12794,
	12948,
	13202,
	14292,
	14804,
	16079,
	17171,
	18703,
	19858,
	20807,
	22266,
	23334,
	23912,
	24133,
	25178,
	25260,
	25511,
	26067,
	27656,
	27788,
	28658,
	28995,
	29870,
	30455,
	30679,
	30969,
	32477,
	32514,
	32555,
	32763,
	33196,
	36221,
	36281,
	36287,
	38149,
	39665,
	39718,
	39821,
	40132,
	41119,
	41989,
	42178,
	42443,
	42804,
	43385,
	45313,
	46277,
	46882,
	47362,
	48614,
	49308,
	49459,
	49900,
	51404,
	51881,
	53002,
	53086,
	54142,
	55392,
	55750,
	56149,
	56295,
	56646,
	56856,
	57199,
	58474,
	58854,
	59146,
	59220,
	59606,
	59837,
	60735,
	60942,
	61306,
	61327,
	61627,
	61834,
	63228,
	64235,
	64878,
	65502
];

function ViewProfilePassiveTree({ data }: PassiveTreePageProps) {
	const [passives, setPassives] = useState(0);
	const [selected, setSelected] = useState([]);

	const togglePassives = () => {
		if (passives === 0) {
			setPassives(1);
			setSelected(passivesOne.map((a) => a.toString()));
		} else {
			setPassives(0);
			setSelected(passivesTwo.map((a) => a.toString()));
		}
	};

	return (
		<div className={styles.container}>
			<h1>Path of Exile Static Passive Tree (React)</h1>
			<button onClick={() => togglePassives()}>Toggle passives</button>

			<div className={styles.box}>
				<PassiveTree data={data} selectedNodes={selected}/>
			</div>
		</div>
	)
}

export default ViewProfilePassiveTree;

const adjustViewport = (data) => {
	return {
		...data,
		constants: {
			...data.constants,
			minX: data.constants.minX + 2000,
			minY: data.constants.minY + 400,
		}
	}
}

export async function getStaticProps() {
	const data = parseTreeData();

	return {
		props: { data: adjustViewport(data) }
	}
}
