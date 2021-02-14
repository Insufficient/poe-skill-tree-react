import { PassiveTreeService } from './services/passive-tree.service';
import { default as passiveTreeData } from './data/skill-tree.json';
import { InternalPassiveTree } from '../components/models';

const adjustViewport = (data: InternalPassiveTree.Data): InternalPassiveTree.Data => {
	return {
		...data,
		constants: {
			...data.constants,
			minX: data.constants.minX + 2000,
			minY: data.constants.minY + 400,
		}
	}
}

export function parseTreeData(): InternalPassiveTree.Data {
	const service = new PassiveTreeService(passiveTreeData);

	return adjustViewport(service.getData());
}