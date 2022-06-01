import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAddressDto } from './dto/update-user-address.dto';
import { UserAddressEntity } from './entities/user_address.entity';
import { UserAddressController } from './user-address.controller';
import { UserAddressService } from './user-address.service';

const userAddressEntityItem: UserAddressEntity = {
  id: 1,
  cep: '54420225',
  city: 'Recife',
  complement: 'APT 220',
  district: 'Jaqueira',
  number: 25,
  state: 'PE',
  street: 'Jaboatão dos Guararapes',
};

describe('UserAddressController', () => {
  let userAddressController: UserAddressController;
  let userAddressService: UserAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [UserAddressController],
      providers: [
        {
          provide: UserAddressService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(userAddressEntityItem),
            update: jest.fn().mockResolvedValue(userAddressEntityItem),
            filter: jest.fn().mockResolvedValue(userAddressEntityItem),
          },
        },
      ],
    }).compile();

    userAddressController = module.get<UserAddressController>(
      UserAddressController,
    );
    userAddressService = module.get<UserAddressService>(UserAddressService);
  });

  it('should be defined', () => {
    expect(userAddressController).toBeDefined();
  });

  it('should be defined', () => {
    expect(userAddressService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a filtered user address entity', async () => {
      //Arrange
      const req = {
        user: {
          addressId: 1,
        },
      };

      //Act
      const result = await userAddressController.findOne(req);

      //Assert
      expect(result).toEqual(userAddressEntityItem);
      expect(userAddressService.findOne).toHaveBeenCalledTimes(1);
      expect(userAddressService.filter).toHaveBeenCalledTimes(1);
    });

    it('should throw a error', () => {
      //Arrange
      jest
        .spyOn(userAddressService, 'findOne')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(userAddressController.findOne).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should return a user address entity', async () => {
      //Arrange
      const req = {
        user: {
          addressId: 1,
        },
      };
      const updateAddressDto = new UpdateAddressDto();
      updateAddressDto.street = 'Rua Alan Kardec';

      //Act
      const result = await userAddressController.update(req, updateAddressDto);

      //Assert
      expect(result).toEqual(userAddressEntityItem);
      expect(userAddressService.update).toHaveBeenCalledTimes(1);
      expect(userAddressService.filter).toHaveBeenCalledTimes(1);
    });

    it('Should throw a error', () => {
      //Arrange
      jest.spyOn(userAddressService, 'update').mockRejectedValue(new Error());

      //Assert
      expect(userAddressController.update).rejects.toThrowError();
    });
  });
});
