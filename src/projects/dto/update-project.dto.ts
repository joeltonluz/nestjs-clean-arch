import { PartialType } from '@nestjs/mapped-types';

class _UpdateProjectDto {
  name: string;
  description: string;
  startedAt: Date | null;
  cancelledAt: Date | null;
  finishedAt: Date | null;
  forecastedAt: Date | null;
}

export class UpdateProjectDto extends PartialType(_UpdateProjectDto) {}
