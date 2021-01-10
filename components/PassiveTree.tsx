import { InternalPassiveTree, isAscendancyNode, isMasteryNode } from './models';
import { MemoisedPassiveNode } from './PassiveNode';
import { MemoisedPassiveNodeConnection } from './PassiveNodeConnection';
import { useEffect, useState } from 'react';
import { produce } from 'immer';

export interface PassiveTreeProps {
	data: InternalPassiveTree.Data;
	selectedNodes: string[];
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

export function PassiveTree({ data, selectedNodes }: PassiveTreeProps) {
	const { minX, minY, maxX, maxY, skillsPerOrbit, orbitRadii } = data.constants;
	const width = maxX - minX;
	const height = maxY - minY;
	const defaultState = {
		nodes: data.nodes,
		connectionMap: data.connectionMap,
		nodeList: [],
		connectionList: []
	}

	const [state, setState] = useState(defaultState);

	useEffect(
		() => {
			updatedNodesAndConnections();
		},
		[selectedNodes],
	);

	const updatedNodesAndConnections = () => {
		const nextState = produce({
			...state,
			...data,
		}, draft => {
			console.log({ selectedNodes });

			selectedNodes?.forEach((nodeId) => {
				const node = draft.nodes[nodeId];

				if (node) {
					node.isSelected = true;

					const connections = draft.connectionMap[nodeId];

					connections?.forEach((connection) => {
						if (selectedNodes.includes(connection.toNode.nodeId)) {
							connection.isSelected = true;
						}
					})
				}
			});

			const nodesFiltered = Object.keys(draft.nodes).map((nodeId) => draft.nodes[nodeId]).filter(shouldRenderNode);
			const connectionsFiltered = Object.keys(draft.connectionMap)
				.map((fromNodeId) => draft.connectionMap[fromNodeId])
				.reduce(
					(acc, cur) =>
						cur.reduce((innerAcc, innerCur) => [...innerAcc, innerCur], acc),
					[]
				)
				.filter(shouldRenderConnection);

			draft.nodeList = nodesFiltered;
			draft.connectionList = connectionsFiltered;
		});

		setState(nextState);
	};

	return (
		<svg viewBox={`${minX} ${minY} ${width} ${height}`}>
			{state.connectionList.map((connection) =>
				<MemoisedPassiveNodeConnection connection={connection}
				                               orbitRadii={orbitRadii}
				                               skillsPerOrbit={skillsPerOrbit}
				                               key={`${connection.fromNode.nodeId},${connection.toNode.nodeId}`}/>,
			)}
			{state.nodeList.map((node) =>
				<MemoisedPassiveNode node={node} key={node.nodeId}/>,
			)}
		</svg>
	);
}
