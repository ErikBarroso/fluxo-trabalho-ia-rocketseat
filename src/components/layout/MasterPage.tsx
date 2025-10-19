import type { ReactNode } from 'react'

type Props = {
  header?: ReactNode
  children: ReactNode
}

export default function MasterPage({ header, children }: Props) {
  return (
    <div className="master container">
      {header && <header className="page-header">{header}</header>}
      <section className="content">
        {children}
      </section>
    </div>
  )
}

