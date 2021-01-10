import { InternalPassiveTree, isJewelSocketNode, isKeystoneNode, isNotableNode } from './models';
import { memo } from 'react';
import styles from '../styles/PassiveNode.module.css';

export interface PassiveNodeProps {
	node: InternalPassiveTree.Node
}

const calculateNodeRadius = (node: InternalPassiveTree.Node): number => {
	if (isKeystoneNode(node)) {
		return 60;
	} else if (isNotableNode(node)) {
		return 45;
	} else if (isJewelSocketNode(node)) {
		return 45;
	}

	return 30;
}

function PassiveNode({ node }: PassiveNodeProps) {
	const { x, y, nodeId } = node;
	const radius = calculateNodeRadius(node);

	return (
		<circle className={`${styles.container} ${node.isSelected ? styles.containerSelected : ''}`}
						cx={x}
						cy={y}
						r={radius}
						data-id={nodeId} />
	);
}

export const MemoisedPassiveNode = memo(PassiveNode);
