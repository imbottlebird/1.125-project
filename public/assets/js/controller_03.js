
function SortableTableCtrl_03() {
    var scope = this;

    //Get data from backend
    var table_3;
    var jqXhr = $.ajax({
        contentType: "application/json",
         url: "assets/json/chart-table-03",
         dataType: "text",
          async: false
          });
        jqXhr.done(function(data) {
               table_3=JSON.parse(data);
        });

    scope.head = {
        a: "WORDS",
        b: "COUNTS"
    };
    
    scope.body = table_3.data;
    scope.sort = {
        column: 'b',
        ascending: true
    };

    scope.selectedCls = function(column) {
        return column == scope.sort.column && 'sort-' + scope.sort.descending;
    };
    
    scope.changeSorting = function(column) {
        var sort = scope.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.ascending = true;
        }
    };
}