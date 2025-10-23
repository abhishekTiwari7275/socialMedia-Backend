import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { Feed } from './feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feed])],
  providers: [FeedsService],
  controllers: [FeedsController],
})
export class FeedsModule {}
