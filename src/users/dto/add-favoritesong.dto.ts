import { ObjectId } from "mongoose"

export class AddFavTrackDto {
    readonly userId: string
    readonly trackId: ObjectId
}