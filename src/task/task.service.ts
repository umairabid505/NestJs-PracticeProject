import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'prisma/PrismaService.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTaskDto: CreateTaskDto, userId: number) {
    return await this.prismaService.todo.create({
      data: {
        ...createTaskDto,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll(userId: number) {
    return await this.prismaService.todo.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prismaService.todo.findUnique({
      where: {
        id,
        userId,
      },
    });

    if(!task){
      throw new HttpException("No task found",HttpStatus.NOT_FOUND)
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const todo = await this.prismaService.todo.findFirst({
      where: {
        userId,
        id,
      },
    });
    console.log("found",todo);
    

    if (!todo) {
      throw new HttpException('Todo not found or acces denied',HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.todo.update({
      where: {
        id,
      },
      data: { ...updateTaskDto },
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.todo.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      throw new HttpException('Todo not found',HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.todo.delete({ where: { id } });
  }
}
