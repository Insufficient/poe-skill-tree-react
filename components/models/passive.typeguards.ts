import { InternalPassiveTree } from './passive.interface';

export const isKeystoneNode = (node: InternalPassiveTree.Node | InternalPassiveTree.KeystoneNode): node is InternalPassiveTree.KeystoneNode => {
	return (node as InternalPassiveTree.KeystoneNode).isKeystone;
}

export const isNotableNode = (node: InternalPassiveTree.Node | InternalPassiveTree.NotableNode): node is InternalPassiveTree.NotableNode => {
	return (node as InternalPassiveTree.NotableNode).isNotable;
}

export const isAscendancyNode = (node: InternalPassiveTree.Node | InternalPassiveTree.AscendancyNode): node is InternalPassiveTree.AscendancyNode => {
	return !!(node as InternalPassiveTree.AscendancyNode).ascendancyName;
}

export const isMasteryNode = (node: InternalPassiveTree.Node | InternalPassiveTree.MasteryNode): node is InternalPassiveTree.MasteryNode => {
	return !!(node as InternalPassiveTree.MasteryNode).isMastery;
}

export const isJewelSocketNode = (node: InternalPassiveTree.Node | InternalPassiveTree.JewelSocketNode): node is InternalPassiveTree.JewelSocketNode => {
	return !!(node as InternalPassiveTree.JewelSocketNode).isJewelSocket;
}
