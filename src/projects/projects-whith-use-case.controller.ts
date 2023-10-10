import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';

import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectUseCase } from './use-cases/find-all-project.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { StartProjectDto } from './dto/start-project.dto';

@Controller('projects')
export class ProjectsWithUseCaseController {
  @Inject(CreateProjectUseCase)
  private readonly createProjectUseCase: CreateProjectUseCase;

  @Inject(FindAllProjectUseCase)
  private readonly findAllProjectUseCase: FindAllProjectUseCase;

  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase;

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectUseCase.execute();
  }

  @Post(':id/start')
  start(@Param('id') id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, startProjectDto);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectsService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(id);
  // }
}
