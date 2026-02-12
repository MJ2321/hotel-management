declare module "react-google-recaptcha" {
  import * as React from "react"

  export type ReCAPTCHATheme = "light" | "dark"
  export type ReCAPTCHASize = "compact" | "normal" | "invisible"
  export type ReCAPTCHABadge = "bottomright" | "bottomleft" | "inline"

  export interface ReCAPTCHAProps {
    sitekey: string
    onChange?: (token: string | null) => void
    onExpired?: () => void
    onErrored?: () => void
    size?: ReCAPTCHASize
    theme?: ReCAPTCHATheme
    badge?: ReCAPTCHABadge
    tabindex?: number
    className?: string
  }

  export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {}
}
