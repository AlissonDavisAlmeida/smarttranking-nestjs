import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from './interfaces/category-interface';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
    ) { }

    async createCategory(createCategory: CreateCategoryDto) {

        const { category } = createCategory

        const categoryFound = await this.categoryModel.findOne({ category });

        if (categoryFound) throw new BadRequestException('Category already exists!');

        const categoryCreated = await this.categoryModel.create(createCategory);

        if (!categoryCreated) throw new BadRequestException('Category not created!');


        return categoryCreated;
    }
}
