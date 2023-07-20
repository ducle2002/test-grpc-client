import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, Min, IsInt, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUser {
  @ApiPropertyOptional()
  @Min(0, { message: 'id của người dùng không được nhỏ hơn 0.' })
  @IsInt({ message: 'id của người dùng phải là số nguyên.' })
  @Transform(({ value }: TransformFnParams) =>
    (value = value?.trim()) ? Number(value) : undefined,
  )
  userId?: number;

  @ApiPropertyOptional()
  userName?: string;
}
