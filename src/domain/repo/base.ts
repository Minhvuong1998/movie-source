import { DB } from '../model';
import { errors, types } from '../../factory';

export default abstract class BaseRepository {
  public readonly db: DB;
  protected readonly commonExclude: string[] = [
    'created_by',
    'updated_by'
  ];

  protected readonly extraExclude: string[] = [
    'created_by',
    'updated_by',
    'createdAt',
    'created_at',
    'updatedAt',
    'updated_at',
    'deleted_at',
    'deletedAt',
    'deleted_by'
  ];

  constructor(db: DB) {
    this.db = db;
  }

  protected notFoundError(
    result: [number, any[]] | number | null | any,
    errorStr: string
  ) {
    if (
      result === null ||
      (result instanceof Array && result[0] === 0) ||
      (typeof result === 'number' && result === 0)
    ) {
      throw new errors.NotFound(errorStr);
    }
  }

  protected setFieldsCommon(
    action: 'delete' | 'update' | 'create',
    user: types.Auth.LoginData
  ) {
    const fieldsCommon: Record<string, string | number> = {
      updated_at: Date.now(),
      updated_by: user._id
    };

    if (action === 'delete') {
      fieldsCommon.deleted_at = Date.now();
      fieldsCommon.deleted_by = user._id;
    }
    if (action === 'create') {
      fieldsCommon.created_at = Date.now();
      fieldsCommon.created_by = user._id;
    }

    return fieldsCommon;
  }
}
