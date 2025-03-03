import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsString, IsInt, IsDecimal, Validate, IsNotEmpty, IsOptional, IsNumber, IsEnum } from "class-validator";
import { VehicleStatus } from "src/enums/enums"

export class CreateVehicleDto {
    @ApiProperty({ example: 'John' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsString()
    @IsNotEmpty()
    brand: string;

    @ApiProperty({ example: 'John' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty({ example: '1986' })
    @IsInt()
    year: number;

    @ApiProperty({ example: 'John' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsString()
    @IsNotEmpty()
    licensePlate: string;

    @ApiProperty({ example: 'AVAILABLE | RENTED | COMPLETED' })
    @IsEnum(VehicleStatus)
    status: VehicleStatus;

    @ApiProperty({ example: '2500.20' })
    @IsDecimal()
    dailyPrice: number;
}

export class VehicleFiltersDto {
    @ApiProperty({ example: 'Toyota' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsOptional()
    @IsString()
    brand?: string;

    @ApiProperty({ example: 'Yaris' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsOptional()
    @IsString()
    model?: string;

    @ApiProperty({ example: '2020' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsOptional()
    @IsNumber()
    year?: number;

    @ApiProperty({ example: 'AVAILABLE | RENTED | COMPLETED' })
    @IsEnum(VehicleStatus)
    status?: string;
}