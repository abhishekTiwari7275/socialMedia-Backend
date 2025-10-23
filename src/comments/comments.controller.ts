// src/comments/comments.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('feeds/:feedId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(
    @Param('feedId') feedId: string,
    @Body() body: Partial<Comment>,
  ) {
    return this.commentsService.createComment(feedId, body);
  }

  @Get()
  async listComments(@Param('feedId') feedId: string) {
    return this.commentsService.listComments(feedId);
  }
}
