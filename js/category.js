//Declaration

let ddlcategory = document.getElementById('ddlcategory');
let category = document.getElementById('category');
let saveCategory = document.getElementById('saveCategory');
let bodyCate = document.getElementById('bodyCate');
let countCategory = document.getElementById('countCategory');

//let Url = 'http://localhost:7230/api/Categories';
let Url ='https://localhost:7055/api/Categories ';

//Save Category

Savecategory = () => {

    let objCategory = {
    name: category.value
    
};

if(Validation()==false){
    return;
}
let data = JSON.stringify(objCategory);
console.log(data);
    $.ajax({
        url: 'https://localhost:7055/api/Categories/Save',
        method: 'POST',
        contentType: 'application/json',
        data: data,
        cache: false,
        success: function(data) {
            ResetCategory();
            ShowCategory();
            ShowTableCategory();
           
            toastr.success('Saved New Row Category', 'SuccessFuly');
            //alert('Success');
        },
        error: function(err) {

            alert(err);
        }

    });

};

//Rest Category

ResetCategory = () => {
    category.value = '';

};
//Show DDl Category

ShowCategory = () => {
   
        let item = '';
    
        item += `<option value="">Select Category........</option>`;
    
        $.ajax({
    
            url: 'https://localhost:7055/api/Categories/GetAll',
            method: 'GET',
            cache: false,
            success: function(data) {
                
                for (let x in data) {
    
                    item += `<option value="${data[x].id}">${data[x].name}</option>`
    
                }
                ddlcategory.innerHTML = item;
    
            }
        });
    };
//Show Table Category


ShowTableCategory = () => {


    let Table = '';

    $.ajax({

        url: 'https://localhost:7055/api/Categories/GetAll',
        method: 'GET',
        cache: false,
        success: function(data) {
            CountCategory();
            data.forEach(function(item) {
                Table += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>
                    <button class="btn btn-danger"  onclick="DeleteCategory(${item.id})">
                    <i class="fas fa-trash"></i>
                        </button>
                     </td>

                </tr>`;
            });

            bodyCate.innerHTML = Table;
        }

    });

};
//Delete Category

DeleteCategory = (id) => {
console.log(id);
    if (confirm('Are you Sur From Deleted....?') == true) {
        $.ajax({

          url: `https://localhost:7055/api/Categories/deletecat/${id}`,
         
            method: 'DELETE',
            cache: false,
            
            success: function(data) {
                
                ShowTableCategory();
                ShowCategory();
                CountCategory();
                toastr.error('Success Delete Row Category', 'DELETED');

            }

        });
    }

};

//Count Category Table

CountCategory = () => {

    $.ajax({

        url: 'https://localhost:7055/api/Categories/GetAll',
        method: 'GET',
        cache: false,
        success: function(data) {
            countCategory.innerHTML = `Total Category (${data.length})`;

        }

    });

};
//Validation Category Name

Validation = () => {

    let isValid = true;

    if (category.value == '' || category.value == null) {

        toastr.warning('Enter Name Category', 'ERROR Validation');
        return isValid = false;
    }

    return isValid;

};
saveCategory.addEventListener('click', Savecategory);
ShowCategory();
ShowTableCategory();
CountCategory();