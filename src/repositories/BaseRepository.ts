import { CreateOptions, FindOptions, UpdateOptions } from "sequelize/types";
import HttpError from "standard-http-error";

abstract class BaseRepository {
  abstract model(): any;

  async findAll(query: FindOptions = null) {
    const model = this.model();
    const obj = await model.findAll(query);
    return obj;
  }

  async findOne(predicate: FindOptions) {
    const model = this.model();
    const obj = await model.findOne(predicate);
    return obj;
  }

  async findAndCountAll(query) {
    const model = this.model();
    const obj = await model.findAndCountAll(query);
    return obj;
  }

  async add(data: any, query: CreateOptions = null) {
    const model = this.model();
    await model.sync();
    return await model.create(data, query, { returning: true });
  }

  async delete(predicate = {}) {
    const model = this.model();
    const obj = await model.destroy({ where: predicate });
    return obj;
  }

  async findAndUpdate(data, predicate = {}, optionsObj?: UpdateOptions) {
    const model = this.model();
    let obj: any;

    if (optionsObj) {
      obj = await model.update(data, optionsObj);
    } else {
      obj = await model
        .update(data, {
          where: predicate,
          returning: true,
          plain: true,
        })
        .then((result) => {
          if (result[0] === 0) throw new HttpError(400, "Failed to update the record");
          return result[1];
        })
        .catch((err) => {
          throw new HttpError(404, "Record not found to update");
        });
    }

    return obj;
  }
}

export default BaseRepository;
