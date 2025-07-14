import { createRequest, createResponse } from 'node-mocks-http'
import { budgets } from "../mocks/budgets"
import { BudgetController } from '../../controllers/BudgetController'
import Budget from '../../models/Budget'

jest.mock('../../models/Budget', () => ({
  findAll: jest.fn()
}))

describe('BudgetController.getAll', () => {

  beforeEach(() => {
    (Budget.findAll as jest.Mock).mockReset();

    (Budget.findAll as jest.Mock).mockImplementation((options) => {
      //options toma del método findAll los parámetros de búsqueda
      const updatedBudgets = budgets.filter(budget => budget.userId === options.where.userId);
      // resolver la promesa para que el test pueda continuar y usar la variable updatedBudgets
      return Promise.resolve(updatedBudgets);

    });
  });
  it(' should return 2 budgets for user with id 1', async () => {

    const req = createRequest({
      method: 'GET',
      url: '/api/budgets',
      user: { id: 1 }
    })
    const res = createResponse();

    // beforeEach
    await BudgetController.getAll(req, res)
    const data = res._getJSONData();

    expect(data).toHaveLength(2);
    expect(res.statusCode).toBe(200);
    expect(res.statusCode).not.toBe(404);
  })

  it(' should return 1 budgets for user with id 2', async () => {

    const req = createRequest({
      method: 'GET',
      url: '/api/budgets',
      user: { id: 2 }
    })
    const res = createResponse();

    // beforeEach
    await BudgetController.getAll(req, res)
    const data = res._getJSONData();

    expect(data).toHaveLength(1);
    expect(res.statusCode).toBe(200);
    expect(res.statusCode).not.toBe(404);
  })

  it(' should return 0 budgets for user with id 10', async () => {

    const req = createRequest({
      method: 'GET',
      url: '/api/budgets',
      user: { id: 10 }
    })
    const res = createResponse();

    // beforeEach
    await BudgetController.getAll(req, res)
    const data = res._getJSONData();

    expect(data).toHaveLength(0);
    expect(res.statusCode).toBe(200);
    expect(res.statusCode).not.toBe(404);
  })

})
