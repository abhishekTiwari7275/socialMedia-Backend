import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { Feed } from './feed.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createFeed(@Body() body: Partial<Feed>, @UploadedFiles() files: Express.Multer.File[]) {
    const images = files?.map((file) => file.filename) || [];
    return this.feedsService.createFeed({ ...body, images });
  }

  @Get()
  list(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.feedsService.listFeeds(Number(page), Number(limit));
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.feedsService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async updateFeed(
    @Param('id') id: string,
    @Body() body: Partial<Feed>,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const images = files?.map((file) => file.filename);
    return this.feedsService.updateFeed(id, { ...body, images });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.feedsService.deleteFeed(id);
  }
}
