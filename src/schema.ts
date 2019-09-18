import {
  createSchema as createSchemaFromSwagger,
  CallBackendArguments
} from 'swagger-to-graphql';

export const createSchema = (url: string) =>
  createSchemaFromSwagger({
    swaggerSchema: url,
    async callBackend({
                        requestOptions: { method, body, baseUrl, path, query, headers, bodyType }
                      }: CallBackendArguments<{}>) {
      const searchPath = query ? `?${new URLSearchParams(query as Record<string, string>)}` : '';
      const url = `${baseUrl}${path}${searchPath}`;
      const response = await fetch(url, {
        method,
        ...(body
          ? {
            ...(bodyType === 'json' && {
              headers: {
                'Content-Type': 'application/json',
                ...headers
              },
              body: JSON.stringify(body)
            }),
            ...(bodyType === 'formData' && {
              headers,
              body: new URLSearchParams(body)
            })
          }
          : { headers })
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
  });
