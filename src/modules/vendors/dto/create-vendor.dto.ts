import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVendorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  manufacturerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  manufacturerName: string;
}
