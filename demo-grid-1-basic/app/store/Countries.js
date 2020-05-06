Ext.define('Demo.store.Countries', {
    extend: 'Ext.data.Store',

    storeId: 'Countries',
    
    autoLoad: true,

    fields: [
        'code2',
        'code3',
        'name',
        'capital',
        'region',
        'subregion',
        'states'
    ],

    proxy: {
        type: 'ajax',
        url: 'data/countries.json',
        reader: {
            type: 'json', 
            rootProperty: 'data'
        }
    }
});