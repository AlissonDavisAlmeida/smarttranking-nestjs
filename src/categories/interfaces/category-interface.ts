import { Document } from "mongoose";
import { Player } from "src/players/interfaces/Player.interface";

export interface Category extends Document {
    readonly category: string
    description: string
    events: Events[]
    players: Player[]
}

export interface Events {
    name: string
    operation: string
    value: number
}