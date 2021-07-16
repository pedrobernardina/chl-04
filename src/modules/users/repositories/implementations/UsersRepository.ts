import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users = [...this.users, newUser];

    return newUser;
  }

  findById(id: string): User | undefined {
    return this.users.find((d) => d.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((d) => d.email === email);
  }

  turnAdmin(receivedUser: User): User {
    this.users = this.users.map((d) =>
      d.id === receivedUser.id ? { ...d, admin: true } : d
    );

    return this.findById(receivedUser.id);
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
