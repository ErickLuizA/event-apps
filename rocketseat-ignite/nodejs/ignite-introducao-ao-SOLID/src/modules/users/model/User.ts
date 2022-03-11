import { v4 as uuidV4 } from "uuid";

class User {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(
    name?: string,
    email?: string,
    created_at?: Date,
    updated_at?: Date
  ) {
    if (!this.id) {
      this.id = uuidV4();
    }

    this.name = name;
    this.email = email;
    this.admin = false;
    this.created_at = created_at ?? new Date();
    this.updated_at = updated_at ?? new Date();
  }
}

export { User };
