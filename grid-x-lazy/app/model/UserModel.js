/**
 * A representation of a single record.
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.data.Model.html
 * ./app/model/Users.js
 */
Ext.define('Demo.model.UserModel', {
    extend: 'Ext.data.Model',

    /**
     * Define the fields that will be used for a record.
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.data.Model.html#cfg-fields
     */
    fields: [
        'id',
        'role_id',
        'active',
        'first_name',
        'last_name',
        'email',
        'password',
        'logged_in',
        'expires_on'
    ],

    /**
     * The proxy is used to tell the model where to send and recieve data.
     * It can also be used by the Store to to know how to load many records
     * if the rest api returns an array of records.
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.data.proxy.Rest.html
     */
    proxy: {
        type: 'rest',
        url: window.location.host == 'localhost:3000' ? 'http://localhost:3000/users' : 'db.json',

        /**
         * How to interperet incoming data.
         * https://docs.sencha.com/extjs/7.2.0/classic/Ext.data.reader.Json.html
         */
        reader: {
            type: 'json',

            /**
             * The property to look for the fields defined above.
             */
            rootProperty: 'users'
        }
    }
});
