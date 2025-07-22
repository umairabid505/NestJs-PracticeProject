import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ example: 'Learn Nest Js' })
  @IsString()
  title: string;
  @ApiProperty({ example: 'I have to learn the Nest Js' })
  @IsString()
  tododata: string;
}
