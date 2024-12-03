import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Climawell" invert={invert}>
        Via delle Tre Pietre, 2/c 
        <br />
        50127, Firenze
        </Office>
      </li>
      <li>
        <Office name="Essecasa" invert={invert}>
        Via di Soffiano, 86/D
        <br />
        50143, Firenze 
        </Office>
      </li>
    </ul>
  )
}
