import React from 'react'

class Test extends React.Component {
constructor() {
    super()
}
render() {
    const func = () => {
        return (<form onSubmit='{this.handleSearch}' className="col s12">
        <input aria-invalid="false" id='searchCustomerName' onChange='{this.handleSearchChange}'  class="MuiInputBase-input-28 MuiInput-input-13" placeholder="Search" type="text" value="" />
        <button aria-label="" tabindex="0"> <span>Search</span> </button>
    </form>)
    };
    return <div>{func()}</div>
}
}
export default Test