$("#username").blur( ()=>{
    if( !$("#username").val() ){
        $("#notify_0").css('color','red');
    }
    else{
        $("#notify_0").css('color','white');
    }
});

$("#password").blur( ()=>{
    if( !$("#password").val() ){
        $("#notify_1").css('color','red');
    }
    else{
        $("#notify_1").css('color','white');
    }
});

$("#confirm").blur( ()=>{
    if( !$("#confirm").val() ){
        $("#notify_2").css('color','red');
    }
    else{
        $("#notify_2").css('color','white');
    }
});


$("#passport").blur( ()=>{
    if( !$("#passport").val() ){
        $("#notify_3").css('color','red');
    }
    else{
        $("#notify_3").css('color','white');
    }
});

function validateForm() {
    if ( !$("#username").val() || !$("#password").val() || !$("#confirm").val() || !$("#passport").val() ) {
        alert("Please fill out the form.");
        return false;
    }
    else if(!$("#upload").val()){
        alert("Please upload company license for authentication");
        return false;
    }
    return true;
}