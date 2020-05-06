Ext.define('Demo.ux.CountriesCombo', {
    extend: 'Ext.form.field.ComboBox',
    requires: [
        'Demo.store.Countries'
    ],

    xtype: 'countriescombo',

    store: 'Countries',

    fieldLabel: 'Country',
    queryMode: 'local',

    displayField: 'name',
    valueField: 'code2'
});