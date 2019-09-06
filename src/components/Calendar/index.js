import React from 'react';
import moment from 'moment';
import './calendar.css';

export default class Calendar extends React.Component {
    state = {
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        selectedDay: null,
        dates: new Set([]),
    }

    constructor(props) {
        super(props);
        this.width = props.width || "350px";
        this.style = props.style || {};
        this.style.width = this.width; // add this
    }
    componentDidMount() {
        console.log('component did mount')
        this.setState({
            dates: this.props.dates
        })
    }
     componentDidUpdate(prevProps) {
        if (this.props.dates !== prevProps.dates) {
            console.log('component did update')
            console.log(this.props.dates)
            this.setState({
                dates: this.props.dates
            })
        } 
     }

    weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
    weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("year") + " : "
         + (this.state.dateContext.get("month") + 1));
        return this.state.dateContext.get("date");
    }

    currentMonth = () => {
        return this.state.dateContext.get("month") + 1;
    }

    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
        return firstDay;
    }

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext,
        });
        this.props.onNextMonth && this.props.onMonthChange(dateContext.format("MMMM"));
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext,
        });
        this.props.onPrevMonth && this.props.onMonthChange(dateContext.format("MMMM"));
    }

    onSelectChange = (e, data) => {
        this.setMonth(data);
        console.log(data);
        this.props.onMonthChange && this.props.onMonthChange(data);

    }
    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <a href="#" onClick={(e)=> {this.onSelectChange(e, data)}}>
                        {data}
                    </a>
                </div>
            );
        });

        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
                {this.month()}
                {this.state.showMonthPopup &&
                 <this.SelectList data={this.months} />
                }
            </span>
        );
    }

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }
    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }

    YearNav = () => {
        return (
            this.state.showYearNav ?
            <input
                defaultValue = {this.year()}
                className="editor-year"
                ref={(yearInput) => { this.yearInput = yearInput}}
                onKeyUp= {(e) => this.onKeyUpYear(e)}
                onChange = {(e) => this.onYearChange(e)}
                type="number"
                placeholder="year"/>
            :
            <span
                className="label-year"
                onDoubleClick={(e)=> { this.showYearEditor()}}>
                {this.year()}
            </span>
        );
    }

    onDayClick = (e, day, currentMonth, currentYear) => {
        let dates = this.state.dates
        // let iterator = dates.keys()
        // let itr = iterator().next()
        // let found = false
        // while(!itr.done) {
        //     let d = itr.value
        //     if(d.getDate() == day && d.) {
        //         found = true
        //         break
        //     }
        //     itr = iterator().next()
        // }
        // if(found) {
        //     dates.delete(new Date(day + ' ' + currentMonth + ' ' + currentYear).toDateString())
        // } else {
        //     dates.add(day)
        //     console.log('added' + day + ' ; '+ dates.size)
        // }
        let d = new Date(day + ' ' + currentMonth + ' ' + currentYear).toDateString()
        if(!dates.has(d)) {
            dates.add(d)
        } else {
            dates.delete(d)
        }
        // dates.forEach(key => {
        //     console.log(key)
        // })
        this.props.onDayClick && this.props.onDayClick(e, day, currentMonth, dates, currentYear);
        this.setState({
            dates: dates,
            selectedDay: day
        }, () => {
            console.log("SELECTED DAY: ", this.state.selectedDay + ":" + currentMonth + ";" + dates.size);
            
        });

    }

    render() {
        // Map the weekdays i.e Sun, Mon, Tue etc as <td>
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });

        let blanks = [];
        console.log(this.firstDayOfMonth());
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
                </td>
            );
        }
        //console.log("blanks: ", blanks);

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = ((d === this.currentDate() && (moment().get('month') + 1) === this.currentMonth()) ? "day current-day": "day");
            //let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
            let currentSelectedDate = new Date(d + ' ' + this.month() + ' ' + this.year()).toDateString()
            let selectedClass = (this.state.dates.has(currentSelectedDate) ? " selected-day " : "")
            daysInMonth.push(
                <td key={d} className={className + selectedClass}  onClick={(e)=>{this.onDayClick(e, d, this.month(), this.year())}}>
                    <span className='circle'>{d}</span>
                </td>
            );
        }
        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            //console.log(row + " --- " + i + 1)
            if (((i+1) % 7) !== 0) {
                cells.push(row);
            } else {
                cells.push(row);
                let insertRow = cells.slice();
                //console.log(cells.length + " ;; " + insertRow)
                rows.push(insertRow);
                cells = [];
            }
            if (i === totalSlots.length - 1 && cells.length !== 0) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
            return (
                <tr key={i*100}>
                    {d}
                </tr>
            );
        })

        return (
            <div className="calendar-container" style={this.style}>
                <table className="calendar">
                    <thead>
                        <tr className="calendar-header">
                            <td colSpan="5">
                                <this.MonthNav />
                                {" "}
                                <this.YearNav />
                            </td>
                            <td colSpan="2">
                                <i className="month-nav"
                                    onClick={(e)=> {this.prevMonth()}}>&lt;
                                </i>
                                <i className="month-nav"
                                    onClick={(e)=> {this.nextMonth()}}>&gt;
                                </i>

                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {weekdays}
                        </tr>
                        {trElems}
                    </tbody>
                </table>
            </div>

        );
    }
}
