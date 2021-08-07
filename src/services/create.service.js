const slugify = require('slugify');

class ServiceCreate {
  constructor(params, document) {
    (this.params = params), (this.document = document);
  }
  async create() {
    const { nom } = this.params;
    const slug = slugify(nom, { lower: true, strict: true });
    const data = new this.document({ ...this.params, slug });
    const res = await data.save();
    return res;
  }
}

module.exports = { ServiceCreate };
