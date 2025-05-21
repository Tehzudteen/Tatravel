import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create({
      ...createTodoDto,
      isCompleted: false, // Default value
    });
    return this.todoRepository.save(newTodo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    // First, try to find the entity. If it doesn't exist, findOneBy will throw NotFoundException.
    const todo = await this.findOne(id);

    // Merge the existing entity with the new data.
    // Note: `preload` is also a good option here if you want to load and then update.
    // However, for simple updates like this, directly updating properties or using `update` is fine.
    // For this example, we'll merge and save.
    
    // Update properties of the found todo
    if (updateTodoDto.title !== undefined) {
      todo.title = updateTodoDto.title;
    }
    if (updateTodoDto.description !== undefined) {
      todo.description = updateTodoDto.description;
    }
    if (updateTodoDto.isCompleted !== undefined) {
      todo.isCompleted = updateTodoDto.isCompleted;
    }

    return this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
