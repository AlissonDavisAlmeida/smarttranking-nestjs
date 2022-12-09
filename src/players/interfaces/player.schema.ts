import * as mongoose from "mongoose"

export const PlayerSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    ranking: {
        type: String,
    },
    rankingPosition: {
        type: Number,
    },
    urlPhotoPlayer: {
        type: String,
    }
}, {
    timestamps: true,
    collection: 'players'
})

