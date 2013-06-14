function jpTimePicker(insertId){
  this._init(insertId);
}

jpTimePicker.prototype._init = function(insertId){
  document.getElementById(insertId).appendChild(this._createComponent());
}

jpTimePicker.prototype._createComponent = function(){
  var timeComponent = document.createElement('DIV');
  timeComponent.className = 'jpTimeComponent';
  var inputBlock = this._createInputBlock();
  var calendar = this._createCalendar();
  timeComponent.appendChild(inputBlock);
  timeComponent.appendChild(calendar);

  inputBlock.attachEvent('onclick', function(e){
    //判断当前点击的是哪一个功能按钮
    var className = e.srcElement.className;
    if(className.indexOf('jpTimeComponent-time-dateBtn') >= 0){
      var calendarBlock = e.srcElement.parentElement.nextSibling;
      var displayVal = calendarBlock.style.display;
      if(displayVal === 'none'){
        calendarBlock.style.display = 'block';
      }else if(displayVal === 'block'){
        calendarBlock.style.display = 'none';
      }
    }
  })

  calendar.attachEvent('onclick', function(e){
    var dom = e.srcElement;
    var tagName = dom.tagName;
    var className = dom.className;
    if(className.indexOf('JPCalendarWeekday-preDay') < 0 && tagName.toLowerCase() === 'td' && dom.innerHTML !== ''){
      //将之前选中的变色
      var ele=dom.parentElement.parentElement.getElementsByTagName('td');
      var res= new Array(),reslist="-1"; 
      for(i=0;i<ele.length;i++){
        if(ele[i].className=='currentSelect'){
          reslist+=","+i;
        }
      }
      reslist=reslist.replace(new RegExp("-1,"),"");
      
      for(j=0;j<reslist.split(",").length;j++){
        res[j]=ele[reslist.split(",")[j]];
      }

      try{
        res[0].className = '';
        res[0].style.backgroundColor = '#575757';
      }catch(e){

      }

      dom.style.backgroundColor = '#333333';
      dom.className = 'currentSelect';
    }
  })

  return timeComponent;
}

jpTimePicker.prototype._createInputBlock = function(){
  var inputBlock = document.createElement('DIV');
  inputBlock.className = 'jpTimeComponent-input';
  var dateBtn = this._createDateBtn();
  var inputDate = this._createInputDate();
  var inputHour = this._createInputHour();
  var inputMinute = this._createInputMinute();
  var inputSecond = this._createInputSecond();
  var timeSpinnerBtn = this._createTimeSpinnerBtn();
  inputBlock.innerHTML = '';
  inputBlock.innerHTML = inputDate + timeSpinnerBtn + inputSecond + inputMinute + inputHour + dateBtn;
  this.inputBlock = inputBlock;
  return inputBlock;
}

jpTimePicker.prototype._createDateBtn = function(){

  return '<div class="jpTimeComponent-time-dateBtn" style="width:17px;height:15px;float:right;margin-right:13px;margin-top:4px;cursor:pointer;"></div>';
}

jpTimePicker.prototype._createInputDate = function(){
  var dateObj = new Date();
  var currentDate = dateObj.getFullYear() + '-' + (dateObj.getMonth()+1) + '-' + dateObj.getDate();
  return '<span class="jpTimeComponent-date">'+currentDate+'</span>';
}

jpTimePicker.prototype._createInputHour = function(){
  var dateObj = new Date();
  return '<input class="jpTimeComponent-time-Hour" type="text" value="'+dateObj.getHours()+'" />';
}

jpTimePicker.prototype._createInputMinute = function(){
  var dateObj = new Date();
  return '<input class="jpTimeComponent-time-Minute" type="text" value="'+dateObj.getMinutes()+'" />';
}

jpTimePicker.prototype._createInputSecond = function(){
  var dateObj = new Date();
  return '<input class="jpTimeComponent-time-Second" type="text" value="'+dateObj.getSeconds()+'" style="background-image:none;" />';
}

jpTimePicker.prototype._createTimeSpinnerBtn = function(){

  return '<div style="width:13px;height:15px;float:right;margin-top:4px;margin-right:11px;">'+
    '<div style="position:relative;height:7px;cursor:pointer;"></div>'+
    '<div style="position:relative;height:8px;cursor:pointer;"></div>'+
    '</div>';
}

jpTimePicker.prototype._createCalendar = function(){
  var calendar = document.createElement('DIV');
  calendar.className = 'jpTimeComponent-calendar';
  calendar.style.display = 'none';
  var hr = this._createCalendarHr();
  var monthSelect = this._createMonthSelect();
  var days = this._createDays();
  calendar.innerHTML = '';
  calendar.innerHTML = hr + monthSelect + days;
  this.calendar = calendar;
  return calendar;
}

jpTimePicker.prototype._createCalendarHr = function(){

  return '<hr style="border:0;height:1px;margin-top:0;background:#707070;margin-bottom:1px;" />';
}

jpTimePicker.prototype._createMonthSelect = function(){
 var dateObj = new Date();
 var currentDate = dateObj.getFullYear() + '年' + (dateObj.getMonth()+1) + '月';
  return '<div class="jpTimeComponent-calendar-monthSelect">'+
        '<a href="javascript:void(0);" title="上一月" style="display:inline;"><img width="7px" height="11px" alt="上一月" src="images/pre.png" style="border:0;margin-top:3px;" /></a>'+
        '<span style="cursor:pointer;margin:auto 7px;">'+currentDate+'</span>'+
        '<a href="javascript:void(0);" title="下一月" style="display:inline;"><img width="7px" height="11px" alt="下一月" src="images/next.png" style="border:0;margin-top:3px;" /></a>'+
      '</div>';
}

jpTimePicker.prototype._createDays = function(){

  return '<table cellspacing="1" cellpadding="0" border="0" style="width:174px;">'+
              '<thead class="JPCalendarWeekday">'+
                  '<tr valign="middle" align="center">'+
                      '<td class="JPCalendarWeekday-preDay">一</td><td class="JPCalendarWeekday-preDay">二</td><td class="JPCalendarWeekday-preDay">三</td><td class="JPCalendarWeekday-preDay">四</td><td class="JPCalendarWeekday-preDay">五</td><td class="JPCalendarWeekday-preDay">六</td><td class="JPCalendarWeekday-preDay">日</td>'+
                  '</tr>'+
              '</thead>'+
              '<tbody class="JPCalendarDay" align="center" border="1" cellspacing="0" cellpadding="0">'+
                  '<tr>'+
                      '<td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td>'+
                  '</tr>'+
                  '<tr>'+
                      '<td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td>'+
                  '</tr>'+
                  '<tr>'+
                      '<td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td>'+
                  '</tr>'+
                  '<tr>'+
                      '<td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td>'+
                  '</tr>'+
                  '<tr>'+
                      '<td>29</td><td>30</td><td>31</td><td></td><td></td><td></td><td></td>'+
                  '</tr>'+
              '</tbody>'+
          '</table>';
}

jpTimePicker.prototype._getDOM = function(name){
  var dom;
  switch(name){
    case 'date':
      dom = this.inputBlock.firstChild;
      break;
    case 'timeSpinner':
      dom = this.inputBlock.firstChild.nextSibling;
      break;
    case 'hour':
      dom = this.inputBlock.firstChild.nextSibling.nextSibling.nextSibling.nextSibling;
      break;
    case 'minute':
      dom = this.inputBlock.firstChild.nextSibling.nextSibling.nextSibling;
      break;
    case 'second':
      dom = this.inputBlock.firstChild.nextSibling.nextSibling;
      break;
    case 'dateBtn':
      dom = this.inputBlock.lastChild;
      break;
  }
  return dom;
}

jpTimePicker.prototype._getInputDate = function(){
  var inputDate = this._getDOM('date');
  var dateArr = inputDate.innerHTML.split('-');
  return dateArr;
}

jpTimePicker.prototype.getYear = function(){
  return this._getInputDate()[0];
}

jpTimePicker.prototype.getMonth = function(){
  return this._getInputDate()[1];
}

jpTimePicker.prototype.getDay = function(){
  return this._getInputDate()[2];
}

jpTimePicker.prototype._getInputTime = function(){
  var inputTime = [];
  inputTime.push(this._getDOM('hour').value);
  inputTime.push(this._getDOM('minute').value);
  inputTime.push(this._getDOM('second').value);
  return inputTime;
}

jpTimePicker.prototype.getHour = function(){
  return this._getInputTime()[0];
}

jpTimePicker.prototype.getMinute = function(){
  return this._getInputTime()[1];
}

jpTimePicker.prototype.getSecond = function(){
  return this._getInputTime()[2];
}

jpTimePicker.prototype.getFullTime = function(){
  var inputDate = this._getInputDate();
  var inputTime = this._getInputTime();
  var obj = {};
  obj.Year = inputDate[0];
  obj.Month = inputDate[1];
  obj.Day = inputDate[2];
  obj.Hour = inputTime[0];
  obj.Minute = inputTime[1];
  obj.Second = inputTime[2];
  return obj;
}

jpTimePicker.prototype.getCurrentTime = function(){
  
}