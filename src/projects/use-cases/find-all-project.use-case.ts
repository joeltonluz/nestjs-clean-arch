import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class FindAllProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private projectRepository: IProjectRepository,
  ) {}

  async execute() {
    return await this.projectRepository.findAll();
  }
}
