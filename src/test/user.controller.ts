import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
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
      console.log(creatingUser.userId);
      client.createUser(
        {
          text: creatingUser.userId,
        },
        (err, response) => {
          console.log('Recieved from server ' + JSON.stringify(response));
        },
      );
    } catch (error) {
      throw error;
    }
  }

  // @Post('/delete/:id')
  // async deleteUser(@Body() createUser: CreateUser) {
  //   try {
  //     const client = new userPackage.Users(
  //       'localhost:8083',
  //       grpc.credentials.createInsecure(),
  //     );
  //     console.log(createUser.userId);
  //     client.deleteUser(
  //       {
  //         text: createUser.userId,
  //       },
  //       (err, response) => {
  //         console.log('Recieved from server ' + JSON.stringify(response));
  //       },
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
