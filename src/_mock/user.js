import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  files: sample([
    '2',
    '4',
    '6',
  ]),
  status: sample(['active', 'banned']),
  semester: sample([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ]),
}));
