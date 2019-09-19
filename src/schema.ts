import {
  createSchema as createSchemaFromSwagger,
  CallBackendArguments,
} from 'swagger-to-graphql';

async function callBackend({
  requestOptions: { method, body, baseUrl, path, query, headers },
}: CallBackendArguments<{}>) {
  const url = `${baseUrl}${path}?${new URLSearchParams(query as Record<
    string,
    string
  >)}`;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  if (200 <= response.status && response.status < 300) {
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }
  throw new Error(`Response: ${response.status} - ${text}`);
}

export const createSchema = (url: string) =>
  createSchemaFromSwagger({
    swaggerSchema: url,
    callBackend,
  });
