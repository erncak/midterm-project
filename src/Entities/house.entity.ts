// house.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  from: Date;

  @Column({ nullable: true })
  to: Date;

  @Column()
  numOfPeople: number;

  @Column()
  description: string;

  @Column()
  amenities: string;

  @Column()
  city: string;

  @Column({ default: true })
  available: boolean;

  @OneToMany(() => Booking, (booking) => booking.house)
  bookings: Booking[];
}
