import { BetaAnalyticsDataClient } from '@google-analytics/data'

type Awaited<T extends Promise<any>> = T extends Promise<infer R> ? R : never

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, milliseconds)
  })

const getAccessNumbers = async (): Promise<Record<string, number>> => {
  const analytics = new BetaAnalyticsDataClient()

  return analytics
    .runReport({
      property: 'properties/260620839',
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today'
        }
      ],
      metrics: [
        {
          name: 'session',
          expression: 'sessions'
        }
      ],
      dimensionFilter: {
        orGroup: {
          expressions: [
            {
              filter: {
                fieldName: 'pagePath',
                stringFilter: {
                  matchType: 'PARTIAL_REGEXP',
                  value: '^/ja/posts/.+'
                }
              }
            },
            {
              filter: {
                fieldName: 'pagePath',
                stringFilter: {
                  matchType: 'PARTIAL_REGEXP',
                  value: '^/posts/.+'
                }
              }
            }
          ]
        }
      },
      dimensions: [
        {
          name: 'pagePath'
        }
      ]
    })
    .then((e) => {
      return (
        e[0].rows?.reduce((acc, cur) => {
          const key = cur.dimensionValues![0].value
          const value = cur.metricValues![0].value
          if (key && value) {
            acc = { ...acc, [key]: Number(value) }
          }

          return acc
        }, {} as Record<string, number>) ?? {}
      )
    })
    .catch(() => {
      console.error('Something wrong at getting analytics')
      return {} as Record<string, number>
    })
}

let hasCalled = false
let done = false
let result: any = undefined

const sequential =
  <T extends () => Promise<unknown>>(fn: T) =>
  (): Promise<Awaited<ReturnType<T>>> => {
    return new Promise<Awaited<ReturnType<T>>>(async (resolve) => {
      if (hasCalled) {
        while (!done) {
          await wait(500)
        }
        return resolve(result)
      } else {
        hasCalled = true

        const data = await fn()
        result = data
        done = true

        resolve(data as Awaited<ReturnType<T>>)
      }
    })
  }

const safeGetAccessNumbers = sequential(getAccessNumbers)

export { safeGetAccessNumbers }
