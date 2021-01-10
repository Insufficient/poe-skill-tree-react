export declare namespace InternalPassiveTree {
	export interface OrbitPoint {
		x: number;
		y: number;
	}

	export interface Constants {
		orbitRadii: number[];
		orbitPoints: OrbitPoint[][];
		skillsPerOrbit: number[];

		minX: number;
		minY: number;
		maxX: number;
		maxY: number;
	}

	export interface Node {
		nodeId: string;
		groupId?: string;
		orbit?: number;
		orbitIndex?: number;

		name?: string;

		x?: number;
		y?: number;

		out: string[];

		isSelected: boolean;
	}

	export interface JewelSocketNode extends Node {
		isJewelSocket?: boolean;
	}

	export interface MasteryNode extends Node {
		isMastery?: boolean;
	}

	export interface KeystoneNode extends Node {
		isKeystone: boolean;
	}

	export interface NotableNode extends Node {
		isNotable: boolean;
	}

	export interface AscendancyNode extends Node {
		ascendancyName: string;
		isAscendancyStart?: boolean;
	}

	export interface Connection {
		fromNode: Node;
		toNode: Node;
		isCurved: boolean;

		isSelected?: boolean;
	}

	export interface Data {
		constants: Constants;
		connectionMap: Record<string, Connection[]>;
		nodes: Record<string, Node>;
	}
}