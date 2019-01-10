import Grapher from '../../src/lib/grapher';

describe('grapher', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
    };
  });

  test('exists', () => {
    expect(Grapher).toBeTruthy();
  });

  describe('drawLine', () => {
    test('it draws a line', () => {
      Grapher.drawLine(ctx, [0, 0], [1, 1]);
      expect(ctx.beginPath).toBeCalled();
      expect(ctx.moveTo).toBeCalledWith(0, 0);
      expect(ctx.lineTo).toBeCalledWith(1, 1);
      expect(ctx.stroke).toBeCalled();
    });
  });

  describe('calculateMapping', () => {
    const data = {
      x: [5, 6, 7],
      y: [10, 15, 25],
    };
    test('it correctly defines mapping', () => {
      const { dataBox, mapX, mapY } = Grapher.calculateMapping(data, 200, 200);
      expect(dataBox.width).toBe(2);
      expect(dataBox.height).toBe(15);
      expect(mapX(5)).toBe(30);
      expect(mapX(6)).toBe(100);
      expect(mapX(7)).toBe(170);
      expect(mapY(10)).toBe(170);
      expect(mapY(15)).toBeCloseTo(123.33);
      expect(mapY(25)).toBe(30);
    });
  });
});
