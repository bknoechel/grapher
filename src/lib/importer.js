export default class Importer {
  static importRawData(rawData) {
    if (typeof rawData !== 'string') {
      return { success: false, error: 'Can only import text data' };
    }

    try {
      const lines = rawData.split('\n');
      const vectors = [];
      for (let i = 0; i < lines.length; i++) {
        const row = lines[i];
        const chunks = row.split(/\s+/).filter(chunk => chunk.length);
        for (let j = 0; j < chunks.length; j++) {
          const number = parseFloat(chunks[j]);
          if (Number.isNaN(number)) {
            throw new Error('Data cannot be read');
          }
          if (i === 0) {
            vectors.push([]);
          }
          vectors[j].push(number);
        }
      }
      if (!vectors[0].length && !vectors[1].length) {
        throw new Error('No data read');
      }

      const results = {
        success: true,
        data: {},
      };
      if (vectors.length === 1) {
        [results.data.y] = vectors;
        results.data.x = [];
        for (let i = 0; i < results.data.y.length; i++) {
          results.data.x.push(i + 1);
        }
      } else {
        [results.data.x, results.data.y] = vectors;
      }

      return results;
    } catch (err) {
      return { success: false, error: err };
    }
  }
}
