$("#editboard").hide();

var list = document.getElementById('list');
var member = [ {'user':'Ricky' , 'birth':'1995-05-14'},
               {'user':'Leo'   , 'birth':'1995-05-09'},
               {'user':'Monica', 'birth':'1992-10-07'} ]

function erase(btnId){
    var index = parseInt(btnId.slice(-1));
    member.splice(index,1);
    show();
}

function update(btnId){
    var index = parseInt(btnId.slice(-1));
    $("#editboard").fadeIn();
    $("#store").click( ()=>{
        var reg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        
        var new_name = document.getElementById('new_name').value.toString();
        var new_birth = document.getElementById('new_birth').value.toString();
        if(reg.test(new_birth)){
            if( new_name != '' && new_birth != ''){
                var obj = {'user':new_name, 'birth':new_birth};
                member[index] = obj;
            }
        }
        
        document.getElementById('new_name').value = '';
        document.getElementById('new_birth').value = '';

        $("#editboard").fadeOut();
        show();
    });
}


function create(){
    var name = document.getElementById('name').value.toString();
    var birth = document.getElementById('birth').value.toString();
    
    if( name != '' && birth != ''){
        var obj = {'user':name, 'birth':birth};
        member.push(obj);
    }
    document.getElementById('name').value = '';
    document.getElementById('birth').value = '';
    show();
    
}

function show(){
    var data = '';
    if (member.length > 0){
        for(var i = 0 ; i < member.length ; i++){
            data = data + '<tr>';
            data = data + '<td>' + member[i]['user']  + '</td>' +
                          '<td>' + member[i]['birth'] + '</td>' +
                          '<td>' + '<button onclick="update(this.id)" type="submit" id="'+
                          'button'+i+'">edit</button>'+
                          '<td>' + '<button onclick="erase(this.id)" type="submit" id="'+
                          'delete'+i+'">delete</button>'; 
            data = data + '</tr>';
        }
    }
    document.getElementById('list').innerHTML = data;
}
show();