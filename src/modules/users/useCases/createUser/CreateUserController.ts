import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const newUser = this.createUserUseCase.execute(request.body);
      return response.status(201).json(newUser);
    } catch (err) {
      return response.status(400).send(err.message);
    }
  }
}

export { CreateUserController };