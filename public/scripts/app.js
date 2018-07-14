(function () {

    Dropzone.autoDiscover = false;


    var myDropzone = new Dropzone(".csv_dropzone", { url: "/upload"});

    /**
     * Handles checking if the data table already exists
     */
    myDropzone.on("addedfile", function(file) {
        //check if data table already initialized.
        if ( $.fn.dataTable.isDataTable( '#csvDataTable' ) ) {
            var table = $('#csvDataTable').DataTable();
            table.destroy();
            $('#csvDataTable thead tr th').remove();
        }
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

        $('#csvDataTable').dataTable({
            data : data,
            columns: keys
        });

    });






})(jQuery);
