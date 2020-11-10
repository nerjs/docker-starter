import { Observable } from 'apollo-link'
import { print } from 'graphql/language/printer'
import sleep from 'helpers-promise/sleep'
import BaseLink from './BaseLink'

export default class RequestLink extends BaseLink {
  request(operation) {
    const { operationName, extensions, variables, query } = operation
    return new Observable(async observer => {
      await sleep(50)
      try {
        // operation.setContext({ response });
        observer.next(
          await this.fetch({
            operationName,
            extensions,
            variables,
            query: print(query),
          }),
        )
      } catch (e) {
        observer.error(e)
      }
      await sleep(50)
      observer.complete()
    })
  }
}
