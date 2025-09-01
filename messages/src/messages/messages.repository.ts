import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "node:fs/promises";
export interface Message {
  id: string | number;
  content: string;
}

export interface MessagesMap {
  [id: string]: Message;
}
export class MessagesRepository {
  private db: MessagesMap;
  constructor() {
    this.getContent()
  }
  async findOne(id: string) {
    await this.getContent()
    return this.db[id]
  }
  async findAll() {
    await this.getContent()
    return this.db
  }
  async create(message: string) {
    const messages = await this.getContent()
    const id = Math.floor(Math.random() * 999)

    const messagesObj = Object.assign({}, messages)

    messagesObj[id] = {
      id,
      content: message
    }
    this.persist(messagesObj)
  }

  private async getContent() {
    const contents = await readFile('messages.json', 'utf8')
    const messages: MessagesMap = JSON.parse(contents)
    this.db = messages
    return messages
  }
  private async persist(messages: MessagesMap) {
    await writeFile('messages.json', JSON.stringify(messages), "utf-8")
    this.db = messages
  }
}