/*
 |--------------------------------------------------------------------------
 | SkyCaiji (蓝天采集器)
 |--------------------------------------------------------------------------
 | Copyright (c) 2018 https://www.skycaiji.com All rights reserved.
 |--------------------------------------------------------------------------
 | 使用协议  https://www.skycaiji.com/licenses
 |--------------------------------------------------------------------------
 */
'use strict';$(document).ready(function(){$('#task_folder').on('click','.taskgroup',function(){var trBox=$(this).parents('tr').eq(0);var tgid=trBox.attr('tgid');var tgLevel=trBox.attr('level');var url=ulink('Task/openList?tg_id=_tgid_');var loadingImg=tgLevel>0?'<img src="'+window.site_config.pub+'/static/images/load1.gif" class="img_loading" style="width:14px;">':'<img src="'+window.site_config.pub+'/static/images/loading.gif"> '+window.tpl_lang.task_loading;url=url.replace('_tgid_',tgid);var $_o=$(this);var opened=trBox.attr('opened');var childs=$('#task_folder tr[parent-tgid="'+tgid+'"]');childs.css('display',(1==opened?'none':'table-row'));childs.each(function(){var cTgid=$(this).attr('tgid');var cOpened=$(this).attr('opened');if(cTgid){if(1==opened){$('#task_folder tr[parent-tgid="'+cTgid+'"]').css('display','none')}else{$('#task_folder tr[parent-tgid="'+cTgid+'"]').css('display',1==cOpened?'table-row':'none')}}});if(1==opened){trBox.attr('opened',0);$_o.find('.glyphicon-minus').addClass('glyphicon-plus').removeClass('glyphicon-minus')}else{trBox.attr('opened',1);$_o.find('.glyphicon-plus').addClass('glyphicon-minus').removeClass('glyphicon-plus');if(trBox.attr('setted')!=1){$_o.parents('td').eq(0).append(loadingImg);$.ajax({type:"GET",url:url,dataType:"json",success:function(data){if(tgLevel>0){$_o.siblings('.img_loading').remove()}else{trBox.hide()}
tgLevel=parseInt(tgLevel);var leftSpace=tgLevel>0?('padding-left:'+tgLevel*25+'px;'):'';var html='';if(data.code==1){if(isNull(data.data)){html=null}else{var html='';if(data.data.tgList){var datalist=data.data.tgList;for(var i in datalist){html+='<tr level="'+(tgLevel+1)+'" parent-tgid="'+tgid+'" tgid="'+datalist[i].id+'"><td style="'+leftSpace+'"><a href="javascript:;" class="taskgroup"> <span class="glyphicon glyphicon-plus"></span> <span class="glyphicon glyphicon-folder-close"></span> '+datalist[i].name+' </a></td><td colspan="7"></td></tr>'}}
if(data.data.taskList){var datalist=data.data.taskList;for(var i in datalist){html+='<tr parent-tgid="'+tgid+'" task-id="'+datalist[i].id+'"></td><td style="'+leftSpace+'">'+'<a href="'+ulink('Task/edit?id='+datalist[i].id)+'" class="edit">'+datalist[i].name+'</a></td><td class="sort"><input type="text" name="newsort['+datalist[i].id+']" class="form-control" value="'+datalist[i].sort+'" autocomplete="off" /></td>'+'<td><a href="javascript:;" class="auto" item-id="'+datalist[i].id+'" style="color:'+(datalist[i].auto>0?'green':'red')+';">'+(datalist[i].auto>0?window.tpl_lang.yes:window.tpl_lang.no)+'</a></td>'+'<td>'+datalist[i].module+'</td><td>'+datalist[i].addtime+'</td><td>'+'<label class="checkbox-inline"><input type="checkbox" name="batch[]" value="'+datalist[i].id+'" /> '+datalist[i].caijitime+'</label>'+' &nbsp;<a href="javascript:;" class="caiji" item-id="'+datalist[i].id+'">'+window.tpl_lang.caiji+'</a>'+' <span class="sep">|</span> <a href="javascript:;" class="houtai" item-id="'+datalist[i].id+'">后台</a>'+'</td><td><a href="'+ulink('Collector/set?task_id='+datalist[i].id)+'">规则</a>'+' <span class="sep">|</span> <a href="'+ulink('Release/set?task_id='+datalist[i].id)+'">发布</a>'+' <span class="sep">|</span> <a href="javascript:;" class="delete" item-id="'+datalist[i].id+'">'+window.tpl_lang.delete+'</a></td></tr>'}}}}else{html=null}
html=isNull(html)?('<tr parent-tgid="'+tgid+'"><td style="'+leftSpace+'">'+window.tpl_lang.task_none_data+'</td><td colspan="6"></td></tr>'):html;trBox.attr('setted',1);trBox.after(html)}})}}});$('#task_folder #level0 .taskgroup').trigger('click')});var click_task_backstage_time={};function task_backstage_collect(ids){var isBatch=!1;if($.isArray(ids)){isBatch=!0;ids=ids.join(',')}
if(!click_task_backstage_time[ids]){click_task_backstage_time[ids]=(new Date()).getTime()}else{if((new Date()).getTime()-click_task_backstage_time[ids]<=3000){return!1}else{click_task_backstage_time[ids]=(new Date()).getTime()}}
var url='';if(isBatch){url=ulink('Task/collectBatch?ids=_ids_&backstage=1',{'_ids_':ids})}else{url=ulink('Task/collect?id=_id_&backstage=1',{'_id_':ids})}
$.ajax({type:'GET',url:url,async:!0,timeout:1000,dataType:'html'});toastr.success('已添加到后台运行');backstageTask()}
$(document).ready(function(){$('table.datatable').on('click','.delete',function(){var obj=$(this);var url=ulink('Task/op?op=delete&id=_id_',{_id_:obj.attr('item-id')});confirmRight(window.tpl_lang.confirm_delete,function(){$.ajax({type:"GET",url:url,dataType:"json",success:function(data){data.code==1?toastr.success(data.msg):toastr.error(data.msg);if(data.code==1){obj.parents('tr').eq(0).remove()}}})})});$('table.datatable').on('click','.auto',function(){var auto=1;var tips=[window.tpl_lang.yes,'green'];if($(this).html()==window.tpl_lang.yes){auto=0;tips=[window.tpl_lang.no,'red']}
var itemid=$(this).attr('item-id');if(itemid>0){var $_o=$(this);var url=ulink('Task/op?op=auto&auto=_auto_&id=_id_');url=url.replace('_auto_',auto).replace('_id_',itemid);$.ajax({type:'GET',url:url,success:function(data){if(data.code==1){$_o.html(tips[0]);$_o.css('color',tips[1])}},dataType:'json'})}});$('table.datatable').on('click','.caiji',function(){var taskid=$(this).attr('item-id');var url=ulink('Task/collect?id=_id_',{'_id_':taskid});windowIframe(window.tpl_lang.task_caiji_ing,url,{lg:1,loaded_func:function(){$('#myModal .modal-footer .close').html('关闭采集').prop('title','关闭并结束任务').addClass('btn btn-primary').removeClass('close');$('#myModal .modal-footer').prepend('<button type="button" class="btn btn-default backstage" data-dismiss="modal" title="关闭并在后台运行任务">后台运行</button>');$('#myModal .modal-footer .backstage').bind('click',function(){task_backstage_collect(taskid)})}})});$('table.datatable').on('click','.caiji-batch',function(){var taskids=[];$('input[name="batch[]"]:checked').each(function(){taskids.push($(this).val())});var url=ulink('Task/collectBatch?ids=_ids_',{'_ids_':taskids.join(',')});windowIframe(window.tpl_lang.task_caiji_ing,url,{lg:1,loaded_func:function(){$('#myModal .modal-footer .close').html('关闭采集').prop('title','关闭并结束任务').addClass('btn btn-primary').removeClass('close');$('#myModal .modal-footer').prepend('<button type="button" class="btn btn-default backstage" data-dismiss="modal" title="关闭并在后台运行任务">后台运行</button>');$('#myModal .modal-footer .backstage').bind('click',function(){task_backstage_collect(taskids)})}})});$('table.datatable').on('click','.houtai',function(){var taskid=$(this).attr('item-id');task_backstage_collect(taskid)});$('table.datatable').on('click','.houtai-batch',function(){var taskids=[];$('input[name="batch[]"]:checked').each(function(){taskids.push($(this).val())});task_backstage_collect(taskids)});$('table.datatable thead th[data-order]').bind('click',function(){var order=$(this).attr('data-order');if(!order){return!1}
var className=$(this).attr('class');var sort='desc';if(className=='sorting_desc'){sort='asc'}
window.location.href=ulink('Task/list?show=list&order='+order+'&sort='+sort);return!1})})