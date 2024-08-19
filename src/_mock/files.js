import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

const FILES_NAME = [
    'Rapor Semester 1',
    'Rapor Semester 2',
    'Rapor Semester 3',
    'Rapor Semester 4',
  ];

// const FILES_COLOR = [
//     '#FF0230',
//     '#1DD200'
//   ];
export const files = [
    {
        id: faker.string.uuid(),
        image: `/assets/images/products/product_1.jpg`,
        ownerId: 1,
        name: FILES_NAME[0],
        timeCreated: faker.date.anytime(),
        sendBy: 'Admin',
        status: sample(['Shared', 'Not Shared']),
        cover: `/assets/images/rapor/rapor.png`,
    },
    {
        id: faker.string.uuid(),
        image: `/assets/images/products/product_1.jpg`,
        ownerId: 1,
        name: FILES_NAME[1],
        timeCreated: faker.date.anytime(),
        sendBy: 'Admin',
        status: sample(['Shared', 'Not Shared']),
        cover: `/assets/images/rapor/rapor.png`,
    },
    {
        id: faker.string.uuid(),
        image: `/assets/images/products/product_1.jpg`,
        ownerId: 1,
        name: FILES_NAME[2],
        timeCreated: faker.date.anytime(),
        sendBy: 'Admin',
        status: sample(['Shared', 'Not Shared']),
        cover: `/assets/images/rapor/rapor.png`,
    },
    {
        id: faker.string.uuid(),
        image: `/assets/images/products/product_1.jpg`,
        ownerId: 1,
        name: FILES_NAME[3],
        timeCreated: faker.date.anytime(),
        sendBy: 'Admin',
        status: sample(['Shared', 'Not Shared']),
        cover: `/assets/images/rapor/rapor.png`,
    },
];
