import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/logIn-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }

  getOneByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: { email, deletedAt: null },
      select: { id: true, email: true, name: true, lastName: true, password: true, role: true, createdAt: true, },
    });
    return user;
  }

  async create(data: RegisterDto) {
    const user = await this.prisma.user.create({ data, select: { id: true, email: true, name: true, lastName: true, role: true, createdAt: true } });
    return user;
  }
}
