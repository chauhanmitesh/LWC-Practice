public with sharing class GetAccountRecords {
    @AuraEnabled(Cacheable=true)
    public static List<Account> getRecords(){
        System.debug('Inside method');
        List<Account> acclst = [select id, name, Industry from Account limit 10];
        System.debug('acclst '+acclst);
        return acclst;
    }


    @AuraEnabled(Cacheable=true)
    public static List<AccountWrapper> getAccWrapper(){
        List<Account> accConlst = [select id, Name, (select id, firstname, lastname, email from Contacts) from Account limit 5];
        List<AccountWrapper> AccountWrapperlst = new List<AccountWrapper>();
        
        for(Account acc:accConlst){
            AccountWrapper obj = new AccountWrapper();
            obj.accRecord = acc;
            obj.contlst = acc.Contacts;
            obj.count = acc.Contacts.size();
            AccountWrapperlst.add(obj);
        }

        return AccountWrapperlst;
    }

	
    @AuraEnabled(Cacheable=true)
    public static string deleteAccounts(String accIds){
        System.debug('inside delete'+accIds);
        
        //List<Account> accountsToDelete = [Select id from Account where id IN :accIds];
        
        return 'Records successfully deleted';
    }
    
    @AuraEnabled(Cacheable=true)
    public static List<Account> searchAccounts(string input){
        List<Account> acclst = [Select id, name from Account where name like:'%'+input+'%'];
        system.debug('acclst '+acclst);
        return acclst;
    }
    	
    public class AccountWrapper{
        @AuraEnabled
        public Account accRecord{get;set;}
        @AuraEnabled
        public List<Contact> contlst{get;set;}
        @AuraEnabled
        public Integer count{get;set;}
    }
}