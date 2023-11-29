// booking.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { House } from './Entities/house.entity'; // Update the import

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(House) // Update the type here
    private readonly houseRepository: Repository<House>, // Update the variable name
  ) {}

  async bookStay(
    date: Date,
    from: Date,
    to: Date,
    numOfPeople: number,
  ): Promise<string> {
    console.log('Book Stay Method Called');

    const house = await this.findAvailableHouse('desired_city');

    if (!house) {
      return 'No available houses for the specified date and city.';
    }

    house.from = from;
    house.to = to;
    house.numOfPeople = numOfPeople;
    house.available = false;

    await this.houseRepository.save(house); // Use the house repository to save

    return 'Booking successful!';
  }

  private async findAvailableHouse(city: string): Promise<House | null> {
    return this.houseRepository.findOne({
      where: { city, available: true },
    } as FindOneOptions<House>);
  }
}
