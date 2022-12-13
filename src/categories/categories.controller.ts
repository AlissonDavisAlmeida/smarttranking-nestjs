import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';

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
}
