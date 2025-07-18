import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;  // Stored in hashed form

  @Column({ nullable: true })
  profilePicture: string;  // Optional profile picture

  @Column({ nullable: true })
  bio: string;  // Optional bio

  @Column({ nullable: true })
  address: string;  // Optional address
}
