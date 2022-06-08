import { UnauthorizedException } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateSalesTypeDto } from './dto/create-sales-type.dto';
import { SalesTypeEntity } from './entities/sales-type.entity';
import { SalesTypesController } from './sales-types.controller';
import { SalesTypesService } from './sales-types.service';

const salesTypeEntityItem = new SalesTypeEntity({
  id: 1,
  name: 'Drinks',
  description: 'Drinks for everyone',
});

const salesTypeEntityList = [
  salesTypeEntityItem,
  salesTypeEntityItem,
  salesTypeEntityItem,
];

describe('SalesTypesController', () => {
  let salesTypeController: SalesTypesController;
  let salesTypesService: SalesTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [SalesTypesController],
      providers: [
        {
          provide: SalesTypesService,
          useValue: {
            create: jest.fn().mockResolvedValue(salesTypeEntityItem),
            findAll: jest.fn().mockResolvedValue(salesTypeEntityList),
            findOne: jest.fn().mockResolvedValue(salesTypeEntityItem),
          },
        },
      ],
    }).compile();

    salesTypeController =
      module.get<SalesTypesController>(SalesTypesController);
    salesTypesService = module.get<SalesTypesService>(SalesTypesService);
  });

  it('should be defined', () => {
    expect(salesTypeController).toBeDefined();
  });

  it('should be defined', () => {
    expect(salesTypesService).toBeDefined();
  });

  describe('create', () => {
    it('should return an salesTypeEntity Item', async () => {
      //Arrange
      const createSalesTypeDto = new CreateSalesTypeDto();
      createSalesTypeDto.name = 'Drinks';
      createSalesTypeDto.description = 'Drinks for everyone';
      createSalesTypeDto.adminKey = process.env.ADMIN_KEY;

      //Act
      const result = await salesTypeController.create(createSalesTypeDto);

      //Arrange
      expect(result).toEqual(salesTypeEntityItem);
      expect(salesTypesService.create).toHaveBeenCalledTimes(1);
      expect(salesTypesService.create).toHaveBeenCalledWith(createSalesTypeDto);
    });

    it('should throw unauthorized error', async () => {
      // Arrange
      const createSalesTypeDto = new CreateSalesTypeDto();
      createSalesTypeDto.adminKey = 'randomKey';

      //Assert
      expect(
        salesTypeController.create(createSalesTypeDto),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe('findAll', () => {
    it('should return salesTypeEntity list', async () => {
      //Act
      const result = await salesTypeController.findAll();

      //Assert
      expect(result).toEqual(salesTypeEntityList);
      expect(salesTypesService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return salesTypeEntityItem', async () => {
      //Arrange
      const id = 1;

      //Act
      const result = await salesTypeController.findOne(id);

      //Assert
      expect(result).toEqual(salesTypeEntityItem);
      expect(salesTypesService.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
