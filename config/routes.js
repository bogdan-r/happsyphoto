/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'Web/WelcomeController',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  //admin login
  '/happsyadmin': 'Web/AuthController.index',
  'post /happsyadmin/login': 'Web/AuthController.login',

  '/happsyadmin/logout': 'Web/AuthController.logout',



  /*Web part*/

  //Categories
  '/category/:slug': {
    controller: 'Web/CategoryController',
    action: 'show',
    locals: {
      hasPadding: true
    }
  },

  //Galleries
  '/gallery/:slug': {
    controller: 'Web/GalleryController',
    action: 'show',
    locals: {
      hasPadding: true
    }
  },




  /*Admin part*/

  '/admin': {
    controller: 'Admin/WelcomeController',
    action: 'index',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },


  //Attachment
  '/admin/attachment': {
    controller: 'Admin/AttachmentController',
    action: 'index',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  '/admin/attachment/new': {
    controller: 'Admin/AttachmentController',
    action: 'new',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'get /admin/attachment/edit/:id': {
    controller: 'Admin/AttachmentController',
    action: 'edit',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'post /admin/attachment/edit/:id': {
    controller: 'Admin/AttachmentController',
    action: 'update',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  '/admin/attachment/destroy': {
    controller: 'Admin/AttachmentController',
    action: 'destroy',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  '/admin/attachment/restore': {
    controller: 'Admin/AttachmentController',
    action: 'restore',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  //upload attachment
  '/api/admin/upload_attacment': {
    controller: 'Admin/AttachmentController',
    action: 'create',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
    //api attachment
    '/api/admin/attachment': {
      controller: 'Api/Admin/AttachmentController',
      action: 'find'
    },
    'post /api/admin/favorite_attachment': {
      controller: 'Api/Admin/FavoriteAttachmentController',
      action: 'create'
    },


  //Categories
  'get /admin/category': {
    controller: 'Admin/CategoryController',
    action: 'index',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'post /admin/category': {
    controller: 'Admin/CategoryController',
    action: 'create',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  '/admin/category/new': {
    controller: 'Admin/CategoryController',
    action: 'new',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'get /admin/category/:id': {
    controller: 'Admin/CategoryController',
    action: 'edit',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'post /admin/category/:id': {
    controller: 'Admin/CategoryController',
    action: 'update',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'delete /admin/category/:id': {
    controller: 'Admin/CategoryController',
    action: 'destroy',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },


  //Gallery
  'get /admin/gallery': {
    controller: 'Admin/GalleryController',
    action: 'index',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'post /admin/gallery': {
    controller: 'Admin/GalleryController',
    action: 'create',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'get /admin/gallery/new': {
    controller: 'Admin/GalleryController',
    action: 'new',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'get /admin/gallery/:id': {
    controller: 'Admin/GalleryController',
    action: 'edit',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'post /admin/gallery/:id': {
    controller: 'Admin/GalleryController',
    action: 'update',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'post /api/admin/delete_gallery_attachment': {
    controller: 'Admin/GalleryController',
    action: 'deleteAttach',
    locals: {
      layout: 'layouts/admin/layout'
    }
  },
  'delete /admin/gallery/:id': {
    controller: 'Admin/GalleryController',
    action: 'destroy',
    locals: {
      layout: 'layouts/admin/layout'
    }
  }
};
