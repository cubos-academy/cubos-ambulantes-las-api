import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-user-address.dto';
import { UserAddressEntity } from './entities/user_address.entity';
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

describe('UserAddressService', () => {
  let userAddressService: UserAddressService;
  let userAddressRepo: Repository<UserAddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAddressService,
        {
          provide: getRepositoryToken(UserAddressEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userAddressEntityItem),
            save: jest.fn().mockResolvedValue(userAddressEntityItem),
          },
        },
      ],
    }).compile();

    userAddressService = module.get<UserAddressService>(UserAddressService);
    userAddressRepo = module.get<Repository<UserAddressEntity>>(
      getRepositoryToken(UserAddressEntity),
    );
  });

  it('should be defined', () => {
    expect(userAddressService).toBeDefined();
  });

  it('should be defined', () => {
    expect(userAddressRepo).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user address entity', async () => {
      //Arrange
      const id = 1;

      //Act
      const result = await userAddressService.findOne(id);

      //Assert
      expect(result).toEqual(userAddressEntityItem);
      expect(userAddressRepo.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a user address entity', async () => {
      //Arrange
      const id = 1;
      const updateAddressDto = new UpdateAddressDto();
      updateAddressDto.street = 'Rua Alan Kardec';

      //Act
      const result = await userAddressService.update(id, updateAddressDto);

      //Assert
      expect(result).toEqual(userAddressEntityItem);
      expect(userAddressRepo.save).toHaveBeenCalledTimes(1);
    });
  });
});
