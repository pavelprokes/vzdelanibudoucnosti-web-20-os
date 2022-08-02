export class NotFoundError extends Error {
  private status: number

  constructor(message) {
    super(message)

    this.name = "NotFoundError"
    this.status = 404
  }
}

export class DuplicateError extends Error {
  private status: number

  constructor(message) {
    super(message)

    this.name = "DuplicateError"
    this.status = 404
  }
}
