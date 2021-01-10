export declare namespace GGGPassiveTree {
	export interface Group {
		x: number;
		y: number;
		orbits: number[];
		nodes: string[];
	}

	export interface Node {
		name?: string;
		group?: number;
		orbit?: number;
		orbitIndex?: number;

		out?: string[];
		in?: string[];
	}

	export interface SkillNode extends Node {
		skill: number;

		isMultipleChoice?: boolean;
		isMultipleChoiceOption?: boolean;
	}

	export interface JewelSocketNode extends SkillNode {
		isJewelSocket?: boolean;
	}

	export interface MasteryNode extends SkillNode {
		isMastery?: boolean;
	}

	export interface KeystoneNode extends SkillNode {
		isKeystone: boolean;
	}

	export interface NotableNode extends SkillNode {
		isNotable: boolean;
	}

	export interface AscendancyNode extends SkillNode {
		ascendancyName: string;
		isAscendancyStart?: boolean;
	}

	export interface Constants {
		skillsPerOrbit: number[];
		orbitRadii: number[];
	}

	export interface Data {
		constants: Constants;
		groups: Record<string, Group>;
		nodes: Record<string, Node>;
		min_x: number;
		min_y: number;
		max_x: number;
		max_y: number;
	}
}

