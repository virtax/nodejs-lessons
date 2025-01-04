import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"


@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("text")
    name: string

    @Column("text")
    email: string

    @Column("integer")
    age: number
}

