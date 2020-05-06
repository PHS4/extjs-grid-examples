/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html
 */
Ext.define('Demo.view.source.SourceViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sourceviewcontroller',
    

    changeSource: function(btn) {
        var file = btn.text;
        var language = file.endsWith('.js') || file.endsWith('.json') ? 'javascript' : 'html';
        
        /**
         * Show a mask while loading the file to be displayed
         */
        this.getView().mask('Loading');
        
        /**
         * Update the Window title
         */
        this.getView().setTitle('View Source - ' + file);

        fetch(btn.text)
            .then(res => res.text())
            .then(data => {
                this.getView().down('code').setLanguage(language);
                this.getView().down('code').setValue(data);
                this.getView().unmask();
                this.wrapDocLinks();
            })
            .catch(err => {
                Ext.Msg.alert('Error', err.message);
                this.getView().down('code').setValue('//' + err.message);
                this.getView().unmask();
            });
    },

    wrapDocLinks: function() {

        // find all the elements marked as comments 
        var commentBlocks = document.querySelectorAll('#viewSourceWindow code .token.comment');

        // this could probably be shorter but just found it somewhere online.
        var regex = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;

        // for each one 
        commentBlocks.forEach(commentBlock => {
            // when the comment block contains a url then wrap so it's clickable.
            if (regex.test(commentBlock.textContent)) {
                commentBlock.innerHTML = commentBlock.innerHTML.replace(regex, function(url, args) {
                    return `<a class="docs-link" target="_blank" href="${url}">${url}</a>`;
                });
            }
        });
    }
});