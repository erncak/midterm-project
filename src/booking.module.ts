// booking.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { User } from './Entities/user.entity'; // Adjust the path based on your project structure
import { House } from './Entities/house.entity'; // Adjust the path based on your project structure
import { Booking } from './Entities/booking.entity'; // Adjust the path based on your project structure
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, House, Booking]),
    JwtModule.register({
      secret: '123456', // Replace with a secure secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
