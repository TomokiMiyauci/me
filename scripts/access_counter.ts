import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { sequence } from './util'

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

const safeGetAccessNumbers = sequence(getAccessNumbers)

export { safeGetAccessNumbers }
