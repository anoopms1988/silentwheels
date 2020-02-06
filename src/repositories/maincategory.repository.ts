import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Maincategory, MaincategoryRelations, Category} from '../models';
import {MysqlDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CategoryRepository} from './category.repository';

export class MaincategoryRepository extends DefaultCrudRepository<
  Maincategory,
  typeof Maincategory.prototype.id,
  MaincategoryRelations
> {

  public readonly categories: HasManyRepositoryFactory<Category, typeof Maincategory.prototype.id>;

  constructor(
    @inject('datasources.mysqlDs') dataSource: MysqlDsDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Maincategory, dataSource);
    this.categories = this.createHasManyRepositoryFactoryFor('categories', categoryRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}
