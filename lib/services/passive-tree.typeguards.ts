import { GGGPassiveTree } from './passive-tree.interface';

export const isSkillNode = (node: GGGPassiveTree.Node | GGGPassiveTree.SkillNode): node is GGGPassiveTree.SkillNode => {
	return (node as GGGPassiveTree.SkillNode).skill !== undefined;
}
