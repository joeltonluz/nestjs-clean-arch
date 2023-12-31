import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/project.entity';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private projectRepository: IProjectRepository,
  ) {}

  async execute(input: CreateProjectDto) {
    const project = new Project(input);
    await this.projectRepository.create(project);
    return project;
  }
}
