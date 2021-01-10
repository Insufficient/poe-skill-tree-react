import { GGGPassiveTree } from './passive-tree.interface';
import { InternalPassiveTree } from '../../components/models';
import { isSkillNode } from './passive-tree.typeguards';

export class PassiveTreeService {
	groupMap: Record<string, GGGPassiveTree.Group> = {};
	orbitPoints: InternalPassiveTree.OrbitPoint[][] = [];
	nodeMap: Record<string, InternalPassiveTree.Node> = {};
	connections: InternalPassiveTree.Connection[] = [];
	data: GGGPassiveTree.Data;

	constructor(data: GGGPassiveTree.Data) {
		this.data = data;
	}

	precomputeOrbitPoints(): InternalPassiveTree.OrbitPoint[][] {
		return this.data.constants.skillsPerOrbit.map((skillsInOrbit: number, orbitIndex: number) => {
			const radiansPerIndex = (2 * Math.PI) / skillsInOrbit;
			const radius = this.data.constants.orbitRadii[orbitIndex];
			const results = [];

			for (const i of Array.from(Array(skillsInOrbit).keys())) {
				const [x, y] = [radius * Math.sin(radiansPerIndex * i), radius * Math.cos(radiansPerIndex * i)]

				results.push({
					x,
					y: -y, // this is negative because positive y goes downwards in canvas land
				});
			}

			return results;
		});
	}

	parseGroups(): Record<number, GGGPassiveTree.Group> {
		const groups = Object.keys(this.data.groups).map((groupId) => {
			const group = this.data.groups[groupId];

			const maximumOrbit = Math.max(...group.orbits);
			const radius = this.data.constants.orbitRadii[maximumOrbit];

			return {
				...group,
				radius,
				groupId,
			};
		});

		return groups.reduce(
			(acc, cur) => ({
				...acc,
				[cur.groupId]: cur,
			}),
			{},
		);
	}

	mapToInternalNode(node: GGGPassiveTree.Node, nodeId: string): InternalPassiveTree.Node {
		return {
			...node,
			nodeId,
			out: node.out ?? [],
			name: node.name ?? '',
			groupId: node.group?.toString() ?? null,
			isSelected: false,
		};
	}

	handleNode(node: GGGPassiveTree.Node, nodeId: string) {
		let result: InternalPassiveTree.Node = this.mapToInternalNode(node, nodeId);

		if (isSkillNode(node) && node.group) {
			if (node.orbit !== undefined && node.orbitIndex !== undefined) {
				const { x, y } = this.groupMap[node.group];
				const orbitDelta = this.orbitPoints[node.orbit][node.orbitIndex];

				result = {
					...result,
					x: x + orbitDelta.x,
					y: y + orbitDelta.y,
				}
			}
		}

		return result;
	}

	parseNodes(): Record<string, InternalPassiveTree.Node> {
		const nodes = Object.keys(this.data.nodes).map((nodeId) => {
			const node = this.data.nodes[nodeId];

			return this.handleNode(node, nodeId);
		});

		return nodes.reduce(
			(acc, cur) => ({
				...acc,
				[cur.nodeId]: cur,
			}),
			{},
		);
	}

	parseConnections(): InternalPassiveTree.Connection[] {
		let connections: InternalPassiveTree.Connection[] = [];
		Object.keys(this.nodeMap).forEach((nodeOneId) => {
			const nodeOne = this.nodeMap[nodeOneId];

			nodeOne.out?.forEach((nodeTwoId) => {
				const nodeTwo = this.nodeMap[nodeTwoId];

				if (!nodeTwo) {
					return;
				}

				const isCurved = nodeOne.groupId === nodeTwo.groupId && nodeOne.orbit === nodeTwo.orbit;
				const nodes = [nodeOne, nodeTwo];

				nodes.sort((a, b) => {
					if (Number.isInteger(a.orbitIndex) && Number.isInteger(b.orbitIndex)) {
						return (a.orbitIndex! < b.orbitIndex!) ? -1 : 1;
					}

					return -1;
				});

				const [fromNode, toNode] = nodes;

				connections.push({
					fromNode,
					toNode,
					isCurved
				});
			})
		});

		return connections;
	}

	getData(): InternalPassiveTree.Data {
		this.orbitPoints = this.precomputeOrbitPoints();

		const constants = {
			orbitPoints: this.orbitPoints,
			orbitRadii: this.data.constants.orbitRadii,
			skillsPerOrbit: this.data.constants.skillsPerOrbit,
			minX: this.data.min_x,
			minY: this.data.min_y,
			maxX: this.data.max_x,
			maxY: this.data.max_y,
		};

		this.groupMap = this.parseGroups();
		this.nodeMap = this.parseNodes();
		this.connections = this.parseConnections();

		return {
			constants,
			nodes: this.nodeMap,
			connections: this.connections,
		};
	}
}
