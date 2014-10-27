/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    (function($){
            $.fn.extend({
                toObject: function(){
                    var result = {}
                    $.each(this.serializeArray(), function(i,v){
                        result[v.name] = v.value;
                    });
                    
                    return result;
                },
                
                fromObject: function(obj){
                    $.each(this.find(':input'), function(i,v){
                        var name =$(v).attr('name');
                        if(obj[name]){
                            $(v).val(obj[name]);
                        }else{
                            $(v).val('');
                        }
                    });
                }
            });
        })(jQuery); 
