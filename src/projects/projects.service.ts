import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto);

    if (createProjectDto.startedAt) {
      project.status = ProjectStatus.Active;
    }

    return await this.projectRepository.save(project);
  }

  async findAll() {
    return this.projectRepository.find();
  }

  async findOne(id: string) {
    return await this.projectRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneOrFail({
      where: { id },
    });

    updateProjectDto.name && (project.name = updateProjectDto.name);
    updateProjectDto.description &&
      (project.description = updateProjectDto.description);

    if (updateProjectDto.startedAt) {
      if (project.status === ProjectStatus.Active)
        throw new Error('Cannot start active project');

      if (project.status === ProjectStatus.Completed)
        throw new Error('Cannot start completed project');

      if (project.status === ProjectStatus.Cancelled)
        throw new Error('Cannot start cancelled project');

      project.startedAt = updateProjectDto.startedAt;
      project.status = ProjectStatus.Active;
    }

    if (updateProjectDto.cancelledAt) {
      if (project.status === ProjectStatus.Completed)
        throw new Error('Cannot cancel completed project');

      if (project.status === ProjectStatus.Cancelled)
        throw new Error('Cannot cancel cancelled project');

      if (updateProjectDto.cancelledAt < project.startedAt)
        throw new Error('Cannot cancel project before it started');

      project.cancelledAt = updateProjectDto.cancelledAt;
      project.status = ProjectStatus.Cancelled;
    }

    if (updateProjectDto.finishedAt) {
      if (project.status === ProjectStatus.Completed)
        throw new Error('Cannot finish completed project');

      if (project.status === ProjectStatus.Cancelled)
        throw new Error('Cannot finish cancelled project');

      if (updateProjectDto.finishedAt < project.startedAt)
        throw new Error('Cannot finish project before it started');

      project.finishedAt = updateProjectDto.finishedAt;
      project.status = ProjectStatus.Completed;
    }

    return await this.projectRepository.save(project);
  }

  async remove(id: string) {
    return await this.projectRepository.softDelete({ id });
  }
}
