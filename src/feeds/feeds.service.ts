import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from './feed.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Feed) private feedRepo: Repository<Feed>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createFeed(feed: Partial<Feed>) {
    const f = this.feedRepo.create(feed);
    return this.feedRepo.save(f);
  }

  async listFeeds(page = 1, limit = 10) {
    const cacheKey = `feeds-page-${page}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const feeds = await this.feedRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

await this.cacheManager.set(cacheKey, feeds, 30); // just number of seconds

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
