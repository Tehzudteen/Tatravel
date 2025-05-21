import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity'; // Import Todo entity

@Module({
  imports: [TypeOrmModule.forFeature([Todo])], // Import Todo repository
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
