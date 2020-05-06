/**
 * A representation of a single record.
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.data.Model.html
 */
Ext.define('Demo.model.User', {
    extend: 'Ext.data.Model',

    /**
     * Define the fields that will be used for a record.
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.data.Model.html#cfg-fields
     */
    fields: [
        { name: 'id', type: 'int', persist: false },
        { name: 'role_id', type: 'int' },
        { name: 'active', type: 'boolean' },
        { name: 'first_name', type: 'string' },
        { name: 'last_name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'auto' },
        { name: 'created_at', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'updated_at', type: 'date', dateFormat: 'Y-m-d' }
    ],

    /**
     * The proxy is used to tell the model where to send and recieve data.
     * It can also be used by the Store to to know how to load many records
     * if the rest api returns an array of records.
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.data.proxy.Rest.html
     */
    proxy: {
        type: 'rest',
        url: 'data/db.json',

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
