import { Module } from "@nestjs/common";
import { AuthService } from './auth.service';

// Bu Axios asosidagi HTTP client.Tashqi API’larga HTTP request yuborish uchun ishlatiladi.
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
//   HttpModule kerak bo‘ladi agar AuthService ichida:
//   boshqa serverga request yuborsang
// OAuth (Google, Facebook, GitHub login)
// tashqi auth service (SSO, SMS service, email service)
// tokenni tekshirish uchun boshqa API chaqirsang
  imports: [
    HttpModule,
    JwtModule.register({
      secret: `${process.env.SECRET_TOKEN}`,
      signOptions:{expiresIn:"30d"}
    })
  ],
  providers: [AuthService],

  /*
  Auth service ni AuthModel dan tashqarida ishlatish uchun export qlib olyabmiz.
  */
  exports: [AuthService],
})
export class AuthModule{

}