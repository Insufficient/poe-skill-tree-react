import { InternalPassiveTree, isJewelSocketNode, isKeystoneNode, isNotableNode } from './models';
import { memo } from 'react';

export interface PassiveNodeProps {
	node: InternalPassiveTree.Node
}

const calculateNodeRadius = (node: InternalPassiveTree.Node): number => {
	if (isKeystoneNode(node)) {
		return 60;
	} else if (isNotableNode(node)) {
		return 40;
	} else if (isJewelSocketNode(node)) {
		return 40;
	}

	return 20;
}

function PassiveNode({ node }: PassiveNodeProps) {
	const { x, y, nodeId } = node;
	const radius = calculateNodeRadius(node);

	return (
		<circle cx={x} cy={y} r={radius} stroke="red" fill="red" data-id={nodeId}/>
	);
}

export const MemoisedPassiveNode = memo(PassiveNode);
