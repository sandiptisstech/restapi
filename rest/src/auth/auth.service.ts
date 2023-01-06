import { Inject, Injectable } from '@nestjs/common';
import {
  AuthResponse,
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  CoreResponse,
  RegisterDto,
  ResetPasswordDto,
  VerifyForgetPasswordDto,
  SocialLoginDto,
  OtpLoginDto,
  OtpResponse,
  VerifyOtpDto,
  OtpDto,
} from './dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import usersJson from '@db/users.json';
import { Db, ObjectID } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { ModuleTokenFactory } from '@nestjs/core/injector/module-token-factory';
//const users = plainToClass(User, usersJson);
import { ReportsService } from '../reports/reports.service'

@Injectable()
export class AuthService {
  private users: any[];
  private userfind: User;

  constructor(

    @Inject('DATABASE_CONNECTION')

    private db: Db, private myReportService: ReportsService) {
    this.init();
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  compareMatch(inPassword: string, dbPassword: string) {
    console.log("compareMatch==>", inPassword, dbPassword);
    return bcrypt.compare(inPassword, dbPassword);
  }
  async init() {

    this.users = await this.db.collection('users').find().toArray();

  }

  async getCustomerCount(sequenceName) {
    const count = await this.db.collection('users').findOne({ _id: `${sequenceName}` });
    const countData = Number(count.sequence_value) + 1;
    const nextsequence = await this.db.collection('users').updateOne({ _id: `${sequenceName}` },
      {
        $set: {
          sequence_value: `${countData}`
        }
      });

    return countData;
  }

  async register(createUserInput: RegisterDto): Promise<AuthResponse> {

    const hasdata = await this.hashData(createUserInput.password);
    const customerid = await this.getCustomerCount('customeridSequence');
    let userid;
    const user: User = {
      id: customerid,
      is_active: true,
      name: createUserInput.name,
      email: createUserInput.email,
      password: hasdata,
      token: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    await this.db.collection('users').insertOne(user).then(req => {
      userid = customerid + "";
    }).catch(err => {
      userid = "-1";
      console.log("Error:", err);
    });

    return {
      token: userid,
      permissions: ['customer'],
    };

  }
  async login(loginInput: LoginDto): Promise<AuthResponse> {
    let userfind = await this.db.collection('users').findOne({ email: loginInput.email })
    if (userfind) {
      const match = await this.compareMatch(loginInput.password, userfind.password);
      if (match) {
        return {
          token: userfind.id,
          permissions: ['customer'],
        };
      }
      //Not match passoword
      else {
        return { token: '', permissions: [] }
      }
    }
    else {
      return { token: '', permissions: [] }
    }
  }


  async changePassword(
    changePasswordInput: ChangePasswordDto,
  ): Promise<CoreResponse> {
    console.log(changePasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async forgetPassword(
    forgetPasswordInput: ForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(forgetPasswordInput);
    let userfind = await this.db.collection('users').findOne({ email: forgetPasswordInput.email })
    const tokenStr = await uuidv4();
    
    if (userfind) { 
      await this.db.collection('users').updateOne({ email: `${forgetPasswordInput.email}` },
        {
          $set: {
            token: `${tokenStr}`,
            updated_at: new Date()
          }
        }); 

      const htmlContent = {
        to: `${forgetPasswordInput?.email}`,
        from: "sandip@tissatech.com",
        subject: "Your ParineetaShopee.com Password Rest",
        body: "Token to reset password :  <b> " + tokenStr + "<b>"
      }

      this.myReportService.sendMail(htmlContent)
      return {
        success: true,
        message: 'Sent Token successful',
      };
    }
    return {
      success: false,
      message: 'User Not Found ß',
    };
  }
  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(verifyForgetPasswordTokenInput);
    let userfind = await this.db.collection('users').findOne({ email: verifyForgetPasswordTokenInput.email, token: verifyForgetPasswordTokenInput.token })

    if (userfind) {
      return {
        success: true,
        message: 'Password change successful',
      };
    }
    return {
      success: false,
      message: 'Invalid Token ',
    };
  }
  async resetPassword(
    resetPasswordInput: ResetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(resetPasswordInput);
    const tokenStr = await uuidv4();
    const hashdata = await this.hashData(resetPasswordInput.password);
    const updateTest = await this.db.collection('users').updateOne({ email: `${resetPasswordInput.email}`, token: `${resetPasswordInput.token}` },
      {
        $set: {
          password: `${hashdata}`,
          token: `${tokenStr}`,
          updated_at: new Date()

        }
      });

    if (updateTest.acknowledged) {

      return {
        success: true,
        message: 'Password change successful',
      };

    }
    return {
      success: false,
      message: 'Technical issue Please Connect Parineeta shopee Support ',
    };

  }
  async socialLogin(socialLoginDto: SocialLoginDto): Promise<AuthResponse> {
    console.log(socialLoginDto);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }
  async otpLogin(otpLoginDto: OtpLoginDto): Promise<AuthResponse> {
    console.log(otpLoginDto);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }

  async verifyOtpCode(verifyOtpInput: VerifyOtpDto): Promise<CoreResponse> {
    console.log(verifyOtpInput);
    return {
      message: 'success',
      success: true,
    };
  }

  async sendOtpCode(otpInput: OtpDto): Promise<OtpResponse> {
    console.log(otpInput);
    return {
      message: 'success',
      success: true,
      id: '1',
      provider: 'google',
      phone_number: otpInput.phone_number,
      is_contact_exist: true,
    };
  }

  // async getUsers({ text, first, page }: GetUsersArgs): Promise<UserPaginator> {
  //   const startIndex = (page - 1) * first;
  //   const endIndex = page * first;
  //   let data: User[] = this.users;
  //   if (text?.replace(/%/g, '')) {
  //     data = fuse.search(text)?.map(({ item }) => item);
  //   }
  //   const results = data.slice(startIndex, endIndex);
  //   return {
  //     data: results,
  //     paginatorInfo: paginate(data.length, page, first, results.length),
  //   };
  // }
  // public getUser(getUserArgs: GetUserArgs): User {
  //   return this.users.find((user) => user.id === getUserArgs.id);
  // }

  // @Param('id') id: string
  async getUserById(custid: number): Promise<any> {
    console.log("find ther User ID ===>", custid);
    const user = await this.db.collection('users').findOne({ id: Number(custid) })
    console.log("find ther User obhect ===>", user);
    return user;
  }

  me(): User {
    return this.users[0];
  }
  // updateUser(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
}
