import { IsNotEmpty, IsEmail } from "class-validator";
import { Player } from "../interfaces/Player.interface";

type CreatePlayer = Omit<Player, '_id' | 'ranking' | "rankingPosition" | "urlPhotoPlayer">

export class CreatePlayerDTO {

    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsEmail()
    readonly email: string;

    readonly name: string;

    constructor(props: CreatePlayer) {
        Object.assign(this, props);
    }
}


