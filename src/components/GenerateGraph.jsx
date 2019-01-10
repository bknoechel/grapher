import React from 'react';

class GenerateGraph extends React.Component {
  constructor(props) {
    super(props);

    this.generate = (type) => {
      const { setData } = this.props;
      const data = {
        x: [],
        y: [],
      };
      switch (type) {
        case 'cubic':
          for (let i = 0; i < 100; i++) {
            const x = ((i - 50) * 0.2).toFixed(3);
            const y = x * x * x;
            data.x.push(x);
            data.y.push((y).toFixed(3));
          }
          break;
        case 'parabola':
          for (let i = 0; i < 100; i++) {
            const x = ((i - 50) * 0.2).toFixed(3);
            const y = x * x;
            data.x.push(x);
            data.y.push((y).toFixed(3));
          }
          break;
        case 'sigmoid':
          for (let i = 0; i < 100; i++) {
            const x = ((i - 50) * 0.2).toFixed(3);
            const y = 1 / (1 + Math.exp(-1.0 * x));
            data.x.push(x);
            data.y.push(y.toFixed(3));
          }
          break;
        case 'sine':
          for (let i = 0; i < 100; i++) {
            const x = ((i - 50) * 0.1).toFixed(3);
            const y = Math.sin(x);
            data.x.push(x);
            data.y.push(y.toFixed(3));
          }
          break;
        case 'random':
        default:
          for (let i = 0; i < 100; i++) {
            data.x.push(i + 1);
            data.y.push((Math.random() * 100 + 1000).toFixed(3));
          }
      }

      setData(data);
    };
  }

  render() {
    const btns = ['random', 'sine', 'sigmoid', 'parabola', 'cubic'].map((name) => {
      const displayName = name.charAt(0).toUpperCase() + name.substring(1, name.length);
      return (
        <button
          key={name}
          className="btn btn-secondary"
          type="button"
          onClick={this.generate.bind(this, name)}
        >
          {displayName}
        </button>
      );
    });
    return (
      <div>
        <div className="btn-group-vertical">
          {btns}
        </div>
      </div>
    );
  }
}

export default GenerateGraph;
