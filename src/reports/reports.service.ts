import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Report } from './report.entity'
import { Feed } from '../feeds/feed.entity'

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  // Report a feed by a user
  async reportFeed(userId: string, feed: Feed) {
    const exists = await this.repo.findOne({
      where: { user: { id: userId }, feed: { id: feed.id } },
    })
    if (exists) return exists

    const report = this.repo.create({
      user: { id: userId } as any,
      feed,
    } as any)
    return this.repo.save(report)
  }

  // Count unique reports for a feed
  async countReports(feedId: string): Promise<number> {
    return this.repo.count({ where: { feed: { id: feedId } } })
  }
}
