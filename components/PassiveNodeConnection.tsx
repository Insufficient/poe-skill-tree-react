import { InternalPassiveTree } from './models';
import { memo } from 'react';
import styles from '../styles/PassiveNodeConnection.module.css';

export interface PassiveNodeConnectionProps {
	connection: InternalPassiveTree.Connection;
	orbitRadii: number[];
	skillsPerOrbit: number[];
}

function PassiveNodeConnection({ connection, orbitRadii, skillsPerOrbit }: PassiveNodeConnectionProps) {
	const { fromNode, toNode, isCurved } = connection;
	const orbitRadius = orbitRadii[fromNode.orbit!];

	const x1 = fromNode.x;
	const y1 = fromNode.y;

	const x2 = toNode.x;
	const y2 = toNode.y;

	let sweepFlag = 1;

	if (Number.isInteger(fromNode.orbitIndex) && Number.isInteger(toNode.orbitIndex)) {
		const skillsInOrbit = skillsPerOrbit[fromNode.orbit!];

		if (toNode.orbitIndex! - fromNode.orbitIndex! > skillsInOrbit / 2) {
			sweepFlag = 0;
		}
	}

	if (isCurved) {
		return (
			<>
				<path className={`${styles.container} ${connection.isSelected ? styles.containerSelected : ''}`}
							d={`M ${x1} ${y1} A ${orbitRadius} ${orbitRadius}, 0, 0 ${sweepFlag}, ${x2} ${y2}`}
				      fill="transparent"
				      key={`${fromNode.nodeId},${toNode.nodeId}`}
				      data-from={fromNode.nodeId}
				      data-to={toNode.nodeId}
				/>
			</>
		)
	} else {
		return (
			<line className={`${styles.container} ${connection.isSelected ? styles.containerSelected : ''}`}
						x1={x1} y1={y1}
						x2={x2} y2={y2}
						key={`${fromNode.nodeId},${toNode.nodeId}`}
						data-from={fromNode.nodeId}
						data-to={toNode.nodeId}
			/>
		);
	}
}

export const MemoisedPassiveNodeConnection = memo(PassiveNodeConnection);