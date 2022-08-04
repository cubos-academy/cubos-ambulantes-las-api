export const eventsExampleSchema = [
  {
    id: 21,
    name: 'Carnaval em Recife',
    description: 'O melhor carnaval do mundo é por aqui',
    imageUrl: 'www.imgur.com/imgr22.jpg',
    startDate: '2023-02-01T00:00:00.000Z',
    endDate: '2023-04-01T00:00:00.000Z',
    status: 1,
    allowedSalesTypes: [
      {
        id: 1,
        name: 'Bebidas',
        description: 'Sem Álcool',
      },
    ],
  },
  {
    id: 39,
    name: 'Carnaval em Narnia',
    description: 'O melhor carnaval do mundo é por aqui',
    imageUrl: 'www.imgur.com/imgr22.jpg',
    startDate: '2023-02-01T00:00:00.000Z',
    endDate: '2023-04-01T00:00:00.000Z',
    status: 2,
    allowedSalesTypes: [
      {
        id: 2,
        name: 'Comidas',
        description: null,
      },
    ],
  },
  {
    id: 25,
    name: 'Carnaval da Bahia',
    description: 'O melhor carnaval do mundo é por aqui',
    imageUrl: 'www.imgur.com/imgr22.jpg',
    startDate: '2023-02-01T00:00:00.000Z',
    endDate: '2023-04-01T00:00:00.000Z',
    status: 3,
    allowedSalesTypes: [
      {
        id: 1,
        name: 'Bebidas',
        description: 'Sem Álcool',
      },
      {
        id: 3,
        name: 'Pulseirinhas',
        description: 'Nas cores pretas, azul e rosa',
      },
    ],
  },
];
