import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Booking } from './Entities/booking.entity';
import { User } from './Entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { House } from './Entities/house.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, House,Booking]),
    JwtModule.register({
      secret: '123456', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Set the expiration time as needed
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
