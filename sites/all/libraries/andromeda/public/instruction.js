var samo_instruction_text='';function setSamoInstruction(value){samo_instruction_text=value;if(value){$('.samo_instruction_link').show();$('#samo_instruction').html('<table>'+'<tr><td align="right"><span id="samo_instruction_close_form">Закрыть</span></td></tr>'+'<tr>'+'<td><div id="samo_instruction_container">'+
value+'</div></td>'+'</tr>'+'</table>');}else{$('.samo_instruction_link').hide();$('#samo_instruction').html('');}}
function showSamoInstructionLink(){$('.samo_instruction_link').show();}
function hideSamoInstruction(){$('#samo_instruction').hide();$('#samo_veil').hide();}
function showSamoInstruction(value){setSamoInstruction(value?value:samo_instruction_text);if(samo_instruction_text){$('#samo_instruction').fadeIn();if(!document.all){$('#samo_veil').fadeIn();}else{$('#samo_veil').show();}
realignSamoInstruction();}};function realignSamoInstruction(){if(samo_instruction_text=='')return;var $form=$('#samo_instruction');var $veil=$('#samo_veil');var cont=$form.find('#samo_instruction_container');cont=cont.size()?cont:$form;var wndWidth=$(window).width();var wndHeight=$(window).height();var contWidth=0;var contHeight=0;var formWidth=0;var formHeight=0;var resetSizes=function(){contWidth=cont.outerWidth();contHeight=cont.outerHeight();formWidth=$form.outerWidth();formHeight=$form.outerHeight();};resetSizes();if(formHeight>wndHeight*0.8){cont.css({overflowY:'auto',height:Math.round(wndHeight*0.8)-(formHeight-contHeight)});}
resetSizes();if(formWidth>wndWidth*0.8){cont.css({overflowX:'auto',width:Math.round(wndWidth*0.8)-(formWidth-contWidth)});}
resetSizes();var y=parseInt(document.body.scrollTop)+Math.round(wndHeight/2-formHeight/2);var x=parseInt(document.body.scrollLeft)+Math.round(wndWidth/2-formWidth/2);$form.css('top',y).css('left',x);$veil.css('height',$(document).height());}
$(document).ready(function(){$('body').append('<div id="samo_instruction" style="display: none;"></div>');$('body').append('<div id="samo_veil" style="display: none;"></div>');$(document).delegate('.samo_instruction_link','click',function(){if(samo_instruction_text){showSamoInstruction();}});$(window).bind('scroll resize',function(){realignSamoInstruction();});$(document).delegate('#samo_veil, #samo_instruction_close_form','click',hideSamoInstruction);});var s={"checkFields":[{"people":[{"age":[{"required":"true","readOnly":"false","type":"string"}],"sex":[{"required":"true","readOnly":"false","type":"string"}],"lname":[{"required":"true","readOnly":"false","type":"string"}],"name":[{"required":"false","readOnly":"false","type":"string"}],"born":[{"required":"true","readOnly":"false","type":"date"}],"bornplaceKey":[{"required":"false","readOnly":"false","type":"int"}],"address":[{"required":"true","readOnly":"false","type":"string"}],"phone":[{"required":"false","readOnly":"false","type":"string"}],"email":[{"required":"false","readOnly":"false","type":"string"}],"mobile":[{"required":"true","readOnly":"false","type":"string"}],"pserie":[{"required":"true","readOnly":"false","type":"string"}],"pnumber":[{"required":"true","readOnly":"false","type":"string"}],"pexpire":[{"required":"true","readOnly":"false","type":"date"}],"pgiven":[{"required":"true","readOnly":"false","type":"date"}],"pgivenorg":[{"required":"true","readOnly":"false","type":"string"}],"nationalityKey":[{"required":"true","readOnly":"false","type":"int"}]}],"buyer":[{"name":[{"required":"true","readOnly":"false","type":"string"}],"pserie":[{"required":"false","readOnly":"false","type":"string"}],"pnumber":[{"required":"false","readOnly":"false","type":"string"}],"pgiven":[{"required":"false","readOnly":"false","type":"date"}],"pgivenorg":[{"required":"false","readOnly":"false","type":"string"}],"pgivencode":[{"required":"false","readOnly":"false","type":"string"}],"address":[{"required":"false","readOnly":"false","type":"string"}],"phone":[{"required":"true","readOnly":"false","type":"string"}],"email":[{"required":"true","readOnly":"true","type":"string"}],"mobile":[{"required":"false","readOnly":"false","type":"string"}]}]}],"claimDocument":[{"moneys":[{"money":[{"price":"820","cost":"820","net":"738","currencyKey":"2","currency":"USD","isClaimCurrency":"true","discoCost":"820"},{"price":"27060","cost":"27060","net":"24354","currencyKey":"1","currency":"RUB","isClaimCurrency":"false","rate":"33","discoCost":"27060"}]}],"peoples":[{"people":[{"key":"1","age":"ADL"}]}],"hotels":[{"hotel":[{"uid":"a88d7cde012843ab947569b69a06580b","groupId":"10","key":"4","name":"CRYST\'AL ADMIRAL RESORT (A)","url":"http:\/\/hotel.ru","datebeg":"2012-04-09","dateend":"2012-04-18","starKey":"3","star":"***","townKey":"5","town":"Antalya","stateKey":"6","state":"Turkey","roomKey":"4","room":"STD ROOM","htplaceKey":"5","htplace":"SNGL","mealKey":"6","meal":"AI"}]}],"transports":[{"transport":[{"departure":[{"stateKey":"2","state":"Russia","townKey":"2","town":"Moscow","portKey":"2","port":"Sheremetevo-1","time":"12:00"}],"arrival":[{"stateKey":"6","state":"Turkey","townKey":"5","town":"Antalya","portKey":"5","port":"\u0410\u043d\u0442 1","time":"15:00"}],"uid":"77dc3fd42c0fadb44c0c7503d427e8bb","groupId":"11","datebeg":"2012-04-09","dateend":"2012-04-09","key":"3","name":"MA 001","type":"ttAvia","classKey":"2","class":"ECONOM","frplaceKey":"2","frplace":"ECONOM","direction":"0","onlineClassKey":"0"},{"departure":[{"stateKey":"6","state":"Turkey","townKey":"5","town":"Antalya","portKey":"5","port":"\u0410\u043d\u0442 1","time":"19:20"}],"arrival":[{"stateKey":"2","state":"Russia","townKey":"2","town":"Moscow","portKey":"2","port":"Sheremetevo-1","time":"22:20"}],"uid":"4f771cd7f41cf27b79aa29c4efde24bf","groupId":"12","datebeg":"2012-04-18","dateend":"2012-04-18","key":"4","name":"AM 001","type":"ttAvia","classKey":"2","class":"ECONOM","frplaceKey":"2","frplace":"ECONOM","direction":"1","onlineClassKey":"0"}]}],"services":[{"service":[{"uid":"ca6ec4ba0fce4d84f69a022e20587d92","groupId":"16","datebeg":"2012-04-09","dateend":"2012-04-18","key":"51","name":"Supplement: Fuel ","type":"stOther","required":"true","hidden":"true","servicetype":"7"},{"uid":"cbe648878b911479e9ec4cdccf6cd738","groupId":"16","datebeg":"2012-04-09","dateend":"2012-04-18","key":"46458","name":"Supplement: \u0414\u043e\u043f\u043b\u0430\u0442\u0430 \u0437\u0430 \u043f\u043b\u0435\u0434 \u0410\u0432\u0438\u0430\u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f 2","type":"stOther","required":"true","hidden":"false","servicetype":"7"},{"uid":"6eba8dc32f46c61a757a273d728d6970","groupId":"17","datebeg":"2012-04-09","dateend":"2012-04-18","key":"2","name":"Turkey: medical insurance sport","type":"stInsurance","required":"true","hidden":"false","url":"http:\/\/google.ru"},{"uid":"98ef19af1ba61784fa1717b2708b98d7","groupId":"18","datebeg":"2012-04-09","dateend":"2012-04-18","key":"2136","name":"Turkey: \u043d\u0430 \u0441\u043b\u0443\u0447\u0430\u0439 \u0437\u0430\u043c\u043e\u0440\u043e\u0437\u043a\u043e\u0432","type":"stInsurance","required":"true","hidden":"false","url":"http:\/\/ya.ru"},{"uid":"dd5a43a53d5bb38280ac326dd55b1a82","groupId":"19","datebeg":"2012-04-09","dateend":"2012-04-18","key":"26","name":"Turkey: \u041e\u0431\u044b\u0447\u043d\u0430\u044f","type":"stVisa","required":"false","hidden":"false"}]}],"provider":[{"name":"_ANDROMEDA","guid":"{3735BB25-A898-4E8B-9AF5-F62515BF7C2C}"}],"buyerMoneys":[{"buyerClaimMoney":[{"price":"820","net":"820","currency":"US_","currencyKey":"840","isClaimCurrency":"true"}]}],"condition":"ccOffer","status":"csNotActivated","payStatus":"psNotPaid","datebeg":"2012-04-09","dateend":"2012-04-18","nights":"9","comissionPercent":"10","townFromKey":"2","townFrom":"Moscow","stateKey":"6","state":"Turkey","tourKey":"3","tour":"Antalya for online\\","catalogKey":"6000020000302128","peopleCount":"1","adult":"1","child":"0","infant":"0","guid":"{D87F7002-343F-4442-8A08-AFD697143DD7}","agent":"SAMO-Soft","cdate":"2012-04-03T13:15:36+04:00","number":"60954"}],"variants":[{"hotels":[[]],"transports":[{"transport":[{"departure":[{"stateKey":"2","state":"Russia","townKey":"2","town":"Moscow","portKey":"-2147483647","port":""}],"arrival":[{"stateKey":"6","state":"Turkey","townKey":"5","town":"Antalya","portKey":"-2147483647","port":""}],"uid":"3a816dc28993f9c8ead85e4cd7e43529","groupId":"11","datebeg":"2012-04-09","dateend":"2012-04-09","key":"27","name":"MA 002","type":"ttAvia","classKey":"2","class":"ECONOM <\u043f\u043e \u0437\u0430\u043f\u0440\u043e\u0441\u0443>","frplaceKey":"2","frplace":"ECONOM <\u043f\u043e \u0437\u0430\u043f\u0440\u043e\u0441\u0443>","direction":"0","onlineClassKey":"0"},{"departure":[{"stateKey":"2","state":"Russia","townKey":"2","town":"Moscow","portKey":"2","port":"Sheremetevo-1","time":"13:00"}],"arrival":[{"stateKey":"6","state":"Turkey","townKey":"5","town":"Antalya","portKey":"5","port":"\u0410\u043d\u0442 1","time":"15:00"}],"uid":"70446bdc66092119ac48a092e08fc5a3","groupId":"11","datebeg":"2012-04-09","dateend":"2012-04-09","key":"616","name":"S7 MA101","type":"ttAvia","classKey":"2","class":"ECONOM","frplaceKey":"2","frplace":"ECONOM","direction":"0","onlineClassKey":"0"},{"departure":[{"stateKey":"2","state":"Russia","townKey":"2","town":"Moscow","portKey":"2","port":"Sheremetevo-1","time":"12:00"}],"arrival":[{"stateKey":"6","state":"Turkey","townKey":"5","town":"Antalya","portKey":"5","port":"\u0410\u043d\u0442 1","time":"15:00"}],"uid":"8cfc102a0e3340baa8b657a14373efb2","groupId":"11","datebeg":"2012-04-09","dateend":"2012-04-09","key":"3","name":"MA 001","type":"ttAvia","classKey":"3","class":"BUSINESS","frplaceKey":"3","frplace":"BUSINESS","direction":"0","onlineClassKey":"1"},{"departure":[{"stateKey":"2","state":"Russia","townKey":"2","town":"Moscow","portKey":"2","port":"Sheremetevo-1","time":"13:00"}],"arrival":[{"stateKey":"6","state":"Turkey","townKey":"5","town":"Antalya","portKey":"5","port":"\u0410\u043d\u0442 1","time":"15:00"}],"uid":"e2bd0db050fe68db22cb2ec1dcd25f67","groupId":"11","datebeg":"2012-04-09","dateend":"2012-04-09","key":"616","name":"S7 MA101","type":"ttAvia","classKey":"3","class":"BUSINESS","frplaceKey":"3","frplace":"BUSINESS","direction":"0","onlineClassKey":"1"},{"departure":[{"stateKey":"2","state":"Russia","townKey":"2","town":"Moscow","portKey":"2","port":"Sheremetevo-1","time":"12:00"}],"arrival":[{"stateKey":"6","state":"Turkey","townKey":"5","town":"Antalya","portKey":"5","port":"\u0410\u043d\u0442 1","time":"15:00"}],"uid":"05b6ebff31a6ab417688aba23fff316e","groupId":"11","datebeg":"2012-04-09","dateend":"2012-04-09","key":"3","name":"MA 001","type":"ttAvia","classKey":"5","class":"Premium <\u043f\u043e \u0437\u0430\u043f\u0440\u043e\u0441\u0443>","frplaceKey":"6","frplace":"Premium <\u043f\u043e \u0437\u0430\u043f\u0440\u043e\u0441\u0443>","direction":"0","onlineClassKey":"3"},{"departure":[{"stateKey":"6","state":"Turkey","townKey":"5","town":"Antalya","portKey":"5","port":"\u0410\u043d\u0442 1","time":"22:00"}],"arrival":[{"stateKey":"2","state":"Russia","townKey":"2","town":"Moscow","portKey":"2","port":"Sheremetevo-1","time":"01:15 +1"}],"uid":"19c8c24e100ddadc2e07274088ced26a","groupId":"12","datebeg":"2012-04-18","dateend":"2012-04-18","key":"617","name":"S7 AM101","type":"ttAvia","classKey":"2","class":"ECONOM","frplaceKey":"2","frplace":"ECONOM","direction":"1","onlineClassKey":"0"}]}],"services":[{"service":[{"uid":"82ecb5c1d64c29f1c7102418f0bb9117","groupId":"13","datebeg":"2012-04-09","dateend":"2012-04-09","key":"191","name":"Transfer: IND transfer ","type":"stTransfer","required":"false","hidden":"false","servicetype":"1"},{"uid":"81d51e4238be8fa37c854e67cd0feb51","groupId":"13","datebeg":"2012-04-09","dateend":"2012-04-09","key":"14","name":"Transfer: \u0418\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u044b\u0439 \u0442\u0440\u0430\u043d\u0441\u0444\u0435\u0440 ","type":"stTransfer","required":"false","hidden":"false","servicetype":"1"},{"uid":"194f28139b3d2897a7c87be240d870a4","groupId":"13","datebeg":"2012-04-09","dateend":"2012-04-18","key":"804","name":"Transfer: xxxxxxxx ","type":"stTransfer","required":"false","hidden":"false","servicetype":"1"},{"uid":"82aec150ae46355a52a30a45b22129e1","groupId":"14","datebeg":"2012-04-09","dateend":"2012-04-18","key":"190","name":"Excursion: \u042d\u043a\u0441\u043a\u0443\u0440\u0441\u0438\u044f \u0432 \u041f\u0430\u043c\u0443\u043a\u043a\u0430\u043b\u0435 ","type":"stExcursion","required":"false","hidden":"false","servicetype":"2"},{"uid":"46d181724164d9b87bc4c19f13796300","groupId":"14","datebeg":"2012-04-09","dateend":"2012-04-18","key":"189","name":"Excursion: \u042d\u043a\u0441\u043a\u0443\u0440\u0441\u0438\u044f \u0442\u0435\u0441\u0442 ","type":"stExcursion","required":"false","hidden":"false","servicetype":"2"},{"uid":"acf8641733fb86de4dd933106fb2b336","groupId":"15","datebeg":"2012-04-09","dateend":"2012-04-18","key":"7","name":"Other: Flowers ","type":"stOther","required":"false","hidden":"false","servicetype":"6"},{"uid":"72e6a455643873ce5fd69e505d56e956","groupId":"16","datebeg":"2012-04-09","dateend":"2012-04-18","key":"72","name":"Supplement: \u0417\u0430 \u043c\u043b\u0430\u0434\u0435\u043d\u0446\u0430 ","type":"stOther","required":"false","hidden":"false","servicetype":"7"},{"uid":"4d6b52dfe23923420f9ce8fe16c61727","groupId":"18","datebeg":"2012-04-03","dateend":"2012-04-09","key":"6","name":"Turkey: \u043e\u0442 \u043d\u0435\u0432\u044b\u0435\u0437\u0434\u0430 \u0432 \u0422\u0443\u0440\u0446\u0438\u044e","type":"stInsurance","required":"false","hidden":"false"}]}]}],"notes":[[]],"groups":[{"group":[{"required":"true","oneItem":"true","description":"\u041f\u0440\u043e\u0436\u0438\u0432\u0430\u043d\u0438\u0435","id":"10"},{"required":"true","oneItem":"true","description":"\u041f\u0440\u044f\u043c\u043e\u0439 \u0440\u0435\u0439\u0441","id":"11"},{"required":"true","oneItem":"true","description":"\u041e\u0431\u0440\u0430\u0442\u043d\u044b\u0439 \u0440\u0435\u0439\u0441","id":"12","headGroups":"11"},{"required":"true","oneItem":"false","description":"Transfer","id":"13","headGroups":"10,11,12"},{"required":"false","oneItem":"false","description":"Excursion","id":"14","headGroups":"10,11,12"},{"required":"false","oneItem":"false","description":"Other","id":"15","headGroups":"10,11,12"},{"required":"true","oneItem":"false","description":"Supplement","id":"16","headGroups":"10,11,12"},{"required":"true","oneItem":"false","description":"\u0421\u0442\u0440\u0430\u0445\u043e\u0432\u043a\u0430","id":"17"},{"required":"false","oneItem":"false","description":"\u0421\u0442\u0440\u0430\u0445\u043e\u0432\u0430\u043d\u0438\u0435 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u0440\u0438\u0441\u043a\u043e\u0432","personal":"true","id":"18"},{"required":"false","oneItem":"true","description":"\u0412\u0438\u0437\u0430","personal":"true","id":"19"}]}],"version":"3.0"};