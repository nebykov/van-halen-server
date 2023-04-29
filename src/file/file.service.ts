import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from 'fs'
import * as uuid from 'uuid'
import * as path from "path";

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image'
}

@Injectable()
export class FileService {

    createFile(authorId: string, type: FileType, file) {
           try {
            const fileExt = file.originalname.split('.').pop()
            const fileName = uuid.v4() + '.' + fileExt
            const filePath = path.resolve(__dirname, '..', 'static', authorId, type)
            if(!fs.existsSync(filePath)) {
                  fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return authorId + '/' + type + '/' + fileName
           } catch (e) {
                  throw new HttpException('File upload error', HttpStatus.BAD_REQUEST)
           }
    }
}