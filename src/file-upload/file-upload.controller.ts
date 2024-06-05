import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerFileOptions, multerOptions } from './multerOption.config';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploadService.create(file);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('images', 5, multerFileOptions))
  uploads(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    const filesPaths = files.map(file => { return { image: file.path } })
    return filesPaths;
  }


}
