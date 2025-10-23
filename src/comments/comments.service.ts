// src/comments/comments.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Feed } from '../feeds/feed.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(Feed) private feedRepo: Repository<Feed>,
  ) {}

  async createComment(feedId: string, data: Partial<Comment>) {
    const feed = await this.feedRepo.findOne({ where: { id: feedId } });
    if (!feed) throw new Error('Feed not found');

    const comment = this.commentRepo.create({ ...data, feed });
    return this.commentRepo.save(comment);
  }

  async listComments(feedId: string) {
    return this.commentRepo.find({ where: { feed: { id: feedId } } });
  }
}
