import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore as FirestoreLite } from 'firebase/firestore/lite'
import type { Firestore } from 'firebase/firestore'
import type { Messaging } from 'firebase/messaging'
import type { Analytics } from 'firebase/analytics'
import type { Maybe } from '@/types/generics'

type MaybeApp = Maybe<FirebaseApp>
type MaybeFirestore = Maybe<Firestore>
type MaybeFirestoreLite = Maybe<FirestoreLite>
type MaybeAnalytics = Maybe<Analytics>
type MaybeMessaging = Maybe<Messaging>
type MaybeAuth = Maybe<Auth>

export type {
  MaybeApp,
  MaybeFirestore,
  MaybeFirestoreLite,
  MaybeAnalytics,
  MaybeMessaging,
  MaybeAuth
}
