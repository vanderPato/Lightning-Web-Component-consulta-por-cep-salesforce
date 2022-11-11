import { LightningElement ,track  } from 'lwc';
import getAccount from '@salesforce/apex/Busca.getAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';




export default class Consulta_api extends LightningElement {
    @track cep = ''; 
    @track state ;
    @track city;
    @track district;
    @track address;
 
   
    dadosCep = {
        Estado__c: this.state ='',
        Cidade__c: this.city ='' ,
        Distrito__c:this.district ='', 
        Name:this.address ='',
     } 
     
    handleCep(event) {
        this.cep = event.target.value;

        if(this.cep.length <= 0){
            this.dadosCep ={

                Estado__c: this.state ='',
                Cidade__c: this.city ='',
                Distrito__c:this.district = '',
                Name: this.address = '',
            }
         } 
        }
    

    getSalvar(){
        if(this.dadosCep.Name != '' && this.dadosCep.Estado__c != '' && this.dadosCep.Distrito__c != '' && this.dadosCep.Cidade__c != ''){

        getAccount({cep : this.dadosCep})
        .then(result =>{

            if(result){

                this.dispatchEvent(
                    new ShowToastEvent({
                        
                        title: 'Sucesso',
                        message: 'Endereço salvo',
                        variant: 'success',
                       
                    }),
                   
                );

                
                this.dadosCep ={

                    Estado__c: this.state ='',
                    Cidade__c: this.city ='',
                    Distrito__c:this.district = '',
                    Name: this.address = '',
                }
                
            }else{
                this.dispatchEvent(
                    new ShowToastEvent({
                        
                        title: 'Erro',
                        message: 'Erro ao salvar',
                        variant: 'error',
                       
                    }),
                   
                );
               
            }
            
        }).catch(erro =>{
           
            this.dispatchEvent(
                new ShowToastEvent({
                    
                    title: 'Erro',
                    message: 'Erro 500',
                    variant: 'error',
                   
                }),
               
            );

        })
    }else{
     
      

            this.dispatchEvent(
                new ShowToastEvent({
                    
                    title: 'Erro',
                    message: 'Preencha o cep',
                    variant: 'error',
                   
                }),
               
            );

    }

    }


     getCep() {
        
        
         const calloutURI = `https://cdn.apicep.com/file/apicep/${this.cep}.json`;//  'https://jsonplaceholder.typicode.com/todos'; https://api.github.com/repositories?since=364
          fetch(calloutURI, {
            method: "GET"
        }).then((response) =>  response.json())
            .then(repos => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        
                        title: 'Sucesso',
                        message: `Cep ${this.cep} encontrado`,
                        variant: 'success',
                       
                    }),
                   
                );
                this.dadosCep = {
                    Estado__c: this.state = repos.state,
                    Cidade__c: this.city = repos.city,
                    Distrito__c:this.district = repos.district, 
                    Name:this.address = repos.address ,
                    
                 } 
            
            }).catch(err=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        
                        title: 'Erro',
                        message: `Cep ${this.cep} não encontrado`,
                        variant: 'error',
                       
                    }),
                )
               
            });

          
    
           
    
        }


}