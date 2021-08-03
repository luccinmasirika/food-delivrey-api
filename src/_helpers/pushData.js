class PushData {
  constructor(schema, data, filter) {
    this.schema = schema;
    this.data = data;
    this.filter = filter;
  }
  async onPush() {
    await this.schema.updateOne(this.filter, { $push: this.data });
  }
  async onPull() {
    await this.schema.updateOne(this.filter, { $pull: this.data });
  }
}

module.exports = { PushData };
