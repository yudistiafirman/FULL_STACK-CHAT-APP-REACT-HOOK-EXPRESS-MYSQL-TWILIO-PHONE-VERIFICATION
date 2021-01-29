
export function ValidateUsername(username){
    if(username.length<7){
        return true
    }else{
        return false
    }
}

export function ValidatePhone(phone){
    var phoneRegex=/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g
    if(phoneRegex.test(phone)){
        return true
    }else{
        return false
    }
}