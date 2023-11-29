// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user.module'; // Adjust the path based on your project structure
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: (_configService: ConfigService) => ({
        type: 'mssql',
        host: 'midterm.database.windows.net',
        port: 1433,
        username: 'erincak',
        password: 'Gofret15',
        database: 'Midterm',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Use this with the development environment
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    BookingModule,
  ],
})
export class AppModule {}
