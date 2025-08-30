import { throws } from "node:assert";
import { readFile, writeFile } from "node:fs/promises";

export class MessagesRepository {
  async findOne(id: string) {
    const messages = await this.getContent()

    return messages[id]
  }
  async findAll() {
    const messages = await this.getContent()

    return messages
  }
  async create(message: string) {
    const messages = await this.getContent()

    const id = Math.floor(Math.random() * 999)

    messages[id] = {
      id,
      content: message
    }
    await writeFile('messages.json', JSON.stringify(messages), "utf-8")
  }

  private async getContent() {
    const contents = await readFile('messages.json', 'utf8')
    const messages = JSON.parse(contents)
    return messages
  }
}