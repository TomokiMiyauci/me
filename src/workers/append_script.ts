import '@/workers/activate'
import '@/workers/message'
import '@/workers/fetch'
import '@/workers/notificationclick'
import { subscribeBackgroundMessage } from '@/workers/background_message'

subscribeBackgroundMessage()
