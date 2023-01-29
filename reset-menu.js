'use strict';

module.exports.reset_menu = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Reset menu function called',
        input: event,
      },
      null,
      2
    ),
  };
};
