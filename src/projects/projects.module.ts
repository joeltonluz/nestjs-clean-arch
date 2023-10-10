import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsWithUseCaseController } from './projects-whith-use-case.controller';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectUseCase } from './use-cases/find-all-project.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { ProjectTypeOrmRepository } from './project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsWithUseCaseController],
  providers: [
    ProjectsService,
    CreateProjectUseCase,
    FindAllProjectUseCase,
    StartProjectUseCase,
    ProjectTypeOrmRepository,
    {
      provide: 'IProjectRepository',
      useClass: ProjectTypeOrmRepository,
    },
  ],
})
export class ProjectsModule {}
