// Bootstrap Table - subtable example with real data, forked from http://jsfiddle.net/myvykf24/1/ and created for https://github.com/wenzhixin/bootstrap-table/issues/2121

var data = [{
    'col1': '1.1',
    'col2': '1.2',
    'nested': [{
        'col3': '1.3',
        'col4': '1.4',
        'col5': '1.5'
    }]
}, {
    'col1': '2.1',
    'col2': '2.2',
    'nested': [{
        'col3': '2.3',
        'col4': '2.4',
        'col5': '2.5'
    }]
}, {
    'col1': 'lucy',
    'col2': 'ivan',
    'nested': [{
        'col3': 'garry',
        'col4': 'jules',
        'col5': 'larry',
        'other': [{
            'col6': 'garry',
            'col7': 'jules',
        }]
    }]
}]


var $table = $('#table');
$(function() {

    $table.bootstrapTable({
        columns: [{
            field: 'col1',
            title: 'Col1'
        }, {
            field: 'col2',
            title: 'Col2'
        }],
        data: data,
        detailView: true,
        onExpandRow: function(index, row, $detail) {
            console.log(row)
            $detail.html('<table></table>').find('table').bootstrapTable({
                columns: [{
                    field: 'col3',
                    title: 'Col3'
                }, {
                    field: 'col4',
                    title: 'Col4'
                }, {
                    field: 'col5',
                    title: 'Col5'
                }],
                data: row.nested,
                // Simple contextual, assumes all entries have further nesting
                // Just shows example of how you might differentiate some rows, though also remember row class and similar possible flags
                detailView: row.nested[0]['other'] !== undefined,
                onExpandRow: function(indexb, rowb, $detailb) {
                    $detailb.html('<table></table>').find('table').bootstrapTable({
                        columns: [{
                            field: 'col6',
                            title: 'Col6'
                        }, {
                            field: 'col7',
                            title: 'Col7'
                        }],
                        data: rowb.other
                    });
                }
            });

        }
    });
});
