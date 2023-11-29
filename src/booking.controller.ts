// booking.controller.ts

import {
  Controller,
  Post,
  Body
  
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Change this import

import { BookingService } from './booking.service';
import { Request } from 'express';

@ApiTags('Booking') // Add this decorator
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Book a stay' }) // Add this decorator
  @ApiResponse({ status: 200, description: 'Booking successful' }) // Add this decorator
  @Post('bookstay')
  async bookStay(
    @Body()
    {
      date,
      from,
      to,
      numOfPeople,
    }: {
      date: Date;
      from: Date;
      to: Date;
      numOfPeople: number;
    },
    // Remove @Req() request: Request,
  ) {
    console.log('Book Stay Method Called');
    // No need for authentication logic if it's removed

    return this.bookingService.bookStay(
      date,
      from,
      to,
      numOfPeople,
    );
  }
}
