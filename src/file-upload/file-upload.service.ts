import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async create(file: Express.Multer.File) {
    return await file;
  }

  imageulr() {
    return;
  }


}
