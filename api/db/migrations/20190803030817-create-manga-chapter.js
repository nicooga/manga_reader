'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MangaChapters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chapterNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        nique: true
      },
      mangaSeriesId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'MangaSeries',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MangaChapters');
  }
};
