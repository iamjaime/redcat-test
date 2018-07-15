(function () {

    Dropzone.autoDiscover = false;

    var myDropzone = new Dropzone(".csv_dropzone", { url: "/upload"});

    /**
     * Handles checking if the data table already exists
     */
    myDropzone.on("addedfile", function(file) {
        //check if data table already initialized.
        destroyDataTable('#csvDataTable');
    });


    /**
     * Handles what to do when the File has been successfully uploaded
     * and the server has sent a response
     */
    myDropzone.on("success", function(file) {
        myDropzone.removeFile(file);

        let serverResponse = JSON.parse(file.xhr.response);
        let data = serverResponse.data;

        var keys = [];
        for(var k in data[0]){
            keys.push({ data : k });
            $('#csvDataTable thead tr').append('<th>' + k + '</th>');
        }

        console.log(data);
        console.log(keys);

        $('#csvDataTable').dataTable({
            data : data,
            columns: keys
        });

        saveCSVcontents(keys, data);
    });

    /**
     * Handles destroying the data table
     *
     * @param dataTableSelector
     */
    function destroyDataTable(dataTableSelector) {
        if ( $.fn.dataTable.isDataTable( dataTableSelector ) ) {
            var table = $(dataTableSelector).DataTable();
            table.destroy();
            $(dataTableSelector + ' thead tr th').remove();
            $(dataTableSelector + " tbody").empty();
        }
    }

    /**
     * Saves the csv contents to a local storage object.
     *
     * @param keys
     * @param data
     */
    function saveCSVcontents(keys, data) {
        localStorage.setItem('csv', JSON.stringify({ tableHead : keys, tableBody : data }));
    }


    /**
     * Handles getting the csv contents from local storage object.
     * @returns {any}
     */
    function getCSVcontentsFromStorage() {
        return JSON.parse(localStorage.getItem('csv'));
    }


    /**
     * Handles adding the custom column to the data table
     *
     * @param csv
     * @param colName
     * @param formula
     */
    function addColumnToTable(csv, colName, formula) {

        destroyDataTable('#csvDataTable');

        //now we add the new column....
        csv.tableHead.push({ data : colName});

        //lets set the new table headers
        for(var j=0; j < csv.tableHead.length; j++){
            $('#csvDataTable thead tr').append('<th>' + csv.tableHead[j].data + '</th>');
        }

        for(var i=0; i < csv.tableBody.length; i++){
            calculateFormula(csv.tableBody[i], colName, formula);
        }

        saveCSVcontents(csv.tableHead, csv.tableBody);

        //now we render the new data table...
        $('#csvDataTable').dataTable({
            data : csv.tableBody,
            columns: csv.tableHead
        });
    }


    /**
     * Handles calculating the formula for our custom column
     *
     * @param row
     * @param columnName
     * @param formula
     */
    function calculateFormula(row, columnName, formula) {
        //split the formula by a space....
        let columns = formula.split(' ');
        let column1 = columns[0];
        let operator = columns[1];
        let column2 = columns[2];
        let operators = {
            '+': function(a, b) { return a + b },
            '/': function(a, b) { return a / b },
            '*': function(a, b) { return a * b },
            '-': function(a, b) { return a - b },
            '&': function(){
                let output = "";
                for(var i=0; i < arguments[0].length; i++){
                    if(row.hasOwnProperty(arguments[0][i])){
                        output += row[arguments[0][i]] + " ";
                    }else{
                        output += arguments[0][i].replace(/['"]+/g, '');
                    }
                }
                return output;
            }
        };

        if(formula.includes('&')){
            let formulaPieces = formula.split(' & ');
            row[columnName] = operators[operator](formulaPieces)
        }else{
            if(!isNaN(row[column1]) && !isNaN(row[column2])){
                row[columnName] = operators[operator](row[column1], row[column2])
            }else{
                row[columnName] = "NA"
            }
        }
    }


    /**
     * Handles the add column button click action
     */
    $('.add-column-btn').on('click', function(){
        destroyDataTable('#csvDataTable');
        let csv = getCSVcontentsFromStorage();
        let columnName = $('#colname');
        let formula = $('#formula');

        addColumnToTable(csv, columnName.val(), formula.val());

        //lets clear the input
        columnName.val('');
        formula.val('');

    });



})(jQuery);
