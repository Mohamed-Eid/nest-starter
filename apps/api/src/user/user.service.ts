import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DRIZZLE } from '@app/database';
import type { DrizzleDb } from '@app/database/types/drizzle';
import { users } from '@app/database/schema/schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: DrizzleDb,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.db
      .insert(users)
      .values({
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash: createUserDto.password,
      })
      .returning();
  }

  async findAll() {
    return this.db.select().from(users);
  }
}
