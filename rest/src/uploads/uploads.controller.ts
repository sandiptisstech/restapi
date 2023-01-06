import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './file-upload.utils';
import { UploadsService } from './uploads.service';

@Controller('attachments')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  //@UseInterceptors(FilesInterceptor('attachment[]'))
  @UseInterceptors(
    FilesInterceptor('attachment[]', 20, {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFiles() attachment: Array<Express.Multer.File>) {
    console.log(attachment);
 const rootPath="http://localhost:5000/";
    const response = [];
    attachment.forEach(file => {
      const fileReponse = {
        id:"888",
        original: rootPath+file.originalname,
        thumbnail: rootPath+file.filename,
      };
      response.push(fileReponse);
    });
    return response;
    
  }

  
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './public' });
  }
}
