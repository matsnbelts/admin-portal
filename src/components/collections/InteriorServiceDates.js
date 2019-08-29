import React from 'react'
import { connect } from 'react-redux'
import { Container, Button, Row} from 'react-materialize';
import Calendar from '../Calendar'
import moment from 'moment'
import { getInteriorServiceAvailabilityAction, updateInteriorServiceAvailabilityAction } from '../../store/actions/InteriorServiceDateActions'
import { blockStatement } from '@babel/types';

class InteriorServiceDates extends React.Component {
    constructor(props) {
        super(props)
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                            'September', 'October', 'November', 'December']
        console.log(new Date().toDateString())
        this.state = {
            apartment: 'Vaikund Sundaram',
            currentMonth: this.months.indexOf(moment().format("MMMM")) + 1,
            currentYear: moment().format("Y"),
            dates: new Set([]),
            showCalendar: false,
            error: false,
            loaded: false,
            loading: false
        }
    }

    componentDidMount() {
        console.log('--------')
        // this.setState({
        //     loaded: true,
        // });
    }

    componentDidUpdate(prevProps) {
        if (this.props.getInteriorServiceAvailabilityData !== prevProps.getInteriorServiceAvailabilityData) {
            console.log('Component Did Update')
            const getInteriorServiceAvailabilityDates = this.props.getInteriorServiceAvailabilityData.action.dates
            let datesState = new Set()
            getInteriorServiceAvailabilityDates.map((dat) => {
                datesState.add(dat)
            })
            console.log(getInteriorServiceAvailabilityDates);
            this.setState({
                ...this.state,
                dates: datesState,
                showCalendar: true,
                loading: false
            });
        }
    }

    fetchDates = () => {
        this.props.getInteriorServiceAvailability(this.state.apartment);
    }

    setDates = () => {
        console.log(this.state.currentDate);
        this.props.updateInteriorServiceAvailability(this.state.apartment, this.state.dates);
        this.props.getInteriorServiceAvailability(this.state.apartment);
        this.setState({
            ...this.state,
            showCalendar: false,
            loading: true
        });
        //this.props.history.push('/assign_jobs');
        //window.location.reload(); 
    }
      onYearChange = (e, year) => {
          this.setState({
            currentYear: year,
          })
      }

      onMonthChange = (currentMonth) => {
        const month = this.months.indexOf(currentMonth) + 1
        this.setState({
            currentMonth: month,
          })
          //this.props.getInteriorServiceAvailability(this.state.area, this.state.currentYear, this.state.currentMonth);
      }

      onDayClick = (e, day, currentMonth, dates) => {
        this.setState({
            dates: dates,
        }, () => {
            console.log(dates)
        })
      }

      handleApartmentChange = (index, e) => {
        e.preventDefault();
        this.setState({ 
            ...this.state,
            apartment: e.target.value
        }, function() {
            console.log(this.state.apartment)
        });
      }

    render() {
        const select_style = {
            'display': 'inline-block',
            'color': 'white',
            'backgroundColor': '#000000',
            'width': '20%'
        }

        const showCalendar = this.state.showCalendar && (
            <div className='calendar-section'>
                <Calendar dates={this.state.dates} onMonthChange={(currentMonth) => this.onMonthChange(currentMonth)} onPrevMonth={(currentMonth) => this.onMonthChange(currentMonth)} onNextMonth={(currentMonth) => this.onMonthChange(currentMonth)} onYearChange={(e, year) => this.onYearChange(e, year)} onDayClick={(e, day, currentMonth, dates, currentYear)=> this.onDayClick(e, day, currentMonth, dates, currentYear)}></Calendar>
                <div></div>
                <Button className="col s2 #000000 black updateButtonAlign" onClick={this.setDates}>Update Dates</Button>
            </div>
        );

        const showLoading = this.state.showLoading && (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        )
        // const updateError = (
        //     (this.state.error) ?
        //          <div>Error in update</div> 
        //     : <div></div>
        // )
        // const updateSubmit = (
        //     (this.state.submitted) ?
        //     <div>Updated successfully</div> 
        //     : <div></div>         
        // )
        return (
            <Container>
                <div>
                <div className='fetch-dates'>
                <Row>
                    <div>
                        <label className="apartmentLabel">Apartment</label>
                        <select style={select_style} required aria-required="true" id={"apartment"} onChange={(e) => this.handleApartmentChange(e)}>
                            <option value="" disabled >Choose your option</option>
                            <option value="Vaikund Sundaram">Vaikund Sundaram</option>
                        </select>
                    </div>
                    </Row>
                    <Button className="col s2 #000000 black fetch-dates-btn" onClick={this.fetchDates}>Fetch Dates</Button>
                    </div>
                    <div className="section">   </div>
                    <div className="divider"></div>
                    <div className="section">
                        {showLoading}
                        {showCalendar}
                        {/* {!this.state.loaded ? showCalendar : showLoading} */}
                    </div>
                    </div>  
                    {/* { updateSubmit }
                    { updateError }   */}
            </Container>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getInteriorServiceAvailability: (apartment) => { dispatch(getInteriorServiceAvailabilityAction(apartment)) },
        updateInteriorServiceAvailability: (apartment, dates) => { dispatch(updateInteriorServiceAvailabilityAction(apartment, dates)) }
    }
}
const mapStateToProps = (state) => {
    return {
        getInteriorServiceAvailabilityData: state.interiorService
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteriorServiceDates)