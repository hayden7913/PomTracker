
import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import * as actions from '../actions/indexActions';
import store from '../store';
import Module from './Module';
import { squareData } from '../data';

class MoudleContainer extends Component{
  
  checkBoundaries() {
    console.log('hello')
  }

  render() {
    const modules = this.props.modules.map((modules, index) =>{
      return <Module 
          key={index}
          index={index}
          x={modules.x} 
          y={modules.y}
          height={modules.height}
          width={modules.width}
          image={modules.image}
          onDragMove={this.checkBoundaries.bind(this)}
        />
    });
    
    return (
      <Group>
        {modules}
      </Group>
    )
  }
  
}

const mapStateToProps = (state) => ({
   modules: state.currentProjectModules
});

export default connect(mapStateToProps)(MoudleContainer);
