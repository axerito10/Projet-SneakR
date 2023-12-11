'use strict';

/**
 * private service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::private.private');
