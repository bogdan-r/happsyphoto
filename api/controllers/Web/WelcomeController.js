/**
 * Web/WelcomeController
 *
 * @description :: Server-side logic for managing Web/welcomes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
    return res.view();
  }
};

