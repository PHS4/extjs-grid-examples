/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html
 */
Ext.define('Demo.view.users.UsersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.usersviewmodel',

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html#cfg-stores
     */
    stores: {
        users: {
            model: 'Demo.model.User',
            autoLoad: true,
            groupField: 'active'
        }
    }
});