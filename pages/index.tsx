import { InternalPassiveTree } from '../components/models';
import { parseTreeData } from '../lib/parse-tree-data';
import { PassiveTree } from '../components/PassiveTree';
import styles from '../styles/PassiveTreePage.module.css';

export interface PassiveTreePageProps {
	data: InternalPassiveTree.Data
}

function PassiveTreePage({ data }: PassiveTreePageProps) {
	const dataAdjusted = {
		...data,
	};

	// make viewport tighter
	dataAdjusted.constants.minX += 2000;
	dataAdjusted.constants.minY += 400;

	return (
		<div className={styles.container}>
			<h1>Path of Exile Static Passive Tree (React)</h1>
			<div className={styles.box}>
				<PassiveTree data={data} />
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
