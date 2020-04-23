Ext.define('Demo.ux.Code', {
    extend: 'Ext.container.Container',
    alias: 'widget.code',

    scrollable: true,

    style: { backgroundColor: '#2d2d2d' },

    html: `<pre style="width: 100%; height: 100%; margin: 0;"><code style="width: 100%; height: 100%;" class="code-block language-json"></code></pre>`,

    cls: 'x-selectable',

    config: {

        url: null,

        value: null,

        language: 'json'
    },

    initComponent: function () {
        var me = this;
        Ext.apply(me, {});

        me.callParent(arguments);
        me.on('afterrender', me.onAfterRender, me);
        this.highlight();
    },

    onAfterRender: function () {
        var me = this;
        if (me.url) {
            me.load();
        } else if (me.value) {
            me.setValue(me.value);
        } else {
            me.setValue('// No Data');
        }
    },

    load: function (callback) {
        this.clear();

        Ext.Ajax.request({
            url: this.getUrl(),
            scope: this,
            cors: true,
            success: function (res) {
                var data = JSON.parse(res.responseText);
                var text = res.responseText == '' ? '' : JSON.stringify(data, null, 4);

                this.setValue(text);

                if (typeof callback === 'function') {
                    callback(true, data);
                }
            },
            failure: function () {
                this.setValue('// Error Loading Data...');
                if (typeof callback === 'function') {
                    callback(false, null);
                }
            }
        });
    },

    clear: function () {
        this.setHtml('');
    },

    setValue: function (value) {
        this.value = value;
        
        var text;

        if (this.getLanguage() == 'html') {
            text = this.convertHTML(this.value);
        } 
        else if (typeof this.value == 'object') {
            text = JSON.stringify(this.value, null, 4);
        }
        else {
            text = this.value;
        }
        
        this.setHtml(`<pre style="margin: 0;"><code style="width: 100%; height: 100%;" class="code-block language-${this.getLanguage()}">${text}</code></pre>`);
        this.highlight();
    },

    highlight: function () {
        var dom = this.el && this.el.dom;
        if (!dom) return;
        Prism.highlightElement(this.el.dom.querySelector('code'));
    },

    convertHTML: function (str) {
        // Use Object Lookup to declare as many HTML entities as needed.
        const htmlEntities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&apos;"
        };
        // Use map function to return a filtered str with all entities changed automatically.
        return str
            .split("")
            .map(entity => htmlEntities[entity] || entity)
            .join("");
    }
});