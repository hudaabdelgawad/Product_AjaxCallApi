let ShowTable;

$(document).ready(function() {
    ShowTable = $('#tablPro').DataTable({

        "ajax": {
            "url": UrlPro,
            "dataSrc": ''
        },
        "columns": [

            { "data": "id" },
            { "data": "category.name" },
            { "data": "name" },
            { "data": "quintity" },
            { "data": "price" },
            { "data": "descount" },
            { "data": "total" },
            {
                "data": "id",
                "render": (id) => {
                    return `<button class="btn btn-info" onclick="EditProduct(${id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger" onclick="DeleteProduct(${id})">
                <i class="fas fa-trash"></i>
            </button>
                `
                }
            }
        ]


    });
});











//$(document).ready(function() {
//$('#tablPro').DataTable();});

PrintTable = (el) => {
console.log("ll");
    let body = document.body.innerHTML;

    let x = document.getElementById(el).innerHTML;

    document.body.innerHTML = x;

    print();

    document.body.innerHTML = body;



};