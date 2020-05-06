/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html
 */
Ext.define('Demo.view.users.UsersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.usersviewmodel',

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html#cfg-data
     */
    data: {

    },

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html#cfg-formulas
     */
    formulas: {

    },

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html#cfg-links
     */
    links: {
        // newUser: {
        //     type: 'Demo.model.User',
        //     create: {
        //         firstName: 'John',
        //         lastName: 'Smith'
        //     }
        // }
    },

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html#cfg-schema
     */
    schema: 'default',

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html#cfg-session
     */
    session: null,

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html#cfg-stores
     */
    stores: {
        users: {
            model: 'UserModel',
            filters: [{
                property: 'groupId',
                value: '{groupId}'
            }]
        }
    }
});