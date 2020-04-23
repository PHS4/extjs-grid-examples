/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html
 */
Ext.define('Demo.view.main.MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewcontroller',

    listen: {
        component: {
            'datasourceview': {

                /**
                 * Listen for custom events thrown by the DataSourceView
                 */
                loaddata: 'onLoadData',
                generategrid: 'onGenerateGrid',

                /**
                 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.Panel.html#event-select
                 */
                select: 'onSelect'
            }
        }
    },
    
    /**
     * Once the view has rendered we want to add some listeners to the raw data source
     * to allow user clicks to set the root value.
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#method-afterRender
     * @param {*} view
     */
    afterRender: function (view) {
        var me = this;
        // Only register clicks on when a user clicks on a property in the code view.
        view.down('#raw code').getEl().on('click', e => {
            if (e.target.classList.contains('property')) me.onPropertyClick(e);
        });
    },

    onPropertyClick: function (e) {
        var me = this;
        var record = this.getViewModel().get('selection');
        record.set('root', e.target.innerText.split('"').join(''));
        // after the change has been made trigger reload.
        this.loadData(record, true);
    },

    onSelect: function (view, record, index, eOpts) {
        this.loadData(record, true);
    },

    onLoadData: function (record) {
        this.loadData(record, false);
    },

    onGenerateGrid: function (record) {
        this.loadData(record, true);
    },

    /**
     * Pretty much everthing hinges on this method.
     * @param {object} record a data souce record
     * @param {boolean} genGrid pass true to trigger grid generation after loading the data.
     */
    loadData: function (record, genGrid = false) {

        var vm = this.getViewModel();

        vm.set('selection',  record);
        
        // These aren't necessary but clue the user in that something is happening.
        //
        // clear all the data
        vm.set('rawData',    '// loading...');
        vm.set('sampleData', '// loading...');
        vm.set('fieldsData', '// loading...');

        // clear the grid columns
        var dynoGrid = this.getView().down('dynamicview');
        dynoGrid.setColumns([]);

        // Load the data.
        Ext.Ajax.request({
            url: record.get('url'),
            cors: true,
            scope: this,
            success: function (res) {
                
                var rawData = JSON.parse(res.responseText);
                var sampleData = this.getSample(rawData, record.get('root'));
                var fieldsData = this.flatten(sampleData.data);
                
                // since the getSample method will choose a root property if not provided
                // this just makes sure it is current.
                record.set('root', sampleData.rootProperty);

                // update the viewmodel with new data.
                vm.set('rawData',    rawData);
                vm.set('sampleData', sampleData.data);
                vm.set('fieldsData', fieldsData);

                if (genGrid) {
                    this.generateGrid();
                }
            },
            failure: function (res) {
                console.log(res);
                vm.set('rawData',    '// There was an error getting the data.');
                vm.set('sampleData', '// <- what that said');
                vm.set('fieldsData', '// <- what that said');
            }
        });
    },

    // Grid Generation
    
    generateGrid: function () {
        console.log(arguments.callee.name);

        var fields = this.getViewModel().get('fieldsData');
        var selection = this.getViewModel().get('selection');
        var rootProperty = selection.get('root');
        var grid = this.getView().down('#tbdGrid');
        
        // update the grid title.
        grid.setTitle(selection.get('name') + (rootProperty ? '.' + rootProperty : ''));
        
        // update the grid store
        // https://docs.sencha.com/extjs/7.2.0/classic/Ext.data.Store.html
        grid.setStore({

            // we aren't using a model so we provide the fields here instead.
            fields: fields,
            
            // https://docs.sencha.com/extjs/7.2.0/classic/Ext.data.proxy.Ajax.html
            proxy: {
                type: 'ajax',
                url: selection.get('url'),
                reader: {
                    type: 'json',
                    rootProperty
                }
            }
        });
        grid.setColumns(this.generateGridColumns(fields));
        grid.reconfigure();
        grid.getStore().load();

        return grid;
    },

    /**
     * Takes fields from a model or generated by the flatter method
     * to create basic grid column config.
     * @param {array} fields 
     */
    generateGridColumns: function (fields = []) {
        return fields.map((field, index) => {
            var columnType = 'gridcolumn';
            var editorType = 'displayfield';

            switch (field.type) {
                case 'array':
                    columnType = 'arraycolumn';
                    editorType = 'textfield';
                case 'date':
                    columnType = 'datecolumn';
                    editorType = 'datefield';
                case 'number':
                case 'integer':
                    columnType = 'numbercolumn';
                    editorType = 'numberfield';
                case 'auto':
                case 'string':
                default:
                    columnType = 'gridcolumn';
                    editorType = 'textfield';
                    break;
            }

            return {
                xtype: columnType,
                dataIndex: field.name,
                text: field.name.split('_').join(' ').toUpperCase(),
                width: ((field.name.length * 16) + 16),
                editor: editorType
            };
        })
    },

    /**
     * Attempts to find an object representing a single record.
     * @param {object} data parsed json data
     * @param {string} rootProperty optional target property name
     */
    getSample: function (data, rootProperty) {
        var type = this.getType(data);

        data = (type === 'Array') ? data[0] : data;

        if (rootProperty && data.hasOwnProperty(rootProperty)) {
            data = data[rootProperty];
        }

        if (type === 'Object') {
            for (let property in data) {
                var value = data[property];
                if (this.getType(value) === 'Array') {
                    data = value.length && value[0];
                    rootProperty = property;
                }
            }
        }

        data = (this.getType(data) === 'Array') ? data[0] : data;

        return { data, rootProperty };
    },

    /**
     * Takes an object and recurisivly maps properties and types to 
     * create an array of fields. 
     * @param {object} object data 
     */
    flatten: function (object) {

        var fields = [];

        for (let key in object) {
            let value = object[key];
            let type = this.getType(value) || 'auto';
            let mapping = key;
            let field = {
                name: key,
                value: value,
                type: type.toLowerCase()
            };

            if (type === 'Object') {
                let subFields = this.flatten(value).map(subField => {
                    subField.mapping = mapping + '.' + (subField.mapping || subField.name);
                    return subField;
                });
                fields.push(...subFields);
            }
            else if (type === 'Array') {
                
                if (value.length && this.getType(value[0]) === 'Object') {
                    let subFields = this.flatten(value[0]).map((subField, index) => {
                        subField.path = mapping + '[' + index + '].' + (subField.mapping || subField.name);
                        return subField;
                    });

                    fields.push(...subFields);
                
                } else {

                    fields.push(field);
                }
            }
            else {
                fields.push(field);
            }
        }

        return fields;
    },

    /**
     * checks the type of a value and returns the proper type name.
     * @param {*} value 
     */
    getType: function (value) {
        if (value === null || value === undefined) return undefined;
        return value.constructor.name;
    },
    
    // View Source

    viewSource: function (btn) {
        var files = [
            { text: 'index.html' },
            { text: 'db.json' }
        ];

        // checks for script files added to the html document.
        Array.from(document.querySelectorAll('script')).forEach((script, i) => {
            // not the prettiest way to skip cdn loaded scripts
            if (i > 2) {
                var relativePath = script.src.replace(window.location.href, '').split('?').slice(0, 1)[0];
                console.log(relativePath);
                files.push({ text: relativePath });
            }
        });

        Ext.create('Ext.window.Window', {
            width: '65%',
            height: '75%',
            layout: 'fit',
            title: 'View Source',
            id: 'viewSourceWindow',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'left',
                margin: 10,
                defaults: {
                    xtype: 'button',
                    textAlign: 'left',
                    ui: 'default-toolbar',
                    cls: 'dock-tab-btn',
                    iconCls: 'x-fa fa-code',
                    handler: 'changeSource'
                },
                items: files
            }],
            items: [{
                xtype: 'code',
                language: 'javascript',
                value: '// choose a file',
                margin: 10
            }]
        }).show();
    },

    changeSource: function (btn) {
        var file = btn.text;
        var sourceWindow = Ext.ComponentQuery.query('#viewSourceWindow')[0];
        var language = file.endsWith('.js') || file.endsWith('.json') ? 'javascript' : 'html';
        
        sourceWindow.mask('Loading');
        sourceWindow.setTitle('View Source - ' + file);

        fetch(btn.text)
            .then(res => res.text())
            .then(data => {
                sourceWindow.down('code').setLanguage(language);
                sourceWindow.down('code').setValue(data);
                sourceWindow.unmask();
                this.wrapDocLinks();
            })
            .catch(err => {
                Ext.Msg.alert('Error', err.message);
                sourceWindow.down('code').setValue('//' + err.message);
                sourceWindow.unmask();
            });
    },

    wrapDocLinks: function () {
        
        // find all the elements marked as comments 
        var commentBlocks = document.querySelectorAll('#viewSourceWindow code .token.comment');

        // this could probably be shorter
        var regex = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
        
        // for each one 
        commentBlocks.forEach(commentBlock => {
            // when the comment block contains a url then wrap so it's clickable.
            if (regex.test(commentBlock.textContent)) {
                commentBlock.innerHTML = commentBlock.innerHTML.replace(regex, function (url, args) {
                    return `<a class="docs-link" target="_blank" href="${url}">${url}</a>`;
                });
            }
        });
    }
});
