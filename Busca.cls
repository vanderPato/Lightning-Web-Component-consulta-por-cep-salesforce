public with sharing class Busca {
    @AuraEnabled
    public static Dados_busca_cep__c getAccount(Dados_busca_cep__c cep) {
        try {
            insert cep;
            return cep;
        
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
    }
}
