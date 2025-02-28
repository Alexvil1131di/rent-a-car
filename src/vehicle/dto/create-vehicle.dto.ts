import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsString, IsInt, IsEnum, IsDecimal, Validate, IsNotEmpty } from "class-validator";

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
