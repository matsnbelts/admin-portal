import React from 'react'
import './JobAssociateFilter.css'

class FilterPaidOptions extends React.Component {
    changeOption = (e) => {
        var val = e.target.value;
        this.props.changeOption(val);
    }
    createOptions = (options) => {
        let opts = []
        options.forEach((key,value, set) => {
            if(typeof key == 'string')
                opts.push(<option key={key} value={key}>{key}</option>);
        }
        );
        return opts
    }
    render() {
        return (
            <div>
                <div className='associateFilterOptionsContainer'>
                    <label className='associateLabel'>Paid:</label>
                    <select className='associate-filter' id="paidFilter" value={this.props.paid} onChange={this.changeOption.bind(this)}>
                        {
                            this.createOptions(this.props.paidOptions)
                        }
                    </select>
                    </div>
            </div>
                )
    }
}
export default FilterPaidOptions