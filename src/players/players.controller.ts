import { PlayersService } from './players.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/players.dto';
import { Player } from './interfaces/Player.interface';
import { ValidatorPipe } from 'src/common/pipes/validator.pipe';

@Controller('api/v1/players')
export class PlayersController {

    constructor(
        private readonly playersService: PlayersService
    ) { }

    @Get('/')
    async findAll(): Promise<Player[]> {
        return await this.playersService.findALl();
    }


    @Post('/')
    @UsePipes(ValidationPipe)
    async createPlayer(@Body() createPlayer: CreatePlayerDTO): Promise<any> {
        return await this.playersService.createUpdatePlayer(createPlayer);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async updatePlayer(@Param("id", ValidatorPipe) id: string, @Body() createPlayer: CreatePlayerDTO): Promise<any> {
        return await this.playersService.updatePlayer(id, createPlayer);
    }

    @Get('/:id')
    async findByEmail(@Param("id") id: string): Promise<Player> {
        return await this.playersService.findById(id);
    }

    @Delete("/:id")
    async deletePlayer(@Param("id") id: string): Promise<any> {
        return await this.playersService.deletePlayer(id);

    }
}
