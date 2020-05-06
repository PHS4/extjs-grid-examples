/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html
 */
Ext.define('Demo.view.users.UsersViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersviewcontroller',
    
    id: undefined,

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-control
     */
    control: {
        // 'button': {
        //     click: 'onEventLogger'
        // }
    },

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-bindings
     */
    bindings: null,

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-listen
     */
    listen: {
        global: {
            // added: 'onEventLogger',
            // idle: 'onEventLogger',
            // show: 'onEventLogger'
        },
        controller: {
            // '*': function () {
            //      console.log(arguments.callee.name);
            // }
        },
        component: {},
        store: {}
    },

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-listeners
     */
    listeners: {
        select: 'onSelect'
    },

    onSelect: function () { 
        console.log(arguments.callee.name, ...arguments);
    }
});