import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('api/v1/categories')
export class CategoriesController {


    constructor(
        private readonly categoriesService: CategoriesService,
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body() category: CreateCategoryDto,
    ) {
        return await this.categoriesService.createCategory(category);
    }

    @Get()
    async findCategories() {
        return await this.categoriesService.findCategories();
    }

    @Get('/:id')
    async findCategoryById(@Param('id') id: string) {
        return await this.categoriesService.findCategoryById(id);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateCategory(@Param("id") id: string, @Body() category: UpdateCategoryDto) {
        return await this.categoriesService.updateCategory(id, category);
    }

    @Post("/:categoryId/players/:playerId")
    async addPlayerToCategory(@Param("categoryId") id: string, @Param("playerId") playerId: string) {
        return await this.categoriesService.addPlayerToCategory(id, playerId);
    }
}
