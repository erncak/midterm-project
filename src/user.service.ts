import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from './Entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { House } from './Entities/house.entity';

const saltRounds = 12;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    });
    return this.userRepository.save(user);
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || !(await this.validatePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
  private async validatePassword(
    enteredPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    const passwordMatches = await bcrypt.compare(enteredPassword, storedPassword);
    return passwordMatches;
  }
  async getAvailableHouses(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.houseRepository.find({
      where: { available: true },
      skip,
      take,
    });
  }
  async queryHouses(
    date: Date,
    from: Date,
    to: Date,
    numOfPeople: number,
    page: number,
    pageSize: number,
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const availableHouses = await this.houseRepository.find({
      where: {
        available: true,
        date,
        from,
        to,
        numOfPeople,
      },
      skip,
      take,
    } as FindManyOptions<House>);

    return availableHouses;
  }
  
}
