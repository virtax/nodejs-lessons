import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation } from "typeorm"
import { User } from "./User"

@Entity("sales")
export class Sale {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("text")
    product: string

    @Column("integer")
    amount: number

    @Column("money")
    price: number

    @ManyToOne(() => User, (user) => user.sales)
    user: User

    // @ManyToOne("User", (user: User) => user.sales)
    // user: User
}

