/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

self.addEventListener('message', function(msg){
    var data =  msg.data;
    var lines = data.split('\n');
    var tasks = [];
    // Cant use because dont have access to jQuery so must use for loop jQuery.each(lines, function(indx, val){
    for(var indx = 0; indx < lines.length; indx++)
    {
        var val = lines[indx];
        if(indx >= 1 && val){
            var task = loadTask(val);
            if(task){
                tasks.push(task);
            }
        }
    }
    self.postMessage(tasks);
}, false);

function loadTask(csvTask){
    /* many real world issues with this line bc dividing up the CSV every time you meet a comma
     * this may not be intended when csv is written or will lead to incorrect reults
     * we are using this simplified piece of code because we can't use jquery csv library because 
     * jQuery is associated with the window object which the web worker (this) wont have access too
     */
    var tokens = csvTask.split(',');
    if(tokens.length == 3){
        var task = {};
        task.task = tokens[0];
        task.requiredBy = tokens[1];
        task.category = tokens[2];
        return task;
    }
    return null;
}
