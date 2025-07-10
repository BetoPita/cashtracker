import { Table, Column, Model, ForeignKey, BelongsTo, DataType, AllowNull } from 'sequelize-typescript';
import Budget from './Budget';


@Table({
  tableName: 'expenses'
})
class Expense extends Model<Expense> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare amount: number

  @ForeignKey(() => Budget)
  declare budgetId: number

  @BelongsTo(() => Budget)
  d