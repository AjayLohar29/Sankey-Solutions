let arr = [];

let cDate = new Date();



function updateStatus(){

    let sDate = new Date(document.getElementById("startDate").value);
    let eDate = new Date(document.getElementById("endDate").value);
    var stsSelect = document.getElementById("status");
    stsSelect.innerHTML="";

    

    if(sDate>eDate){
        alert("End date should be before Start date.");
        return;
    }
    else if(sDate < cDate && eDate < cDate){
        let option1 = document.createElement("option");
        option1.setAttribute("value","DuePass");
        option1.textContent = "DuePass";
        stsSelect.appendChild(option1);
        

        let option2 = document.createElement("option");
        option2.setAttribute("value","Completed");
        option2.textContent = "Completed";
        stsSelect.appendChild(option2);
        

    }
    else if(eDate > cDate && sDate < cDate){
        let option = document.createElement("option");
        option.setAttribute("value","In progress");
        option.textContent = "In Progress";
        stsSelect.appendChild(option);
    }
    else if(sDate > cDate && eDate > cDate){
        let option = document.createElement("option");
        option.setAttribute("value","Upcoming");
        option.textContent = "Upcoming";
        stsSelect.appendChild(option);
    }
    else{
        console.log("");
    }
    


}



var addBtn = document.getElementById("addButton");
addBtn.addEventListener("click",addData);

function addData(){
    event.preventDefault();

    let title = document.getElementById("title").value;
    let stDate = document.getElementById("startDate").value;
    let enDate = document.getElementById("endDate").value;
    let status = document.getElementById("status").value;


    if(!validate(title,stDate,enDate,status)){
        return;
    }




    let obj = {
        ttl : title,
        stD : stDate,
        enD : enDate,
        sts : status
    };

    arr.push(obj);
    clear();
    displayData(arr);

}

function validate(title,stDate,enDate,status){
    var exp = /^[.!@#$%^&*()_+-=]+$/;
    

    var r = true;
    if(title==""){
        document.getElementById("Titleerror").innerHTML="Title is required";
        r = false;
    }else if(exp.test(title)){
        document.getElementById("Titleerror").innerHTML="Title only contains alphanumeric values.";
        r = false;
    }
    else{
        document.getElementById("Titleerror").innerHTML="";
    }

    if(stDate==""){
        document.getElementById("stDerror").innerHTML="Date is required.";
        r = false;
    }
    else{
        document.getElementById("stDerror").innerHTML="";
    }

    if(enDate==""){
        document.getElementById("enDerror").innerHTML="Date is required.";
        r = false;
    }
    else{
        document.getElementById("enDerror").innerHTML="";
    }

    if(new Date(enDate) < new Date(stDate)){
        alert("End date should be before Start date.");
        return;
    }

    if(status==""){
        document.getElementById("stserror").innerHTML="Status is required.";
        r = false;
    }
    else{
        document.getElementById("stserror").innerHTML="";
    }


    return r;




}

function clear(){
    document.getElementById("title").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("status").value = "";
}


function displayData(arr){
    var table = document.getElementById("data");
    table.innerHTML="";
    for(var i=0;i<arr.length;i++){
        var row = table.insertRow();

        var cell1 = row.insertCell();
        cell1.textContent = arr[i].ttl;
        
        var cell2 = row.insertCell();
        cell2.textContent = arr[i].stD;

        var cell3 = row.insertCell();
        cell3.textContent =  arr[i].enD;

        console.log("end date");

        var cell4 = row.insertCell();
        cell4.textContent = arr[i].sts;

        var cell5 = row.insertCell();
        cell5.className = "actionBtn"
        let edBtn = document.createElement("button");
        edBtn.textContent = "EDIT";
        edBtn.className = "eBtn"
        let y=i;
        edBtn.addEventListener('click',function(){
            console.log("edit"+y);
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
            deleteD(x);
        });

        cell5.appendChild(dltBtn);
    }
}

let updIdx = 0;

function editData(idx){
    updIdx = idx;
    let task = arr[idx]; 

    clearError();

    document.getElementById("title").value = task.ttl;
    document.getElementById("startDate").value = task.stD;
    document.getElementById("endDate").value = task.enD;
    document.getElementById("status").value = task.sts;
 

    let addButton = document.getElementById('addButton');
    addButton.style.display = 'none';

    let updButton = document.getElementById('updButton');
    updButton.style.display = 'block';

    let rsButton = document.getElementById('rsButton');
    rsButton.style.display = 'block';

       
}

function clearError(){
    document.getElementById("title").innerHTML="";
    document.getElementById("startDate").innerHTML="";
    document.getElementById("endDate").innerHTML="";
    document.getElementById("status").innerHTML="";
}

let updButton = document.getElementById('updButton');
updButton.addEventListener('click', updData);

function updData(){
    event.preventDefault();
    let utitle = document.getElementById("title").value;
    let ustDate = document.getElementById("startDate").value;
    let uenDate = document.getElementById("endDate").value;
    let ustatus = document.getElementById("status").value;
    

    if(!validate(utitle,ustDate,uenDate,ustatus)){
        return;
    }

    let obj = {
        ttl : utitle,
        stD : ustDate,
        enD : uenDate,
        sts : ustatus
    };

    arr[updIdx] = obj;

    var table = document.getElementById("data");
    var row = table.rows[updIdx];
    row.cells[0].textContent = utitle;
    row.cells[1].textContent = ustDate;
    row.cells[2].textContent = uenDate;
    row.cells[3].textContent = ustatus;

    displayData(arr);
    clear();
    let addButton = document.getElementById('addButton');
    addButton.style.display = 'block';
    let updButton = document.getElementById('updButton');
    updButton.style.display = 'none';
    let rsButton = document.getElementById('rsButton');
    rsButton.style.display = 'none';
   
    
}


var dltBtn = document.getElementsByClassName("dBtn");
dltBtn.addEventListener("click",deleteD);

function deleteD(idx){

    clearError();

    let td = arr[idx];
    let confirmDlt = confirm("Are you sure you want to delete this employee?");

    if(confirmDlt){
        arr.splice(idx,1);
        displayData(arr);
    }

    clear();
    
    
}

var rstBtn = document.getElementById("rsButton");
rstBtn.addEventListener("click",cancel);


function cancel(){
    clear();

    clearError();

    let addButton = document.getElementById('addButton');
    addButton.style.display = 'block';

    let updButton = document.getElementById('updButton');
    updButton.style.display = 'none';
    
    let rsButton = document.getElementById('rsButton');
    rsButton.style.display = 'none';

    displayData(arr);
}