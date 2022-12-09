import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [
    PlayersModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
