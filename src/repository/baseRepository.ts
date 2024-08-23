// src/repository/baseRepository.ts

import { Model, Document, FilterQuery } from 'mongoose';
import IRepository from "./interfaces"

export abstract class BaseRepository<T extends Document> implements IRepository<T> {
  private readonly _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(item: T): Promise<T> {
    const record = new this._model(item);
    return await record.save();
  }

  async findOne(id: string): Promise<T | null> {
    return  await this._model.findById(id);
  }

  async update(id: string, item: Partial<T>): Promise<T|null> {
    const updatedDoc = await this._model.findByIdAndUpdate(id, item, { new: true });
    return  updatedDoc ? updatedDoc : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this._model.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async find(item: Partial<T>): Promise<T[]> {
      return await this._model.find(item as FilterQuery<T>);
  }

}
