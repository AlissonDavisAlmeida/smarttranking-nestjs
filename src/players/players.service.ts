import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/players.dto';
import { Player } from "./interfaces/Player.interface"
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    private players: Player[] = [];

    constructor(
        @InjectModel("Player") private readonly playerModel: Model<Player>
    ) { }

    private readonly logger: Logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayer: CreatePlayerDTO): Promise<any> {

        const { email } = createPlayer;

        const playerFound = await this.findPlayerByEmail(email);

        if (playerFound) {
            this.logger.log(`Player ${email} already exists`);
            throw new NotFoundException(`Player ${email} already exists`);
        }

        const player = await this.create(createPlayer);

        return player;
    }

    async findALl(): Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    async findByEmail(email: string): Promise<Player> {
        const player = await this.playerModel.findOne({ email })

        if (!player) {
            throw new BadRequestException(`Player ${email} not found`);
        }

        return player;
    }

    async findById(id: string): Promise<Player> {
        const player = await this.playerModel.findOne({ _id: id })

        if (!player) {
            throw new NotFoundException(`Player ${id} not found`);
        }

        return player;
    }

    async updatePlayer(id: string, createPlayer: CreatePlayerDTO): Promise<Player> {


        const playerFound = await this.playerModel.findOne({ _id: id })

        if (!playerFound) {
            throw new NotFoundException(`Player ${id} not found`);
        }
        const { email, name, phoneNumber } = createPlayer;

        const player = await this.playerModel.findOneAndUpdate({ _id: id }, { email, name, phoneNumber }, { new: true })


        return player;
    }

    async deletePlayer(id: string): Promise<any> {

        const player = await this.playerModel.findOneAndDelete({ _id: id })

        if (!player) {
            throw new NotFoundException(`Player ${id} not found`);
        }

        this.players = this.players.filter(player => player._id !== id);

        return player;
    }

    //Auxiliary methods
    private async create(createPlayer: CreatePlayerDTO): Promise<Player> {

        try {

            const player = await this.playerModel.create(createPlayer);

            this.logger.log(`Player ${player.email} created`);

            return player
        } catch (err) {
            this.logger.error(`Error on create player ${err.message}`);
        }
    }



    private async findPlayerByEmail(email: string): Promise<Player> {
        const playerFound = await this.playerModel.findOne({ email }).exec();

        return playerFound;
    }
}
