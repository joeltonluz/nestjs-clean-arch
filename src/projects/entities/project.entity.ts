import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Inactive = 'inactive',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity('projects')
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'started_at', nullable: true, type: 'datetime' })
  startedAt: Date | null;

  @Column({ name: 'cancelled_at', nullable: true, type: 'datetime' })
  cancelledAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'datetime' })
  finishedAt: Date | null;

  @Column({ name: 'forecasted_at', nullable: true, type: 'datetime' })
  forecastedAt: Date | null;

  @Column({ type: 'simple-enum' })
  status: ProjectStatus = ProjectStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      startedAt?: Date | null;
      cancelledAt?: Date | null;
      finishedAt?: Date | null;
      forecastedAt?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();

    if (props?.startedAt) {
      this.start(props.startedAt);
    }
  }

  start(startedAt: Date) {
    if (this.status === ProjectStatus.Active)
      throw new Error('Cannot start active project');

    if (this.status === ProjectStatus.Completed)
      throw new Error('Cannot start completed project');

    if (this.status === ProjectStatus.Cancelled)
      throw new Error('Cannot start cancelled project');

    this.startedAt = startedAt;
    this.status = ProjectStatus.Active;
  }
}
