const { faker } = require('@faker-js/faker');

('use strict');

const boilerManufactures = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
];

const partsManufactures = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'BoilerParts',
      [...Array(100)].map(() => ({
        boiler_manufacturer:
          boilerManufactures[
            Math.floor(Math.random() * boilerManufactures.length)
          ],
        parts_manufacturer:
          partsManufactures[
            Math.floor(Math.random() * boilerManufactures.length)
          ],
        price: faker.random.numeric(4),
        name: faker.lorem.sentence(2),
        description: faker.lorem.sentence(10),
        images: JSON.stringify(
          [...Array(7)].map(
            () =>
              `${faker.image.technics()}?random=${faker.random.numeric(10)}`,
          ),
        ),
        vendor_code: faker.internet.password(),
        in_stock: faker.random.numeric(1),
        bestsellers: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        popularity: faker.random.numeric(3),
        compatibility: faker.lorem.sentence(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  // in the case of an api rollback
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BoilerParts', null, {});
  },
};
