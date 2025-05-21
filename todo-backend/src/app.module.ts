import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity'; // Import Todo entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Or your Docker service name if running in a Docker network, e.g., 'db'
      port: 5432,
      username: 'todo_user',
      password: 'todo_password',
      database: 'todo_db',
      entities: [Todo], // Include Todo entity
      synchronize: true, // Auto-create database schema (dev only)
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
