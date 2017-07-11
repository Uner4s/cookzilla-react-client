import React from 'react'
import Navbar from 'orionsoft-parts/lib/components/Navbar'
export default class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div>
        <Navbar logo='logo.jpg' />
        {this.props.children}
      </div>
    )
  }
}
