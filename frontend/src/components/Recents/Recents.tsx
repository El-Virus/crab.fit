'use client'

import Link from 'next/link'

import dayjs from '/src/config/dayjs'
import { useTranslation } from '/src/i18n/client'
import { useRecentsStore, useStore } from '/src/stores'

import styles from './Recents.module.scss'

interface RecentsProps {
  target?: React.ComponentProps<'a'>['target']
}

const Recents = ({ target }: RecentsProps) => {
  const recents = useStore(useRecentsStore, state => state.recents)
  const { t } = useTranslation(['home', 'common'])

  return recents?.length ? <section id="recents">
    <div>
      <h2>{t('home:recently_visited')}</h2>
      {recents.map(event => (
        <Link className={styles.recent} href={`/${event.id}`} target={target} key={event.id}>
          <span className={styles.name}>{event.name}</span>
          <span
            className={styles.date}
            title={dayjs.unix(event.created_at).format('D MMMM, YYYY')}
          >{t('common:created', { date: dayjs.unix(event.created_at).fromNow() })}</span>
        </Link>
      ))}
    </div>
  </section> : null
}

export default Recents
