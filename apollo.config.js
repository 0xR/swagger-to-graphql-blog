module.exports = {
  client: {
    service: {
      name: 'petstore',
      localSchemaFile: 'src/__generated__/schema.graphql'
    },
    excludes: ['src/__generated__/schema.graphql']
  }
};