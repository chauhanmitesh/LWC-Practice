public with sharing class GetContactRecords {

    @AuraEnabled(cacheable=true)
    public static List<contact> searchContacts(String searchKey){
        String key = '%'+searchKey+'%';
        List<Contact> contlst = [Select id, Name from Contact where name like :key order by name limit 5];
        System.debug('contactlst '+ contlst.size());
        return contlst;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<contact> getContacts(){
        System.debug('list of contacts');
        return [SELECT Id, FirstName, LastName, Email FROM Contact LIMIT 10];
    }
    
}