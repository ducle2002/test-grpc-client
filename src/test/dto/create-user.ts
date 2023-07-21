import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, Min, IsInt, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUser {
  @ApiPropertyOptional()
  @Transform(({ value }: TransformFnParams) =>
    (value = value?.trim()) ? Number(value) : undefined,
  )
  roleId?: number = 0;

  @ApiPropertyOptional()
  userName?: string = 'default';

  @ApiPropertyOptional()
  phone?: string = 'default';
}
