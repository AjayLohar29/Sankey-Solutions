let empArr = [];
let dltIds = [];



var addBtn = document.getElementById("addButton");
addBtn.addEventListener("click",addData);

function addData(){
    event.preventDefault();
    let Id = document.getElementById("empId").value;
    let Name = document.getElementById("empName").value;
    let Age = document.getElementById("empAge").value;
    let Gender = document.getElementById("empGender").value;

    if(isIdExist(Id)){
        return;
    }

    if(!validate(Id,Name,Age,Gender)){
        return;
    }

    let empObj = {
        id : Id,
        name : Name,
        age : Age,
        gender : Gender
    };

    empArr.push(empObj);

    console.log(empArr);

    clear();

    displayData(empArr);

}


function validate(Id,Name,Age,Gender){
    
    if(Id==""){
        document.getElementById("Iderror").innerHTML="Id value is required.";
        return false;
    }else{
        document.getElementById("Iderror").innerHTML="";
    }

    var exp = /^[A-Za-z]+$/;
    if(Name==""){
        document.getElementById("Nameerror").innerHTML="Name value is required";
        return false;
    }
    if(!exp.test(Name)){
        document.getElementById("Nameerror").innerHTML="Name must contain alphabates only.";
        return false;
    }else{
        document.getElementById("Nameerror").innerHTML="";
    }

    

    if(Age=="" ){
        document.getElementById("Ageerror").innerHTML="Age value is required.";
        return false;
    }
    if(Age<18 || Age>60){
        document.getElementById("Ageerror").innerHTML="Age must be between 18 to 60.";
        return false;
    }else{
        document.getElementById("Ageerror").innerHTML="";
    }

    if(Gender==""){
        document.getElementById("Gendererror").innerHTML="Gender value is required.";
        return false;
    }else{
        document.getElementById("Gendererror").innerHTML="";
    }
    
    return true;
}


function isIdExist(Id){
    for(var i=0;i<empArr.length;i++){
        if(empArr[i].id == Id){
            document.getElementById("Iderror").innerHTML="Employee Id already exist.";
            return true;
        }else{
            document.getElementById("Iderror").innerHTML="";
        }
    }

    for(var i=0;i<dltIds.length;i++){
        if(dltIds[i]==Id){
            document.getElementById("Iderror").innerHTML="Employee Id already exist.";
            return true;
        }else{
            document.getElementById("Iderror").innerHTML="";
        }
    }
    
    return false;
}



function clear(){
    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("empAge").value = "";
    document.getElementById("empGender").value = "";
    document.getElementById("Iderror").value = "";
}

function displayData(empArr){
    var table = document.getElementById("data");
    table.innerHTML="";
    for(var i=0;i<empArr.length;i++){
        var row = table.insertRow();

        var cell1 = row.insertCell();
        cell1.textContent = empArr[i].id;
        
        var cell2 = row.insertCell();
        cell2.textContent = empArr[i].name;

        var cell3 = row.insertCell();
        cell3.textContent = empArr[i].age;

        var cell4 = row.insertCell();
        cell4.textContent = empArr[i].gender;

        var cell5 = row.insertCell();
        cell5.className = "actionBtn"
        let edBtn = document.createElement("button");
        edBtn.textContent = "EDIT";
        edBtn.className = "eBtn"
        let y=i;
        edBtn.addEventListener('click',function(){
            console.log(y);
            console.log("i="+i);
            editData(y);
        });
        cell5.appendChild(edBtn);

        let dltBtn = document.createElement("button");
        dltBtn.textContent = "DELETE";
        dltBtn.className = 'dBtn';
        let x = i;
        dltBtn.addEventListener('click',function(){
            console.log(x);
            console.log("i="+i);
            deleteEmp(x);
        });

        cell5.appendChild(dltBtn);
    }
}



let updIdx = 0;

function editData(idx){
    console.log("edit"+idx);
    updIdx = idx;
    
    let emp = empArr[idx]; 
    document.getElementById("Iderror").innerHTML="";
    document.getElementById("Gendererror").innerHTML="";
    document.getElementById("Ageerror").innerHTML="";
    document.getElementById("Nameerror").innerHTML="";

    document.getElementById("empId").value = emp.id;
    document.getElementById("empName").value = emp.name;
    document.getElementById("empAge").value = emp.age;
    document.getElementById("empGender").value = emp.gender;

    // empArr[idx].id = null;

    let addButton = document.getElementById('addButton');
    addButton.style.display = 'none';

    let updButton = document.getElementById('updButton');
    updButton.style.display = 'block';

       
}

let updButton = document.getElementById('updButton');
updButton.addEventListener('click', updData);

function updData(){
    event.preventDefault();
    empArr[updIdx].id = null;
    let Id = document.getElementById("empId").value;
    let Name = document.getElementById("empName").value;
    let Age = document.getElementById("empAge").value;
    let Gender = document.getElementById("empGender").value;
    

    if(!validate(Id,Name,Age)){
        return;
    }

    if(isIdExist(Id)){
        return;
    }

    let updEmpObj = {
        id : Id,
        name : Name,
        age : Age,
        gender : Gender
    };
    empArr[updIdx] = updEmpObj;
    console.log("up"+updIdx);
    console.log(empArr);
    var table = document.getElementById("data");
    var row = table.rows[updIdx];
    row.cells[0].textContent = Id;
    row.cells[1].textContent = Name;
    row.cells[2].textContent = Age;
    row.cells[3].textContent = Gender;

    displayData(empArr);
    clear();
    let addButton = document.getElementById('addButton');
    addButton.style.display = 'block';
    let updButton = document.getElementById('updButton');
    updButton.style.display = 'none';
   
    
}

function deleteEmp(idx){
    document.getElementById("Iderror").innerHTML="";
    document.getElementById("Gendererror").innerHTML="";
    document.getElementById("Ageerror").innerHTML="";
    document.getElementById("Nameerror").innerHTML="";


    let emp = empArr[idx];
    dltIds.push(emp.id);
    console.log(dltIds)
    console.log(empArr);
    let confirmDlt = confirm("Are you sure you want to delete this employee?");

    if(confirmDlt){
        empArr.splice(idx,1);
        displayData(empArr);
    }

    clear();
    let addButton = document.getElementById('addButton');
    addButton.style.display = 'block';

    let updButton = document.getElementById('updButton');
    updButton.style.display = 'none';
    
    
}
