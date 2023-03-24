 /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async knex => {
    await knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.boolean('userRoll', 256).notNullable();
      tbl.text('firstName', 256).notNullable();
      tbl.text('lastName', 256).notNullable();
      tbl.text('email', 256).notNullable();
      tbl.text('password', 256).notNullable();
    });
  
    await knex.schema.createTable('bookings', tbl => {
      tbl.increments();
      tbl.text('firstName', 256).notNullable();
      tbl.text('lastName', 256).notNullable();
      tbl.text('numberOfPeople', 256).notNullable();
      tbl.text('email', 256).notNullable();
      tbl.text('phoneNumber', 256).notNullable();
      tbl.text('created_at', 256).notNullable();
      tbl.text('from', 256).notNullable();
      tbl.text('to', 256).notNullable();
      tbl.text('status', 256).notNullable();
      tbl.text('userId', 256).notNullable();
      tbl.text('packageId', 256).notNullable();
      tbl.text('contentType', 256).notNullable();
      tbl.text('comment', 256).notNullable();
      tbl.text('price', 256).notNullable();
      tbl.text('total', 256).notNullable();
    });
  
    await knex.schema.createTable('enquiry', tbl => {
      tbl.increments();
      tbl.text('firstName', 256).notNullable();
      tbl.text('lastName', 256).notNullable();
      tbl.text('email', 256).notNullable();
      tbl.text('phoneNumber', 256).notNullable();
      tbl.text('created_at', 256).notNullable();
      tbl.text('message', 256).notNullable();
      tbl.text('status', 256).notNullable();
    });
  
    await knex.schema.createTable('packages', tbl => {
      tbl.increments();
      tbl.text('name', 256).notNullable();
      tbl.float('price', 256).notNullable();
      tbl.text('country', 256).notNullable();
      tbl.text('type', 256).notNullable();
      tbl.text('features', 256).notNullable();
      tbl.text('detail', 256).notNullable();
      tbl.text('created_at', 256).notNullable();
      tbl.text('image', 256).notNullable();
    });
    await knex.schema.createTable('famousepackages', tbl => {
      tbl.increments();
      tbl.text('name', 256).notNullable();
      tbl.float('price', 256).notNullable();
      tbl.text('country', 256).notNullable();
      tbl.text('type', 256).notNullable();
      tbl.text('features', 256).notNullable();
      tbl.text('detail', 256).notNullable();
      tbl.text('created_at', 256).notNullable();
      tbl.text('image', 256).notNullable();
    });
    await knex.schema.createTable('blog', tbl => {
      tbl.increments();
      tbl.text('title', 256).notNullable();
      tbl.text('blog').notNullable();
      tbl.text('image').notNullable();
      tbl.text('user').notNullable();
      tbl.text('date').notNullable();
    });
    await knex.schema.createTable('blogComments', tbl => {
      tbl.increments();
      tbl.text('userId').notNullable();
      tbl.text('blogId').notNullable();
      tbl.text('userName').notNullable();
      tbl.text('comment').notNullable();
      tbl.text('created_at', 256).notNullable();
    });
    await knex.schema.createTable('hotel', tbl => {
      tbl.increments();
      tbl.text('name').notNullable();
      tbl.text('image').notNullable();
      tbl.float('price', 256).notNullable();
      tbl.text('detail').notNullable();

    });
    await knex.schema.createTable('hotelBooking', tbl => {
      tbl.increments();
      tbl.text('firstName', 256).notNullable();
      tbl.text('lastName', 256).notNullable();
      tbl.text('numberOfPeople', 256).notNullable();
      tbl.text('email', 256).notNullable();
      tbl.text('phoneNumber', 256).notNullable();
      tbl.text('created_at', 256).notNullable();
      tbl.text('checkIn', 256).notNullable();
      tbl.text('checkOut', 256).notNullable();
      tbl.text('status', 256).notNullable();
      tbl.text('userId', 256).notNullable();
      tbl.text('packageId', 256).notNullable();
      tbl.text('price', 256).notNullable();
      tbl.text('total', 256).notNullable();
    });
  };
  
  /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
  exports.down = async knex => {
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('bookings');
    await knex.schema.dropTableIfExists('enquiry');
    await knex.schema.dropTableIfExists('packages');
    await knex.schema.dropTableIfExists('famousepackages');
    await knex.schema.dropTableIfExists('blog');
    await knex.schema.dropTableIfExists('blogComments');
    await knex.schema.dropTableIfExists('hotel');
    await knex.schema.dropTableIfExists('hotelBooking');
  };