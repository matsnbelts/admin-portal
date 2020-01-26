import React from 'react'
import './JobAssociateFilter.css'

class FilterCleanerOptions extends React.Component {
    changeOption = (e) => {
        var val = e.target.value;
        this.props.changeOption(val);
    }
    createOptions = (options) => {
        let opts = []
        options.forEach((key,value, set) => {
            if(typeof key == 'string')
                opts.push(<option key={value} value={value}>{key}</option>);
        }
        );
        return opts
    }
    render() {
        return (
            <div>
                <div className='associateFilterOptionsContainer'>
                    <label className='associateLabel'>Cleaner:</label>
                    <select className='associate-filter' id="cleanerFilter" value={this.props.cleaner} onChange={this.changeOption.bind(this)}>
                        {
                            this.createOptions(this.props.cleanerOptions)
                        }
                    </select>
                    </div>
            </div>
                )
    }
}
export default FilterCleanerOptions