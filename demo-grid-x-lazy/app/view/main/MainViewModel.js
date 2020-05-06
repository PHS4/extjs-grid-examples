Ext.define('Demo.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewmodel',

    data: {
        title: 'Demo: Lazy Grid Builder',

        rawData: null,

        sampleData: {},

        fieldsData: [],

        selection: {
            name: 'Choose a Data Souce',
            url: 'http://...',
            root: undefined
        }
    },

    stores: {
        dataSources: {
            fields: ['name', 'url', 'root'],
            data: [
                { name: 'JSON File',    url: 'db.json', root: null },
                { name: 'Items',        url: 'http://localhost:3000/items', root: null },
                { name: 'Repo Issues',  url: 'https://api.github.com/repos/sencha/ext-react/issues', root: null },
                { name: 'Users',        url: 'https://llbzr8dkzl.execute-api.us-east-1.amazonaws.com/production/user', root: 'users' },
                { name: 'Pokemon',      url: 'https://pokeapi.co/api/v2', root: null },
                { name: 'Countries',    url: 'https://restcountries.eu/rest/v2/all', root: null }
            ],
            proxy: {
                type: 'memory'
            }
        }
    }
});
