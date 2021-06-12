import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //유저 전체 보기
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  getMy() {
    return this.userService.getMy();
  }

  //특정 시점에서의 내 손익률
  @Get('/rate/:id')
  getRoe(@Param('id') id: number) {
    return this.userService.getRoe(id);
  }
}
