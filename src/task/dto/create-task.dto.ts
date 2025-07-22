import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({example:"Learn Nest Js"})
  @IsString()
  title: string;

  @ApiProperty({example:"I have to learn the Nest Js"})
  @IsString()
  tododata: string;

}
