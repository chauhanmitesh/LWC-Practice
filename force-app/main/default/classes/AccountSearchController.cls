public class AccountSearchController {
	
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchKey){
        
        if(String.isBlank(searchKey)){
            return new List<Account>();
        }
        
        List<Account> acclst = [Select id, Name, Industry, Phone from Account Where Name like :('%' + searchKey + '%') limit  10];
        System.debug('acclst'+ acclst);
        return acclst;
    }
}