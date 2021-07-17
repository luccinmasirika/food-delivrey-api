class GetService {
  constructor(document, query, filters) {
    this.document = document;
    this.query = query;
    this.filters = filters;
  }

  async pagination() {
    const total = await this.document.countDocuments(this.filters).exec();
    const limit = this.query.limit || total;
    const page = this.query.page || 1;
    const pages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const data = await this.document
      .find(this.filters)
      .skip(skip)
      .limit(limit)
      .sort([['updatedAt', 'desc']])
      .exec();
    return { data, total, page, pages };
  }
}

module.exports = { GetService };
