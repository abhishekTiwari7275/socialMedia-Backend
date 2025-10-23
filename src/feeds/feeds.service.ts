import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from './feed.entity';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Feed) private feedRepo: Repository<Feed>,
  ) {}

  async createFeed(feed: Partial<Feed>) {
    const f = this.feedRepo.create(feed);
    return this.feedRepo.save(f);
  }

  async listFeeds(page = 1, limit = 10) {
    const feeds = await this.feedRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return feeds;
  }

  async findById(feedId: string) {
    return this.feedRepo.findOne({ where: { id: feedId } });
  }

  async updateFeed(feedId: string, data: Partial<Feed>) {
    await this.feedRepo.update({ id: feedId }, data);
    return this.findById(feedId);
  }

  async deleteFeed(feedId: string) {
    return this.feedRepo.delete({ id: feedId });
  }
}
