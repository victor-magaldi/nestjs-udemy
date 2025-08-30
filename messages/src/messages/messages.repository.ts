import { readFile, writeFile } from "node:fs/promises";

export class MesagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf8')
    const messages = JSON.parse(contents)

    return messages[id]
  }
  async findAll() {
    const contents = await readFile('messages.json', 'utf8')
    const messages = JSON.parse(contents)

    return messages
  }
  async create(message: string) {
    const contents = await readFile('messages.json', 'utf8')
    const messages = JSON.parse(contents)

    const id = Math.floor(Math.random() * 999)

    messages[id] = {
      id,
      content: message
    }
    await writeFile('messages.json', 'utf8')
  }
}