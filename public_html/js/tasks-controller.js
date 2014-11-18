/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
tasksController = function(){
        function errorLogger(errorCode, errorMessage){
            consolge.log(errorCode+':'+errorMessage);
        }
	var taskPage;
	var initialised = false;
	
	return {
		init: function(page){
                        storageEngine.init(function(){
                            storageEngine.initObjectStore('task', function(){}, errorLogger);
                        }, errorLogger);
			if(!initialised){
				taskPage = page;
				$(taskPage).find('[required="required"]').prev('label').append('<span>*</span>').children('span').addClass('required');
				
				$(taskPage).find('tbody tr:even').addClass('even');
				
				$(taskPage).find('#btnAddTask').click(function(evt){
					evt.preventDefault();
					$(taskPage).find('#taskCreation').removeClass('not');
				});
            
				$(taskPage).find('tbody tr').click(function(evt){
					$(evt.target).closest('td').siblings().andSelf().toggleClass('rowHighlight');
				});
				
				$(taskPage).find('#tblTasks tbody').on('click', '.deleteRow', function(evt){
					evt.preventDefault();
					$(evt.target).parents('tr').remove();
				});
				
				$(taskPage).find('#saveTask').click(function(evt){
					evt.preventDefault();
					if ($(taskPage).find('form').valid()){
						var task = $('form').toObject();
						$('#taskRow').tmpl(task).appendTo($('#tblTasks tbody'));
					}
				});
				
				initialised = true;
			}
		}
	};
}();

