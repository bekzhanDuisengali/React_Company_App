import React, { Component } from "react";
import Block from "../block/block";
import "./blockList.scss";

class BlockList extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.blockData !== this.props.blockData) {
      console.log("Updating block data:", this.props.blockData);
    }
  }

  render() {
    const { blockData } = this.props;

    if (!blockData) {
      return null; 
    }

    if (blockData.length === 0) {
      return <div>No blocks available.</div>;
    }

    return (
      <>
        <div className="outside">Weather for 5 Days</div>
        <div className="block-list">
            {blockData.map((block, index) => (
            <Block key={index} {...block} />
            ))}
        </div>
      </>
    );
  }
}

export default BlockList;
