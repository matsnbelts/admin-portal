import React from 'react'
import './JobAssociateFilter.css'

class JobCleaningFilterOptions extends React.Component {
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
        console.log(opts)
        return opts
    }
    render() {
        return (
            <div>
                <div className='associateFilterOptionsContainer'>
                    <label className='associateLabel'>ServiceType:</label>
                    <select className='associate-filter' id="serviceType" value={this.props.service} onChange={this.changeOption.bind(this)}>
                        {
                            this.createOptions(this.props.serviceOptions)
                        }
                    </select>
                    </div>
            </div>
                )
    }
}
export default JobCleaningFilterOptions