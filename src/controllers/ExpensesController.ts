import type { Request, Response } from 'express'
import Expense from '../models/Expense';

export class ExpensesController {
  static getAll = async (req: Request, res: Response) => {

  }

  static create = async (req: Request, res: Response) => {
    try {
      const expense = new Expense(req.body)
      expense.budgetId = req.budget.id; // Associate the expense with the budget
      await expense.save();
      res.status(201).json("Expense created successfully");
    } catch (error) {
      console.error('Error creating expense:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;

    }
  }

  static getById = async (req: Request, res: Response) => {
    return res.json(req.expense);
  }

  static updateById = async (req: Request, res: Response) => {
    await req.expense.update(req.body);
    res.status(200).json("Expense updated successfu