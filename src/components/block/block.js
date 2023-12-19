import { Component } from 'react';
import './block.scss';
class Block extends Component {
  render() {
    const { title, content , info, feel,cloud_icon} = this.props;

    return (
      <div className="block">
        <div>
          <img src={cloud_icon} alt="" />
          <h2>{title}</h2>
        </div>
        <p>{content}</p>
        <p>{info}</p>
        <p>{feel}</p>
      </div>
    );
  }
}

export default Block;
