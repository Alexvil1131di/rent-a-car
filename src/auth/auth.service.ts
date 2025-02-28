import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
}
