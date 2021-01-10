import { InternalPassiveTree, isAscendancyNode, isMasteryNode } from './models';
import { MemoisedPassiveNode } from './PassiveNode';
import { MemoisedPassiveNodeConnection } from './PassiveNodeConnection';

export interface PassiveTreeProps {
	data: InternalPassiveTree.Data;
}

const shouldRenderNode = (node: InternalPassiveTree.Node) => {
	if (!node.x || !node.y) {
		return false;
	}

	if (isAscendancyNode(node)) {
		return false;
	}

	if (isMasteryNode(node)) {
		return false;
	}

	return true;
}

const shouldRenderConnection = ({ fromNode, toNode }: InternalPassiveTree.Connection) => {
	if (!shouldRenderNode(fromNode) || !shouldRenderNode(toNode)) {
		return false;
	}

	if (fromNode.orbit === undefined || toNode.orbit === undefined) {
		return false;
	}

	return true;
}

export function PassiveTree({ data }: PassiveTreeProps) {
	const { minX, minY, maxX, maxY, skillsPerOrbit, orbitRadii } = data.constants;
	const { nodes, connections } = data;
	const width = maxX - minX;
	const height = maxY - minY;

	const nodesFiltered = Object.keys(nodes).map((nodeId) => nodes[nodeId]).filter(shouldRenderNode);
	const connectionsFiltered = connections.filter(shouldRenderConnection);

	return (
		<svg viewBox={`${minX} ${minY} ${width} ${height}`}>
			{connectionsFiltered.map((connection) =>
				<MemoisedPassiveNodeConnection connection={connection}
				                               orbitRadii={orbitRadii}
				                               skillsPerOrbit={skillsPerOrbit}
				                               key={`${connection.fromNode.nodeId},${connection.toNode.nodeId}`}/>,
			)}
			{nodesFiltered.map((node) =>
				<MemoisedPassiveNode node={node} key={node.nodeId}/>,
			)}
		</svg>
	);
}
