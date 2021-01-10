import { PassiveTreeService } from './services/passive-tree.service';
import { default as passiveTreeData } from './data/skill-tree.json';

export function parseTreeData() {
	const service = new PassiveTreeService(passiveTreeData);

	return service.getData();
}