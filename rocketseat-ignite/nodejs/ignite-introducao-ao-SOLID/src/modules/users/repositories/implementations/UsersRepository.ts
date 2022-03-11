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
    const newUser = new User(name, email);

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    return this.users.find((val) => val.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((val) => val.email === email);
  }

  turnAdmin(receivedUser: User): User {
    let newAdminUser: User;

    this.users = this.users.map((user) => {
      if (user.id === receivedUser.id) {
        const updatedToAdminUser = {
          ...user,
          admin: true,
        };

        newAdminUser = updatedToAdminUser;

        return updatedToAdminUser;
      }

      return user;
    });

    return newAdminUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
