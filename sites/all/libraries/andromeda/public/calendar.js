/*
 * Date prototype extensions. Doesn't depend on any
 * other code. Doens't overwrite existing methods.
 *
 * Adds dayNames, abbrDayNames, monthNames and abbrMonthNames static properties and isLeapYear,
 * isWeekend, isWeekDay, getDaysInMonth, getDayName, getMonthName, getDayOfYear, getWeekOfYear,
 * setDayOfYear, addYears, addMonths, addDays, addHours, addMinutes, addSeconds methods
 *
 * Copyright (c) 2006 J��rn Zaefferer and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 *
 * Additional methods and properties added by Kelvin Luck: firstDayOfWeek, dateFormat, zeroTime, asString, fromString -
 * I've added my name to these methods so you know who to blame if they are broken!
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * An Array of day names starting with Sunday.
 *
 * @example dayNames[0]
 * @result 'Sunday'
 *
 * @name dayNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * An Array of abbreviated day names starting with Sun.
 *
 * @example abbrDayNames[0]
 * @result 'Sun'
 *
 * @name abbrDayNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


/**
 * An Array of month names starting with Janurary.
 *
 * @example monthNames[0]
 * @result 'January'
 *
 * @name monthNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


/**
 * An Array of abbreviated month names starting with Jan.
 *
 * @example abbrMonthNames[0]
 * @result 'Jan'
 *
 * @name monthNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


/**
 * The first day of the week for this locale.
 *
 * @name firstDayOfWeek
 * @type Number
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.firstDayOfWeek = 1;

/**
 * The format that string dates should be represented as (e.g. 'dd/mm/yyyy' for UK, 'mm/dd/yyyy' for US, 'yyyy-mm-dd' for Unicode etc).
 *
 * @name format
 * @type String
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
if (!Date.format) {
    Date.format = 'dd.mm.yyyy';
}
//Date.format = 'mm/dd/yyyy';
//Date.format = 'yyyy-mm-dd';
//Date.format = 'dd mmm yy';

(function() {

    /**
     * Adds a given method under the given name
     * to the Date prototype if it doesn't
     * currently exist.
     *
     * @private
     */
    function add(name, method) {
        if( !Date.prototype[name] ) {
            Date.prototype[name] = method;
        }
    }

    /**
     * Checks if the year is a leap year.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.isLeapYear();
     * @result true
     *
     * @name isLeapYear
     * @type Boolean
     * @cat Plugins/Methods/Date
     */
    add("isLeapYear", function() {
        var y = this.getFullYear();
        return (y%4===0 && y%100!==0) || y%400===0;
    });

    /**
     * Checks if the day is a weekend day (Sat or Sun).
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.isWeekend();
     * @result false
     *
     * @name isWeekend
     * @type Boolean
     * @cat Plugins/Methods/Date
     */
    add("isWeekend", function() {
        return 0 === this.getDay() || 6 === this.getDay();
    });

    /**
     * Check if the day is a day of the week (Mon-Fri)
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.isWeekDay();
     * @result false
     *
     * @name isWeekDay
     * @type Boolean
     * @cat Plugins/Methods/Date
     */
    add("isWeekDay", function() {
        return !this.isWeekend();
    });

    /**
     * Gets the number of days in the month.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.getDaysInMonth();
     * @result 31
     *
     * @name getDaysInMonth
     * @type Number
     * @cat Plugins/Methods/Date
     */
    add("getDaysInMonth", function() {
        return [31,(this.isLeapYear() ? 29:28),31,30,31,30,31,31,30,31,30,31][this.getMonth()];
    });

    /**
     * Gets the name of the day.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.getDayName();
     * @result 'Saturday'
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.getDayName(true);
     * @result 'Sat'
     *
     * @param abbreviated Boolean When set to true the name will be abbreviated.
     * @name getDayName
     * @type String
     * @cat Plugins/Methods/Date
     */
    add("getDayName", function(abbreviated) {
        return abbreviated ? Date.abbrDayNames[this.getDay()] : Date.dayNames[this.getDay()];
    });

    /**
     * Gets the name of the month.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.getMonthName();
     * @result 'Janurary'
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.getMonthName(true);
     * @result 'Jan'
     *
     * @param abbreviated Boolean When set to true the name will be abbreviated.
     * @name getDayName
     * @type String
     * @cat Plugins/Methods/Date
     */
    add("getMonthName", function(abbreviated) {
        return abbreviated ? Date.abbrMonthNames[this.getMonth()] : Date.monthNames[this.getMonth()];
    });

    /**
     * Get the number of the day of the year.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.getDayOfYear();
     * @result 11
     *
     * @name getDayOfYear
     * @type Number
     * @cat Plugins/Methods/Date
     */
    add("getDayOfYear", function() {
        var tmpdtm = new Date("1/1/" + this.getFullYear());
        return Math.floor((this.getTime() - tmpdtm.getTime()) / 86400000);
    });

    /**
     * Get the number of the week of the year.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.getWeekOfYear();
     * @result 2
     *
     * @name getWeekOfYear
     * @type Number
     * @cat Plugins/Methods/Date
     */
    add("getWeekOfYear", function() {
        return Math.ceil(this.getDayOfYear() / 7);
    });

    /**
     * Set the day of the year.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.setDayOfYear(1);
     * dtm.toString();
     * @result 'Tue Jan 01 2008 00:00:00'
     *
     * @name setDayOfYear
     * @type Date
     * @cat Plugins/Methods/Date
     */
    add("setDayOfYear", function(day) {
        this.setMonth(0);
        this.setDate(day);
        return this;
    });

    /**
     * Add a number of years to the date object.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.addYears(1);
     * dtm.toString();
     * @result 'Mon Jan 12 2009 00:00:00'
     *
     * @name addYears
     * @type Date
     * @cat Plugins/Methods/Date
     */
    add("addYears", function(num) {
        this.setFullYear(this.getFullYear() + num);
        return this;
    });

    /**
     * Add a number of months to the date object.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.addMonths(1);
     * dtm.toString();
     * @result 'Tue Feb 12 2008 00:00:00'
     *
     * @name addMonths
     * @type Date
     * @cat Plugins/Methods/Date
     */
    add("addMonths", function(num) {
        var tmpdtm = this.getDate();

        this.setMonth(this.getMonth() + num);

        if (tmpdtm > this.getDate())
            this.addDays(-this.getDate());

        return this;
    });

    /**
     * Add a number of days to the date object.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.addDays(1);
     * dtm.toString();
     * @result 'Sun Jan 13 2008 00:00:00'
     *
     * @name addDays
     * @type Date
     * @cat Plugins/Methods/Date
     */
    add("addDays", function(num) {
        this.setDate(this.getDate() + num);
        return this;
    });

    /**
     * Add a number of hours to the date object.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.addHours(24);
     * dtm.toString();
     * @result 'Sun Jan 13 2008 00:00:00'
     *
     * @name addHours
     * @type Date
     * @cat Plugins/Methods/Date
     */
    add("addHours", function(num) {
        this.setHours(this.getHours() + num);
        return this;
    });

    /**
     * Add a number of minutes to the date object.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.addMinutes(60);
     * dtm.toString();
     * @result 'Sat Jan 12 2008 01:00:00'
     *
     * @name addMinutes
     * @type Date
     * @cat Plugins/Methods/Date
     */
    add("addMinutes", function(num) {
        this.setMinutes(this.getMinutes() + num);
        return this;
    });

    /**
     * Add a number of seconds to the date object.
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.addSeconds(60);
     * dtm.toString();
     * @result 'Sat Jan 12 2008 00:01:00'
     *
     * @name addSeconds
     * @type Date
     * @cat Plugins/Methods/Date
     */
    add("addSeconds", function(num) {
        this.setSeconds(this.getSeconds() + num);
        return this;
    });

    /**
     * Sets the time component of this Date to zero for cleaner, easier comparison of dates where time is not relevant.
     *
     * @example var dtm = new Date();
     * dtm.zeroTime();
     * dtm.toString();
     * @result 'Sat Jan 12 2008 00:01:00'
     *
     * @name zeroTime
     * @type Date
     * @cat Plugins/Methods/Date
     * @author Kelvin Luck
     */
    add("zeroTime", function() {
        this.setMilliseconds(0);
        this.setSeconds(0);
        this.setMinutes(0);
        this.setHours(0);
        return this;
    });

    /**
     * Returns a string representation of the date object according to Date.format.
     * (Date.toString may be used in other places so I purposefully didn't overwrite it)
     *
     * @example var dtm = new Date("01/12/2008");
     * dtm.asString();
     * @result '12/01/2008' // (where Date.format == 'dd/mm/yyyy'
     *
     * @name asString
     * @type Date
     * @cat Plugins/Methods/Date
     * @author Kelvin Luck
     */
    add("asString", function(r) {
        if (!r) r = Date.format;
        return r.split('yyyy').join(this.getFullYear()).split('yy').join(this.getYear()).split('mmm').join(this.getMonthName(true)).split('mm').join(_zeroPad(this.getMonth()+1)).split('dd').join(_zeroPad(this.getDate()));
    });

    /**
     * Returns a new date object created from the passed String according to Date.format or false if the attempt to do this results in an invalid date object
     * (We can't simple use Date.parse as it's not aware of locale and I chose not to overwrite it incase it's functionality is being relied on elsewhere)
     *
     * @example var dtm = Date.fromString("12/01/2008");
     * dtm.toString();
     * @result 'Sat Jan 12 2008 00:00:00' // (where Date.format == 'dd/mm/yyyy'
     *
     * @name fromString
     * @type Date
     * @cat Plugins/Methods/Date
     * @author Kelvin Luck
     */
    Date.fromString = function(s,f)
    {
        if (!f) f = Date.format;
        var d = new Date('01/01/1977');
        var iY = f.indexOf('yyyy');
        if (iY > -1) {
            d.setFullYear(Number(s.substr(iY, 4)));
        } else {
            // TODO - this doesn't work very well - are there any rules for what is meant by a two digit year?
            d.setYear(Number(s.substr(f.indexOf('yy'), 2)));
        }
        var iM = f.indexOf('mmm');
        if (iM > -1) {
            var mStr = s.substr(iM, 3);
            for (var i=0; i<Date.abbrMonthNames.length; i++) {
                if (Date.abbrMonthNames[i] == mStr) break;
            }
            d.setMonth(i);
        } else {
            d.setMonth(Number(s.substr(f.indexOf('mm'), 2)) - 1);
        }
        d.setDate(Number(s.substr(f.indexOf('dd'), 2)));
        if (isNaN(d.getTime())) return false;
        return d;
    };

    // utility method
    var _zeroPad = function(num) {
        var s = '0'+num;
        return s.substring(s.length-2);
        //return ('0'+num).substring(-2); // doesn't work on IE :(
    };

    Date.dateBetween = function(s) {
        if (!s) return false;
        var dateMin, dateMax;
        if (arguments.length == 1) {
            dateMin = new Date();
            dateMax = new Date();
            dateMax.setFullYear(dateMax.getFullYear() + 1);
        } else {
            if (arguments.length == 2) {
                dateMin = new Date();
                dateMax = Date.fromString(arguments[1]) || new Date();
            } else {
                dateMin = Date.fromString(arguments[1]);
                dateMax = Date.fromString(arguments[2]);
            }
        }
        s = Date.fromString(s);
        if (Date.isDate(s) && (s - dateMin.getTime()) >= 0 && (dateMax.getTime() - s) >= 0) {
            return true;
        }
        return false;
    };

    add("getAge", function() {
        var now = (arguments[0]) ? arguments[0] : (new Date()).zeroTime();
        return Math.floor((now.getTime() - this.getTime()) / (1000 * 3600 * 24 * 365.25) + 0.001);
    });



})();
/**
/**
/**
 * Copyright (c) 2007 Kelvin Luck (http://www.kelvinluck.com/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $Id: jquery.datepicker.js 2181 2008-12-17 15:31:03Z MiRacLe $
 **/

(function($){

    $.fn.extend({
/**
 * Render a calendar table into any matched elements.
 *
 * @param Object s (optional) Customize your calendars.
 * @option Number month The month to render (NOTE that months are zero based). Default is today's month.
 * @option Number year The year to render. Default is today's year.
 * @option Function renderCallback A reference to a function that is called as each cell is rendered and which can add classes and event listeners to the created nodes. Default is no callback.
 * @option Number showHeader Whether or not to show the header row, possible values are: $.dpConst.SHOW_HEADER_NONE (no header), $.dpConst.SHOW_HEADER_SHORT (first letter of each day) and $.dpConst.SHOW_HEADER_LONG (full name of each day). Default is $.dpConst.SHOW_HEADER_SHORT.
 * @option String hoverClass The class to attach to each cell when you hover over it (to allow you to use hover effects in IE6 which doesn't support the :hover pseudo-class on elements other than links). Default is dp-hover. Pass false if you don't want a hover class.
 * @type jQuery
 * @name renderCalendar
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#calendar-me').renderCalendar({month:0, year:2007});
 * @desc Renders a calendar displaying January 2007 into the element with an id of calendar-me.
 *
 * @example
 * var testCallback = function($td, thisDate, month, year)
 * {
 * if ($td.is('.current-month') && thisDate.getDay() == 4) {
 *        var d = thisDate.getDate();
 *        $td.bind(
 *            'click',
 *            function()
 *            {
 *                alert('You clicked on ' + d + '/' + (Number(month)+1) + '/' + year);
 *            }
 *        ).addClass('thursday');
 *    } else if (thisDate.getDay() == 5) {
 *        $td.html('Friday the ' + $td.html() + 'th');
 *    }
 * }
 * $('#calendar-me').renderCalendar({month:0, year:2007, renderCallback:testCallback});
 *
 * @desc Renders a calendar displaying January 2007 into the element with an id of calendar-me. Every Thursday in the current month has a class of "thursday" applied to it, is clickable and shows an alert when clicked. Every Friday on the calendar has the number inside replaced with text.
 **/
        renderCalendar  :   function(s)
        {
            s = $.extend(
                {
                    month            : null,
                    year            : null,
                    showHeader        : $.dpConst.SHOW_HEADER_SHORT,
                    dpController    : null,
                    hoverClass        : 'dp-hover'
                }
                , s
            );

            if (s.showHeader != $.dpConst.SHOW_HEADER_NONE) {
                var headRow = '<tr>';
                for (var i=Date.firstDayOfWeek; i<Date.firstDayOfWeek+7; i++) {
                    var weekday = i%7;
                    var day = Date.dayNames[weekday];
                    headRow += '<th title="'+day+'" class="'+ (weekday == 0 || weekday == 6 ? 'weekend' : 'weekday') +'">' + day.substr(0, 1)+'</th>';
                }
                headRow += '</tr>';
            };

            var $calendarTable = '<table class="jCalendar"><thead>' + headRow + '</thead><tbody>';

            var today = (new Date()).zeroTime();

            var month = s.month == undefined ? today.getMonth() : s.month;
            var year = s.year || today.getFullYear();

            var currentDate = (new Date(year, month, 1)).zeroTime();


            var firstDayOffset = Date.firstDayOfWeek - currentDate.getDay() + 1;
            if (firstDayOffset > 1) firstDayOffset -= 7;
            currentDate.addDays(firstDayOffset-1);

            var w = 0;
//*
            while (w++<6) {
                $calendarTable += '<tr>';
                for (var i=0; i<7; i++) {
                    var thisMonth = currentDate.getMonth() == month;
                    var className =  (thisMonth ? 'current-month ' : 'other-month ') +
                                                    (currentDate.isWeekend() ? 'weekend ' : 'weekday ') +
                                                    (thisMonth && currentDate.getTime() == today.getTime() ? 'today ' : '');
                
                    className += (s.dpController.isValidDate(currentDate) && currentDate.getTime() >= s.dpController.startDate.getTime()) ? 'active ' : 'notactive ';                                                    
                    $calendarTable += '<td class="' +className + '" samo:dt="'+currentDate.getTime()+'" >' + currentDate.getDate() + '</td>';
                    currentDate.addDays(1);
                }
                $calendarTable += '</tr>';
            }
            $calendarTable += '</tbody></table>';      
            $('#dp-calendar').delegate('td.active','click', function() {
                        var $this = $(this),c = s.dpController,_d = $(this).attr('samo:dt');
                        var d = new Date();
                        d.setTime(_d);
                        c.setSelected(d, !$this.is('.selected') || !c.selectMultiple);
                        var _s = c.isSelected(_d);
                        $(c.ele).trigger('dateSelected', [d, $this, _s]);
                        if (c.closeOnSelect) {
                            c._closeCalendar();
                        }
            });
            return this.each(
                function()
                {
                    $(this).empty().append($calendarTable);
                }
            );
        },
/**
 * Create a datePicker associated with each of the matched elements.
 *
 * The matched element will receive a few custom events with the following signatures:
 *
 * dateSelected(event, date, $td, status)
 * Triggered when a date is selected. event is a reference to the event, date is the Date selected, $td is a jquery object wrapped around the TD that was clicked on and status is whether the date was selected (true) or deselected (false)
 *
 * dpClosed(event, selected)
 * Triggered when the date picker is closed. event is a reference to the event and selected is an Array containing Date objects.
 *
 * dpMonthChanged(event, displayedMonth, displayedYear)
 * Triggered when the month of the popped up calendar is changed. event is a reference to the event, displayedMonth is the number of the month now displayed (zero based) and displayedYear is the year of the month.
 *
 * dpDisplayed(event, $datePickerDiv)
 * Triggered when the date picker is created. $datePickerDiv is the div containing the date picker. Use this event to add custom content/ listeners to the popped up date picker.
 *
 * @param Object s (optional) Customize your date pickers.
 * @option Number month The month to render when the date picker is opened (NOTE that months are zero based). Default is today's month.
 * @option Number year The year to render when the date picker is opened. Default is today's year.
 * @option Date startDate The first date date can be selected.
 * @option Date endDate The last date that can be selected.
 * @option Boolean createButton Whether to create a .dp-choose-date anchor directly after the matched element which when clicked will trigger the showing of the date picker. Default is true.
 * @option Boolean showYearNavigation Whether to display buttons which allow the user to navigate through the months a year at a time. Default is true.
 * @option Boolean closeOnSelect Whether to close the date picker when a date is selected. Default is true.
 * @option Boolean displayClose Whether to create a "Close" button within the date picker popup. Default is false.
 * @option Boolean selectMultiple Whether a user should be able to select multiple dates with this date picker. Default is false.
 * @option Boolean clickInput If the matched element is an input type="text" and this option is true then clicking on the input will cause the date picker to appear.
 * @option Number verticalPosition The vertical alignment of the popped up date picker to the matched element. One of $.dpConst.POS_TOP and $.dpConst.POS_BOTTOM. Default is $.dpConst.POS_TOP.
 * @option Number horizontalPosition The horizontal alignment of the popped up date picker to the matched element. One of $.dpConst.POS_LEFT and $.dpConst.POS_RIGHT.
 * @option Number verticalOffset The number of pixels offset from the defined verticalPosition of this date picker that it should pop up in. Default in 0.
 * @option Number horizontalOffset The number of pixels offset from the defined horizontalPosition of this date picker that it should pop up in. Default in 0.
 * @option (Function|Array) renderCallback A reference to a function (or an array of seperate functions) that is called as each cell is rendered and which can add classes and event listeners to the created nodes. Each callback function will receive four arguments; a jquery object wrapping the created TD, a Date object containing the date this TD represents, a number giving the currently rendered month and a number giving the currently rendered year. Default is no callback.
 * @option String hoverClass The class to attach to each cell when you hover over it (to allow you to use hover effects in IE6 which doesn't support the :hover pseudo-class on elements other than links). Default is dp-hover. Pass false if you don't want a hover class.
 * @type jQuery
 * @name datePicker
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('input.date-picker').datePicker();
 * @desc Creates a date picker button next to all matched input elements. When the button is clicked on the value of the selected date will be placed in the corresponding input (formatted according to Date.format).
 *
 * @example demo/index.html
 * @desc See the projects homepage for many more complex examples...
 **/
        datePicker : function(s)
        {
            if (!$.event._dpCache) $.event._dpCache = [];

            // initialise the date picker controller with the relevant settings...
            s = $.extend(
                {
                    month                : undefined,
                    year                : undefined,
                    startDate            : undefined,
                    endDate                : undefined,
                    validDates            : undefined,
                    createButton        : false,
                    showYearNavigation    : false,
                    closeOnSelect        : true,
                    displayClose        : false,
                    selectMultiple        : false,
                    clickInput            : false,
                    innerButton            : true,
                    verticalPosition    : $.dpConst.POS_TOP,
                    horizontalPosition    : $.dpConst.POS_LEFT,
                    verticalOffset        : 0,
                    horizontalOffset    : -75,
                    hoverClass            : 'dp-hover'
                }
                , s
            );

            return this.each(
                function()
                {
                    var $this = $(this);
                    if (!this._dpId) {
                        this._dpId = $.event.guid++;
                        $.event._dpCache[this._dpId] = new DatePicker(this);
                    }

                    var controller = $.event._dpCache[this._dpId];
                    var _s = $.extend(s, {
                        startDate: $this.attr('samo:startDate'),
                        validDates: $this.attr('samo:validDates'),
                        endDate:    $this.attr('samo:endDate')
                    });

                    controller.init(_s);

                    if (s.innerButton) {
                        $(this).mousemove(function(e){
                            var x = e.pageX || e.x;
                            var y = e.pageY || e.y;
                            var el = e.target || e.srcElement;
                            var direction =
                                (x > coord(el,'offsetLeft') + el.offsetWidth - 16)
                                ? ((y < coord(el,'offsetTop') + 14) ? 1 : -1) : 0;

                            if (direction !== this._direction) {
                                switch(direction){
                                    case 1: // Up arrow:
                                        $this.addClass('date-active-btn');
                                        break;
                                    default: // Mouse is elsewhere in the textbox
                                        $this.removeClass('date-active-btn');
                                }
                                this._direction = direction;
                            }
                        })
                        .mouseout(function(){
                            $this.removeClass('date-active-btn');
                            this._direction = null;
                        })
                        .click(function(e){
                            if (this._direction != 0) {
                                $this.dpDisplay();
                            }
                        });
                    }
                    if ($this.is(':text')) {
                        $this
                            .bind(
                                'dateSelected',
                                function(e, selectedDate, $td)
                                {
                                    this.value = selectedDate.asString();
                                }
                            ).bind(
                                'change',
                                function()
                                {
                                    var d = Date.fromString(this.value);
                                    if (d) {
                                        controller.setSelected(d, true, true);
                                    }
                                }
                            );
                        if (s.clickInput) {
                            $this.bind(
                                'click',
                                function()
                                {
                                    $this.dpDisplay();
                                }
                            );
                        }
                    }

                    $this.addClass('dp-applied');
                    if ($this.val().length) {
                        $this.dpSetSelected($(this).val());
                    }
                }
            )
        },
/**
 * Disables or enables this date picker
 *
 * @param Boolean s Whether to disable (true) or enable (false) this datePicker
 * @type jQuery
 * @name dpSetDisabled
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetDisabled(true);
 * @desc Prevents this date picker from displaying and adds a class of dp-disabled to it (and it's associated button if it has one) for styling purposes. If the matched element is an input field then it will also set the disabled attribute to stop people directly editing the field.
 **/
        dpSetDisabled : function(s)
        {
            return _w.call(this, 'setDisabled', s);
        },
        dpSetValidDates : function(d)
        {
            return _w.call(this, 'setValidDates', d);
        },
/**
 * Updates the first selectable date for any date pickers on any matched elements.
 *
 * @param String d A string representing the first selectable date (formatted according to Date.format).
 * @type jQuery
 * @name dpSetStartDate
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetStartDate('01/01/2000');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the first selectable date for each of these to the first day of the millenium.
 **/
        dpSetStartDate : function(d)
        {
            return _w.call(this, 'setStartDate', d);
        },        
/**
 * Updates the last selectable date for any date pickers on any matched elements.
 *
 * @param String d A string representing the last selectable date (formatted according to Date.format).
 * @type jQuery
 * @name dpSetEndDate
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetEndDate('01/01/2010');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the last selectable date for each of these to the first Janurary 2010.
 **/
        dpSetEndDate : function(d)
        {
            return _w.call(this, 'setEndDate', d);
        },
/**
 * Gets a list of Dates currently selected by this datePicker. This will be an empty array if no dates are currently selected or NULL if there is no datePicker associated with the matched element.
 *
 * @type Array
 * @name dpGetSelected
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * alert($('.date-picker').dpGetSelected());
 * @desc Will alert an empty array (as nothing is selected yet)
 **/
        dpGetSelected : function()
        {
            var c = _getController(this[0]);
            if (c) {
                return c.getSelected();
            }
            return null;
        },
/**
 * Selects or deselects a date on any matched element's date pickers. Deselcting is only useful on date pickers where selectMultiple==true. Selecting will only work if the passed date is within the startDate and endDate boundries for a given date picker.
 *
 * @param String d A string representing the date you want to select (formatted according to Date.format).
 * @param Boolean v Whether you want to select (true) or deselect (false) this date. Optional - default = true.
 * @param Boolean m Whether you want the date picker to open up on the month of this date when it is next opened. Optional - default = true.
 * @type jQuery
 * @name dpSetSelected
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetSelected('01/01/2010');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the selected date on these date pickers to the first Janurary 2010. When the date picker is next opened it will display Janurary 2010.
 **/
        dpSetSelected : function(d, v, m)
        {
            if (v == undefined) v=true;
            if (m == undefined) m=true;
            return _w.call(this, 'setSelected', Date.fromString(d), v, m);
        },
/**
 * Displays the date picker associated with the matched elements. Since only one date picker can be displayed at once then the date picker associated with the last matched element will be the one that is displayed.
 *
 * @param HTMLElement e An element that you want the date picker to pop up relative in position to. Optional - default behaviour is to pop up next to the element associated with this date picker.
 * @type jQuery
 * @name dpDisplay
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpDisplay();
 * @desc Creates a date picker associated with the element with an id of date-picker and then causes it to pop up.
 **/
        dpDisplay : function(e)
        {
            return _w.call(this, 'display', e);
        },
        // private function called on unload to clean up any expandos etc and prevent memory links...
        _dpDestroy : function()
        {
            // TODO - implement this?
        }
    });

    // private internal function to cut down on the amount of code needed where we forward
    // dp* methods on the jQuery object on to the relevant DatePicker controllers...
    var _w = function(f, a1, a2, a3)
    {
        return this.each(
            function()
            {
                var c = _getController(this);
                if (c) {
                    c[f](a1, a2, a3);
                }
            }
        );
    };

    function DatePicker(ele)
    {
        this.ele = ele;

        // initial values...
        this.displayedMonth        =    null;
        this.displayedYear        =    null;
        this.startDate            =    null;
        this.endDate            =    null;
        this.showYearNavigation    =    null;
        this.closeOnSelect        =    null;
        this.displayClose        =    null;
        this.selectMultiple        =    null;
        this.verticalPosition    =    null;
        this.horizontalPosition    =    null;
        this.verticalOffset        =    null;
        this.horizontalOffset    =    null;
        this.button                =    null;
        this.selectedDates        =    {};
        this.validDates            =    '';
    };
    $.extend(
        DatePicker.prototype,
        {
            init : function(s)
            {
                this.setStartDate(s.startDate);
                this.setValidDates(s.validDates);
                this.setEndDate(s.endDate);
                this.setDisplayedMonth(Number(s.month), Number(s.year));
                this.showYearNavigation = s.showYearNavigation;
                this.closeOnSelect = s.closeOnSelect;
                this.displayClose = s.displayClose;
                this.selectMultiple = s.selectMultiple;
                this.verticalPosition = s.verticalPosition;
                this.horizontalPosition = s.horizontalPosition;
                this.hoverClass = s.hoverClass;
                this.setOffset(s.verticalOffset, s.horizontalOffset);
            },         
            setStartDate : function(d)
            {
                if (d) {
                    this.startDate = Date.fromString(d).zeroTime();
                }
                if (!this.startDate) {
                    this.startDate = (new Date()).zeroTime();
                }
                this.setDisplayedMonth(this.displayedMonth, this.displayedYear);
            },
            setEndDate : function(d)
            {
                if (d) {
                    this.endDate = Date.fromString(d).zeroTime();
                }
                if (!this.endDate) {
                    this.endDate = (new Date('12/31/2089')).zeroTime(); // using the JS Date.parse function which expects mm/dd/yyyy
                }
                if (this.endDate.getTime() < this.startDate.getTime()) {
                    this.endDate.setTime(this.startDate.getTime());
                }
                this.setDisplayedMonth(this.displayedMonth, this.displayedYear);
            },
            setValidDates    :    function(d) {
                if (d) {
                    this.validDates = d;
                    this.endDate = new Date();
                    this.endDate.setTime(this.startDate.getTime());
                    this.endDate.addDays(d.length);
                }
            },
            setPosition : function(v, h)
            {
                this.verticalPosition = v;
                this.horizontalPosition = h;
            },
            setOffset : function(v, h)
            {
                this.verticalOffset = parseInt(v) || 0;
                this.horizontalOffset = parseInt(h) || 0;
            },
            setDisplayedMonth : function(m, y)
            {
                if (this.startDate == undefined || this.endDate == undefined) {
                    return;
                }
                var s = new Date(this.startDate.getTime());
                s.setDate(1);
                var e = new Date(this.endDate.getTime());
                e.setDate(1);

                var t;

                if (isNaN(m) && isNaN(y)) {
                    // no month or year passed - default to current month
                    t = new Date().zeroTime();
                    t.setDate(1);
                } else if (isNaN(m)) {
                    // just year passed in - presume we want the displayedMonth
                    t = new Date(y, this.displayedMonth, 1);
                } else if (isNaN(y)) {
                    // just month passed in - presume we want the displayedYear
                    t = new Date(this.displayedYear, m, 1);
                } else {
                    // year and month passed in - that's the date we want!
                    t = new Date(y, m, 1)
                }

                // check if the desired date is within the range of our defined startDate and endDate
                if (t.getTime() < s.getTime()) {
                    t = s;
                } else if (t.getTime() > e.getTime()) {
                    t = e;
                }
                this.displayedMonth = t.getMonth();
                this.displayedYear = t.getFullYear();
            },
            setSelected : function(d, v, moveToMonth)
            {
                if (this.selectMultiple == false) {
                    this.selectedDates = {};
                }
                if (moveToMonth) {
                    this.setDisplayedMonth(d.getMonth(), d.getFullYear());
                }
                this.selectedDates[d.getTime()] = v;
            },
            isSelected : function(t)
            {
                return this.selectedDates[t];
            },
            getSelected : function()
            {
                var r = [];
                for(t in this.selectedDates) {
                    if (this.selectedDates[t] == true) {
                        r.push(new Date(Number(t)));
                    }
                }
                return r;
            },
            display : function(eleAlignTo)
            {
                if ($(this.ele).is('.dp-disabled')) return;

                eleAlignTo = eleAlignTo || this.ele;
                var c = this;
                var $ele = $(eleAlignTo);
                var eleOffset = $ele.offset();


                var _checkMouse = function(e)
                {
                    var el = e.target;
                    var cal = $('#dp-popup')[0];
                    while (true){
                        if (el == cal) {
                            return true;
                        } else if (el == document) {
                            c._closeCalendar();
                            return false;
                        } else {
                            el = $(el).parent()[0];
                        }
                    }
                };
                this._checkMouse = _checkMouse;

                this._closeCalendar(true);
                $('body')
                    .append(
                        $('<div></div>')
                            .attr('id', 'dp-popup')
                            .css(
                                {
                                    'top'    :    eleOffset.top + c.verticalOffset,
                                    'left'    :    eleOffset.left + c.horizontalOffset
                                }
                            )
                            .append(
                                $('<h2></h2>'),
                                $('<div id="dp-nav-prev"></div>')
                                    .append(
                                        $('<a id="dp-nav-prev-month" href="#" title="' + $.dpText.TEXT_PREV_MONTH + '">&#x2190;</a>')
                                            .bind(
                                                'click',
                                                function()
                                                {
                                                    return c._displayNewMonth.call(c, this, -1, 0);
                                                }
                                            )
                                    ),
                                $('<div id="dp-nav-next"></div>')
                                    .append(
                                        $('<a id="dp-nav-next-month" href="#" title="' + $.dpText.TEXT_NEXT_MONTH + '">&#x2192;</a>')
                                            .bind(
                                                'click',
                                                function()
                                                {
                                                    return c._displayNewMonth.call(c, this, 1, 0);
                                                }
                                            )
                                    ),
                                $('<div></div>')
                                    .attr('id', 'dp-calendar')
                            )
                            .bgIframe()
                        );
                c._renderCalendar();
                $(document).bind('mousedown', this._checkMouse);
            },
            isValidDate: function (thisDate) {
                if (this.endDate && thisDate.getTime()  > this.endDate.getTime()) return false; 
                if (!this.validDates) return true;
                var dateDiff = Math.round((thisDate.getTime() - this.startDate.getTime()) / 86400000 );
                return (dateDiff >= 0 && parseInt(this.validDates.substr(dateDiff,1)) == 1) ? true : false;
            },
            // ele is the clicked button - only proceed if it doesn't have the class disabled...
            // m and y are -1, 0 or 1 depending which direction we want to go in...
            _displayNewMonth : function(ele, m, y)
            {
                if (!$(ele).is('.disabled')) {
                    this.setDisplayedMonth(this.displayedMonth + m, this.displayedYear + y);
                    this._clearCalendar();
                    this._renderCalendar();
                    $(this.ele).trigger('dpMonthChanged', [this.displayedMonth, this.displayedYear]);
                }
                ele.blur();
                return false;
            },
            _renderCalendar : function()
            {
                // set the title...
                $('#dp-popup h2').html(Date.monthNames[this.displayedMonth] + ' ' + this.displayedYear);
                // render the calendar...
                $('#dp-calendar').renderCalendar(
                    {
                        month            : this.displayedMonth,
                        year            : this.displayedYear,
                        dpController    : this,
                        hoverClass        : this.hoverClass
                    }
                );

                // update the status of the control buttons and disable dates before startDate or after endDate...
                // TODO: When should the year buttons be disabled? When you can't go forward a whole year from where you are or is that annoying?
                if (this.displayedYear == this.startDate.getFullYear() && this.displayedMonth == this.startDate.getMonth()) {
                    $('#dp-nav-prev-year').addClass('disabled');
                    $('#dp-nav-prev-month').addClass('disabled');
                    $('#dp-calendar td.other-month').each(
                        function()
                        {
                            var $this = $(this);
                            if (Number($this.text()) > 20) {
                                $this.addClass('disabled');
                            }
                        }
                    );
                    var d = this.startDate.getDate();
                    $('#dp-calendar td.current-month').each(
                        function()
                        {
                            var $this = $(this);
                            if (Number($this.text()) < d) {
                                $this.addClass('disabled');
                            }
                        }
                    );
                } else {
                    $('#dp-nav-prev-year').removeClass('disabled');
                    $('#dp-nav-prev-month').removeClass('disabled');
                    var d = this.startDate.getDate();
                    if (d > 20) {
                        // check if the startDate is last month as we might need to add some disabled classes...
                        var sd = new Date(this.startDate.getTime());
                        sd.addMonths(1);
                        if (this.displayedYear == sd.getFullYear() && this.displayedMonth == sd.getMonth()) {
                            $('#dp-calendar td.other-month').each(
                                function()
                                {
                                    var $this = $(this);
                                    if (Number($this.text()) < d) {
                                        $this.addClass('disabled');
                                    }
                                }
                            );
                        }
                    }
                }
                if (this.displayedYear == this.endDate.getFullYear() && this.displayedMonth == this.endDate.getMonth()) {
                    $('#dp-nav-next-year').addClass('disabled');
                    $('#dp-nav-next-month').addClass('disabled');
                    $('#dp-calendar td.other-month').each(
                        function()
                        {
                            var $this = $(this);
                            if (Number($this.text()) < 14) {
                                $this.addClass('disabled');
                            }
                        }
                    );
                    var d = this.endDate.getDate();
                    $('#dp-calendar td.current-month').each(
                        function()
                        {
                            var $this = $(this);
                            if (Number($this.text()) > d) {
                                $this.addClass('disabled');
                            }
                        }
                    );
                } else {
                    $('#dp-nav-next-year').removeClass('disabled');
                    $('#dp-nav-next-month').removeClass('disabled');
                    var d = this.endDate.getDate();
                    if (d < 13) {
                        // check if the endDate is next month as we might need to add some disabled classes...
                        var ed = new Date(this.endDate.getTime());
                        ed.addMonths(-1);
                        if (this.displayedYear == ed.getFullYear() && this.displayedMonth == ed.getMonth()) {
                            $('#dp-calendar td.other-month').each(
                                function()
                                {
                                    var $this = $(this);
                                    if (Number($this.text()) > d) {
                                        $this.addClass('disabled');
                                    }
                                }
                            );
                        }
                    }
                }
            },
            _closeCalendar : function(programatic)
            {
                $(document).unbind('mousedown', this._checkMouse);
                this._clearCalendar();
                $('#dp-popup a').unbind();
                $('#dp-popup').empty().remove();
                if (!programatic) {
                    $(this.ele).trigger('dpClosed', [this.getSelected()]);
                }
            },
            // empties the current dp-calendar div and makes sure that all events are unbound
            // and expandos removed to avoid memory leaks...
            _clearCalendar : function()
            {
                // TODO.
                //$('#dp-calendar td').unbind();
                $('#dp-calendar').empty();
            }
        }
    );

    // static constants
    $.dpConst = {
        SHOW_HEADER_NONE    :    0,
        SHOW_HEADER_SHORT    :    1,
        SHOW_HEADER_LONG    :    2,
        POS_TOP                :    0,
        POS_BOTTOM            :    1,
        POS_LEFT            :    0,
        POS_RIGHT            :    1
    };
    // localisable text
    $.dpText = {
        TEXT_PREV_YEAR        :    'Previous year',
        TEXT_PREV_MONTH        :    'Previous month',
        TEXT_NEXT_YEAR        :    'Next year',
        TEXT_NEXT_MONTH        :    'Next month',
        TEXT_CLOSE            :    'Close',
        TEXT_CHOOSE_DATE    :    'Choose date'
    };
    // version
    $.dpVersion = '$Id: jquery.datepicker.js 2181 2008-12-17 15:31:03Z MiRacLe $';

    function _getController(ele)
    {
        if (ele._dpId) return $.event._dpCache[ele._dpId];
        return false;
    };

    // make it so that no error is thrown if bgIframe plugin isn't included (allows you to use conditional
    // comments to only include bgIframe where it is needed in IE without breaking this plugin).
    if ($.fn.bgIframe == undefined) {
        $.fn.bgIframe = function() {return this; };
    };


    // clean-up
    $(window)
        .bind('unload', function() {
            var els = $.event._dpCache || [];
            for (var i in els) {
                $(els[i].ele)._dpDestroy();
            }
        });
    function coord(el,prop) {
        var c = el[prop], b = document.body;

        while ((el = el.offsetParent) && (el != b)) {
            if (!$.browser.msie || (el.currentStyle.position != 'relative'))
                c += el[prop];
        }

        return c;
    }

})(jQuery);
/*
 * Copyright (c) 2007 Josh Bush (digitalbush.com)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Version: 1.0
 * Release: 2007-07-25
 */
(function($) {
    //Helper Functions for Caret positioning
    function getCaretPosition(ctl){
        var res = {begin: 0, end: 0 };
        if (ctl.setSelectionRange){
            res.begin = ctl.selectionStart;
            res.end = ctl.selectionEnd;
        }else if (document.selection && document.selection.createRange){
            var range = document.selection.createRange();
            res.begin = 0 - range.duplicate().moveStart('character', -100000);
            res.end = res.begin + range.text.length;
        }
        return res;
    };

    function setCaretPosition(ctl, pos){
        if(ctl.setSelectionRange){
            ctl.focus();
            ctl.setSelectionRange(pos,pos);
        }else if (ctl.createTextRange){
            var range = ctl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    //Predefined character definitions
    var charMap={
        '3':"[0|1|2|3]",
        '1':"[0|1]",
        '2':"[1|2]",
        '0':"[0|9]",
        '9':"[0-9]",
        'a':"[A-Za-z]",
        '*':"[A-Za-z0-9]"
    };

    //Helper method to inject character definitions
    $.mask={
        addPlaceholder : function(c,r){
            charMap[c]=r;
        }
    };

    //Main Method
    $.fn.mask = function(mask,settings) {
        settings = $.extend({
            placeholder: "_",
            completed: null
        }, settings);

        //Build Regex for format validation
        var reString="^";
        for(var i=0;i<mask.length;i++)
            reString+=(charMap[mask.charAt(i)] || ("\\"+mask.charAt(i)));
        reString+="$";
        var re = new RegExp(reString);

        return this.each(function(){
            var input=$(this);
            var buffer=new Array(mask.length);
            var locked=new Array(mask.length);

            //Build buffer layout from mask
            for(var i=0;i<mask.length;i++){
                locked[i]=charMap[mask.charAt(i)]==null;
                buffer[i]=locked[i]?mask.charAt(i):settings.placeholder;
            }

            /*Event Bindings*/
            input.focus(function(){
                checkVal();
                writeBuffer();
                setCaretPosition(this,0);
            });

            input.click(function () {
                if (!this.value || !this.value.match(/[0-9]+/)) {
                    checkVal();
                    writeBuffer();
                    setCaretPosition(this, 0);
                }
            });

            input.blur(checkVal);

            //Paste events for IE and Mozilla thanks to Kristinn Sigmundsson
            if ($.browser.msie)
                this.onpaste= function(){setTimeout(checkVal,0);};
            else if ($.browser.mozilla)
                this.addEventListener('input',checkVal,false);

            var ignore=false;  //Variable for ignoring control keys

            input.keydown(function(e){
                var pos=getCaretPosition(this);
                var k = e.keyCode;
                ignore=(k < 16 || (k > 16 && k < 32 ) || (k > 32 && k < 41));

                //delete selection before proceeding
                if((pos.begin-pos.end)!=0 && (!ignore || k==8 || k==46)){
                    clearBuffer(pos.begin,pos.end);
                }
                //backspace and delete get special treatment
                if(k==8){//backspace
                    while(pos.begin-->=0){
                        if(!locked[pos.begin]){
                            buffer[pos.begin]=settings.placeholder;
                            if($.browser.opera){
                                //Opera won't let you cancel the backspace, so we'll let it backspace over a dummy character.
                                writeBuffer(pos.begin);
                                setCaretPosition(this,pos.begin+1);
                            }else{
                                writeBuffer();
                                setCaretPosition(this,pos.begin);
                            }
                            return false;
                        }
                    }
                }else if(k==46){//delete
                    clearBuffer(pos.begin,pos.begin+1);
                    writeBuffer();
                    setCaretPosition(this,pos.begin);
                    return false;
                }else if (k==27){
                    clearBuffer(0,mask.length);
                    writeBuffer();
                    setCaretPosition(this,0);
                    return false;
                }

            });

            input.keypress(function(e){
                if(ignore){
                    ignore=false;
                    return;
                }
                e=e||window.event;
                var k=e.charCode||e.keyCode||e.which;

                var pos=getCaretPosition(this);
                var caretPos=pos.begin;

                if(e.ctrlKey || e.altKey){//Ignore
                    return true;
                }else if ((k>=41 && k<=122) ||k==32 || k>186){//typeable characters
                    while(pos.begin<mask.length){
                        var reString=charMap[mask.charAt(pos.begin)];
                        var match;
                        if(reString){
                            var reChar=new RegExp(reString);
                            match=String.fromCharCode(k).match(reChar);
                        }else{//we're on a mask char, go forward and try again
                            pos.begin+=1;
                            pos.end=pos.begin;
                            caretPos+=1;
                            continue;
                        }

                        if(match)
                            buffer[pos.begin]=String.fromCharCode(k);
                        else
                            return false;//reject char

                        while(++caretPos<mask.length){//seek forward to next typable position
                            if(!locked[caretPos])
                                break;
                        }
                        break;
                    }
                }else
                    return false;

                writeBuffer();
                if(settings.completed && caretPos>=buffer.length)
                    settings.completed.call(input);
                else
                    setCaretPosition(this,caretPos);

                return false;
            });

            /*Helper Methods*/
            function clearBuffer(start,end){
                for(var i=start;i<end;i++){
                    if(!locked[i])
                        buffer[i]=settings.placeholder;
                }
            };

            function writeBuffer(pos){
                var s="";
                for(var i=0;i<mask.length;i++){
                    s+=buffer[i];
                    if(i==pos)
                        s+=settings.placeholder;
                }
                input.val(s);
                return s;
            };

            function checkVal(){
                //try to place charcters where they belong
                var test=input.val();
                var pos=0;
                for(var i=0;i<mask.length;i++){
                    if(!locked[i]){
                        while(pos++<test.length){
                            //Regex Test each char here.
                            var reChar=new RegExp(charMap[mask.charAt(i)]);
                            if(test.charAt(pos-1).match(reChar)){
                                buffer[i]=test.charAt(pos-1);
                                break;
                            }
                        }
                    }
                }
                var s=writeBuffer();
                if(!s.match(re)){
                    input.val("");
                    clearBuffer(0,mask.length);
                }
            };
        });
    };
})(jQuery);