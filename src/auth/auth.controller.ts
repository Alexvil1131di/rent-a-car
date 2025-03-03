import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto, RefreshTokenDto, RegisterDto } from './dto/logIn-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Public } from './decorators/public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@Public()
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('logIn')
  @ApiResponse({
    status: 201,
    description: 'User logged in successfully',
    type: String,
  })
  async logIn(@Body() userCredentials: LogInDto) {
    const user = await this.authService.getOneByEmail(userCredentials.email);
    if (!user) throw new HttpException('whrong email or password', 401);

    const passwordMatch = await bcrypt.compare(userCredentials.password, user.password);

    if (!passwordMatch) throw new HttpException('whrong email or password', 401);

    delete user.password;

    const access_token = await this.jwtService.signAsync(user);

    return { ...user, token: access_token };
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: String,
  })
  async register(@Body() userCredentials: RegisterDto) {
    const user = await this.authService.getOneByEmail(userCredentials.email);
    if (user) throw new HttpException('User already exists', 409);
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT, 10));
    const password = await bcrypt.hash(userCredentials.password, salt);
    delete userCredentials.password;
    return await this.authService.create({ ...userCredentials, password });
  }

  @Post('refreshToken')
  @ApiResponse({
    status: 201,
    description: 'Token refreshed successfully',
    type: String,
  })
  async refreshToken(@Body() data: RefreshTokenDto) {
    try {
      const user = await this.jwtService.verifyAsync(data.token);
      delete user.iat;
      delete user.exp;
      const access_token = await this.jwtService.signAsync(user, { expiresIn: '3h' });
      return { ...user, token: access_token };
    } catch (error) {
      throw new HttpException('whrong token or token expired', 401);
    }
  }
}
