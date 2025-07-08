import type { Request, Response } from 'express';
import Budget from '../models/Budget';

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [['createdAt', 'DESC']],
        // TODO: FILTER BY USER ID
      });
      res.status(200).json(budgets);
    } catch (error) {
      // console.error({ message: 'Error creating budget', error });
      res.status(500).json({ error: 'Internal Server Error' });

    }

  }
  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body);
      await budget.save();
      res.status(201).json("Presupuesto creado correctamente");
    } catch (error) {
      // console.error({ message: 'Error creating budget', error });
      res.status(500).json({ error: 'Internal Server Error' });

    }

  }
  static getById = async (req: Request, res: Response) => {
    res.status(200).json(req.budget);

  }
  static updateById = async (req: Request, res: Response) => {
    await req.budget.update(req.body);
    res.status(200).json("Presupuesto actualizado correctamente");
  }
  static deleteById = async (req: Request, res: Response) => {
    await req.budget.destroy();
    res.status(200).json("Presupuesto eliminado correctamente");
  }
}
