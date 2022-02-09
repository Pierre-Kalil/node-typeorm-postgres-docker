declare namespace Express {
  interface Request {
    user?: { id: string };
    validateData?: {
      id: string;
      name: string;
      email: string;
      password: string;
      isAdm: boolean;
      createdOn: Date;
      updatedOn: Date;
    };
  }
}
