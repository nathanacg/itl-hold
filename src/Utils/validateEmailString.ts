export function validateEmail(email:string){
    if(email.length>0){
        if (typeof email !== 'string') {
            return false; 
        }
        
        const parts = email.split('@');
        if (parts.length !== 2) {
            return false; 
        }

        let finalEmail= parts[1].split(".")
        
 
        if(!finalEmail[1]){
            return false
        } else if(finalEmail[1].length < 3){
            return false
        }
        
    
        const beforeAt = parts[0];
        const afterAt = parts[1];
        
        if (!beforeAt || !afterAt) {
            return false; 
        }
        
        if (afterAt.indexOf('.') === -1) {
            return false;
        }
        
        return true;
    } else {
        return false
    }
}