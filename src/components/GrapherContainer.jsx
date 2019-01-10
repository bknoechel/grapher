import React from 'react';
import Grapher from '../lib/grapher';

class GrapherContainer extends React.Component {
  constructor(props) {
    super(props);
    this.elt = React.createRef();
    this.canvas = React.createRef();

    this.state = {
      resizeDrawing: null,
    };

    this.resize = () => {
      let { resizeDrawing } = this.state;
      if (resizeDrawing) return;
      resizeDrawing = setTimeout(() => {
        this.draw();
        this.setState({
          resizeDrawing: null,
        });
      }, 100);
      this.setState({
        resizeDrawing,
      });
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  componentWillUnmount() {
    const { resizeDrawing } = this.state;
    clearTimeout(resizeDrawing);
    window.removeEventListener('resize', this.resize);
  }

  draw() {
    const { data } = this.props;
    if (!this.canvas.current) {
      return;
    }

    const ctx = this.canvas.current.getContext('2d');
    const bbox = this.elt.current.getBoundingClientRect();

    if (!data) {
      ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
      return;
    }

    const width = Math.floor(bbox.width);
    const height = Math.floor(bbox.height);
    this.canvas.current.height = height;
    this.canvas.current.width = width;

    Grapher.graph({
      ctx,
      width,
      height,
      type: 'line',
      data: {
        x: data.x,
        y: data.y,
      },
    });
  }

  render() {
    return (
      <div className="border grapher" ref={this.elt} onClick={this.handleClick}>
        <canvas ref={this.canvas} />
      </div>
    );
  }
}

export default GrapherContainer;
