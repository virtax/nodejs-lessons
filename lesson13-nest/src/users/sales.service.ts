import { Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @Inject('SALES_REPOSITORY')
    private SalesRepository: Repository<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const Sale = this.SalesRepository.create(createSaleDto);
    return await this.SalesRepository.save(Sale);
  }

  async findAll() {
    return await this.SalesRepository.find();
  }

  async findAllByUser(userId: number) {
    return await this.SalesRepository.findBy({
      user: {
        id: userId,
      },
    });
  }

  async findOne(id: number) {
    return await this.SalesRepository.findOneBy({ id });
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    return await this.SalesRepository.update(id, updateSaleDto);
  }

  async remove(id: number) {
    return await this.SalesRepository.delete(id);
  }
}
