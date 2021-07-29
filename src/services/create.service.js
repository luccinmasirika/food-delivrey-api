class ServiceCreate {
  constructor(params, document) {
    (this.params = params), (this.document = document);
  }
  async create() {
    const data = new this.document(this.params);
    const res = await data.save();
    return res;
  }
}

module.exports = { ServiceCreate };
