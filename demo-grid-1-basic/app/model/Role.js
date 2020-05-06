Ext.define('Demo.model.Role', {
    extend: 'Ext.data.Model',
    
    fields: [
        'id',
        'name'
    ],

    proxy: {
        type: 'rest',
        url: 'data/db.json',
        reader: {
            type: 'json',
            rootProperty: 'roles'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
