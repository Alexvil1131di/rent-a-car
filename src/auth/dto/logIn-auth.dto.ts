import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { UserRole } from 'src/enums/enums';

export class LogInDto {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must be at least 6 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    },
  )
  @ApiProperty({ example: 'striN@g123' })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'token' })
  @IsString()
  token: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'jose@gmail.com' })
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must be at least 6 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    },
  )
  @ApiProperty({ example: 'striN@g123' })
  password: string;

  @ApiProperty({ example: 'Jose' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Alberto' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Jose', required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role: string = UserRole.ADMIN;
}