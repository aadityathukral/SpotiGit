/** Response from POST request for access/refresh tokens */
type CorrectAccessTokenRes = {
  access_token: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
  token_type: "Bearer";
};

/**
 * Determines whether the given value is a correct access token response.
 * @param data the value in question
 * @return true if the value is a correct access token response and
 * false otherwise
 */
export const isCorrectAccessTokenRes = (
  data: unknown
): data is CorrectAccessTokenRes => {
  if (!isRecord(data)) {
    return false;
  }
  if (!data.access_token || typeof data.access_token !== "string") {
    return false;
  }
  if (!data.refresh_token || typeof data.refresh_token !== "string") {
    return false;
  }
  if (!data.scope || typeof data.scope !== "string") {
    return false;
  }
  if (!data.expires_in || typeof data.expires_in !== "number") {
    return false;
  }
  if (!data.token_type || data.token_type !== "Bearer") {
    return false;
  }
  return true;
};

/**
 * Determines whether the given value is a record.
 * @param val the value in question
 * @return true if the value is a record and false otherwise
 */
export const isRecord = (val: unknown): val is Record<string, unknown> => {
  return val !== null && typeof val === "object";
};
