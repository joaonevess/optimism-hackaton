import * as React from "react"
import { SVGProps } from "react"

const Metamask = (props : SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    stroke="#000"
    viewBox="0 0 64 64"
    {...props}
  >
    <path d="m54 26 2 2-4 4 4 12-2 10-12-4-6 4h-8l-6-4-12 4-2-10 4-12-4-4 2-2-2-10 2-8 14 8h16l14-8 2 8-2 10z" />
    <path d="m40 16-2 8-2 16h-8l-2-16-2-8M28 40l-6 10M36 40l6 10M32 48v6M12 32l14-8M38 24l14 8M28 40l-10-4M36 40l10-4" />
  </svg>
)
export default Metamask
