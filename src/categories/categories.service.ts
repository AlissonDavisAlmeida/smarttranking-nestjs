import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from 'src/players/interfaces/Player.interface';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { Category } from './interfaces/category-interface';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
        private readonly playerService: PlayersService

    ) { }

    async createCategory(createCategory: CreateCategoryDto) {

        const { category } = createCategory

        const categoryFound = await this.categoryModel.findOne({ category });

        if (categoryFound) throw new BadRequestException('Category already exists!');

        const categoryCreated = await this.categoryModel.create(createCategory);

        if (!categoryCreated) throw new BadRequestException('Category not created!');


        return categoryCreated;
    }

    async findCategories() {

        const categories = await this.categoryModel.find().populate('players');

        if (!categories) throw new BadRequestException('Categories not found!');

        return categories;

    }

    async findCategoryById(id: string) {


            const category = await (await this.categoryModel.findById(id)).populate('players');

            if (!category) throw new NotFoundException('Category not found!');

            return category;
       
    }

    async updateCategory(id: string, categoryUpdate: UpdateCategoryDto) {
        try {

            const categoryFound = await this.categoryModel.findById(id);

            if (!categoryFound) throw new NotFoundException('Category not found!');


            const category = await this.categoryModel.findByIdAndUpdate(id, categoryUpdate, { new: true });


            return category;

        } catch (err: any) {
            throw new BadRequestException(err.message);
        }
    }

    async addPlayerToCategory(categoryId: string, playerId: string) {
        try {
            const categoryFound = await this.categoryModel.findById(categoryId);

            if (!categoryFound) throw new NotFoundException('Category not found!');

            const playerFound = await this.playerService.findById(playerId)

            if (!playerFound) throw new NotFoundException('Player not found!');

            const isPlayerInCategory = this.categoryModel.find({ players: { $in: [playerFound] } });

            if (isPlayerInCategory) throw new BadRequestException('Player already in category!');


            categoryFound.players.push(playerFound);

            const categoryUpdated = await this.categoryModel.findByIdAndUpdate(categoryId, categoryFound, { new: true });

            return categoryUpdated;

        } catch (err: any) {
            throw new BadRequestException(err.message);
        }
    }
}
