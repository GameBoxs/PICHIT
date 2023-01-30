export const GET_TOKEN = "GET_TOKEN";

export function getToken({ token }) {
  return { type: GET_TOKEN, token: token };
}
