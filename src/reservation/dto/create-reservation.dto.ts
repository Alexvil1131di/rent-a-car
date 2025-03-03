import { IsInt, IsDateString } from 'class-validator';

export class CreateReservationDto {
    @IsInt()
    clientId: number;

    @IsInt()
    vehicleId: number;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;
}