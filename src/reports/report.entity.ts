import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Feed } from '../feeds/feed.entity'
import { User } from '../users/user.entity'

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Feed)
  feed: Feed
}
