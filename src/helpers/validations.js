const validateEmail= async (valor)=>{
    if(valor!=null){
       
        if(valor.includes('@') && valor.length<50){
            return true;
        }
        else {
            return false;
        }
    }
    
}

module.exports={
    validateEmail
}