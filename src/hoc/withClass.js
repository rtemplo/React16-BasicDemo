import React, { Component }from 'react';

//Returns a basic function component
// const withClass = (WrappedComponent, className) => {
//   return (props) => (
//     <div className={className}>
//       <WrappedComponent {...props} />
//     </div>
//   ) 
// };

//Returns a class based component. This is helpful if state or lifecycle hooks are required.
// Note: the class is not named it is anonymous in this case.
const withClass = (WrappedComponent, className) => {
  const WithClass = class extends Component {
    render () {
      return (
        <div className={className}>
          <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
        </div>
      )
    }
  }

  return React.forwardRef((props, ref) => {
    return <WithClass {...props} forwardedRef={ref} />
  })
};

export default withClass;