// user.controller.ts

import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Add these imports
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users') // Add this decorator
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a user' }) // Add this decorator
  @ApiResponse({ status: 201, description: 'User created successfully' }) // Add this decorator
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'User login' }) 
  @ApiResponse({ status: 200, description: 'Login successful' }) 
  @Post('login')
  async login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return this.userService.login(username, password);
  }

  @ApiOperation({ summary: 'Get available houses' }) 
  @ApiResponse({ status: 200, description: 'Return available houses' }) 
  @Get('available-houses')
  async getAvailableHouses(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.userService.getAvailableHouses(page, pageSize);
  }

  @ApiOperation({ summary: 'Get available houses' }) 
  @ApiResponse({ status: 200, description: 'Return available houses' }) 
  @Get('query-houses')
  async queryHouses(
    @Query('date') date: Date,
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query('numOfPeople') numOfPeople: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.userService.queryHouses(
      date,
      from,
      to,
      numOfPeople,
      page,
      pageSize,
    );
  }
}
