/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html
 */
Ext.define('Demo.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewmodel',
    requires: [
        'Demo.model.User',
        'Demo.model.Item',
        'Demo.model.Manufacturer'
    ],

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html#cfg-data
     */
    data: {
        title: 'Demo',
        selection: {}
    },
    
    /**
     * Stores specifically used within this view.
     */
    stores: {

        countries: {
            autoLoad: true,
            fields: [ 'code2', 'code3', 'name', 'capital', 'region', 'subregion', 'states' ],
            proxy: {
                type: 'ajax',
                url: 'data/countries.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        
        states: {
            source: '{countries}'
        },

        users: {
            model: 'Demo.model.User',
            autoLoad: true
        },

        manufacturers: {
            model: 'Demo.model.Manufacturer',
            autoLoad: true
        },

        items: {
            model: 'Demo.model.Item',
            autoLoad: true
        }
    }
});