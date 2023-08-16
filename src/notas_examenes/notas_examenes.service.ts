import { Injectable } from '@nestjs/common';
import { CreateNotasExameneDto } from './dto/create-notas_examene.dto';
import { UpdateNotasExameneDto } from './dto/update-notas_examene.dto';

@Injectable()
export class NotasExamenesService {
  create(createNotasExameneDto: CreateNotasExameneDto) {
    return 'This action adds a new notasExamene';
  }

  findAll() {
    return `This action returns all notasExamenes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notasExamene`;
  }

  update(id: number, updateNotasExameneDto: UpdateNotasExameneDto) {
    return `This action updates a #${id} notasExamene`;
  }

  remove(id: number) {
    return `This action removes a #${id} notasExamene`;
  }
}
