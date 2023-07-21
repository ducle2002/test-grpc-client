import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUser } from './dto/create-user';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('user.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;

@Controller('user')
export class UserController {
  @Post('/create')
  async createUser(@Body() creatingUser: CreateUser) {
    try {
      const client = new userPackage.Users(
        'localhost:8083',
        grpc.credentials.createInsecure(),
      );
      console.log(creatingUser);
      client.createUser(
        {
          name: creatingUser.userName,
          roleId: creatingUser.roleId,
          phone: creatingUser.phone,
        },
        (err, response) => {
          console.log('Recieved from server ' + JSON.stringify(response));
        },
      );
    } catch (error) {
      throw error;
    }
  }

  @Post('/delete')
  async deleteUser(@Body() creatingUser: CreateUser) {
    try {
      const client = new userPackage.Users(
        'localhost:8083',
        grpc.credentials.createInsecure(),
      );
      console.log(creatingUser);
      client.deleteUser(
        {
          name: creatingUser.userName,
        },
        (err, response) => {
          console.log('Recieved from server ' + JSON.stringify(response));
        },
      );
    } catch (error) {
      throw error;
    }
  }

  @Get('/get-list')
  async getList() {
    try {
      const client = new userPackage.Users(
        'localhost:8083',
        grpc.credentials.createInsecure(),
      );
      console.log('success');
      client.readUsers(null, (err, response) => {
        console.log('Recieved from server ' + JSON.stringify(response));
      });
    } catch (error) {
      throw error;
    }
  }
}
