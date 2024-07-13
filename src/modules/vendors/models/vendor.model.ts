import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class TVendor {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty()
  manufacturerId: string;

  @ApiProperty()
  manufacturerName: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
