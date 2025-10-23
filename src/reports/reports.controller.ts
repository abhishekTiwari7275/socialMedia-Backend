import { Controller, Post, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { FeedsService } from '../feeds/feeds.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express'; // type-only import

// Extend Express Request to include `user`
export interface AuthRequest extends Request {
  user: { userId: string }; // Add other JWT fields if needed
}

@UseGuards(JwtAuthGuard)
@Controller('feeds/:feedId/report')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly feedsService: FeedsService,
  ) {}

  @Post()
  async report(@Param('feedId') feedId: string, @Req() req: AuthRequest) { // <-- use AuthRequest here
    const userId = req.user.userId; // Type-safe now
    const feed = await this.feedsService.findById(feedId);
    if (!feed) throw new NotFoundException('Feed not found');

    await this.reportsService.reportFeed(userId, feed);

    // If 3 or more unique reports, delete feed
    const reportCount = await this.reportsService.countReports(feedId);
    if (reportCount >= 3) {
      await this.feedsService.deleteFeed(feedId);
    }

    return { message: 'Feed reported successfully' };
  }
}
