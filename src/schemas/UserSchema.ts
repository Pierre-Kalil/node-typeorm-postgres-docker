import * as yup from "yup";

export const UserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
  createdOn: yup.date().default(() => {
    return new Date();
  }),
  updatedOn: yup.date().default(() => {
    return new Date();
  }),
});
