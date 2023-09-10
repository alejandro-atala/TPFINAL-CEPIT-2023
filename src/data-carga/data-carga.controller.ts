import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';
import { DataCargaService } from './data-carga.service';
import { CreateDataCargaDto } from './dto/create-data-carga.dto';

@Controller('carga')
export class UploadController {
  constructor(private readonly textosService: DataCargaService) {}

  @Post('img')

  @UseInterceptors(FileInterceptor('imagen', {

    storage: diskStorage({
      destination: path.join(__dirname, '../..', 'uploads'), // Utiliza una ruta absoluta
      filename: (req, file, callback) => {

        const randomName = file.originalname;

        callback(null, `${randomName}`);
      },
    }),
  }))
  uploadFile(@UploadedFile() file) {

    return { filename: file.originalname };
  }

  @Get()
  findAll() {
    return this.textosService.findAll();
  }

  @Post('text')
  create(@Body() createTexto: CreateDataCargaDto) { 
    //console.log(createTexto);
    return this.textosService.create(createTexto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.textosService.remove(id);
  }

  @Get(':referencia')
  findByReferencia(@Param('referencia') referencia: string) {
    return this.textosService.findByReferencia(referencia); 
  }
}
