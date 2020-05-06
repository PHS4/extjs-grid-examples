/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html
 */
Ext.define('Demo.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewmodel',

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewModel.html#cfg-data
     */
    data: {

        title: 'Demo',
        
        feature: 'Summary'
    }
});