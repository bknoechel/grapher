export default class Grapher {
  static graph(options) {
    const { ctx, width, height, type, data } = options;
    if (type === 'line') {
      Grapher.drawLineGraph(ctx, width, height, data);
    }
  }

  static drawLineGraph(ctx, width, height, data) {
    const { x, y } = data;
    const { dataBox, mapX, mapY } = Grapher.calculateMapping(data, width, height);

    Grapher.drawXAxis(ctx, width, height, dataBox, mapX);
    Grapher.drawYAxis(ctx, width, height, dataBox, mapY);

    ctx.strokeStyle = '#4682B4';
    ctx.lineWidth = 2;
    for (let i = 0; i < x.length; i++) {
      if (i < x.length - 1) {
        const p1 = [mapX(x[i]), mapY(y[i])];
        const p2 = [mapX(x[i + 1]), mapY(y[i + 1])];
        Grapher.drawLine(ctx, p1, p2);
      }
    }
  }

  static calculateMapping(data, width, height) {
    const { x, y } = data;

    const dataBox = {
      minX: Math.min.apply(null, x),
      maxX: Math.max.apply(null, x),
      minY: Math.min.apply(null, y),
      maxY: Math.max.apply(null, y),
    };
    dataBox.width = dataBox.maxX - dataBox.minX;
    dataBox.height = dataBox.maxY - dataBox.minY;

    const drawFrameBox = {
      minX: 0.15 * width,
      maxX: 0.85 * width,
      minY: 0.15 * height,
      maxY: 0.85 * height,
    };
    drawFrameBox.width = drawFrameBox.maxX - drawFrameBox.minX;
    drawFrameBox.height = drawFrameBox.maxY - drawFrameBox.minY;

    const mapX = xi => ((xi - dataBox.minX) / dataBox.width * drawFrameBox.width + drawFrameBox.minX);
    const mapY = yi => (drawFrameBox.maxY - (yi - dataBox.minY) / dataBox.height * drawFrameBox.height);

    return {
      dataBox,
      mapX,
      mapY,
    };
  }

  static drawXAxis(ctx, width, height, dataBox, mapX) {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    const x = Math.floor(width * 0.10);
    const xend = Math.floor(width * 0.90);
    const y = Math.floor(height * 0.90);

    Grapher.drawLine(ctx, [x, y], [xend, y]);

    const numberTicks = 4;
    const jump = dataBox.width / 4;
    for (let i = 0; i <= numberTicks; i++) {
      const tickDataX = jump * i + dataBox.minX;
      const tickX = mapX(tickDataX);
      const p1 = [tickX, y];
      const p2 = [tickX, y + height * 0.02];
      Grapher.drawLine(ctx, p1, p2);
      ctx.fillText(`${tickDataX}`, tickX - (width * 0.01), y + height * 0.05);
    }
  }

  static drawYAxis(ctx, width, height, dataBox, mapY) {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    const y = Math.floor(height * 0.10);
    const yend = Math.floor(height * 0.90);
    const x = Math.floor(width * 0.10);

    Grapher.drawLine(ctx, [x, y], [x, yend]);

    const numberTicks = 4;
    const jump = dataBox.height / 4;
    for (let i = 0; i <= numberTicks; i++) {
      const tickDataY = jump * i + dataBox.minY;
      const tickY = mapY(tickDataY);
      const p1 = [x, tickY];
      const p2 = [x - width * 0.02, tickY];
      Grapher.drawLine(ctx, p1, p2);
      ctx.fillText(`${tickDataY.toFixed(2)}`, x - width * 0.05, tickY - 3);
    }
  }

  static drawLine(ctx, p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
  }
}
