interface IError {
  code: string;
  description: string;
}

interface IErrorsMiddleware {
  object: string;
  errors: IError[];
  statusCode: number;
}

export default IErrorsMiddleware;
