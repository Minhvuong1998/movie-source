import { DB } from '../model';
import BaseRepository from './base';
import { types, statics } from '../../factory';
import isEmpty from 'lodash/isEmpty';

export default class MovieRepository extends BaseRepository {
  public readonly model: DB['Movie'];
  constructor(db: DB) {
    super(db);
    this.model = db.Movie;
  }

  public async search(
    params: types.Movie.SearchParamsMovie
  ) {
    let sortField = 'created_at';
    if (params.sortField) {
      switch (Number(params.sortField)) {
        case statics.Movie.SortField.alphabetical:
          sortField = 'title';
          break;
        case statics.Movie.SortField.rating:
          sortField = 'rating';
          break;
      }
    }

    let sortOrder = 1;
    if (params.sortOrder) {
      switch (Number(params.sortOrder)) {
        case statics.Movie.SortOrder.desc:
          sortOrder = -1;
          break;
      }
    }

    const sort = {
      [sortField]: sortOrder
    };

    const conditionsSearch: any = {
      deleted_at: {
        $eq: null
      },
      deleted_by: {
        $eq: null
      }
    };
    if (params.title) {
      conditionsSearch.title = {
        $regex: params.title,
        $options: 'g'
      };
    }

    const pipeline = [];
    if (!isEmpty(conditionsSearch)) {
      pipeline.push({
        $match: conditionsSearch
      });
    }
    pipeline.push(
      {
        $facet: {
          data: [
            {
              $project: {
                _id: true,
                title: true,
                poster_image: true,
                backdrop_image: true,
                created_at: true,
                rating: true,
                popularity: true
              }
            },
            {
              $sort: sort
            },
            {
              $skip: params.offset || 0
            },
            {
              $limit: params.limit
            }
          ],
          totalCount: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 }
              }
            }
          ]
        }
      },
      {
        $addFields: {
          totalCount: {
            $ifNull: [
              { $arrayElemAt: ['$totalCount.count', 0] },
              0
            ]
          }
        }
      }
    );
    const users = await this.model.aggregate(pipeline);
    return users.length ? users[0] : users;
  }

  public async create(
    data: types.Movie.Form,
    user: types.Auth.LoginData
  ) {
    const movie = await this.model.create({
      ...data,
      poster_image: data.poster_image.toString('base64'),
      backdrop_image: data.backdrop_image.toString(
        'base64'
      ),
      ...this.setFieldsCommon('create', user)
    });

    return {
      _id: movie._id,
      title: movie.title
    };
  }

  public async update(
    objectId: string,
    data: types.Movie.Form,
    user: types.Auth.LoginData
  ) {
    const movie = await this.model.findOne({
      _id: objectId,
      deleted_at: null,
      deleted_by: null
    });
    this.notFoundError(movie, `id: ${objectId}`);
    await this.model.updateOne(
      {
        _id: objectId
      },
      {
        $set: {
          ...data,
          poster_image: data.poster_image.toString(
            'base64'
          ),
          backdrop_image: data.backdrop_image.toString(
            'base64'
          ),
          ...this.setFieldsCommon('update', user)
        }
      }
    );
  }

  public async searchId(objectId: string) {
    const movie = await this.model
      .findOne({
        _id: objectId,
        deleted_at: null,
        deleted_by: null
      })
      .select({
        updated_at: false,
        created_at: false
      });
    this.notFoundError(movie, `id: ${objectId}`);

    return movie;
  }

  public async delete(
    objectId: string,
    user: types.Auth.LoginData
  ) {
    const movie = await this.model.findOne({
      _id: objectId,
      deleted_at: null,
      deleted_by: null
    });
    this.notFoundError(movie, `id: ${objectId}`);

    await this.model.updateOne(
      {
        _id: objectId
      },
      {
        $set: this.setFieldsCommon('delete', user)
      }
    );
  }
}
