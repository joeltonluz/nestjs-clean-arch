export class CreateProjectDto {
  name: string;

  description: string;

  startedAt: Date | null;

  forecastedAt: Date | null;
}
