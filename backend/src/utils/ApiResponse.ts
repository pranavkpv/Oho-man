export class ApiResponse<T> {
  constructor(
    public statusCode: number,
    public success: boolean,
    public message: string,
    public data?: T
  ) { }

  static success<T>(
    res: any,
    statusCode: number,
    message: string,
    data?: T
  ) {
    return res.status(statusCode).json(
      new ApiResponse<T>(statusCode, true, message, data)
    );
  }

  static error<T>(
    res: any,
    statusCode: number,
    message: string,
    data?: T
  ) {
    return res.status(statusCode).json(
      new ApiResponse<T>(statusCode, false, message, data)
    );
  }
}