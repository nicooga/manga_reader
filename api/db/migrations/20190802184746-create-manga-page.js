'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(transaction =>
      queryInterface.createTable('MangaSeries', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        author: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction })
    );

    await queryInterface.sequelize.transaction(transaction =>
      queryInterface.createTable('MangaChapters', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        chapterNumber: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true
        },
        mangaSeriesId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
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
      }, { transaction })
    );

    await queryInterface.sequelize.transaction(transaction =>
      queryInterface.createTable('MangaPages', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        picture: {
          type: Sequelize.STRING
        },
        mangaChapterId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: 'CASCADE',
          references: {
            model: 'MangaChapters',
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
      }, { transaction })
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MangaPages');
    await queryInterface.dropTable('MangaChapters');
    await queryInterface.dropTable('MangaSeries');
  }
};
