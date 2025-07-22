import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Upload } from "src/upload/entities/upload.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "date" })
  dob: Date;

  @Column({ default: false })
  isEmailVerified: boolean;

  @OneToMany(() => Upload, (upload) => upload.user)
  uploads: Upload[];
}
