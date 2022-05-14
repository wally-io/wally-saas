export default class HttpException extends Error {
  public status: number
  public message: string
  public code: number

  constructor(code: number, message: string) {
    super(message)
    this.message = message
    this.code = code
    this.status = parseInt(code.toString().slice(0, 3))
  }
}
