import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Background from '../../Image/background.png'

class Layout extends Component{

  
render(){
  const mainStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${Background})`,
  };
return(
<Aux>
<main style={mainStyle}>
{this.props.children}
</main>
</Aux>
)
}
}

export default Layout;