Ext.define('Demo.util.Renderer', {
    alternateClassName: [ 'RendererUtil', 'rendererUtil' ],

    singleton: true,

    css: {
        green: [
            'color: rgb(5, 100, 5)',
            'background-color: rgb(5, 200, 5, .30)',
            'border: 1px solid rgb(5, 200, 5, .10)'
        ].join('; '),

        red: [
            'color: rgb(100, 5, 5)',
            'background-color: rgba(200, 5, 5, .30)',
            'border: 1px solid rgba(200, 5, 5, .10)'
        ].join('; ')
    },

    multi: function (...renderers) {
        return function (value, metaData, record, rowIndex, colIndex, store, view) {
            for (var i = 0; i < renderers.length; i++) {
                var renderer = renderers[i];
                var rendererFn = RendererUtil[renderer];

                if (!rendererFn || typeof (rendererFn) != 'function') {
                    console.warn(`Skipping ${renderer} renderer function because it doesn't exist.`);
                    continue;
                }
                value = rendererFn(value, metaData, record, rowIndex, colIndex, store, view);
            }
            return value;
        }
    },

    // full cell changes

    numberColor: function (value, metaData) {
        if (value > 0) {
            metaData.tdStyle += RendererUtil.css.green;
        } else if (value < 0) {
            metaData.tdStyle += RendererUtil.css.red;
        } else {
            metaData.tdStyle += ' color: gray; ';
        }
        return value;
    },

    numberInverseColor: function (value, metaData) {
        if (value > 0) {
            metaData.tdStyle += RendererUtil.css.red;
        } else if (value < 0) {
            metaData.tdStyle += RendererUtil.css.green;
        } else {
            metaData.tdStyle += ' color: gray; ';
        }
        return value;
    },

    // text rendering and/or display content modifications

    italic: function (value, metaData) {
        metaData.tdStyle += ' font-style: italic; ';
        return value;
    },

    bold: function (value, metaData) {
        metaData.tdStyle += ' font-weight: 600; ';
        return value;
    },

    link: function (value) {
        return value.length ? `<a href="${value}">{value}</a>` : value;
    },

    email: function (value) {
        return value.length ? `<a href="mailto:${value}">${value}</a>` : value;
    },

    phone: function (value) {
        return value.length ? `<a href="tel:${value}">${value}</a>` : value;
    },

    markdown: function (value) {
        // cdn.jsdelivr.net/highlight.js/9.1.0/styles/github.min.css (optional css)
        if (!markdownit) {
            return console.warn(`
                The markdown renderer requires a third party js file.
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/10.0.0/markdown-it.min.js"></script>
            `);
        }
        var md = markdownit();
        return md.render(value);
    }
});
