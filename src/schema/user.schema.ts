import { Type } from '@sinclair/typebox'

enum ResponseType {
  Object,
  Array
}

const UserSchema = Type.Object({
  id: Type.String(),
  fname: Type.String(),
  lname: Type.String(),
  phoneNumber: Type.String(),
  email: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
});

export const QuerySchema = Type.Object({
  skip: Type.Number(),
  take: Type.Number(),
  text: Type.String()
});

export const ParamsSchema = Type.Object({
  id: Type.String(),
});

export const getSchema = (schema?: any, body?: any, type?: ResponseType) => {
  const res = {
    body: body,
    response: {
      200: Type.Object({
        message: Type.String(),
        data: type != null ? type == ResponseType.Array ? Type.Array(schema) :
          schema : Type.Array(schema),
      }),
      400: Type.Object({ message: Type.String() }),
      401: Type.Object({ message: Type.String() }),
      405: Type.Object({ message: Type.String() }),
      409: Type.Object({ message: Type.String() }),
      500: Type.Object({ message: Type.String(), error: Type.Any() }),
    },
  };

  return res;
};

export const VerificationRequestBodySchema = Type.Object({
  email: Type.String(),
  type: Type.String()
});

export const GetTokenRequestBodySchema = Type.Object({
  email: Type.String()
});

export const GetTokenResponseSchema = Type.Object({
  token: Type.String()
});

export const getAllUsersSchema = getSchema(UserSchema);

export const getUserByIdSchema = getSchema(UserSchema);

export const getVerificationCodeSchema = getSchema(null, VerificationRequestBodySchema);

export const getTokenSchema = getSchema(GetTokenResponseSchema, GetTokenRequestBodySchema, ResponseType.Object);
