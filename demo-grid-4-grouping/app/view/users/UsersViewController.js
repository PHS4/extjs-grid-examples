/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html
 */
Ext.define('Demo.view.users.UsersViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersviewcontroller',
    
    id: 'usersViewController',
    
    listen: {
        component: {
            'grid': {
                select: 'onSelect'
            }
        }
    },
    
    onSelect: function (grid, record, index, eOpts) {
        Ext.toast({
            title: 'Event',
            iconCls: 'x-fa fa-broadcast-tower',
            html: `Selected ${record.get('first_name')} in row #${index}`,
            layout: 'fit'
        });
    }
});