import type { Model, QueryWithHelpers, Document as MDocument } from 'mongoose';

export const findDocs = async <
  isArray extends boolean,
  DocI extends MDocument = MDocument,
>(
  query: QueryWithHelpers<
    isArray extends true ? Array<DocI> : DocI | null,
    DocI
  >,
  lean: boolean = true,
) => (lean ? query.lean() : query);

export const createDoc = async <DocI extends MDocument>(
  model: Model<DocI>,
  fields: {},
  save: boolean = true,
) => {
  const doc = new model({
    ...fields,
  });
  if (save) return doc.save();
  else return doc;
};
