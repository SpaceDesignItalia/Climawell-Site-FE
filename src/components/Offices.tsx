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
    <a href="https://www.google.it/maps/place/Climawell+Srl/@43.8040239,11.2310446,421m/data=!3m1!1e3!4m6!3m5!1s0x132a568b0a4d758b:0x2db7feed6076e1a6!8m2!3d43.8040476!4d11.232073!16s%2Fg%2F1td7qf8d?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
      <Office name="Climawell" invert={invert}>
        Via delle Tre Pietre, 2/c
        <br />
        50127, Firenze
      </Office>
    </a>
  </li>
  <li>
    <a href="https://www.google.it/maps/place/Essecasa+-+Arredo+Casa/@43.7683971,11.222049,149m/data=!3m1!1e3!4m6!3m5!1s0x132a5133a0a50577:0x9312f005fc337a0e!8m2!3d43.7685141!4d11.2223223!16s%2Fg%2F11f2wcwpnm?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
      <Office name="Essecasa" invert={invert}>
        Via di Soffiano, 86/D
        <br />
        50143, Firenze
      </Office>
    </a>
  </li>
</ul>


  )
}
