import CustomStore from 'devextreme/data/custom_store';
import DevExpress from 'devextreme';

/**
 * Creates devextreme CustomStore instance with adapted pagination params
 */
type CreateCustomStore = (options: {
  /** Method that gets entity from data-base by provided "key" option */
  byKey?: (key: string) => Promise<any>;
  /** Method that adds entity to data-base */
  insert?: (values: any) => Promise<any>;
  /** Unique data-entity key (most commonly "id") */
  key: string;
  /** Method that load paginated data from data-base */
  load: (
    adaptedPagination: DevExpress.data.LoadOptions<any>
  ) => Promise<{ data: any[]; totalCount?: number }>;
  /** Method that removes entity from data-base */
  remove?: (key: string) => Promise<any>;
  /** Method that updates entity at data-base */
  update?: (key: string, values: any) => Promise<any>;
}) => CustomStore;

export const createCustomStore: CreateCustomStore = (options) => {
  const { byKey, insert, key, load, remove, update } = options;
  return new CustomStore({
    key,
    byKey,
    load,
    insert,
    remove,
    update,
  });
};
