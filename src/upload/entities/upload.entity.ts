import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Upload {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fileName: string;

  @Column()
  fileUrl: string;

  @Column()
  fileType: string;

  @Column()
  fileSize: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.uploads, { onDelete: "CASCADE" })
  user: User;
}
