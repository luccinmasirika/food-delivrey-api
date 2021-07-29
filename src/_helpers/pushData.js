class PushData {
  constructor(schema, data, filter) {
    this.schema = schema;
    this.data = data;
    this.filter = filter;
  }
  async onPush() {
    console.log('filter', this.schema);
    const test = await this.schema.updateOne(this.filter, { $push: this.data });
    console.log('test', test);
  }
}

module.exports = { PushData };
