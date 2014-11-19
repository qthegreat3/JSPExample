/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
storageEngine = function(){
        var initialized = false;
        var initializedObjectStores = {};
        function getStorageObject(type){
            var item = localStorage.getItem(type);
            var parsedItem = JSON.parse(item);
            return parsedItem;
        }
        return {
               init : function(successCallback, errorCallback){
                   if (window.localStorage){
                       initialized = true;
                       successCallback(null);
                   }else {
                       errorCallback('storage_api_not_supported', 'The web storage apis is not supported');
                   }
               },
               
               initObjectStore : function(type, successCallback, errorCallback){
                   if(!initialized){
                       errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
                   }else if(!localStorage.getItem(type)){
                       localStorage.setItem(type, JSON.stringify({}));
                   }
                   initializedObjectStores[type] = true;
                   successCallback(null);
               },
               
               save : function(type, obj, successCallback, errorCallback){
                   if(!initialized){
                       errorCallback('storage_api_not)initialized', 'The storage engine has not been initialized');
                   }else if (!initializedObjectStores[type]){
                       errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
                   }
                   
                   if(!obj.id){
                       obj.id = $.now();
                   }
                   
                   var savedTypeString = localStorage.getItem(type);
                   
                   var storageItem = getStorageObject(type);
                   storageItem[obj.id] = obj;
                   localStorage.setItem(type, JSON.stringify(storageItem));
                   successCallback(obj);
               },
               
               findAll : function(type, successCallback, errorCallback){
                   if(!initialized){
                       errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
                   }else if(!initializedObjectStores[type]){
                       errorCallbacks('store_not_initialized', 'The object store '+type+' has not been initialized');
                   }
                   
                   var result = [];
                   
                   var storageItem = getStorageObject(type);
                   $.each(storageItem, function(i, v){
                       result.push(v);
                   });
                   
                   successCallback(result);
               },
               
               delete : function(type, id, successCallback, errorCallback){},
               
               findByProperty : function(type, propertyName, propertyValue, successCallback, errorCallback){},
               
               findById : function(type, id, successCallback, errorCallback){}
        };
}();

