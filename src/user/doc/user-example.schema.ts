export const userSchemaExample = {
  id: 1,
  fullName: 'Fulano de tal',
  rg: '15554 SDS BA',
  cpf: '13938958588',
  profilePictureUrl:
    'https://multimidia.boavontade.com/sites/default/files/styles/grande/public/shutterstock_131890520-.jpg?itok=CZx9ebUD',
  birthDate: '2000-03-27T00:00:00.000Z',
  createdAt: '2022-05-18T01:01:04.060Z',
  address: {
    cep: '54420257',
    street: 'Rua dos lirios',
    number: 7,
    complement: 'Bloco A apartamento 402',
    district: 'Piedade',
    state: 'Salvador',
  },
  contacts: {
    email: 'cicrano@boitata.com',
    phone: '40028922',
    mobilePhone: '81981143555',
  },
};

export const newUserSchemaExample = {
  id: 4,
  fullName: 'Danny Worsnop',
  cpf: '13938947485',
  rg: null,
  birthDate: null,
  contacts: {
    email: 'fulanodetal@boitata.com',
    phone: null,
    mobilePhone: null,
  },
  address: {
    cep: null,
    street: null,
    number: null,
    complement: null,
    district: null,
    state: null,
  },
  profilePictureUrl: null,
  createdAt: '2022-05-18T03:36:02.647Z',
};
