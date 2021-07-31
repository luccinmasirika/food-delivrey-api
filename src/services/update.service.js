class ServiceUpdate {
  constructor(request, document) {
    this.request = request;
    this.document = document;
  }
  async update() {
    const update = this.request.file
      ? { ...this.request.body, image: `images/${this.request.file.filename}` }
      : { ...this.request.body };

    this.document
      .updateOne({ _id: this.request.query._id }, { $set: { ...update } })
      .exec();
  }
}

module.exports = { ServiceUpdate };
