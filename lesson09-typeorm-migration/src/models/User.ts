import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from "typeorm"
import { Sale } from "./Sale"


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

    @Column("integer", {nullable: true })
    salary: number

    @OneToMany(() => Sale, (sale: Sale) => sale.user)
    sales: Sale[]

    // @OneToMany("Sale", (sale: Sale) => sale.user)
    // sales: Sale[]
}

