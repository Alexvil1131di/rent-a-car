import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateClientDto {
    @ApiProperty({ example: 'John' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'John' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'John' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsString()
    @IsNotEmpty()
    documentId: string;

    @ApiProperty({ example: 'John' })
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ example: 'John' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: 'John' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
