import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { NotFoundException } from '@nestjs/common';

// Mock TypeORM repository
const mockTodoRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(), // Note: TypeORM's `update` method is different from `save` after finding
  delete: jest.fn(),
  preload: jest.fn(), // Often used with update
});

describe('TodoService', () => {
  let service: TodoService;
  let repository: ReturnType<typeof mockTodoRepository>;

  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    isCompleted: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useFactory: mockTodoRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
      };
      const expectedTodo: Partial<Todo> = { // Partial because ID is generated
        title: 'New Todo',
        description: 'New Description',
        isCompleted: false,
      };
      const savedTodo: Todo = { id: 1, ...expectedTodo } as Todo;

      repository.create.mockReturnValue(expectedTodo); // Mock repository.create
      repository.save.mockResolvedValue(savedTodo); // Mock repository.save

      const result = await service.create(createTodoDto);

      expect(repository.create).toHaveBeenCalledWith({
        ...createTodoDto,
        isCompleted: false,
      });
      expect(repository.save).toHaveBeenCalledWith(expectedTodo);
      expect(result).toEqual(savedTodo);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const todos = [mockTodo, { ...mockTodo, id: 2, title: 'Test Todo 2' }];
      repository.find.mockResolvedValue(todos);

      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(todos);
    });
  });

  describe('findOne', () => {
    it('should return a todo if found', async () => {
      repository.findOneBy.mockResolvedValue(mockTodo);

      const result = await service.findOne(mockTodo.id);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: mockTodo.id });
      expect(result).toEqual(mockTodo);
    });

    it('should throw NotFoundException if todo not found', async () => {
      repository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('update', () => {
    it('should update and return a todo if found', async () => {
      const updateTodoDto: UpdateTodoDto = { title: 'Updated Title' };
      const existingTodo = { ...mockTodo };
      const updatedTodoInstance = { ...existingTodo, ...updateTodoDto };

      // Mock findOneBy to return the existing todo
      repository.findOneBy.mockResolvedValue(existingTodo);
      // Mock save to return the updated todo
      repository.save.mockResolvedValue(updatedTodoInstance);
      
      const result = await service.update(mockTodo.id, updateTodoDto);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: mockTodo.id });
      // Check that the properties of existingTodo were updated before save
      expect(existingTodo.title).toBe(updateTodoDto.title); 
      expect(repository.save).toHaveBeenCalledWith(existingTodo); // The modified existingTodo instance
      expect(result).toEqual(updatedTodoInstance);
    });
    
    it('should update all fields correctly', async () => {
        const updateTodoDto: UpdateTodoDto = { 
            title: 'Fully Updated Title', 
            description: 'Fully Updated Description', 
            isCompleted: true 
        };
        const existingTodo = { ...mockTodo, isCompleted: false, description: 'Old Description' }; // ensure initial state is different
        const updatedTodoInstance = { ...existingTodo, ...updateTodoDto };
  
        repository.findOneBy.mockResolvedValue(existingTodo);
        repository.save.mockResolvedValue(updatedTodoInstance);
  
        const result = await service.update(mockTodo.id, updateTodoDto);
  
        expect(repository.findOneBy).toHaveBeenCalledWith({ id: mockTodo.id });
        expect(existingTodo.title).toBe(updateTodoDto.title);
        expect(existingTodo.description).toBe(updateTodoDto.description);
        expect(existingTodo.isCompleted).toBe(updateTodoDto.isCompleted);
        expect(repository.save).toHaveBeenCalledWith(existingTodo);
        expect(result).toEqual(updatedTodoInstance);
      });


    it('should throw NotFoundException if todo to update not found', async () => {
      const updateTodoDto: UpdateTodoDto = { title: 'Updated Title' };
      repository.findOneBy.mockResolvedValue(null); // Simulate todo not found

      await expect(service.update(999, updateTodoDto)).rejects.toThrow(NotFoundException);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 999 });
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a todo and return void if found', async () => {
      repository.delete.mockResolvedValue({ affected: 1, raw: {} }); // TypeORM delete result

      await expect(service.remove(mockTodo.id)).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith(mockTodo.id);
    });

    it('should throw NotFoundException if todo to remove not found', async () => {
      repository.delete.mockResolvedValue({ affected: 0, raw: {} }); // Simulate no rows affected

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.delete).toHaveBeenCalledWith(999);
    });
  });
});
