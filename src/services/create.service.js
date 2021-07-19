class ServiceCreate {
  constructor(params, document) {
    (this.params = params), (this.document = document);
  }
  async create() {
    const data = new this.document(this.params);
    await data.save();
  }
}

module.exports = { ServiceCreate };
