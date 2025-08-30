import { readFile, writeFile } from "node:fs/promises";

export class MesagesRepository {
  async findOne(id: string) {
    const contents = await readFile('message.json', 'utf8')
    const message = JSON.parse(contents)
    return message[id]
  }
  async findAll() {

  }
  async create(message: string) {
    readFile
  }
}