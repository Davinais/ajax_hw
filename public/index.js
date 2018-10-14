$(function() {
    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    function escapeHtml (string) {
        return String(string).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
        });
    }
    $("#list_btn").click((event) => {
        event.preventDefault();
        $.ajax({
            url: "ajax.php",
            type: "GET",
            data: { "ops":"list" },
            dataType: "json",
            success: function (data) {
                let table = "<thead><tr><th>ID</th><th>Name</th></tr></thead>";
                table += "<tbody>";
                $.each(data, function(stu_id, name) {
                    table += '<tr><td data-label="ID">' + stu_id + '</td>';
                    table += '<td data-label="Name">' + name + '</tr>';
                });
                table += "</tbody>";
                $("#stulist").html(table);
                $("#res_text").text("");
            }
        });
    });
    $("#search_btn").click((event) => {
        event.preventDefault();
        let stu_id = $("#search>input").val();
        stu_id = escapeHtml(stu_id);
        $.ajax({
            url: "ajax.php",
            type: "GET",
            data: { "ops":"search", "id":stu_id },
            success: function (data) {
                $("#stulist").html("");
                $("#res_text").text(data);
            }
        });
    });
    //Seems like jQuery has done encodeURI for us
    $("#add_btn").click((event) => {
        event.preventDefault();
        let stu_id = $("#add>input[name=id]").val();
        stu_id = escapeHtml(stu_id);
        let stu_name = $("#add>input[name=name]").val();
        stu_name = escapeHtml(stu_name);
        $.ajax({
            url: "ajax.php",
            type: "GET",
            data: { "ops":"add", "id":stu_id, "name":stu_name },
            success: function (data) {
                $("#stulist").html("");
                $("#res_text").text(data);
            }
        });
    });
    $("#del_btn").click((event) => {
        event.preventDefault();
        let stu_id = $("#delete>input[name=id]").val();
        stu_id = escapeHtml(stu_id);
        $.ajax({
            url: "ajax.php",
            type: "GET",
            data: { "ops":"delete", "id":stu_id },
            success: function (data) {
                $("#stulist").html("");
                $("#res_text").text(data);
            }
        });
    });
});
