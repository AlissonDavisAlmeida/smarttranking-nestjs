import { Schema } from "mongoose";

export const CategorySchema = new Schema({
    category: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    events: [
        {
            name: { type: String },
            operation: { type: String },
            value: { type: Number }
        }
    ],
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: "Player"
        }
    ]
}, {
    timestamps: true,
    collection: "categories"
});