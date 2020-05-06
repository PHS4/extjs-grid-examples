Ext.define('Demo.model.Review', {
    extend: 'Ext.data.Model',

    fields: [
        'item_id',
        'user_id',
        'review',
        'rating'
    ],
    
    proxy: {
        type: 'rest',
        url: 'data/db.json',
        reader: {
            type: 'json',
            rootProperty: 'reviews'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
