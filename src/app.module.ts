import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ClientModule } from './client/client.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [AuthModule, VehicleModule, ClientModule, ReservationModule],
  controllers: [],
  providers: [],
})
export class AppModule { }