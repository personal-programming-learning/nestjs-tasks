import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { TaskDTO } from './dto/task.dto';
import { ITask } from './task.interface';

@Injectable()
export class TaskService {
  tasks: ITask[] = [];

  async create(taskDTO: TaskDTO): Promise<ITask> {
    const task = {
      id: uuidv4(),
      ...taskDTO,
    };
    this.tasks.push(task);

    return task;
  }

  async findAll(): Promise<ITask[]> {
    return this.tasks;
  }

  async findOne(id: string): Promise<ITask> {
    return this.tasks.find((task) => task.id === id);
  }

  async update(id: string, taskDto: TaskDTO): Promise<ITask> {
    const newTask = { id, ...taskDto };
    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }

  async delete(id: string): Promise<string> {
    this.tasks.filter((task) => task.id !== id);
    return `Task delete with id: ${id}`;
  }
}
