import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { NotesAct2Service } from './notes-act2.service';

@Controller('act2/notes')
export class NotesAct2Controller {
  constructor(private readonly notesService: NotesAct2Service) { }

  @Post()
  async create(@Body() body: { userId: number; title: string; content: string }) {
    return this.notesService.create(body.userId, body.title, body.content);
  }

  // ✅ This ensures your frontend `getNotes(user.id)` works correctly
  @Get(':userId')
  async getNotes(@Param('userId') userId: number) {
    return this.notesService.findAllByUser(userId);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.notesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.notesService.delete(id);
  }
}
