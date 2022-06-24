import { BaseRaw, IndexSpecification } from './BaseRaw';
import { IEscrow as T } from '../../../../definition/IEscrow';

export class EscrowsRaw extends BaseRaw<T> {
	protected modelIndexes(): IndexSpecification[] {
		return [{ key: { userId: 1 }, unique: true }];
	}
}
