import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BoilerParts } from './boiler-parts.model';
import { IBoilerPartsQuery } from './types';
import { Op } from 'sequelize';

@Injectable()
export class BoilerPartsService {
  constructor(
    @InjectModel(BoilerParts)
    private boilerPartsModel: typeof BoilerParts,
  ) {}

  async paginateAndFilter(
    query: IBoilerPartsQuery,
  ): Promise<{ count: number; rows: BoilerParts[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;

    return this.boilerPartsModel.findAndCountAll({
      limit,
      offset,
    });
  }

  async bestsellers(): Promise<{ count: number; rows: BoilerParts[] }> {
    return this.boilerPartsModel.findAndCountAll({
      where: { bestsellers: true },
    });
  }

  async new(): Promise<{ count: number; rows: BoilerParts[] }> {
    return this.boilerPartsModel.findAndCountAll({
      where: { new: true },
    });
  }

  async findOne(id: number | string): Promise<BoilerParts> {
    return this.boilerPartsModel.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<BoilerParts> {
    return this.boilerPartsModel.findOne({
      where: { name },
    });
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: BoilerParts[] }> {
    return this.boilerPartsModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
