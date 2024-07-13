import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TProduct } from './models/product.model';
import {
  Action,
  IQuery,
  IRequest,
  TResponse,
  getResponseType,
} from '../../common/helper/common-types';
import { QueryTypes } from '../../common/decorators/query.decorator';
import { AccessTokenGuard } from '../../common/guards/jwt.guard';
import { AbilitiesGuard } from '../../common/guards/abilities.guard';
import { checkAbilities } from '../../common/decorators/abilities.decorator';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
@ApiExtraModels(TProduct) // this decorator helps us to resolve TProduct class when used in getResponseType function
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOkResponse({
    type: () => {
      return {
        msg: 'ok',
      };
    },
  })
  create() {
    return this.productsService.create();
  }

  @Get()
  @ApiOkResponse(getResponseType(TProduct))
  @QueryTypes()
  @UseGuards(AccessTokenGuard, AbilitiesGuard)
  @checkAbilities({ action: Action.Read, subject: TProduct })
  async findAll(
    @Req() req: IRequest,
    @Query() query: IQuery,
  ): Promise<TResponse<TProduct>> {
    return await this.productsService.findAll(req, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
