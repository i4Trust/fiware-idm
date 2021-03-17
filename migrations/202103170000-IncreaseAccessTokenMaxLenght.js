module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('oauth_access_token', 'access_token', {
      type: Sequelize.STRING(8192),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('oauth_access_token', 'access_token', {
      type: Sequelize.STRING(255),
    });
  },
};
