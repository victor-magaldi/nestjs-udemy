import { MessagesRepository } from "./messages.repository";

export class MessagesService {
  messageRepository: MessagesRepository;

  constructor() {
    this.messageRepository = new MessagesRepository()
  }
  async findOne(id: string) {
    return this.messageRepository.findOne(id)
  }
  async findAll() {
    return this.messageRepository.findAll()
  }
  async create(message: string) {
    return this.messageRepository.create(message)
  }
}